// CLL.UserProfile Module
// File: user-profile-module.js
// Author: Chris Lemler
//
// This module encapsulates the functionality of the User Profile POC
// portlet.
//

// Access the global CLL namespace object or create it if it does not exist
if (undefined === CLL || typeof (CLL) !== "object") {
    console.log("Creating CLL = {}");
    var CLL = {};
}


// Create the UserProfile module in the CLL namespace. We will adopt the new
// EcmaScript 'stric mode'
CLL.UserProfile = (function () {
    "use strict";
    console.log("Constructing CLL.UserProfile");

    //=======================================
    // Private Module Variables Here
    //=======================================
    var originalProfile = null,         // Stores original object received via ajax
        modifiedProfile = null,         // Stores the values entered into the modal
        self;


    //=======================================
    // Private Module Functions Here
    //=======================================

    // Retrieve the profile for the named user and display the info
    // in a modal popup.
    function loadUserProfile(userId) {
        console.log("Entered displayUserProfile(" + userId + ")");
        console.log("URL = " + self.profileURL);
        
        // Obtain the user data via ajax and render it in line mode
        $.get( self.profileURL, function (data, status, jqXHR) {
            console.log("Ajax Succeeded. Data = " + data);
            console.log("---> userID: " + data["userID"]);
            originalProfile = data;
            modifiedProfile = _.clone(originalProfile); // Only works for a shallow copy
            showUserProfile();
        }, "json").error( function (data, status, jqXHR) {
            console.log("Ajax FAILED - " + status);
            alert("Could not retrieve the profile for " + userId);
        });
    }
    
    // Populate the modal with the users information, and
    // Display the popup on the screen.
    function showUserProfile() {
        var key, formField;
        console.log("Entered showUserProfile()");
        
        for (key in originalProfile) {
            formField = "#" + key;
            $(formField).val(modifiedProfile[key]);
        }

        $('#profileModal').modal('show');
    }
    
    // Retrieve the updated profile values, and post to th server
    // to be persisted
    function saveUserProfile(eventObject) {
        var key,
            formField,
            profileJSON;
        console.log("Entered saveUserProfile");

        for (key in originalProfile) {
            formField = "#" + key;
            modifiedProfile[key] = $(formField).val();
            if (originalProfile[key] !== modifiedProfile[key]) {
                console.log("Value[" + key + "] changed: " + modifiedProfile[key]);
            }
        }


        // Send the data to the server to be persisted. Expect a return
        // Results object {success: [true|false], message: [A string message]}
        // NOTE: if pass modifiedProfile, Liferay parses and creates set
        // of key/value pairs on the server. getParameter can access the values.
        //
        // NOTE2: Trying to pass {"data" : stringified_json}. My theory is I will get a parameter
        // 'data' with a value of the stringified json. Then can use GSON to easily parse.
        profileJSON = JSON.stringify(modifiedProfile);

        $.post(self.postProfileURL, {"data": profileJSON}, function (data, status, jqXHR) {
            console.log("saveUserProfile - POST succeeded");
        }, "json").error( function (data, status, jqXHR) {
            console.log("Ajax POST FAILED - " + status);
            alert("Could not save the profile:" + status);
        });

        // Hide the modal
        $('#profileModal').modal('hide');
        
        // Return false so that the default submit handler does not cause
        // a page reload. We will handle all form persistance via ajax.
        return false;
    }


    // Register callbacks for the icons that control whether the display
    // is shown as a tile-line, tile-block, or a grid. Each callback
    // recives the jQuery identifier for the ADDA in which the content
    // shoud be displayed ('#CLL-user-grid')
    function registerHandlers() {
        console.log("Entered registerHandlers()");

        // The onclick handler for Click Me button
        $("#displayProfileModal").click(function () {
            loadUserProfile("Fred");
        });
        
        // Register a handler for the 'Save' button on the modal
        $('#profileForm').submit(saveUserProfile);
    }

    //=======================================
    // Public Module Variables and Functions
    //=======================================
    return {
        profileURL: "",
        postProfileURL: "",

        // Initialize the UserProfile module. This method must be called prior to
        // any other operations.
        //
        init: function () {
            self = this;    // Obtain reference to 'this' for private functions
            
            // Register the handlers that render the various types of views
            registerHandlers();
            
            // Obtain the user data via ajax and render it in line mode
            //$.getJSON("/UserManagementPOC-portlet/json/userdata.json",
            //    function (data) {
            //        console.log("Received JSON data: " + data);
            //        userList = data.users;
            //        renderLineTiles(VIEW_CONTAINER_ID);
            //}).error(function(jqXHR, textStatus, errorThrown) {
            //    console.log("error " + textStatus);
            //    console.log("incoming Text " + jqXHR.responseText);
            //    alert("Unable to load the user data. Refresh the page, or call support if the problem persists.");
            //});
        },

        // A dummy function to test scoping 
        doName: function (name) {
            console.log("Entered UserProfile.doName(" + name + ")");
        },


        // Display the name of the currently selected company in the portlet
        displayCompanyName: function (companyName) {
            console.log("Entered displayCompanyName(" + companyName + ")");
            $("#CLL-company-name").html(companyName);
        }
        
    };
}());

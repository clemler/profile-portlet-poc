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
    var ROW_DIV_OPEN = '<div class="row-fluid"> <!-- START of a new row-fluid -->',
        ROW_DIV_CLOSE = '</div> <!-- END of a row-fluid -->',
        TILELINE_DIV_OPEN = '<div class="span2 tile-single bgcolor5">',
        TILEBLOCK_DIV_OPEN = '<div class="span3 tile-block bgcolorTransparent">',
        BOTTOMLINE_DIV_OPEN = '<div class="bottomLine">' +
                              '<ul class="tile-data">',
        BOTTOMLINE_DIV_CLOSE = '</ul></div>',
        GOLEFT_DIV_OPEN = '<div class="goLeft">',
        GORIGHT_DIV_OPEN = '<div class="goRight">',
        self;


    //=======================================
    // Private Module Functions Here
    //=======================================

    // Retrieve the profile for the named user and display the info
    // in a modal popup.
    function displayUserProfile(user) {
        console.log("Entered displayUserProfile(" + user + ")");
        var foo = ::;
    }


    // Construct the HTML for a single tile. Function takes a single parameter
    // which is the Object containing the users details (e.g. id, name...)
    function constructLineTile(user) {
        var tile = "";

        tile = TILELINE_DIV_OPEN +
               BOTTOMLINE_DIV_OPEN +
               '<li>' + user.name + '</li>' +
               BOTTOMLINE_DIV_CLOSE +
               GOLEFT_DIV_OPEN +
               '<i id="' + user.id + '" ' + 'class="iconsg-b-r7c2-edit user-mgmt-edit-icon"></i>' +
               '</div>' + // Closes the GOLEFT_DIV
               GORIGHT_DIV_OPEN +
               (user.active ? '<i class="iconsg-b-r3c8-active"></i>' : '<i class="iconsg-b-r3c9-inactive"></i>') +
               '</div>' + // Closes the GORIGHT_DIV
               '</div>';  // Closes the TILE_DIV

        return tile;
    }


    // Render the tiles in line mode (showing a single value). For user
    // management we will display the person's name in the tile.
    function renderBlockTiles(containerId) {
        console.log("Entered renderLineTiles(" + containerId + ")");
        var needRowDivClose = false,    // Track if e need to close the div
            currentRowDiv,              // Reference to the current row <div>
            tileDiv,                    // Outer <div> for a tile
            i;

        // Clear any existing content in the container. empty() will remove all
        // child DOM elements of containerId, and make certain to remove any
        // actions/handlers associated with child elements.
        $(containerId).empty();

        // Render the tiles. We must insert a row-fluid element each time the sum of
        // of the tile spans equals MAX_TILE_COLUMNSCreate the tiles for each line item
        for (i in userList) {

            // If modulo returns 0 insert a ROW_DIV_OPEN
            if (((i * BLOCK_TILE_ROW_SPAN) % MAX_TILE_COLUMNS) === 0) {

                //Check if there is a previous open div that needs to be closed
                if (needRowDivClose) {
                    $(ROW_DIV_CLOSE).appendTo($(containerId));
                    needRowDivClose = false;
                }

                // Open a new row
                currentRowDiv = $(ROW_DIV_OPEN);
                currentRowDiv.appendTo($(containerId));
                needRowDivClose = true;
            }

            // Construct a tile and append to the current row
            tileDiv = constructBlockTile(userList[i]);
            $(tileDiv).appendTo(currentRowDiv);
        }

        // Append a final close <div> if needed
        if (needRowDivClose) {
            $(ROW_DIV_CLOSE).appendTo($(containerId));
            needRowDivClose = false;
        }

        // Register a click handler for each tile
        // I am using a class selector. This may not be appropriate since
        // there may be other elements on the screen with this class.
        $(".user-mgmt-edit-icon").click(self.onShowUserDetails);
    }


    // Register callbacks for the icons that control whether the display
    // is shown as a tile-line, tile-block, or a grid. Each callback
    // recives the jQuery identifier for the ADDA in which the content
    // shoud be displayed ('#CLL-user-grid')
    function registerViewHandlers() {
        console.log("Entered registerViewHandlers()");

        // The onclick handler for tile-single button
        $("#CLL-display-tile-single").click(function () {
            renderLineTiles(VIEW_CONTAINER_ID);
        });

        //The onclick handler for tile-block button
        $("#CLL-display-tile-block").click(function () {
            renderBlockTiles(VIEW_CONTAINER_ID);
        });

        //The onclick handler for tile-list button
        $("#CLL-display-tile-grid").click(function () {
            renderGrid(VIEW_CONTAINER_ID);
        });
    }

    
    // Return the details for the user with the speicified id. Will throw an
    // exception of the id is not found.
    function getUserDetails(userId) {
        var user, i;
        console.log("Entered getUserDetails(id='" + userId + "')");
        for (i=0; i < userList.length; i++) {
            if (userList[i].id == userId) {
                console.log("Found user details for id=" + userId);
                user = userList[i];
                return user;
            }
        }
    
        // Should not have gotten here. Means no matching record was found.
        // @TODO what is the correct error handling for this case?
        throw new Error("User with id=" + userId + " was not found" );
    }


    //=======================================
    // Public Module Variables and Functions
    //=======================================
    return {

        // Initialize the UserProfile module. This method must be called prior to
        // any other operations.
        //
        init: function () {
            self = this;    // Obtain reference to 'this' for private functions
            
            // Register the handlers that render the various types of views
            registerViewHandlers();
            
            // Obtain the user data via ajax and render it in line mode
            $.getJSON("/UserManagementPOC-portlet/json/userdata.json",
                function (data) {
                    console.log("Received JSON data: " + data);
                    userList = data.users;
                    renderLineTiles(VIEW_CONTAINER_ID);
            }).error(function(jqXHR, textStatus, errorThrown) {
                console.log("error " + textStatus);
                console.log("incoming Text " + jqXHR.responseText);
                alert("Unable to load the user data. Refresh the page, or call support if the problem persists.");
            });
        },


        // A dummy function to test scoping 
        doSomething: function () {
            console.log("Entered UserProfile.doSomething()");
            this.doMore();
        },


        // A dummy function to test scoping 
        doMore: function () {
            console.log("Entered UserProfile.doMore()");
        },


        // A dummy function to test scoping 
        doName: function (name) {
            console.log("Entered UserProfile.doName(" + name + ")");
        },


        // Display the name of the currently selected company in the portlet
        displayCompanyName: function (companyName) {
            console.log("Entered displayCompanyName(" + companyName + ")");
            $("#CLL-company-name").html(companyName);
        },
        
        // This method is called when the user selects the 'edit' icon on a tile.
        // The id of the object associated with the particular tile is passed so
        // that the user details can be shown in the modal form
        //
        // Load the attributes for the particular user, and update the fields in
        // the form. Then display the form as a modal popup.
        onShowUserDetails: function(eventObject) {
            var user;
            console.log("onEditUserDetails(id='" + eventObject.target.id + "')");
            //UserProfile.currentUserId = eventObject.target.id;

            // Find the details for the selected user
            // @TODO Need proper error handling. What if it is an invalid id?
            user = getUserDetails(eventObject.target.id);

            // Launch the User Editor for the selected user
            CLL.UserEditor.editUser(user);
        }
        
    };
}());

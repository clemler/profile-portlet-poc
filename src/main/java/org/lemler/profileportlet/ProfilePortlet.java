// File: ProfilePortlet.java
// Author: Chris Lemler
//
// Sample portlet which uses resourceUrl's to implement ajax requests
//
package org.lemler.profileportlet;

import java.io.IOException;
import javax.portlet.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.gson.Gson;
import org.lemler.profileportlet.UserProfile;


public class ProfilePortlet extends GenericPortlet {
    protected String viewJSP;
    private static Logger log = LoggerFactory.getLogger(ProfilePortlet.class);
    
    /**
     * Retrieve initialization parameters
     */
    public void init() throws PortletException {
        log.info("Entered init()");
        viewJSP = getInitParameter("view-jsp");
    }

    /**
     * Renders the registration form or success JSP based on the value of
     * request attribute actionStatus.
     * 
     * @param request
     * @param response
     * @throws PortletException
     * @throws IOException
     */
    @RenderMode(name = "VIEW")
    public void renderProfile(RenderRequest request, RenderResponse response)
        throws PortletException, IOException {        
        
        log.info("Entered renderProfile()");
        
        // Pass the resource URL as a bean called resourceUrl to the view JSP
        //ResourceURL profileUrl = response.createResourceURL();
        //profileUrl.setResourceID("get-profile");
        //String resourceUrl = profileUrl.toString();
        //log.info("ProfileURL = {}", resourceUrl);
        //request.setAttribute("profileUrl", resourceUrl);
        
        include(viewJSP, request, response);
    }
     
    
    
    /**
     * Handles resourceUrls in support of various client ajax calls.
     * 
     * @param request
     * @param response
     * @throws PortletException
     * @throws IOException
     */
    public void serveResource(ResourceRequest request, ResourceResponse response) throws PortletException, IOException {        
        String resourceID = request.getResourceID();
        log.info("Entered serveResource({})", request.getResourceID());
        
        if ("get-profile".equals(resourceID)) {
            getUserProfile(request, response);
        }
        else {  // This is an error that needs to be handled
            log.error("serveResource() - Invalid resourceID: {}", resourceID);
        }
    }
    
    /**
     * Retrieve the profile information for the specified user and
     * return it via JSON. The method requires that the resource
     * requestID was 'get-profile'.
     *
     * @param request
     * @param response
     * @throws PortletException
     * @throws IOException
     */
     protected void getUserProfile(ResourceRequest request, ResourceResponse response) throws PortletException, IOException {
        String userID;
        log.info("Entered getUserProfile()");
        
        // Obtain the requested UserID and query for the users profile info
        // userID = request.getParameter("userID");
        
        // Construct a dummy UserProfile to pass back to the client
        // Later this code can be replaced with a call to a DB, LDAP etc.
        UserProfile profile = new UserProfile("fred@flinstone.org", "Fred", "Flintstone", "");
        Gson gson = new Gson();
        
        // convert java object to JSON format,
        // and returned as JSON formatted string
        String json = gson.toJson(profile);
        log.info("Profile JSON: {}", json);
        
        //write string to the output stream and we´re finished  
        response.getPortletOutputStream().write(json.getBytes());
     }

    
    /**
     *
     * Does something really cool
     *
     */
    protected void include(String path, RenderRequest request, RenderResponse response)
        throws IOException, PortletException {
    
        log.info("Entered include()");
        PortletRequestDispatcher dispatcher = getPortletContext().getRequestDispatcher(path);
        if (null == dispatcher) {
            log.error("{} is not a valid include", path);
        }
        else {
            dispatcher.include(request, response);
        }
    }
}
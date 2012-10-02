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
    public void serveResource(RenderRequest request, RenderResponse response)
        throws PortletException, IOException {        
        
        log.error("Entered serveResource()");
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
<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<%--
/**
 * Copyright (c) 2000-2012 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */
--%>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://liferay.com/tld/portlet" prefix="liferay-portlet" %>

<portlet:defineObjects />

<!-- Load the 3d Party Javascript libraries -->
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="/profile-portlet/js/lib/bootstrap.js"></script>

<!-- Load the profile-portlet-poc libraries -->
<script type="text/javascript" src="/profile-portlet/js/user-profile-module.js"></script>

<liferay-portlet:resourceURL var="profileUrl" id="get-profile" />
 
 <!-- Once the document and jquery have loaded, render the page-->   
<script type="text/javascript">
  $(document).ready(function() {
    console.log("JQuery onLoad is ready...");
    
    // Initialize CLL.UserProfile
    CLL.UserProfile.init();
    CLL.UserProfile.profileURL = '<%=profileUrl%>';
    console.log("profileURL --> " + CLL.UserProfile.profileURL);
  });
</script>


This is the <b>profile-portlet-poc</b>.

<div id="click-me-div">Click Me</div>
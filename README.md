% User Profile Portlet POC
% Chris Lemler
% October 15, 2012

# Overview
This portlet demonstrates building a simple user profile editor leveraging the
Liferay Maven Plugin, jQuery and Bootstrap for the UI, and portlet resourceURL's
to handle Ajax requests for retrieving and updating a user's profile. My goal is
to learn to develop content in more of a 'Web 2.0' fashion using Ajax, versus the
common portlet View, Edit, Help rendering methods. 

# Requirements

The profile portlet will behave as follows:

* Initial screen will display a single 'Edit Profile' button. Selecting the
button will cause the profile editor modal to be displayed.
* The profile editor is a modal window which initially shows the information
in read-only mode.
    * Selecting the 'Edit' button will make the fields editable, and replace the
      'Edit' button with a 'Save' and 'Cancel 'button'.
    * If the users selects Save, perform an ajax call to a Liferay resourceURL
      to save the changes.

The portlet will leverage SLF4J for logginf messages using the new vararg interface.



User Interface
===============


Server/Portlet Design
=====================



TODO
====
* Migrate CSS and JS references to liferay-portlet.xml. This should provide better liferay optimization
if the portlet is loaded several times.
* Foo



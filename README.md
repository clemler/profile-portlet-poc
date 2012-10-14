=======================
Profile Portlet POC
=======================
:Author: Chris Lemler <christian.lemler@sungard.com>
:Date: 2012-09-29
:Description: Example jQuery/Bootstrap portlet for editing a user's profile

# Overview
This portlet demonstrates building a sample user profile editor leveraging the
Liferay Maven Plugin, a Javascript UI, and the server side developed using ajax
to retrieve static resources (files), and resourceURL's for real ajax calls.

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



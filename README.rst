=======================
User Management Portlet
=======================
:Author: Chris Lemler <christian.lemler@sungard.com>
:Date: 2012-07-31
:Description: Example jQuery/Bootstrap portlet for managing users

Overview
========
This portlet demonstrates building a sample User Management feature leveraging the Liferay Maven Plugin, a Javascript UI, and the server side developed using ajax to retrieve static resources (files), and resourceURL's for real ajax calls.

Requirements
============
Develop a Document Repository portlet as follows:
 
* Develop UI based on the attached UI and interaction specification
* Load initial set of documents from a static file on the server (e.g. csv, json, xml...). Each document will have a unique ID to identify the document (not the document name).
* The documents will be displayed in a resizable tile layout. As the browser grows larger, more tiles should be shown. When the browser is made smaller, fewer tiles should be shown.
* Each tile will show the documents Name, Author, and an optional Tag.
* When a user selects a document tile, a modal popup form is displayed. The form will let the user change the Name, Author, or Tag of the document.
    * Each document MUST have a Name and an Author.
    * The user can select Ok or Cancel to close the dialog.
    * If OK is selected, save the data to the server. This can be done by updating the resource file, or logging a message with the new values to catalina.out.
* User can rename documents, and the changes should be "persisted" to memory.
* Portlet must be resizable and leverage all browser real-estate
* Track the number of hours spent building the portlet
* Track challenges, stumbling blocks etc.

This is another paragraph

User Interface
===============


Server/Portlet Design
=====================



TODO
====
* Migrate CSS and JS references to liferay-portlet.xml. This should provide better liferay optimization
if the portlet is loaded several times.
* Foo



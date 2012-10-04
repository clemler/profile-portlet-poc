// File: UserProfile.java
// Author: Chris Lemler
//
// Provides the model for a user's profile
//
package org.lemler.profileportlet;

/**
 * Models a user's profile.
 *
 */
public class UserProfile {
    private String userID;
    private String firstName = null;
    private String lastName = null;
    private String phoneNumber = null;
    
    
    /**
     * Constructs a UserProfile object
     *
     * @param userID The id of the user (e.g. fred@smith.com).
     * @TODO Add real error checking
     */
    public UserProfile(String userID) {
        this(userID, null, null, null);
    }
    
    /**
     * Constructs a UserProfile object
     *
     * @param userID The id of the user (e.g. fred@smith.com).
     * @param firstName The user's first name
     * @param lastName The user's last name
     * @param phoneNumber The user's phone number (e.g. "111-222-1234")
     * @TODO Add real error checking
     */
    public UserProfile(String userID,
                       String firstName,
                       String lastName,
                       String phoneNumber) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
    
    /**
     * Return the userID
     */
    public String getUserID() {
        return userID;
    }
    
     /**
     * Set the user's firstname
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    /**
     * Return the user's firstname
     */
    public String getFirstName() {
        return firstName;
    }
    
    /**
     * Set the user's lastname
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    /**
     * Return the user's lastname
     */
    public String getLastName() {
        return lastName;
    }
    
    /**
     * Set the user's phone number
     */
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    /**
     * Return the user's phone number
     */
    public String getPhoneNumber() {
        return phoneNumber;
    }
}
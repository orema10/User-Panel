import React, { useState } from "react";
import UserProfile from "../UserProfile";
import ContactInformation from "../ContactInfo";
import AlertPopup from '../AlertPopup';
import UserService from "../../Services/User.Service";

const UserPanel = () => {
  const [user, setUser] = useState(UserService.getNewUser());
  const [showErrors, setShowError] = useState({name: false, contact: []});
  const [userIsSaved, setUserSaved] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // Reset Errors
    showErrors.name = false;
    showErrors.contact = [];
    // Check if have Validation Errors
    const isError = UserService.validateUser(user, showErrors, setShowError);
    // If All Right Open Popup "Save Successfully"
    if(!isError) {
      openAlertPopup();
    }
  };

  const openAlertPopup = () => {
    // Set True to userIsSaved (A condition for displaying the popup)
    setUserSaved(true);
  }

  const saveUser = () => {
    // Go to Service and Save user changes
    UserService.saveUser(user, setUser);
  }

  const addContact = () => {
    // Go to Service and Add One More Contact Details Panel
    UserService.addContact(user, setUser);
  }

  const removeContact = id => {
    // Go to Service and Remove The Current Contact Details Panel
    UserService.removeContact(id, user, setUser);
  }

  const closeAlert = () => {
    // Set False To userIsSaved (A condition for displaying the popup)
    setUserSaved(false);
  }

  return (
    <div>
      <form className="user-panel" onSubmit={handleSubmit}>
        <UserProfile user={user} nameError={showErrors.name} saveUser={saveUser} />
        <ContactInformation user={user} contactErrors={showErrors.contact} saveUser={saveUser} removeContact={removeContact} />
        <div className="btns-container">
          <button type="button" className="btn blue" onClick={addContact}>Add Contact</button>
          <input type="submit" className="btn green" value="Save Profile" />
        </div>
      </form>
      {userIsSaved? <AlertPopup closeAlert={closeAlert} />: null}
    </div>
  );
};

export default UserPanel;

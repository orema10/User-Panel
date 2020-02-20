const contactItem = { id: 0, label: "", type: "email", email_phone: "" }
const defaultUser = { name: "", organization: "", contact: [contactItem] }

const validateUser = (user, showErrors, setShowError) => {
    let isError = false;
    // Check if User Name is not empty
    if(!user.name) {
        showErrors.name = true
        isError = true;
    }

    // Run on the Array and Check if have some Validation Error Or Required Errors
    user.contact.forEach(item => {
        const contactError = {id: item.id, label: false, email_phone: false, validation: false}
        if(!item.label) {
            contactError.label = true;
            isError = true;
        }
        if(!item.email_phone) {
            contactError.email_phone = true;
            isError = true;
        } else {
            switch(item.type) {
                case 'email':
                    if(!validateEmail(item.email_phone)) {
                        contactError.validation = true;
                        isError = true;
                    }
                    break;
                case 'tel':
                    if(!validatePhone(item.email_phone)) {
                        contactError.validation = true;
                        isError = true;
                    }
                    break;
            }
        }
        showErrors.contact.push(contactError);
    });
    // Deep Copy To showErrors Object for Return New Data
    const newShowErrors = JSON.parse(JSON.stringify(showErrors));
    setShowError(newShowErrors);
    // Return if have Errors Or All is Right
    return isError;
}

const getNewUser = () => JSON.parse(JSON.stringify(defaultUser));

const saveUser = (user, setUser) => {
    // Deep Copy To User for return new Data to State
    const newUser = JSON.parse(JSON.stringify(user));
    setUser(newUser);
}

const addContact = (user, setUser) => {
    // Deep Copy To Contact Item
    const newContact = JSON.parse(JSON.stringify(contactItem))
    // Generate New ID
    newContact.id = getNewID(user);
    // Return new Array With old items and newContact
    user.contact = [...user.contact, newContact];
    saveUser(user, setUser);
}

const removeContact = (id, user, setUser) => {
    // Return New Array Without The Contact Details with then Current ID
    user.contact = user.contact.filter(item => item.id !== id)
    saveUser(user, setUser);
}

const getNewID = user => {
    // Generate New ID for Contact Details
    const contact = user.contact;
    const contactLength = contact.length;
    return (contactLength > 0)? (contact[contactLength - 1].id + 1): 0;
}

const validateEmail = email => {
    // Check Email Validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePhone = phone => {
    // Check Phone Validation
    const re = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
    return re.test(phone)
}

export default {validateUser, saveUser, addContact, removeContact, getNewID, getNewUser}
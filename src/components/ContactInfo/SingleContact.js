import React, {useRef} from 'react'

const SingleContact = props => {
    const {contact, saveUser, removeContact, errors} = props
    // For the First Running - if don't have Errors Object => Set Error Object without errors
    const contactError = errors.length? errors: [{label: false, email_phone: false, validation: false}];
    const typeRef = useRef();
    const emailPhoneRef = useRef();
    const contactRef = useRef();

    const changeType = () => {
        // Save The Type of Contact Option
        contact.type = typeRef.current.value;
        saveUser();
    }

    const changeContact = () => {
        // Save The Label of Contact
        contact.label = contactRef.current.value;
        saveUser();
    }

    const changeEmailPhone = () => {
        // Save The Email/Phone of Contact
        contact.email_phone = emailPhoneRef.current.value;
        saveUser();
    }

    const removeContactItem = () => {
        // Call To Action removeContact with The Current ID
        const id = contact.id
        removeContact(id)
    }
    // Check if email_phone is not empty string and if have validation error
    const validationError = !contactError[0].email_phone && contactError[0].validation
    return (
        <div className="contact-item" id={contact.id}>
            <div className="field-container">
                <label htmlFor="type">Type of Contact</label>
                <select value={contact.type} name="type" onChange={changeType} ref={typeRef}>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                </select>
            </div>
            <div className="field-container">
                <label htmlFor="contact">Contact Label</label>
                <input type="text" name="contact" id="contact" onChange={changeContact} ref={contactRef} />
                {contactError[0].label? <span className="required">Contact Label Is Required</span>: null}
            </div>
            <div className="field-container">
                <label htmlFor="email_phone">Email/Phone No.</label>
                <input type="text" name="email_phone" id="email_phone" onChange={changeEmailPhone} ref={emailPhoneRef} />
                {contactError[0].email_phone? <span className="required">Email/Phone No. Is Required</span>: null}
                {validationError && contact.type === 'email' ? <span className="required">Email Is No Valid</span>: null}
                {validationError && contact.type === 'tel' ? <span className="required">Phone Is No Valid</span>: null}
            </div>
            <button className="btn red remove" onClick={removeContactItem}>Remove</button>
        </div>
    )
}

export default SingleContact
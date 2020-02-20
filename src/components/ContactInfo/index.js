import React from 'react'
import SingleContact from './SingleContact'
const ContactInformation = props => {
    const {user, saveUser, removeContact, contactErrors} = props

    return (
        <div className="contact-info">
            <div className="panel-title">Contact Information</div>
            <div className="contact-items">
                {/* Doing Map to Contact Array For Display All Contact Details Panel */}
                {user.contact.map((contact, idx) => 
                    <SingleContact 
                        key={idx} 
                        contact={contact} 
                        removeContact={removeContact} 
                        saveUser={saveUser}
                        errors={contactErrors.filter(item => contact.id === item.id)}
                    />
                )}
            </div>
        </div>
    )
}

export default ContactInformation
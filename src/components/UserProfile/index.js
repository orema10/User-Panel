import React, {useRef} from 'react'

const UserProfile = props => {
    const {user, saveUser, nameError} = props
    const userName = useRef();

    const setUserName = () => {
        // Set name on user when have changes
        user.name = userName.current.value;
        saveUser();
    }
    
    return (
        <div className="user-profile">
            <div className="panel-title">User profile</div>
            <div className="panel-items">
                <div className="field-container">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" defaultValue={user.name} id="name" onChange={setUserName} ref={userName} />
                    {nameError? <span className="required">Name Is Required</span>: null}
                </div>
                <div className="field-container">
                    <label htmlFor="organization">Organization</label>
                    <input type="text" name="organization" id="organization" />
                </div>
            </div>
        </div>
    )
}

export default UserProfile
import React from 'react';

const AlertPopup = props => {
    const {closeAlert} = props
    return (
        <div className="alert-popup">
            <div className="inner-popup">
                <button className="close" onClick={() => { closeAlert() }}>X</button>
                <p>User saved successfully</p>
            </div>
        </div>
    )
}

export default AlertPopup
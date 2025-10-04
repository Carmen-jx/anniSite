import React from "react";

export default function LetterModal({children, onClose}) {
    return (
        <>
        <div className="letter-modal">
            <div className= "modal-overlay">
                <div className="modal-scroll">
                    {children}
                </div>
                <button className="modal-button" onClick={onClose}>X</button>
            </div>
            
        </div>
        </>
    )
}
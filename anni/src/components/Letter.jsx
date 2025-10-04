import React from "react";

const Letter = ({ letter=null}) => {

    return (
        <div className="letter-read">
            <h2>{letter.title}</h2>
            <div className="letter-content">{letter.content}</div>
        </div>
    )

}

export default Letter;
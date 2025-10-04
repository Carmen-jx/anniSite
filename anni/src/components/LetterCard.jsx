import React from "react";

const LetterCard = ({ letter, onDelete, isDelete=false }) => {
  return (
    <div className="letter-card">
      {isDelete && 
      <button 
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.(letter.id);
        }}
      >
        X
      </button>}
      <h3 className="letter-card-title">{letter.title}</h3>
      <small className="letter-card-meta">
        {new Date(letter.created_at ?? Date.now()).toLocaleString()}
      </small>
    </div>
  );
};

export default LetterCard;

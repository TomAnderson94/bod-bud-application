import React from 'react';
import './Card.css';

function Card({ exerciseType, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h2>{exerciseType.ExerciseTypeName}</h2>
      <img src={exerciseType.ExerciseTypeURL} alt={exerciseType.ExerciseTypeName} />
    </div>
  );
}

export default Card;

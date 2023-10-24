import React from 'react';
import './Card.css';

function Card({ exerciseType }) {
  return (
    <div className="card">
      <h2>{exerciseType.ExerciseTypeName}</h2>
      <img src={exerciseType.ExerciseTypeURL} alt={exerciseType.ExerciseTypeName} />
    </div>
  );
}

export default Card;

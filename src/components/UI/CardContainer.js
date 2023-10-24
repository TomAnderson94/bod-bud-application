import React from 'react';
import Card from './Card';

function CardContainer({ exerciseTypes }) {
  return (
    <div className="card-container">
      {exerciseTypes.map((exerciseType) => (
        <Card key={exerciseType.exerciseTypeID} exerciseType={exerciseType} />
      ))}
    </div>
  );
}

export default CardContainer;

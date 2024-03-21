import React from 'react';
import './Card.css';

function Card({ title, imageURL, onClick }) {
  return (
    <div className='card' onClick={onClick}>
      <h2>{title}</h2>
      <img src={imageURL} alt={title} />
    </div>
  );
}

export default Card;

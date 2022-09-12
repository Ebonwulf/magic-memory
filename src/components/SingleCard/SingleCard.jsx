import React from 'react';
import './SingleCard.scss';

const SingleCard = ({ card, handleChoice }) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className='card'>
      <div>
        <img className='card__front' src={card} alt='card front' />
        <img
          className='card__back'
          src='/images/cover.png'
          onClick={handleClick}
          alt='card back'
        />
      </div>
    </div>
  );
};

export default SingleCard;

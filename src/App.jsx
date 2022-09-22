import { useEffect, useState } from 'react';
import './App.scss';
import SingleCard from './components/SingleCard/SingleCard';

const cardImages = [
  { src: '/images/039_Lizagon_D.png', matched: false },
  { src: '/images/036_Merenmoid_B.png', matched: false },
  { src: '/images/035_IronGiant_C.png', matched: false },
  { src: '/images/33_Jellyfish_D.png', matched: false },
  { src: '/images/030_MythrilDragon_F.png', matched: false },
  { src: '/images/029_Axebeak_B.png', matched: false },
  { src: '/images/028_Fairy_E.png', matched: false },
  { src: '/images/026_Snake_C.png', matched: false },
  { src: '/images/024_Scorpion_A.png', matched: false },
  { src: '/images/019_Mimic_3_B.png', matched: false },
  { src: '/images/019_Mimic_2_B.png', matched: false },
  { src: '/images/020_Beetlescratch_C.png', matched: false },
  { src: '/images/016_FlyingSkull_C.png', matched: false },
  { src: '/images/013_Spirit_A.png', matched: false },
  { src: '/images/012_Specter_G.png', matched: false },
  { src: '/images/007_Witch_A.png', matched: false },
  { src: '/images/005_Mushroom_2_B.png', matched: false },
  { src: '/images/004_Flower_C.png', matched: false },
  { src: '/images/03_Rat_D.png', matched: false },
  { src: '/images/02_SmallSlime_C.png', matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start game automatically instead of player needing to click new game to start it for the first time
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className='App'>
      <h1>Magic Memory</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default App;

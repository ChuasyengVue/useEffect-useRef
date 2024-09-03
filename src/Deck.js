import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';

const BASE_URL = "https://deckofcardsapi.com/api/deck/";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [draw, setDraw] = useState([]);
  const [shuffleDeck, setShuffleDeck] = useState(false);

  useEffect(function fetchDeck() {
    async function fetchDeckData () {
      // get a new shuffle deck
      const res = await axios.get(`${BASE_URL}/new/shuffle/`);
    // setDeck to be new shuffle deck
    setDeck(res.data);
    }
    fetchDeckData();
  },[]);

async function DrawCard() {
  try {
    // get a card from the same deck
    const res = await axios.get(`${BASE_URL}/${deck.deck_id}/draw`);

    if(res.data.remaining === 0) throw new Error("Empty Deck!!");

    const card = res.data.cards[0];

    setDraw(res => [
      ...res,{
        id:card.code,
        image:card.image,
        name:card.value + " " + card.suit
      },
    ]);
  } 
  catch (error) {
    alert(error);
  }
}

function getCardBtn() {
  if(!deck) return null;

  return(
    <button
    className='Deck-gimme'
    onClick={DrawCard}>
      GIMME A CARD!!
    </button>
  );
}

async function shuffleCards() {
  setShuffleDeck(true);
try {
  await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`);
  setDraw([]);
} 
catch (error) {
  alert(error)
}
}

function shuffleBtn() {
  if(!deck) return null;

  return(
    <button
    className='Deck-gimme'
    onClick={shuffleCards}>
      Shuffle Deck!
    </button>
  )
}

return(
  <main className='Deck'>
    {getCardBtn()}
    {shuffleBtn()}
    <div className='Deck-cardarea'>
      {
        draw.map(c => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))
      }

    </div>
  </main>
);

}

export default Deck;
import React, {useState} from 'react';
import './Card.css';

function Card({name, image}) {
   const [{x, y, angle}] = useState({
    x: Math.random() * 45 - 20,
    y: Math.random() * 45 - 20,
    angle: Math.random() * 90 - 45
   });

  //  Change position and rotate the card element
   const transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

   return(
    <img 
    className='Card'
    alt={name}
    src={image}
    style={{transform}}/>
   );
}

export default Card;
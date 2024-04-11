import React,{ useContext } from 'react';
import "./JuegoMincard.css";
import corazonSrc from './../../assets/img/juegos/corazon.svg';
import estrellaSrc from './../../assets/img/juegos/estrella.svg';  

const JuegoMincard = (props) => {
  const juegoSrc = props.juegoSrc;

  return (
      <div id='juegoMincard' className='row'>
        <div className="col-12 portadaJuego text-center">
          <img src={juegoSrc} alt="juego1" />
        </div>
        <div className="col-7 likes text-end">
          <img src={corazonSrc} alt="corazón" />
          <p>40 Likes</p>
        </div>
        <div className="col-5 valoracion">
          <img src={estrellaSrc} alt="estrella" />
          <p>5,0</p>
        </div>
      </div>
  );
};
export default JuegoMincard;

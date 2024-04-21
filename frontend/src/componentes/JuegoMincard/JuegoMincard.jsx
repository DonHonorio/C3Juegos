import React,{ useState, useEffect } from 'react';
import "./JuegoMincard.css";
import corazonSrc from './../../assets/img/juegos/corazon.svg';
import estrellaSrc from './../../assets/img/juegos/estrella.svg';  

const JuegoMincard = (props) => {
  const {juegoSrc, likes, avgRatings} = props;

  function normalizar(valorBruto) {
    valorBruto = Number(valorBruto).toFixed(1);
    return (valorBruto.toString().length === 1 && valorBruto.toString() != 0) ? valorBruto.toString().concat(',0') 
                                                                        : valorBruto.toString().replace('.', ',');
  }

  return (
      <div id='juegoMincard' className='row'>
        <div className="col-12 portadaJuego text-center">
          <img src={juegoSrc} alt="juego1" />
        </div>
        <div className="col-7 likes text-end">
          <img src={corazonSrc} alt="corazón" />
          <p>{(likes) ? likes.length : 0} Likes</p>
        </div>
        <div className="col-5 valoracion">
          <img src={estrellaSrc} alt="estrella" />
          <p>{(avgRatings) ? normalizar(avgRatings)
                           : 0}
          </p>
        </div>
      </div>
  );
};
export default JuegoMincard;

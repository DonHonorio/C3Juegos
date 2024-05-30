import React, { useContext, useState, useEffect } from 'react';
import { HeartFilled } from '@ant-design/icons';
import "./JuegoMincard.css";

import StoreContext from '../../contextos/StoreContext';
import { sendRequest, normalizarValoracionJuego } from '../../servicios/functions';

import estrellaSrc from './../../assets/img/juegos/estrella.svg';  

const JuegoMincard = (props) => {
  const { setAcutalizarFavoritos, cantidadLikes, setCantidadLikes, likes, setLikes  } = useContext(StoreContext);
  const {id, juegoSrc, avgRatings, nombreJuego} = props;

  const handleLike = async() => {
    setLikes({...likes, [id]: !likes[id]});
    if(likes[id]){
      // Eliminar like en la BBDD
      setCantidadLikes({...cantidadLikes, [id]: cantidadLikes[id] - 1});
      await sendRequest('DELETE', null, `/api/like/${id}`, '', false, true);
      
    } else {
      // Añadir like en la BBDD
      setCantidadLikes({...cantidadLikes, [id]: cantidadLikes[id] + 1});
      await sendRequest('POST', null, `/api/like/${id}`, '', false, true);
    }
    setAcutalizarFavoritos(e => e + 1);
  }

  return (
      <div id='juegoMincard' className='row'>
        <div className="col-12 portadaJuego text-center">
          <img src={juegoSrc} alt="portadaJuego" />
        </div>
        <div className="col-12 nombreJuego text-center">
          <h4>{nombreJuego}</h4>
        </div>
        <div className="col-7 likes text-end">
          <button onClick={handleLike} style={{ color: 'transparent', background: 'transparent', border: 'none' }}>
            <HeartFilled style={likes ? likes[id] ? { color: '#f00' } 
                                                  : { color: '#fff'}
                                      : { color: '#fff'}  
            }/>
          </button>
          <p>{(cantidadLikes) ? cantidadLikes[id] : 0} Likes</p>
        </div>
        <div className="col-5 valoracion">
          <img src={estrellaSrc} alt="estrella" />
          <p>{(avgRatings) ? normalizarValoracionJuego(avgRatings)
                           : 0}
          </p>
        </div>
      </div>
  );
};
export default JuegoMincard;

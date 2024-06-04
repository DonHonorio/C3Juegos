import React, {useContext, useState} from 'react'
import { HeartFilled } from '@ant-design/icons';
const API_URL = import.meta.env.VITE_API_BASE_URL;
import './DetallesJuego.css';

import IdiomaContext from '../../contextos/IdiomaContext';
import useGame from '../../hooks/useGame';
import useCantidadLikesGame from '../../hooks/useCantidadLikesGame';
import useAvgRatings from '../../hooks/useAvgRatings';
import useCreador from '../../hooks/useCreador';
import useRatingsGame from '../../hooks/useRatingsGame';
import useCheckLike from '../../hooks/useCheckLike';

import AjaxLoader from '../AjaxLoader/AjaxLoader';
import sendRequest, { normalizarValoracionJuego } from '../../servicios/functions';

import juegoRankingSrc1 from './../../assets/img/juegos/ranking/FotoJuegoRanking1.svg';
import estrellaSrc from './../../assets/img/juegos/estrella.svg';  
import Boton from '../Boton/Boton';
import Link from 'antd/es/typography/Link';

const DetallesJuego = (props) => {
  // inicializo los hooks y variables
  const idioma = useContext(IdiomaContext);

  // estado para el like que además es un custom hook que comprueba si el usuario ha dado like al juego en la BBDD
  const {like, setLike} = useCheckLike(props.idJuego);
  
  // juego actual
  const game = useGame(props.idJuego);
  const {cantidadLikes, setCantidadLikes} = useCantidadLikesGame(props.idJuego);
  // AvgRatings es la media valoraciones de todos los juegos, necesitamos la de este juego
  const avgRatings = useAvgRatings();
  const creador = useCreador(props.idJuego);
  const ratingsGame = useRatingsGame(props.idJuego);

  const handleLike = async() => {
    setLike(!like)
    if(like){
      // Eliminar like en la BBDD
      setCantidadLikes(cantidadLikes - 1);
      await sendRequest('DELETE', null, `/api/like/${props.idJuego}`, '', false, true);

    } else {
      // Añadir like en la BBDD
      setCantidadLikes(cantidadLikes + 1);
      await sendRequest('POST', null, `/api/like/${props.idJuego}`, '', false, true);
    }
  }

  return (
    <article className='row' id='detallesJuego'>
      {(!game) ? <AjaxLoader />
        :  
        <section className='col-lg-10 offset-lg-1 contenedor'>
          <div className="row">
            <div className="cabeceraGame col-12 bg-primary">
              <h1>{game.nombreJuego}</h1>
            </div>

            <div className="cuerpoGame col-12">
              <div className="row">
                <div className="col-12 col-md-6 carcasaJuego bg-secondary">
                  <div className='row'>
                    <div className="col-12 portada">
                      <img src={juegoRankingSrc1} alt="portadaJuego" />
                    </div>
                    <div className="col-12 botonJugar">
                    <a href={`${API_URL}/api/jugar/${game.user_id}/${game.nombreJuego}`} target='_blank'>
                      <Boton
                        clase="jugar"
                        value={idioma.juego.showJuego.jugar}
                      />
                    </a>
                    </div>
                    <div className="col-7 likes text-end">
                      <button onClick={handleLike} style={{ color: 'transparent', background: 'transparent', border: 'none' }}>
                        <HeartFilled style={(like) ? { color: '#f00' } : { color: '#fff'}} />
                      </button>
                      <p>{(cantidadLikes) ? cantidadLikes : 0} Likes</p>
                    </div>
                    <div className="col-5 valoracion">
                      <img src={estrellaSrc} alt="estrella" />
                      <p>{(avgRatings && avgRatings[game.id]) ? normalizarValoracionJuego(avgRatings[game.id])
                                      : 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 infoJuego bg-danger">
                  <div className="row">

                    <div className="col-12">
                      <p>{idioma.juego.showJuego.creadoPor} {(creador) ? creador.nickname : 'Cargando...'}</p>
                    </div>
                    <div className="col-12">
                      <p>{(ratingsGame) ? ratingsGame.length : ''} {idioma.juego.showJuego.valoraciones} | {(props.comentarios) ? props.comentarios.length : 0} {(props.comentarios && props.comentarios.length === 1) ? idioma.juego.showJuego.opinion : idioma.juego.showJuego.opiniones}</p>
                    </div>
                    <div className="col-12">
                      <p>{idioma.juego.showJuego.publicado} 23/02/2024</p>
                    </div>
                    <div className="col-12">
                      <h2>{idioma.juego.showJuego.historia}</h2>
                      <p>
                        {game.historia}
                      </p>
                    </div>
                    <div className="col-12">
                      <h2>{idioma.juego.showJuego.controles}</h2>
                      <p>
                        {game.controles}
                      </p>                    
                    </div>

                  </div>
                </div>
              </div>
            </div>



          </div>
        </section>
      }


    </article>
  )
}

export default DetallesJuego
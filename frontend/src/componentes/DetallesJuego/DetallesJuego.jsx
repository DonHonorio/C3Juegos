import React, {useContext} from 'react'
import './DetallesJuego.css';

import IdiomaContext from '../../contextos/IdiomaContext';
import useGame from '../../hooks/useGame';
import useCantidadLikesGame from '../../hooks/useCantidadLikesGame';
import useAvgRatings from '../../hooks/useAvgRatings';

import AjaxLoader from '../AjaxLoader/AjaxLoader';

import juegoRankingSrc1 from './../../assets/img/juegos/ranking/FotoJuegoRanking1.svg';
import corazonSrc from '../../assets/img/juegos/corazon.svg';
import estrellaSrc from './../../assets/img/juegos/estrella.svg';  
import Boton from '../Boton/Boton';

const DetallesJuego = () => {
  // inicializo los hooks y variables
  const idioma = useContext(IdiomaContext);
  
  const game = useGame(1);
  const cantidadLikes = useCantidadLikesGame(1);
  // AvgRatings es la media valoraciones de todos los juegos, necesitamos la de este juego
  const avgRatings = useAvgRatings();

  return (
    <article className='row' id='detallesJuego'>
      {(!game) ? <AjaxLoader />
        :  
        <section className='col-lg-10 offset-lg-1 contenedor'>
          <div className="row">
            <div className="cabeceraGame col-12 bg-primary">
              {/* <h1>Baldur's Gate 3</h1> */}
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
                      <Boton
                        clase="jugar"
                        value={idioma.juego.showJuego.jugar}
                      />
                    </div>
                    <div className="col-7 likes text-end">
                      <img src={corazonSrc} alt="corazón" />
                      <p>{(cantidadLikes) ? cantidadLikes : 0} Likes</p>
                    </div>
                    <div className="col-5 valoracion">
                      <img src={estrellaSrc} alt="estrella" />
                      {/* <p>{(avgRatings) ? normalizar(avgRatings)
                                      : 0}
                      </p> */}
                      <p>4,8</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 infoJuego bg-danger">
                  <div className="row">

                    <div className="col-12">
                      <p>Creador por: Honori55</p>
                    </div>
                    <div className="col-12">
                      <p>125 Valoraciones | 230 Opiniones</p>
                    </div>
                    <div className="col-12">
                      <p>Publicado el 23/02/2024</p>
                    </div>
                    <div className="col-12">
                      <h2>HISTORIA</h2>
                      <p>
                      En un reino medieval asolado por la oscuridad, el protagonista, un exiliado con un pasado misterioso, emprende un viaje épico para desentrañar antiguas profecías. Enfrenta desafíos, forja alianzas y descubre su destino mientras lucha contra las fuerzas del mal para restaurar la luz al reino.
                      </p>
                    </div>
                    <div className="col-12">
                      <h2>CONTROLES</h2>
                      <p>
                      En este juego de rol (RPG) de teclado, los controles te permiten explorar el mundo con las teclas de flecha, interactuar con objetos con la tecla "E" y gestionar tu inventario con "I". Utiliza habilidades con atajos numéricos y navega por el menú con las teclas correspondientes. ¡Sumérgete en la aventura con comandos intuitivos!
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
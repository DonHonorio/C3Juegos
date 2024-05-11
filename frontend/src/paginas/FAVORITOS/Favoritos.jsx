import React,{ useContext } from 'react';

import './Favoritos.css';

import IdiomaContext from '../../contextos/IdiomaContext';
import useLikesGames from '../../hooks/useLikesGames';
import useAvgRatings from '../../hooks/useAvgRatings';
import useJuegosFavoritos from '../../hooks/useJuegosFavoritos';

import AjaxLoader from '../../componentes/AjaxLoader/AjaxLoader';
import Generos from '../../componentes/Generos/Generos';
import JuegoMincard from '../../componentes/JuegoMincard/JuegoMincard';
import juegoSrc1 from './../../assets/img/juegos/FotoJuego1.svg';
import juegoSrc2 from './../../assets/img/juegos/FotoJuego2.svg';
import juegoSrc3 from './../../assets/img/juegos/FotoJuego3.svg';
import juegoSrc4 from './../../assets/img/juegos/FotoJuego4.svg';
import juegoSrc5 from './../../assets/img/juegos/FotoJuego5.svg';
import juegoSrc6 from './../../assets/img/juegos/FotoJuego6.svg';
import juegoSrc7 from './../../assets/img/juegos/FotoJuego7.svg';
import juegoSrc8 from './../../assets/img/juegos/FotoJuego8.svg';


const Favoritos = () => {
    // inicializo los hooks
    const idioma = useContext(IdiomaContext);

    const likesGamesState = useLikesGames();
    const avgRatingsState = useAvgRatings();
    const juegosFavoritosState = useJuegosFavoritos('todos');

    // inicializo las variables
    const likesGames = (likesGamesState.listaLikesGames) ? likesGamesState.listaLikesGames : [];
    const avgRatings = (avgRatingsState.listaAvgRatings) ? avgRatingsState.listaAvgRatings : [];

    return (
      <div id="favoritos">
        <section className="listaJuegos col-12">
            <div className="row">
                <div className="col-12 favoritosTitulo">
                    <h2>{idioma.favoritos.titulo}</h2>
                </div>
            </div>

            <div className="row filtros">
                <div className="col-12 titulo text-center">
                    <h3>{idioma.landingPage.listaJuegos.generos}</h3>
                </div>
                <Generos />
            </div>

            
            <div className="row lista">
                {(juegosFavoritosState.buscando) ? 
                                              <AjaxLoader /> 
                                              :
                                              juegosFavoritosState.listaJuegosFavoritos.map((game) => {
                                                  const arrayImagenes = [juegoSrc1, juegoSrc2, juegoSrc3, juegoSrc4, juegoSrc5, juegoSrc6, juegoSrc7, juegoSrc8];

                                              return <div className="col-12 col-sm-6 col-lg-3" key={game.id}>
                                                          <JuegoMincard 
                                                              juegoSrc={arrayImagenes[Math.floor(Math.random() * arrayImagenes.length)]} 
                                                              likes={(!likesGamesState.buscando) ? likesGames[game.id] : ''} 
                                                              avgRatings={(!avgRatingsState.buscando) ? avgRatings[game.id] : ''} 
                                                              nombreJuego={game.nombreJuego} />
                                                      </div>
                                              })                                                
                }
            </div>
        </section>
      </div>
    );
};
export default Favoritos;

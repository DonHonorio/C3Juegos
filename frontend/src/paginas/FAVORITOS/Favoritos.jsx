import React,{ useContext } from 'react';

import './Favoritos.css';

import IdiomaContext from '../../contextos/IdiomaContext';
import useLikesGames from '../../hooks/useLikesGames';
import useAvgRatings from '../../hooks/useAvgRatings';
import useJuegosFavoritos from '../../hooks/useJuegosFavoritos';
import LikesContext from '../../contextos/LikesContext';

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
    // inicializo los hooks y variables
    const idioma = useContext(IdiomaContext);
    const { actualizarFavoritos } = useContext(LikesContext);

    const likesGames = useLikesGames();
    const avgRatings = useAvgRatings();
    const juegosFavoritos = useJuegosFavoritos('todos', actualizarFavoritos);

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
                {(!juegosFavoritos) ? 
                                            <AjaxLoader /> 
                                            :
                                            (juegosFavoritos.length > 0) ?
                                                juegosFavoritos.map((game, index) => {
                                                    const arrayImagenes = [juegoSrc1, juegoSrc2, juegoSrc3, juegoSrc4, juegoSrc5, juegoSrc6, juegoSrc7, juegoSrc8];

                                                return <div className="col-12 col-sm-6 col-lg-3" key={game.id}>
                                                            <JuegoMincard 
                                                                    id={game.id}
                                                                    juegoSrc={arrayImagenes[index % arrayImagenes.length]} 
                                                                    avgRatings={(avgRatings) ? avgRatings[game.id] : ''} 
                                                                    nombreJuego={game.nombreJuego} />
                                                        </div>
                                                })                                                
                                                :
                                                <div className="col-12 text-center sinFavoritos">
                                                    <h1>{idioma.landingPage.favoritos.sinFavoritos}</h1>
                                                </div>
                }
            </div>
        </section>
      </div>
    );
};
export default Favoritos;

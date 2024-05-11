import React,{ useContext } from 'react';
import { Link} from "react-router-dom";

import "./Home.css";

import useHome from '../../hooks/useHome';
import useLikesGames from '../../hooks/useLikesGames';
import useAvgRatings from '../../hooks/useAvgRatings';
import storage from '../../Storage/storage';
import useJuegosFavoritos from '../../hooks/useJuegosFavoritos';

import IdiomaContext from '../../contextos/IdiomaContext';
import Boton from '../../componentes/Boton/Boton';
import JuegoMincard from '../../componentes/JuegoMincard/JuegoMincard';
import AjaxLoader from '../../componentes/AjaxLoader/AjaxLoader';
import Puesto from '../../componentes/Puesto/Puesto';
import Totales from '../../componentes/Totales/Totales';
import Generos from '../../componentes/Generos/Generos';
import juegoSrc1 from './../../assets/img/juegos/FotoJuego1.svg';
import juegoSrc2 from './../../assets/img/juegos/FotoJuego2.svg';
import juegoSrc3 from './../../assets/img/juegos/FotoJuego3.svg';
import juegoSrc4 from './../../assets/img/juegos/FotoJuego4.svg';
import juegoSrc5 from './../../assets/img/juegos/FotoJuego5.svg';
import juegoSrc6 from './../../assets/img/juegos/FotoJuego6.svg';
import juegoSrc7 from './../../assets/img/juegos/FotoJuego7.svg';
import juegoSrc8 from './../../assets/img/juegos/FotoJuego8.svg';
import juegoRankingSrc1 from './../../assets/img/juegos/ranking/FotoJuegoRanking1.svg';
import juegoRankingSrc2 from './../../assets/img/juegos/ranking/FotoJuegoRanking2.svg';
import juegoRankingSrc3 from './../../assets/img/juegos/ranking/FotoJuegoRanking3.svg';
import juegoRankingSrc4 from './../../assets/img/juegos/ranking/FotoJuegoRanking4.svg';
import juegoRankingSrc5 from './../../assets/img/juegos/ranking/FotoJuegoRanking5.svg';

const Home = () => {
    // inicializo los hooks
    const idioma = useContext(IdiomaContext);
    const home = useHome();
    const likesGamesState = useLikesGames();
    const avgRatings = useAvgRatings();
    const juegosFavoritosState = useJuegosFavoritos('home');

    // inicializo las variables
    const { users, games, comments, ranking } = (home.listaHome) ? home.listaHome : {users: [], games: [], comments: []};
    const likesGames = (likesGamesState.listaLikesGames) ? likesGamesState.listaLikesGames : [];

    const authUser = (storage.get('authUser')) ? storage.get('authUser') : '';
    
    return (
        <main className="row" id="home">
            <section className="cabecera col-12">
                <div className="texto">
                    <h1>C3Juegos</h1>
                    <p>{idioma.landingPage.cabecera.subtitulo}</p>
                </div>
            </section>

            {(authUser) ?
                <section className="favoritos col-12">
                    <div className="row">
                        <div className="col-12 titular">
                            <h2>{idioma.landingPage.favoritos.titulo}</h2>
                            <Link to={`/favoritos/${authUser.id}`}>
                                <Boton 
                                    clase={'botonTodos'}  
                                    value={idioma.landingPage.favoritos.todos} 
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="juegos row">
                        {/* Aquí muestro los juegos que llegan del endpoint juegos favoritos, en el componente JuegoMincard */}
                        {(juegosFavoritosState.buscando) ? 
                                            <AjaxLoader /> 
                                            :
                                            juegosFavoritosState.listaJuegosFavoritos.map((game) => {
                                                const arrayImagenes = [juegoSrc1, juegoSrc2, juegoSrc3, juegoSrc4, juegoSrc5, juegoSrc6, juegoSrc7, juegoSrc8];

                                            return <div className="col-12 col-sm-6 col-lg-3" key={game.id}>
                                                        <JuegoMincard 
                                                            juegoSrc={arrayImagenes[Math.floor(Math.random() * arrayImagenes.length)]} 
                                                            likes={(!likesGamesState.buscando) ? likesGames[game.id] : ''} 
                                                            avgRatings={(avgRatings) ? avgRatings[game.id] : ''} 
                                                            nombreJuego={game.nombreJuego} />
                                                    </div>
                                            })
                        }  
                    </div>
                </section>
                                    : ''}

            <section className="ranking col-12">
                <div className="row">
                    <div className="col-12 titular text-center d-flex flex-column align-items-center">
                        <h2>{idioma.landingPage.ranking.titulo}</h2>
                        <p>{idioma.landingPage.ranking.subtitulo}</p>
                    </div>
                </div>
                <div className="ranking_juegos row">
                    <div className="col-12 el_puesto">
                        <div className="row">
                            <p className='col-4 col-sm-1 text-center'>{idioma.landingPage.ranking.puesto}</p>
                        </div>
                    </div>
                    
                    {(home.buscando) ? <AjaxLoader></AjaxLoader>
                                        : ranking.map((game, index) => {
                                            const arrayImagenes = [juegoRankingSrc1, juegoRankingSrc2, juegoRankingSrc3, juegoRankingSrc4, juegoRankingSrc5];

                                            return  <div className="col-12 puesto" key={game.id}>
                                                        <Puesto juegoSrc={arrayImagenes[index]} nombre={game.nombreJuego} valoracion={game.media} puesto={game.posicion}></Puesto>
                                                    </div>
                                        })                                                  
                    }
                </div>
            </section>

            
            <section className="totales col-12">
                <div className="row">
                    <div className="col-12 titular text-center d-flex flex-column align-items-center">
                        <h2>{idioma.landingPage.totales.titulo}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <Totales buscando={home.buscando} users={users} games={games} comments={comments}></Totales>
                    </div>
                </div>
            </section>

            <section className="listaJuegos col-12">
                <div className="row">
                    <div className="col-12 portada">
                        <h2>{idioma.landingPage.listaJuegos.titulo}</h2>
                    </div>
                </div>

                <div className="row filtros">
                    <div className="col-12 titulo text-center">
                        <h3>{idioma.landingPage.listaJuegos.generos}</h3>
                    </div>
                    <Generos />
                </div>

                
                <div className="row lista">
                    {(home.buscando) ? <AjaxLoader />
                                        : games.map((game) => {
                                            const arrayImagenes = [juegoSrc1, juegoSrc2, juegoSrc3, juegoSrc4, juegoSrc5, juegoSrc6, juegoSrc7, juegoSrc8];

                                            return  <div className="col-12 col-sm-6 col-lg-3" key={game.id}>
                                                        <JuegoMincard 
                                                            juegoSrc={arrayImagenes[Math.floor(Math.random() * arrayImagenes.length)]} 
                                                            likes={(!likesGamesState.buscando) ? likesGames[game.id] : ''} 
                                                            avgRatings={(avgRatings) ? avgRatings[game.id] : ''} 
                                                            nombreJuego={game.nombreJuego} />
                                                    </div>
                                        })                                                  
                    }
                </div>
            </section>
        </main>
    );
};
export default Home;

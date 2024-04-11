import React,{ useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css";
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
import useProducts from '../../hooks/useProducts';

const endpoint = 'http://localhost:8000/api';

const Home = () => {
    const idioma = useContext(IdiomaContext);
    const products = useProducts();

    // const [products, setProducts] = useState([]);

    // useEffect( ()=> {
    //     getAllProducts()
    // }, [] );

    // const getAllProducts = async () => {
    //     const response = await axios.get(`${endpoint}/products`);
    //     setProducts(response.data);
    // }

    return (
        <main className="row" id="home">
            <section className="cabecera col-12">
                <div className="texto">
                    <h1>C3Juegos</h1>
                    <p>{idioma.landingPage.cabecera.subtitulo}</p>
                </div>
            </section>

            <section className="favoritos col-12">
                <div className="row">
                    <div className="col-12 titular">
                        <h2>{idioma.landingPage.favoritos.titulo}</h2>
                        <Boton clase={'botonTodos'}  value={idioma.landingPage.favoritos.todos}></Boton>
                    </div>
                </div>
                <div className="juegos row">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc1}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc2}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc3}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc4}></JuegoMincard>
                    </div>
                </div>
            </section>

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
                    <div className="col-12 puesto">
                        <Puesto juegoSrc={juegoRankingSrc1} nombre={
                        (products.buscando) ? <AjaxLoader></AjaxLoader>
                                                  : products.listaProducts[0].description} valoracion={5} puesto={1}></Puesto>
                    </div>
                    <div className="col-12 puesto">
                        <Puesto juegoSrc={juegoRankingSrc2} nombre={'HELLDIVERS™ 2'} valoracion={4.7} puesto={2}></Puesto>
                    </div>
                    <div className="col-12 puesto">
                        <Puesto juegoSrc={juegoRankingSrc3} nombre={"Baldur's Gate 3"} valoracion={4.5} puesto={3}></Puesto>
                    </div>
                    <div className="col-12 puesto">
                        <Puesto juegoSrc={juegoRankingSrc4} nombre={'Red Dead Redemption 2'} valoracion={4.4} puesto={4}></Puesto>
                    </div>
                    <div className="col-12 puesto">
                        <Puesto juegoSrc={juegoRankingSrc5} nombre={'Batman™: Arkham Knight'} valoracion={4.4} puesto={5}></Puesto>
                    </div>
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
                        <Totales></Totales>
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
                    <Generos></Generos>
                </div>

                
                <div className="row lista">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc1}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc2}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc3}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc4}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc5}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc6}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc7}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc8}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc1}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc2}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc3}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc4}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc5}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc6}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc7}></JuegoMincard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <JuegoMincard juegoSrc={juegoSrc8}></JuegoMincard>
                    </div>
                </div>
            </section>
        </main>
    );
};
export default Home;

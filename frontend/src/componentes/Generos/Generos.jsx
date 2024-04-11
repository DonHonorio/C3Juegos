import React, {useContext} from 'react';
import "./Generos.css";
import IdiomaContext from '../../contextos/IdiomaContext';
import generoEstrategia from './../../assets/img/juegos/listaJuegos/generoEstrategia.svg';

const Puesto = () => {
  const idioma = useContext(IdiomaContext);

  return (
    <div className="col-12 generos">
        <div className="genero estrategia">
            <p>{idioma.landingPage.listaJuegos.estrategia}</p>
        </div>
        <div className="genero shootEmUp">
            <p>{idioma.landingPage.listaJuegos.shootEmUp}</p>
        </div>
        <div className="genero shooter">
            <p>{idioma.landingPage.listaJuegos.shooter}</p>
        </div>
        <div className="genero plataformas">
            <p>{idioma.landingPage.listaJuegos.plataformas}</p>
        </div>
        <div className="genero rpg">
            <p>{idioma.landingPage.listaJuegos.rpg}</p>
        </div>
        <div className="genero deportes">
            <p>{idioma.landingPage.listaJuegos.deportes}</p>
        </div>
        <div className="genero lucha">
            <p>{idioma.landingPage.listaJuegos.lucha}</p>
        </div>
    </div>
  );
};
export default Puesto;

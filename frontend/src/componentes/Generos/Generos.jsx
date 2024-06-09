import React, {useContext} from 'react';
import "./Generos.css";
import IdiomaContext from '../../contextos/IdiomaContext';
import StoreContext from '../../contextos/StoreContext';

const Puesto = () => {
  const idioma = useContext(IdiomaContext);
  const { genero, setGenero } = useContext(StoreContext);

  return (
    <div className="col-12 generos">
        <div className={"genero estrategia" + ((genero === 'ESTRATEGIA') ? ' seleccionado' : '')}
            onClick={() => setGenero('ESTRATEGIA')}>
            <p>{idioma.landingPage.listaJuegos.estrategia}</p>
        </div>
        <div className={"genero shootEmUp" + ((genero === 'SHOOT´EM UP') ? ' seleccionado' : '')}
            onClick={() => setGenero('SHOOT´EM UP')}>
            <p>{idioma.landingPage.listaJuegos.shootEmUp}</p>
        </div>
        <div className={"genero shooter" + ((genero === 'SHOOTER') ? ' seleccionado' : '')}
            onClick={() => setGenero('SHOOTER')}>
            <p>{idioma.landingPage.listaJuegos.shooter}</p>
        </div>
        <div className={"genero plataformas" + ((genero === 'PLATAFORMAS') ? ' seleccionado' : '')}
            onClick={() => setGenero('PLATAFORMAS')}>
            <p>{idioma.landingPage.listaJuegos.plataformas}</p>
        </div>
        <div className={"genero rpg" + ((genero === 'RPG') ? ' seleccionado' : '')}
            onClick={() => setGenero('RPG')}>
            <p>{idioma.landingPage.listaJuegos.rpg}</p>
        </div>
        <div className={"genero deportes" + ((genero === 'DEPORTES') ? ' seleccionado' : '')}
            onClick={() => setGenero('DEPORTES')}>
            <p>{idioma.landingPage.listaJuegos.deportes}</p>
        </div>
        <div className={"genero lucha" + ((genero === 'LUCHA') ? ' seleccionado' : '')}
            onClick={() => setGenero('LUCHA')}>
            <p>{idioma.landingPage.listaJuegos.lucha}</p>
        </div>
        <div className={"genero todos" + ((genero === 'TODOS') ? ' seleccionado' : '')}
            onClick={() => setGenero('TODOS')}>
            <p>{idioma.landingPage.listaJuegos.todos}</p>
        </div>
    </div>
  );
};
export default Puesto;

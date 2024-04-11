import React,{ useContext } from 'react';
import IdiomaContext from '../../contextos/IdiomaContext';

const Juego = () => {
    const idioma = useContext(IdiomaContext);

    return (
        <div>
          <h1>Juego</h1>
        </div>
    );
};
export default Juego;

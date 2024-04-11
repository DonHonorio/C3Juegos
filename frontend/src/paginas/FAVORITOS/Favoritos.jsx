import React,{ useContext } from 'react';
import IdiomaContext from '../../contextos/IdiomaContext';

const Favoritos = () => {
    const idioma = useContext(IdiomaContext);

    return (
        <div>
          <h1>Favoritos</h1>
        </div>
    );
};
export default Favoritos;

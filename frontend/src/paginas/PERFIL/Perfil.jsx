import React,{ useContext } from 'react';
import IdiomaContext from '../../contextos/IdiomaContext';

const Perfil = () => {
    const idioma = useContext(IdiomaContext);

    return (
        <div>
          <h1>Perfil</h1>
        </div>
    );
};
export default Perfil;

import React,{ useContext } from 'react';
import IdiomaContext from '../../contextos/IdiomaContext';

const AcercaDe = () => {
    const idioma = useContext(IdiomaContext);

    return (
        <div>
          <h1>AcercaDe</h1>
        </div>
    );
};
export default AcercaDe;

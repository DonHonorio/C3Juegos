import React,{ useContext } from 'react';
import IdiomaContext from '../../contextos/IdiomaContext';
import DetallesJuego from '../../componentes/DetallesJuego/DetallesJuego';

const Juego = () => {
    const idioma = useContext(IdiomaContext);

    return (
        <main className='row' id='showGame'>
          <DetallesJuego />
          {/* <div className="">
            <h1>HOla</h1>
          </div> */}
        </main>
    );
};
export default Juego;

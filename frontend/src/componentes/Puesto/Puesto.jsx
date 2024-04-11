import React from 'react';
import "./Puesto.css";
import estrellaSrc from './../../assets/img/juegos/estrellaDorada.svg';  

const Puesto = (props) => {
  const {juegoSrc, nombre, valoracion, puesto} = props;

  return (
      <div id='puesto' className='row'>
        <div className="col-4 col-sm-1 numeroPuesto text-center order-1">
          {puesto}
        </div>
        <div className="col-4 col-sm-1 portada text-center order-2">
          <img src={juegoSrc} alt={'juego ' + nombre} />
        </div>
        <div className="col-12 col-sm-7 nombreJuego text-center order-4 order-sm-3">
          <div>{nombre}</div>
        </div>
        <div className="col-4 col-sm-3 valoracion order-3 order-sm-4">
          <img src={estrellaSrc} alt="estrella" />
          <p>{(valoracion.toString().length === 1) ? valoracion.toString().concat(',0') : valoracion.toString().replace('.', ',')}</p>
        </div>
      </div>
  );
};
export default Puesto;

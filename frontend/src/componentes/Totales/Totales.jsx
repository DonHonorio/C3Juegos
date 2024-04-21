import React, {useContext} from 'react';
import "./Totales.css";
import IdiomaContext from '../../contextos/IdiomaContext'; 
import usuarioSrc from './../../assets/img/juegos/totales/user.svg';
import comentarioSrc from './../../assets/img/juegos/totales/comment.svg';
import juegoSrc from './../../assets/img/juegos/totales/games.svg';
import useHome from '../../hooks/useHome';

const Totales = (props) => {
    const idioma = useContext(IdiomaContext);

  const post = {usuarios: (props.buscando) ? 'cargando...' : props.users.length,
                opiniones: (props.buscando) ? 'cargando...' : props.comments.length,
                juegos: (props.buscando) ? 'cargando...' : props.games.length};
  const {usuarios, opiniones, juegos} = post;

  return (
      <div id='totales' className='row'>
        
        <div className="col-12 col-xxl-3 seccion seccion1">
          <div className="row">
            <div className="col-6 text-end icono">
              <img src={usuarioSrc} alt="usuario icon" />
            </div>
            <div className="col-6 informacion">
              <div className="row">
                <div className="col-12 numero">{usuarios}</div>
                <div className="col-12 texto">
                  <p>{idioma.landingPage.totales.usuarios}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xxl-1 text-center palos">
          <svg className='palo_horizontal' width="156" height="3" viewBox="0 0 156 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M154.92 1.78711L1.41992 1.78784" stroke="#EEEFF2" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <svg className='palo_vertical' width="3" height="128" viewBox="0 0 3 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1.21338V126.787" stroke="#EEEFF2" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="col-12 col-xxl-4 seccion seccion2">
          <div className="row">
            <div className="col-6 text-end icono">
              <img src={comentarioSrc} alt="usuario icon" />
            </div>
            <div className="col-6 informacion">
              <div className="row">
                <div className="col-12 numero">{opiniones}</div>
                <div className="col-12 texto">
                  <p>{idioma.landingPage.totales.opiniones}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xxl-1 text-center palos">
          <svg className='palo_horizontal' width="156" height="3" viewBox="0 0 156 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M154.92 1.78711L1.41992 1.78784" stroke="#EEEFF2" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <svg className='palo_vertical' width="3" height="128" viewBox="0 0 3 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1.21338V126.787" stroke="#EEEFF2" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="col-12 col-xxl-3 seccion seccion3">
          <div className="row">
            <div className="col-6 text-end icono">
              <img src={juegoSrc} alt="usuario icon" />
            </div>
            <div className="col-6 informacion">
              <div className="row">
                <div className="col-12 numero">{juegos}</div>
                <div className="col-12 texto">
                  <p>{idioma.landingPage.totales.juegos}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
  );
};
export default Totales;

import React,{ useContext } from 'react';
import IdiomaContext from '../../contextos/IdiomaContext';
import logoCarlos3 from '../../assets/img/acercaDe/logoCarlos3.svg';
import fotoDesarrollador from '../../assets/img/acercaDe/fotoDesarrollador.jpeg';
import soporteTecnico from '../../assets/img/acercaDe/soporteTecnico.png';
import './AcercaDe.css';
import Boton from '../../componentes/Boton/Boton';
import { Link } from 'react-router-dom';

const AcercaDe = () => {
    const idioma = useContext(IdiomaContext);

    return (
        <article className='row'>
          
          <section className='container' id='acercaDe'>

            <div className="row gap-5 gap-md-0">
              <h1>{idioma.acercaDe.titulo}</h1>

              <div className="col-12 col-md-6 desarrollador d-flex flex-column align-items-center gap-3">
                <h2>{idioma.acercaDe.desarrollador.titulo}</h2>
                <div className='d-flex align-items-center'>
                  <div className="foto">
                    <img src={fotoDesarrollador} alt="imagen_desarrollador" />
                  </div>
                  <p className='nombre'>{idioma.acercaDe.desarrollador.nombre}</p>
                </div>
                <div>
                  <p>{idioma.acercaDe.desarrollador.puesto}</p>
                  <p>{idioma.acercaDe.desarrollador.descripcion}</p>
                </div>
              </div>

              <div className="col-12 col-md-6 proyecto d-flex flex-column align-items-center gap-3">
                <h2>{idioma.acercaDe.proyecto.titulo}</h2>
                <div>
                  <a href="https://cifpcarlos3.es/es" target="_blank" rel="noopener noreferrer">
                    <div className="foto">
                      <img src={logoCarlos3} alt="imagen_carlos3" />
                    </div>
                  </a>
                </div>
                <div>
                  <p>{idioma.acercaDe.proyecto.descripcion}</p>
                </div>
              </div>

              <div className="col-12 soporte d-flex flex-column align-items-center gap-2">
                <h2>{idioma.acercaDe.soporte.titulo}</h2>
                <div className="foto">
                  <img src={soporteTecnico} alt="imagen_soporte" />
                </div>
                <div className='incidencias d-flex flex-column flex-sm-row align-items-center gap-5'>
                  <p>{idioma.acercaDe.soporte.incidencias}</p>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=c3juegos@gmail.com&su=incidencia" target="_blank" rel="noopener noreferrer">
                    <Boton value={idioma.acercaDe.soporte.boton}/>
                  </a>
                </div>
              </div>
            </div>

          </section>

        </article>
    );
};
export default AcercaDe;

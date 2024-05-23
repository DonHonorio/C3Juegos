import React,{ useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Juego.css';

import IdiomaContext from '../../contextos/IdiomaContext';
import useCommentsGame from '../../hooks/useCommentsGame';
import { normalizarFormatoFecha } from '../../servicios/functions';

import DetallesJuego from '../../componentes/DetallesJuego/DetallesJuego';
import AjaxLoader from '../../componentes/AjaxLoader/AjaxLoader';
import Comentario from '../../componentes/Comentario/Comentario';
import ComentarioForm from '../../componentes/ComentarioForm/ComentarioForm';

const Juego = () => {
  // inicializo los hooks
  let { idJuego } = useParams();

  // estado para forzar el renderizado de los comentarios al crear uno nuevo
  const [renderComentarios, setRenderComentarios] = useState(0);

  const idioma = useContext(IdiomaContext);
  const commentsGame = useCommentsGame(idJuego, renderComentarios);

  return (
      <main className='row' id='showGame'>
        <DetallesJuego idJuego={idJuego} comentarios={commentsGame}/>

        {/* Sección de comentarios */}
        <article className="col-12" id='opiniones'>
          <div className="row">

            <section className="col-12 titulo">
              <h2>{idioma.juego.showJuego.opiniones}</h2>
            </section>

            <ComentarioForm idJuego={idJuego} setRenderComentarios={setRenderComentarios} />

            <div className="linea_divisioria text-center">
              <svg width="100%" height="2" viewBox="0 0 1200 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="1" x2="1200" y2="1" stroke="white" strokeWidth="2"/>
              </svg>
            </div>

            <section className="col-12 cajaComentarios">

              <ul className='row'>
                {(commentsGame) ? commentsGame.map((comment) => {
                                    return <li key={comment.id}>
                                      <Comentario 
                                        nickname={comment.user.nickname} 
                                        fechaPublicacion={normalizarFormatoFecha(comment.created_at)}
                                        rating={comment.rating}
                                        comment={comment.comment}
                                      />
                                    </li>}) 
                                : 
                                <AjaxLoader /> }
              </ul>

            </section>
          </div>
        </article>
      </main>
  );
};
export default Juego;

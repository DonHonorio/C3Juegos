import React,{ useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Juego.css';

import IdiomaContext from '../../contextos/IdiomaContext';
import useCommentsGame from '../../hooks/useCommentsGame';
import { normalizarFormatoFecha } from '../../servicios/functions';
import storage from '../../Storage/storage';

import LineaDivisoria from '../../componentes/LineaDivisoria/LineaDivisoria';
import DetallesJuego from '../../componentes/DetallesJuego/DetallesJuego';
import AjaxLoader from '../../componentes/AjaxLoader/AjaxLoader';
import Comentario from '../../componentes/Comentario/Comentario';
import ComentarioForm from '../../componentes/ComentarioForm/ComentarioForm';
import ScrollUp from '../../componentes/ScrollUp/ScrollUp';
import Boton from '../../componentes/Boton/Boton';
import StoreContext from '../../contextos/StoreContext';

const Juego = () => {
  // inicializo los hooks
  let { idJuego } = useParams();

  // estado para forzar el renderizado de los comentarios al crear uno nuevo
  const [renderComentarios, setRenderComentarios] = useState(0);

  const { authUser } = useContext(StoreContext);

  const idioma = useContext(IdiomaContext);
  const commentsGame = useCommentsGame(idJuego, renderComentarios);

  return (
      <main className='row' id='showGame'>
        <ScrollUp />
        <DetallesJuego idJuego={idJuego} comentarios={commentsGame}/>

        {/* Sección de comentarios */}
        <article className='col-12 d-flex flex-column align-items-center gap-5' id='opiniones'>
          <section className="titulo">
            <h2>{idioma.juego.showJuego.opiniones}</h2>
          </section>

          {authUser ? <ComentarioForm idJuego={idJuego} setRenderComentarios={setRenderComentarios} />
                    : <Link to='/login' className='btn'><Boton value={idioma.juego.comentarios.registrateOpinar}/></Link>}

          <LineaDivisoria />

          <section className="cajaComentarios">

            <ul className='row'>
              {(commentsGame) ? 
                commentsGame.length > 0 ?
                                commentsGame.map((comment) => {
                                  return <li key={comment.id}>
                                    <Comentario 
                                      nickname={comment.user.nickname} 
                                      fechaPublicacion={normalizarFormatoFecha(comment.created_at)}
                                      rating={comment.rating}
                                      comment={comment.comment}
                                    />
                                  </li>}) 
                                  :
                                <li className='sinComentarios'>{idioma.juego.comentarios.noComentarios}</li>
                              : 
                              <AjaxLoader /> }
            </ul>

          </section>
        </article>
      </main>
  );
};
export default Juego;

import React,{ useState, useContext } from 'react'
import { Rate } from 'antd';
import './ComentarioForm.css'

import StoreContext from '../../contextos/StoreContext';
import IdiomaContext from '../../contextos/IdiomaContext';
import storage from '../../Storage/storage';
import { UserOutlined } from '@ant-design/icons';
import Boton from '../Boton/Boton';
import sendRequest from '../../servicios/functions';

const ComentarioForm = (props) => {
  const idioma = useContext(IdiomaContext);
  const { avatarUser } = useContext(StoreContext);

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
 
  // Función para forzar el renderizado de los comentarios para ver el nuevo comentario
  const forceRender = () => {
    props.setRenderComentarios(preRender => preRender + 1);
  };

  const csrf = async() => {
    await axios.get('/sanctum/csrf-cookie');
  }

  // Función para enviar el comentario al servidor
  const enviar = async(e) => {
    e.preventDefault();
    await csrf();    

    const formComentario = {game_id: props.idJuego, comentario: comment, valoracion: rating};
    const respuestaComentario = await sendRequest('POST', formComentario, '/api/comment','',false, true);

    if(respuestaComentario.status == true){
      // Vaciamos los campos del formulario
      setRating(null);
      setComment('');

      // Forzamos el renderizado para ver el nuevo comentario
      forceRender();
    }
  } 

  const cancelar = () => {setComment(''); setRating(null)}

  // Es para que el textarea se redimensione automáticamente
  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <section className="col-12 comentarioForm">
      <form onSubmit={enviar} className="row gap-3">
        <div className="estrellas col-12 text-center">
          <Rate 
            allowHalf 
            onChange={setRating} 
            value={rating}
            style={{ color: '#313131'}}
            allowClear
            />
        </div>
        <div className="zonaEscribir col-12 d-flex gap-3 align-items-center align-items-sm-end">
          <div className="imagenPerfil">
            {storage.get('authUser').fotoPerfil ? <img src={avatarUser} alt="avatar" width={250}/> 
                                              : <UserOutlined style={{ fontSize: '7em' }} /> }
          </div>
          <textarea 
            rows="1"
            placeholder={idioma.juego.comentarios.añadir}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onInput={autoResize}
            required
          />
          <input 
            type="text"
            placeholder={idioma.juego.comentarios.añadir}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div className="botonesForm col-12 d-flex justify-content-end">
          <Boton value={idioma.juego.comentarios.cancelar} buttonFunction={cancelar}/>
          <Boton 
            value={idioma.juego.comentarios.opinar}
            type="submit"
            />
        </div>

      </form>
    </section>
  )
}

export default ComentarioForm
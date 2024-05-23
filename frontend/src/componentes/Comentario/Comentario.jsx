import React from 'react'
import fotoPerfil from '../../assets/img/juegos/comentarios/fotoPerfil.svg';
import { FaStar } from 'react-icons/fa';

const Comentario = (props) => {
  return (
    <div className="col-12 comentario">
      <div className="row">
        <div className="col-4 col-md-2 col-xl-1 fotoPerfil">
          <img src={fotoPerfil} alt="fotoPerfil" />
        </div>
        <div className="col-4 col-md-2 col-xl-1 nicknameFecha">
          <p className='nickname'>{props.nickname}</p>
          <p className='fechaPublicacion'>{props.fechaPublicacion}</p>
        </div>
        <div className="col-4 col-md-2 col-xl-1 valoracion d-flex align-items-start">
          <p className='m-0'>{(props.rating) ? props.rating : 0}</p>
          <FaStar size={18} style={{marginTop: "0.2em"}}/>
        </div>
        <div className="col-12 contenidoOpinion">
          <p>{props.comment}</p>
        </div>
      </div>
    </div>
  )
}

export default Comentario
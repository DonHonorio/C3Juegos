import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import fotoPerfil from '../../assets/img/juegos/comentarios/fotoPerfil.svg';
import { FaStar } from 'react-icons/fa';
import './Comentario.css';

const Comentario = (props) => {
  return (
    <div className="col-12 d-flex flex-column align-items-center align-items-sm-start" id='comentario'>
      <div className="d-flex align-items-center gap-3 gap-sm-4 gap-md-5">
        <div className="fotoPerfil">
          {/* <img src={fotoPerfil} alt="fotoPerfil" /> */}
          <UserOutlined style={{ fontSize: '3em' }} />
        </div>
        <div className="nicknameFecha d-flex flex-column align-items-center">
          <p className='nickname'>{props.nickname}</p>
          <p className='fechaPublicacion'>{props.fechaPublicacion}</p>
        </div>
        <div className="valoracion d-flex justify-content-end">
          <p className='m-0'>{(props.rating) ? props.rating : 0}</p>
          <FaStar className='star' size={18} color='#FEA250' style={{margin: "0.1em 0 0 0.4em"}}/>
        </div>
      </div>
      <div>
        <div className="contenidoOpinion">
          <p>{props.comment}</p>
        </div>
      </div>
    </div>
  )
}

export default Comentario
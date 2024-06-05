import React, {useContext} from 'react'
import storage from '../../Storage/storage';
import IdiomaContext from '../../contextos/IdiomaContext';
import { UserOutlined } from '@ant-design/icons';
import StoreContext from '../../contextos/StoreContext';
import './PerfilCard.css';

import { normalizarFormatoFecha } from '../../servicios/functions';

const PerfilCard = ({ user }) => {

  const idioma = useContext(IdiomaContext);

  const { avatarUser } = useContext(StoreContext);

  return (
    <div className="col-12 col-sm-6" id='perfilCard'>
      <div className="d-flex justify-content-around justify-content-sm-start align-items-center gap-sm">
        <div className="imagenPerfil">
        {storage.get('authUser').fotoPerfil ? <img src={avatarUser} alt="avatar" width={250}/> 
                                              : <UserOutlined style={{ fontSize: '7em' }} /> }
        </div>
        <div className="informacion">
          <h4>{user.nickname}</h4>
          <p>{user.modulo}</p>
          <p>{idioma.perfil.creadoEl}{normalizarFormatoFecha(user.created_at)}</p>
        </div>
      </div>
    </div>
  )
}

export default PerfilCard
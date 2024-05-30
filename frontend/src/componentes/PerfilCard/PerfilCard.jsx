import React, {useContext} from 'react'
import storage from '../../Storage/storage';
import IdiomaContext from '../../contextos/IdiomaContext';
import { UserOutlined } from '@ant-design/icons';
import StoreContext from '../../contextos/StoreContext';

import { normalizarFormatoFecha } from '../../servicios/functions';

const PerfilCard = ({ user }) => {

  const idioma = useContext(IdiomaContext);

  const { avatarUser } = useContext(StoreContext);

  return (
    <div className="col-12 col-md-6">
      <div className="row">
        <div className="col-6 imagenPerfil">
        {storage.get('authUser').fotoPerfil ? <img src={avatarUser} alt="avatar" width={250}/> 
                                              : <UserOutlined style={{ fontSize: '2em' }} /> }
        </div>
        <div className="col-6 informacion">
          <h4>{user.nickname}</h4>
          <p>{user.modulo}</p>
          <p>{idioma.perfil.creadoEl}{normalizarFormatoFecha(user.created_at)}</p>
        </div>
      </div>
    </div>
  )
}

export default PerfilCard
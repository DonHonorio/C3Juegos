import React,{ useContext } from 'react';
import StoreContext from '../../contextos/StoreContext';
import { UserOutlined } from '@ant-design/icons';
import './Avatar.css';

import {Link } from 'react-router-dom';
import storage from '../../Storage/storage';

const Avatar = ({nickname, id }) => {
  const { avatarUser } = useContext(StoreContext);

  return (
      <Link className='linkAvatar' to={`/perfil/${id}`} >
        <div className='d-flex  justify-content-between align-items-center' id='avatar' >
          <div>
            <p>{nickname}</p>
          </div>
          <div className='imagenPerfil'>
            {storage.get('authUser').fotoPerfil ? <img src={avatarUser} alt="avatar"/> 
                                                : <UserOutlined style={{ fontSize: '7em' }} /> }
          </div>
        </div>
      </Link>
  );
};
export default Avatar;

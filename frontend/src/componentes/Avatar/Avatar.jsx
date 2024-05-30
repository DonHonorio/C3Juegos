import React,{ useContext } from 'react';
import StoreContext from '../../contextos/StoreContext';
import { UserOutlined } from '@ant-design/icons';
import './Avatar.css';

import {Link } from 'react-router-dom';
import storage from '../../Storage/storage';

const Avatar = ({nickname, id }) => {
  const { avatarUser } = useContext(StoreContext);

  return (
      <div id='avatar' >
          <Link className='linkAvatar' to={`/perfil/${id}`} >
            <p>{nickname}</p>
            {storage.get('authUser').fotoPerfil ? <img src={avatarUser} alt="avatar" id='imagenAvatar' /> 
                                                : <UserOutlined style={{ fontSize: '2em' }} /> }
          </Link>
      </div>
  );
};
export default Avatar;

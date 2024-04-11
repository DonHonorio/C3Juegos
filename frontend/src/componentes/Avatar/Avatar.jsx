import React,{ useContext } from 'react';
import avatarSrc from './../../assets/img/avatar.svg';
import './Avatar.css';

import {Link } from 'react-router-dom';

const Avatar = () => {

    return (
        <div id='avatar' >
            <Link className='linkAvatar' to="/perfil/1" >
              <p>Honori55</p>
              <img src={avatarSrc} alt="avatar" id='imagenAvatar' />
            </Link>
        </div>
    );
};
export default Avatar;

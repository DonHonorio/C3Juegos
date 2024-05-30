import React, { useState, useEffect } from 'react';
import StoreContext from '../contextos/StoreContext';
const API_URL = import.meta.env.VITE_API_BASE_URL;
import useLikesGames from '../hooks/useLikesGames';
import useCheckLikes from '../hooks/useCheckLikes';
import storage from '../Storage/storage';

const Store = ({ children }) => {
  
  // Hook que recupera la cantidad de likes de los juegos
  const {likesGames} = useLikesGames();
  // Hook que recupera si el usuario ha dado like a cada juego
  const {checkLikes} =  useCheckLikes();

  // Estado que almacena si el usuario ha dado like a cada juego
  const [likes, setLikes]                 = useState(null);
  const [cantidadLikes, setCantidadLikes] = useState(null);
  // Estado que almacena la imagen de perfil del usuario
  const [avatarUser, setAvatarUser]       = useState(`${API_URL}/api/user/fotoPerfil/${(storage.get('authUser')) ? storage.get('authUser').id : 0}`);
  const [fileList, setFileList] = useState( 
      storage.get('authUser') && storage.get('authUser').fotoPerfil ?
          [ {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: `${API_URL}/api/user/fotoPerfil/${(storage.get('authUser')) ? storage.get('authUser').id : 0}`,
          },]
        : [] 
      );

  useEffect(() => {
    setCantidadLikes(likesGames);
  }, [likesGames]);

  useEffect(() => {
    setLikes(checkLikes);
  }, [checkLikes]);

  const [actualizarFavoritos, setAcutalizarFavoritos] = useState(0);

  return (
    <StoreContext.Provider value={{ 
      actualizarFavoritos, setAcutalizarFavoritos, 
      cantidadLikes, setCantidadLikes,
      likes, setLikes,
      avatarUser, setAvatarUser,
      fileList, setFileList
      }}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
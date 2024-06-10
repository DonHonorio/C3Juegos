import React, { useState, useEffect } from 'react';
import StoreContext from '../contextos/StoreContext';
const API_URL = import.meta.env.VITE_API_BASE_URL;
import useLikesGames from '../hooks/useLikesGames';
import useCheckLikes from '../hooks/useCheckLikes';
import storage from '../Storage/storage';
import sendRequest from '../servicios/functions';

const Store = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const user = window.localStorage.getItem('authUser');
    const token = window.localStorage.getItem('authToken');
    if (user) {
      setAuthUser(JSON.parse(user));
    }
    if (token) {
      setAuthToken(token);
    }
    login(JSON.parse(user), token);
    }, []);
  console.log('user: ', authUser, 'token: ', authToken);

  const login = (user, token) => {
    setAuthUser(user);
    setAuthToken(token);
    window.localStorage.setItem('authUser', JSON.stringify(user));
    window.localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setAuthUser(null);
    setAuthToken(null);
    window.localStorage.removeItem('authUser');
    window.localStorage.removeItem('authToken');
  };
  
  // Hook que recupera la cantidad de likes de los juegos
  const {likesGames} = useLikesGames();
  // Hook que recupera si el usuario ha dado like a cada juego
  // const {checkLikes} =  useCheckLikes(authUser);

  // Estado que almacena el género seleccionado
  const [genero, setGenero] = useState('TODOS');

  // Estado que almacena si el usuario ha dado like a cada juego
  const [likes, setLikes]                 = useState(null);
  const [cantidadLikes, setCantidadLikes] = useState(null);
  // Estado que almacena la imagen de perfil del usuario
  const [avatarUser, setAvatarUser]       = useState(0);
  const [fileList, setFileList] = useState( 
      // authUser && authUser.fotoPerfil ?
      //     [ {
      //       uid: '-1',
      //       name: 'image.png',
      //       status: 'done',
      //       url: `${API_URL}/api/user/fotoPerfil/${(authUser) ? authUser.id : 0}`,
      //     },]
      //   : [] 
      );

  useEffect(() => {
    setCantidadLikes(likesGames);
  }, [likesGames]);

  useEffect(() => {
    if (authUser) {
      fetchData();
      setAvatarUser(`${API_URL}/api/user/fotoPerfil/${authUser.id}`)
      setFileList( 
        authUser && authUser.fotoPerfil ?
            [ {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: `${API_URL}/api/user/fotoPerfil/${(authUser) ? authUser.id : 0}`,
            },]
          : [] 
        );
    } else {
      setLikes([]);
    }
    setAcutalizarFavoritos(e => e + 1);
    // console.log(' checkLikes', checkLikes);  
  }, [authUser]);

  async function fetchData(){
    let respuesta = await sendRequest('GET', null, `/api/games/checkLikes`, '',false, true);
    setLikes(respuesta.checkLikes);
  }

  const [actualizarFavoritos, setAcutalizarFavoritos] = useState(0);

  return (
    <StoreContext.Provider value={{
      authUser, authToken, setAuthUser,
      login, logout,
      actualizarFavoritos, setAcutalizarFavoritos, 
      cantidadLikes, setCantidadLikes,
      likes, setLikes,
      avatarUser, setAvatarUser,
      fileList, setFileList,
      genero, setGenero
      }}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
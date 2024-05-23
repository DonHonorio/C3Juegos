import React, { useState, useEffect } from 'react';
import LikesContext from '../contextos/LikesContext';
import useLikesGames from '../hooks/useLikesGames';
import useCheckLikes from '../hooks/useCheckLikes';

const LikesProvider = ({ children }) => {
  
  // Hook que recupera la cantidad de likes de los juegos
  const {likesGames} = useLikesGames();
  // Hook que recupera si el usuario ha dado like a cada juego
  const {checkLikes} =  useCheckLikes();

  // Estado que almacena si el usuario ha dado like a cada juego
  const [likes, setLikes]                 = useState(null);
  const [cantidadLikes, setCantidadLikes] = useState(null);

  useEffect(() => {
    setCantidadLikes(likesGames);
  }, [likesGames]);

  useEffect(() => {
    setLikes(checkLikes);
  }, [checkLikes]);

  const [actualizarFavoritos, setAcutalizarFavoritos] = useState(0);

  return (
    <LikesContext.Provider value={{ 
      actualizarFavoritos, setAcutalizarFavoritos, 
      cantidadLikes, setCantidadLikes,
      likes, setLikes
      }}>
      {children}
    </LikesContext.Provider>
  );
};

export default LikesProvider;
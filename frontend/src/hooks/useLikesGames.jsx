import { useEffect, useState } from "react";
import sendRequest from '../servicios/functions';

const useLikesGames = () => {
    
  // Estado con la lista de likes de juegos que recuperamos de la REST API
  const [listaLikesGames, setListaLikesGames] = useState();

  async function fetchData(){
    let resultado = await sendRequest('GET', null, '/api/games/likesGames', '', false);

    //Cargamos los games en el estado del componente
    setListaLikesGames(resultado.likesGames);
  }

  // Llamamos a la función de extracción de datos con un useEffect para que solo se ejecute una vez
  useEffect(() => {
    // Usamos el servicio de obtención de likes de juegos que hemos creado
    fetchData();
  }, []);

  return listaLikesGames;

}

export default useLikesGames;
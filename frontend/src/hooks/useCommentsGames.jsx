import { useEffect, useState } from "react";
import sendRequest from '../servicios/functions';

const useCommentsGames = () => {
    
  // Estado con la lista de likes de juegos que recuperamos de la REST API
  const [commentsGames, setCommentsGames] = useState();

  async function fetchData(){
    let resultado = await sendRequest('GET', null, '/api/games/commentsGames', '',false, false);

    //Cargamos la media de valoraciones en el estado del componente
    setCommentsGames(resultado.commentsGames);
  }

  // Llamamos a la función de extracción de datos con un useEffect para que solo se ejecute una vez
  useEffect(() => {

    // Usamos el servicio de obtención de la media de valoraciones que hemos creado
    fetchData();
  }, []);

  return commentsGames;

}

export default useCommentsGames;
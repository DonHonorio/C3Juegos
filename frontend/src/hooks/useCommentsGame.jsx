import { useEffect, useState } from "react";
import sendRequest from '../servicios/functions';

const useCommentsGame = (id, render) => {

  // Estado con el juego por id que recuperamos de la REST API
  const [commentsGame, setCommentGame] = useState();

  async function fetchData(){
    let resultado = await sendRequest('GET', null, `/api/game/${id}/commentsGame`, '',false, false);

    //Cargamos el juego por id en el estado del componente
    setCommentGame(resultado.commentsGame);
  }

  // Llamamos a la función de extracción de datos con un useEffect para que solo se ejecute una vez
  useEffect(() => {

    // Usamos el servicio de obtención del juego por id que hemos creado
    fetchData();
  }, [render]);

  return commentsGame;

}

export default useCommentsGame;
import { useEffect, useState } from "react";
import sendRequest from '../servicios/functions';

const useGame = (id) => {

  // Estado con el juego por id que recuperamos de la REST API
  const [game, setGame] = useState();

  async function fetchData(){
    let resultado = await sendRequest('GET', null, `/api/game/${id}`, '',false, false);

    //Cargamos el juego por id en el estado del componente
    setGame(resultado.game);
  }

  // Llamamos a la función de extracción de datos con un useEffect para que solo se ejecute una vez
  useEffect(() => {

    // Usamos el servicio de obtención del juego por id que hemos creado
    fetchData();
  }, []);

  return game;

}

export default useGame;
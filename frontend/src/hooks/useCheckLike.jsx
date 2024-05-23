import { useEffect, useState } from "react";
import sendRequest from '../servicios/functions';

const useCheckLike = (game_id) => {

  // Estado con el juego por id que recuperamos de la REST API
  const [like, setLike] = useState();

  async function fetchData(){
    let resultado = await sendRequest('GET', null, `/api/game/${game_id}/checkLike`, '',false, true);

    //Cargamos el juego por id en el estado del componente
    setLike(resultado.checkLike);
  }

  // Llamamos a la función de extracción de datos con un useEffect para que solo se ejecute una vez
  useEffect(() => {

    // Usamos el servicio de obtención del juego por id que hemos creado
    fetchData();
  }, []);

  return {like, setLike};

}

export default useCheckLike;
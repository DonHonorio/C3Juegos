import { useEffect, useState } from "react";
import sendRequest from '../servicios/functions';

const useCheckLikes = (authUser) => {

  // Estado con el juego por id que recuperamos de la REST API
  const [checkLikes, setCheckLikes] = useState();

  async function fetchData(){

    let resultado;

    if (authUser) {
      let respuesta = await sendRequest('GET', null, `/api/games/checkLikes`, '',false, true);
      resultado = respuesta.checkLikes;
    } else {
      resultado = [];
    }
    
    //Cargamos el juego por id en el estado del componente
    setCheckLikes(resultado);
  }

  // Llamamos a la función de extracción de datos con un useEffect para que solo se ejecute una vez
  useEffect(() => {

    // Usamos el servicio de obtención del juego por id que hemos creado
    fetchData();
  }, []);

  return {checkLikes, setCheckLikes};

}

export default useCheckLikes;
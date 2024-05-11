import { useEffect, useState } from "react";
import sendRequest from '../servicios/functions';

const useRatings = (id) => {

  // Estado con el juego por id que recuperamos de la REST API
  const [game, setGame] = useState();

  // Estado para controlar si estamos cargando los datos o hemos finalizado de cargarlos
  const [buscando, setBuscando] = useState(true);

  async function fetchData(){
    let resultado = await sendRequest('GET', null, `/api/game/${id}`, '', false);

    //Cargamos el juego por id en el estado del componente
    setGame(resultado);

    //Indicamos que hemos terminado de cargar los datos
    setBuscando(false);
  }

  // Llamamos a la función de extracción de datos con un useEffect para que solo se ejecute una vez
  useEffect(() => {
    //Marcamos que estamos buscando los datos
    setBuscando(true);

    // Usamos el servicio de obtención del juego por id que hemos creado
    fetchData();
  }, []);

  return {buscando, game};

}

export default useRatings;
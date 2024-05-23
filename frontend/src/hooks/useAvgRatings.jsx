import { useEffect, useState } from "react";
import sendRequest from '../servicios/functions';

const useAvgRatings = () => {
    
  // Estado con la lista de likes de juegos que recuperamos de la REST API
  const [avgRatings, setAvgRatings] = useState();

  async function fetchData(){
    let resultado = await sendRequest('GET', null, '/api/games/avgRatings', '',false, false);

    //Cargamos la media de valoraciones en el estado del componente
    setAvgRatings(resultado.avgRatings);
  }

  // Llamamos a la función de extracción de datos con un useEffect para que solo se ejecute una vez
  useEffect(() => {

    // Usamos el servicio de obtención de la media de valoraciones que hemos creado
    fetchData();
  }, []);

  return avgRatings;

}

export default useAvgRatings;
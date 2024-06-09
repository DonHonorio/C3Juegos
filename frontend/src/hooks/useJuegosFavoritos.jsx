import { useEffect, useState } from "react";
import sendRequest from '../servicios/functions';

const useJuegosFavoritos = (props, actualizarFavoritos, authUser) => {

  // Estado con la lista de juegos favoritos que recuperamos de la REST API
  const [juegosFavoritos, setJuegosFavoritos] = useState();

  async function fetchData(){

    let resultado;

    if (authUser) {
      let respuesta = await sendRequest('GET', null, '/api/games/favoritos', '',false, true)
      
      // como la api devuelve dos lista de favoritos, tenemos que elegir una dependiendo de las props
      resultado = (props === 'home') ? respuesta.gamesFavHome : respuesta.gamesFavTodos;
    } else {
      resultado = [];
    }

    //Cargamos juegos favoritos en el estado del componente
    setJuegosFavoritos(resultado);
  }

  // Llamamos a la función de extracción de datos con un useEffect para que solo se ejecute una vez
  useEffect(() => {

    // Usamos el servicio de obtención de juegos favoritos que hemos creado
    fetchData();
    // actualizarFavoritos es un valor que va modificando a medida que el usuario da like a los juegos para que se actualice la lista de favoritos
  }, [actualizarFavoritos]);

  return juegosFavoritos;

}

export default useJuegosFavoritos;
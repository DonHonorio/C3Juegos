import { useEffect, useState } from "react";
import sendRequest from '../servicios/functions';

const useJuegosFavoritos = (props) => {

  // Estado con la lista de juegos favoritos que recuperamos de la REST API
  const [listaJuegosFavoritos, setListaJuegosFavoritos] = useState();

  // Estado para controlar si estamos cargando los datos o hemos finalizado de cargarlos
  const [buscando, setBuscando] = useState(true);

  async function fetchData(){
    let respuesta = await sendRequest('GET', null, '/api/games/favoritos', '', true)

    let resultado;

    // como la api devuelve dos lista de favoritos, tenemos que elegir una dependiendo de las props
    resultado = (props === 'home') ? respuesta.gamesFavHome : respuesta.gamesFavTodos;

    //Cargamos juegos favoritos en el estado del componente
    setListaJuegosFavoritos(resultado);

    //Indicamos que hemos terminado de cargar los datos
    setBuscando(false);
  }

  // Llamamos a la función de extracción de datos con un useEffect para que solo se ejecute una vez
  useEffect(() => {
    //Marcamos que estamos buscando los datos
    setBuscando(true);

    // Usamos el servicio de obtención de juegos favoritos que hemos creado
    fetchData();
  }, []);

  return {buscando, listaJuegosFavoritos};

}

export default useJuegosFavoritos;
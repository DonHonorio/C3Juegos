import { useEffect, useState } from "react";
import { getAllGames } from "../servicios/getAllGames";

const useGames = () => {
    
  // Estado con la lista de alumnos que recuperamos de la REST API
  const [listaGames, setListaGames] = useState();

  // Estado para controlar si estamos cargando los datos o hemos finalizado de cargarlos
  const [buscando, setBuscando] = useState(true);

  function obtenerGames(){
    //Marcamos que estamos buscando los datos
    setBuscando(true);

    // Usamos el servicio de obtención de alumnos que hemos creado
    getAllGames().then(games => {
      //Cargamos los games en el estado del componente
      setListaGames(games);

      setBuscando(false);
      //Indicamos que hemos terminado de cargar los datos
    }); 
  }

  // Llamamos a la función de extracción de datos con un useEffect
  // para que solo se ejecute una vez
  useEffect(obtenerGames, []);

  return {buscando, listaGames};

}

export default useGames;
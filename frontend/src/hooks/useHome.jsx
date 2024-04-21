import { useEffect, useState } from "react";
import { getAllHome } from "../servicios/getAllHome";

const useHome = () => {
    
  // Estado con la lista de datos de home que recuperamos de la REST API
  const [listaHome, setListaHome] = useState();

  // Estado para controlar si estamos cargando los datos o hemos finalizado de cargarlos
  const [buscando, setBuscando] = useState(true);

  function obtenerHome(){
    //Marcamos que estamos buscando los datos
    setBuscando(true);

    // Usamos el servicio de obtención de datos de home que hemos creado
    getAllHome().then(home => {
      //Cargamos los home en el estado del componente
      setListaHome(home);

      setBuscando(false);
      //Indicamos que hemos terminado de cargar los datos
    }); 
  }

  // Llamamos a la función de extracción de datos con un useEffect
  // para que solo se ejecute una vez
  useEffect(obtenerHome, []);

  return {buscando, listaHome};

}

export default useHome;
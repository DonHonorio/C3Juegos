import { useEffect, useState } from "react";
import { getAllProducts } from "../servicios/getAllProducts";

const useProducts = () => {
    
  // Estado con la lista de alumnos que recuperamos de la REST API
  const [listaProducts, setListaProducts] = useState();

  // Estado para controlar si estamos cargando los datos o hemos finalizado de cargarlos
  const [buscando, setBuscando] = useState(true);

  function obtenerProducts(){
    //Marcamos que estamos buscando los datos
    setBuscando(true);

    // Usamos el servicio de obtención de alumnos que hemos creado
    getAllProducts().then(products => {
      //Cargamos los products en el estado del componente
      setListaProducts(products);

      setBuscando(false);
      //Indicamos que hemos terminado de cargar los datos
    }); 
  }

  // Llamamos a la función de extracción de datos con un useEffect
  // para que solo se ejecute una vez
  useEffect(obtenerProducts, []);

  return {buscando, listaProducts};

}

export default useProducts;
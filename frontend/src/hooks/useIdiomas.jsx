import { useState } from "react";

// Este custom-hook se encarga de gestionar el idioma seleccionado
const useIdiomas = () => {

  const ES = "es";
  const [idiomaElegido, setIdiomasElegido] = useState(ES);
  
  function seleccionIdioma(idioma){
    // console.log(idioma);
    setIdiomasElegido(idioma);
    console.log(idiomaElegido);
  }

  // packIdioma es un paquete que contiene tanto funciones como variables para pasarse al context
  const packIdioma = {
    idiomaElegido: idiomaElegido,
    seleccionIdioma: seleccionIdioma
  }

  return packIdioma;
}

export default useIdiomas;
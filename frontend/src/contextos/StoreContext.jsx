import React from 'react';

// Creamos el contexto que va a los componentes que se necesiten saber cuando
// se ha dado like a un juego y poder actualizar la lista de juegos favoritos

// También se usa guardar el estado de la imagen de perfil del usuario

const StoreContext = React.createContext();

export default StoreContext;
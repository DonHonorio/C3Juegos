import { useState } from 'react';
import './App.css';
import Navbar from './componentes/Navbar/Navbar';
import Home from './paginas/HOME/Home';
import Juego from './paginas/JUEGO/Juego';
import Favoritos from './paginas/FAVORITOS/Favoritos';
import Perfil from './paginas/PERFIL/Perfil';
import AcercaDe from './paginas/ACERCA_DE/AcercaDe';
import IdiomaContext from './contextos/IdiomaContext';
import losIdiomas from './mocks/mock-idiomas';
import useIdiomas from './hooks/useIdiomas';

import { Routes, Route } from 'react-router-dom';

function App() {
  const idiomas = useIdiomas();

  return (
    <div className='container-fluid'>
      {/* En el componente idiomas está la función para que el componente nieto pueda modificar el idioma seleccionado */}
      <IdiomaContext.Provider value={idiomas}>
        <Navbar></Navbar>
      </IdiomaContext.Provider>

      {/* Aquí enviamos el idioma seleccionado */}
      <IdiomaContext.Provider value={losIdiomas[idiomas.idiomaElegido]}>
        <Routes>
          <Route path="/"                element={<Home></Home>}></Route>
          <Route path="/juego/:id"       element={<Juego></Juego>}> </Route>      
          <Route path="/favoritos/:id"   element={<Favoritos></Favoritos>}></Route>
          <Route path="/perfil/:id"      element={<Perfil></Perfil>}> </Route>
          <Route path="/acercaDe"      element={<AcercaDe></AcercaDe>}> </Route>
        </Routes>
      </IdiomaContext.Provider>
    </div>
  );
}

export default App

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import StoreProvider from './providers/Store';
import IdiomaContext from './contextos/IdiomaContext';
import useIdiomas from './hooks/useIdiomas';
import losIdiomas from './mocks/mock-idiomas';
import ProtectedRoutes from './componentes/ProtectedRoutes/ProtectedRoutes';

import Navbar from './componentes/Navbar/Navbar';
import Home from './paginas/HOME/Home';
import Juego from './paginas/JUEGO/Juego';
import Favoritos from './paginas/FAVORITOS/Favoritos';
import Perfil from './paginas/PERFIL/Perfil';
import AcercaDe from './paginas/ACERCA_DE/AcercaDe';
import Login from './paginas/LOGIN/Login';
import Register from './paginas/REGISTER/Register';


function App() {
  const idiomas = useIdiomas();

  const NavbarComponent = (
    // En el componente idiomas está la función para que el componente nieto pueda modificar el idioma seleccionado
    <IdiomaContext.Provider value={idiomas}>
      <Navbar />
    </IdiomaContext.Provider>
  );

  return (
    <div className='container-fluid'>
      {/* Aquí enviamos el idioma seleccionado */}
      <StoreProvider>
        <IdiomaContext.Provider value={losIdiomas[idiomas.idiomaElegido]}>
          {NavbarComponent}
          <Routes>
            <Route path="/"              element={
              <>
                <Home />
              </>
            } />
            <Route path="/login"         element={<Login />} />
            <Route path="/register"      element={<Register />}/>
            <Route path="/acercaDe"      element={<AcercaDe />} />

            <Route element={<ProtectedRoutes />} >
              <Route path="/favoritos/:id" element={
                <>
                  <Favoritos />
                </>
              } />
              <Route path="/juego/:idJuego"     element={
                <>
                  <Juego />
                </>
              } />   
              <Route path="/perfil/:id"    element={
                <>
                  <Perfil />
                </>
              } /> 
            </Route>
          </Routes>
        </IdiomaContext.Provider>
      </StoreProvider>
    </div>
  );
}

export default App

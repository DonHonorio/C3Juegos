import { useState } from 'react';
import './App.css';
import Navbar from './componentes/Navbar/Navbar';
import Home from './paginas/HOME/Home';
import Login from './paginas/LOGIN/Login';
import Register from './paginas/REGISTER/Register';
import Juego from './paginas/JUEGO/Juego';
import Favoritos from './paginas/FAVORITOS/Favoritos';
import Perfil from './paginas/PERFIL/Perfil';
import AcercaDe from './paginas/ACERCA_DE/AcercaDe';
import IdiomaContext from './contextos/IdiomaContext';
import { AuthProvider } from './contextos/AuthProvider';
import losIdiomas from './mocks/mock-idiomas';
import useIdiomas from './hooks/useIdiomas';

import { Routes, Route } from 'react-router-dom';

function App() {
  const idiomas = useIdiomas();

  const NavbarComponent = (
    // En el componente idiomas está la función para que el componente nieto pueda modificar el idioma seleccionado
    <IdiomaContext.Provider value={idiomas}>
      <Navbar></Navbar>
    </IdiomaContext.Provider>
  );

  return (
    <div className='container-fluid'>
      

      {/* Aquí enviamos el idioma seleccionado */}
      <AuthProvider>
        <IdiomaContext.Provider value={losIdiomas[idiomas.idiomaElegido]}>
          <Routes>
            <Route path="/login"         element={<Login />} />
            <Route path="/register"      element={<Register />} />

            <Route path="/"              element={
              <>
                {NavbarComponent}
                <Home />
              </>
            } />
            <Route path="/juego/:id"     element={
              <>
                {NavbarComponent}
                <Juego />
              </>       
            } />
            <Route path="/favoritos/:id" element={
              <>
                {NavbarComponent}
                <Favoritos />
              </>
            } />
            <Route path="/perfil/:id"    element={
              <>
                {NavbarComponent}
                <Perfil />
              </> 
            } />
            <Route path="/acercaDe"      element={
              <>
                {NavbarComponent}
                <AcercaDe />
              </>
            } />
          </Routes>
        </IdiomaContext.Provider>
      </AuthProvider>

    </div>
  );
}

export default App

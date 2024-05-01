import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { getLogout } from '../servicios/getLogout';
import { postLogin } from '../servicios/postLogin';
import { postRegister } from '../servicios/postRegister';

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

    const register = async (data) => {
        // Aquí llamamos a la API para registrarnos y guardar el resultado en el estado
        try {
          const response = await postRegister(data);
          setAuth(response);
        } catch (error) {
          console.error('Hubo un error al enviar los datos del formulario', error);
        };
        
    };

    const login = async (data) => {
        // Aquí llamamos a la API para logearnos y guardar el resultado en el estado
        try {
          const response = await postLogin(data);
          setAuth(response);
        } catch (error) {
          console.error('Hubo un error al enviar los datos del formulario', error);
        };
        
    };

    const logout = async () => {
      try {
        const response = await getLogout();
        console.log('LOGOUT MESSAGE: ', response);
      } catch (error) {
          console.error('Hubo un error al cerrar la sesión', error);
      }
      setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}
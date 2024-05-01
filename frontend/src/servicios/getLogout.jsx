import axios from 'axios'

export const getLogout = async () => {

  const endpoint = 'http://localhost:8000/api';

  const token = localStorage.getItem('authToken');

  if (token) {
    // Si el token existe, configura el encabezado de autorización
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Intentamos hacer la petición de logout a al api con el token de autenticación
    try {
      const response = await axios.get(`${endpoint}/logout`);
      
      // Elimina el token del almacenamiento local
      localStorage.removeItem('authToken');
      
      return response.data;
    } catch (error) {
      console.log('Hubo un error al cerrar la sesión', error);
    };
    
} else {
    // Si el token no existe, el usuario no está autenticado
    console.log('El usuario no está autenticado');
}


}
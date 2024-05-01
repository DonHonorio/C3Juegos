import axios from 'axios'

export const postLogin = async ( data ) => {

  const endpoint = 'http://localhost:8000/api';

  try {
    const response = await axios.post(`${endpoint}/login`, data);

    // Almacena el token en el almacenamiento local
    localStorage.setItem('authToken', response.data.accessToken);

    // console.log('RESPONSE DATA: ', response.data);
    return response.data;
  } catch (error) {
      console.error('Hubo un error al enviar los datos del formulario', error);
  };

}
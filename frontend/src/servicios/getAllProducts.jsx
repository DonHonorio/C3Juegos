import axios from 'axios'

export const getAllProducts = async () => {

  const endpoint = 'http://localhost:8000/api';

  const response = await axios.get(`${endpoint}/products`);
  return response.data;
}
// export function getAllProducts () {

//   // Usamos fetch para recuperar los alumnos de la REST API. Puesto que hacemos
//   // una petición al servidor y esta puede tardar un tiempo en resolverse usaremos
//   // una promesa, la respuesta de la REST API es los que devolvemos

//   const endpoint = 'http://localhost:8000/api/products';

//   try {
//         return fetch(endpoint)
//         .then(response => {
//               const data = response.json();
//               // console.log(data);
//               return data;
//         })
//   } catch (error) {
//         console.error(error);
//   }

// }
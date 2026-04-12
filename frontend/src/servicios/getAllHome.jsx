import axios from 'axios'

export const getAllHome = async () => {

  const endpoint =  import.meta.env.VITE_API_BASE_URL + '/api';

  const response = await axios.get(`${endpoint}/home`);
  return response.data;
}
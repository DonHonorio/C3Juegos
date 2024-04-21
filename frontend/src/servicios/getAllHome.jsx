import axios from 'axios'

export const getAllHome = async () => {

  const endpoint = 'http://localhost:8000/api';

  const response = await axios.get(`${endpoint}/home`);
  return response.data;
}
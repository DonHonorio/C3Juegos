import axios from 'axios'

export const getAllGames = async () => {

  const endpoint = import.meta.env.VITE_API_BASE_URL + '/api';

  const response = await axios.get(`${endpoint}/games`);
  return response.data;
}
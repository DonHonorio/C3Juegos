import axios from 'axios'

export const getAllGames = async () => {

  const endpoint = 'http://localhost:8000/api';

  const response = await axios.get(`${endpoint}/games`);
  return response.data;
}
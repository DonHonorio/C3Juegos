import axios from 'axios'

axios.defaults.headers.common = {}
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getAllGames = async () => {

  const endpoint = import.meta.env.VITE_API_BASE_URL + '/api';

  const response = await axios.get(`${endpoint}/games`);
  return response.data;
}
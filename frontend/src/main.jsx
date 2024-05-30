import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import '@fortawesome/fontawesome-free/css/all.min.css'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_BASE_URL;

window.axios = axios
window.axios.defaults.baseURL = API_URL;
window.axios.defaults.headers.common['Accept'] = 'application/json'
window.axios.defaults.headers.common['Content-Type'] = 'application/json'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
)

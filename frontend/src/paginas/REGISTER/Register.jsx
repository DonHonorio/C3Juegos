import React, { useState, useContext } from 'react'
import { AuthContext } from '../../contextos/AuthContext';
import { useNavigate } from 'react-router-dom';
import juegoRankingSrc1 from './../../assets/img/juegos/ranking/FotoJuegoRanking1.svg';
import './Register.css';

const Register = () => {

  const navigate = useNavigate();
  const { register } = useContext(AuthContext);


  // estado con los datos del formulario
  const [datosForm, setDatosForm] = useState({
    nickname: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {
        nickname: datosForm.nickname,
        email: datosForm.email,
        password: datosForm.password,
      };

      // Enviar los datos del formulario al servidor
      await register(data);

      // Redirige al landing page
      navigate('/');

  };

  return (
    <div className="row justify-content-center align-items-center" id='login'>
      <div className="col-md-5 p-5">
        <img src={juegoRankingSrc1} alt="Imagen login de usuarios" className="img-fluid"/>
      </div>

      <div className="col-md-5 bg-white rounded-lg shadow">
        <form method="POST" onSubmit={handleSubmit}>
          {/* @csrf */}

          <div className="mb-3">
            <label htmlFor="nickname" className="form-label text-uppercase text-gray-500 font-weight-bold">
              Nickname
            </label>
            <input 
              id="nickname"
              name="nickname"
              type="text"
              placeholder="El nombre con que los demás te conocerán"	
              className="form-control"
              value={datosForm.nickname}
              onChange={(event) => setDatosForm({...datosForm, nickname: event.target.value})}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-uppercase text-gray-500 font-weight-bold">
              Email
            </label>
            <input 
              id="email"
              name="email"
              type="text"
              placeholder="Tu Email de Registro"
              className="form-control"
              value={datosForm.email}
              onChange={(event) => setDatosForm({...datosForm, email: event.target.value})}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-uppercase text-gray-500 font-weight-bold">
              Password
            </label>
            <input 
              id="password"
              name="password"
              type="password"
              placeholder="Password de Registro"
              className="form-control"
              value={datosForm.password}
              onChange={(event) => setDatosForm({...datosForm, password: event.target.value})}
            />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" name="remember" className="form-check-input" id="remember"/>
            <label className="form-check-label text-gray-500">
              Mantener mi sesión abierta
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
          >
            Iniciar Sesión
          </button>

        </form>
      </div>
    </div>
  )
}

export default Register;






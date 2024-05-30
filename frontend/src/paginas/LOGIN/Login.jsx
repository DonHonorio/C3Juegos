import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import sendRequest from '../../servicios/functions';
import storage from '../../Storage/storage';
import './Login.css';

import juegoRankingSrc1 from './../../assets/img/juegos/ranking/FotoJuegoRanking1.svg';
import DivInput from '../../componentes/DivInput/DivInput';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navegar = useNavigate();

  const csrf = async() => {
    await axios.get('/sanctum/csrf-cookie');
  }

  const login = async(e) => {
    e.preventDefault();
    await csrf();

    const form = {email: email, password:password};
    const respuesta = await sendRequest('POST', form, '/api/login','',true, false);
    if(respuesta.status == true){
      storage.set('authToken', respuesta.token);
      storage.set('authUser', JSON.stringify(respuesta.user));
      navegar('/');
    }
  }

  return (
    <>
      <div id='login'>
        <div className="row">
          <div className="mt-5">
            <div className="col-md-4 offset-md-4">
              <div className="card border border-primary">
                <div className="card-header bg-primary border border-primary text-white">
                  LOGIN
                </div>
                <div className="card-body">
                  <form onSubmit={login}>
                    <DivInput type='email' icon='fa-at' value={email}
                    className='form-control' placeholder='Email' required="required"
                    handleChange={ (e) => setEmail(e.target.value) } />
                    <DivInput type='password' icon='fa-key' value={password}
                    className='form-control' placeholder='Password' required="required"
                    handleChange={ (e) => setPassword(e.target.value) } />
                    <div className="d-grid col-10 mx-auto">
                      <button className="btn btn-dark">
                        <i className='fa-solid fa-door-open'></i> Login
                      </button>
                    </div>
                  </form>

                  <Link to='/register'>
                      <i className="fa-solid fa-user-plus"></i> Register
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login
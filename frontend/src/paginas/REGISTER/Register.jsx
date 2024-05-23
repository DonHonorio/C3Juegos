import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import sendRequest from '../../servicios/functions';
import storage from '../../Storage/storage';

import DivInput from '../../componentes/DivInput/DivInput';
import Modal from '../../componentes/Modal';

const Register = () => {

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navegar = useNavigate();

  const csrf = async() => {
    await axios.get('/sanctum/csrf-cookie');
  }

  const register = async(e) => {
    e.preventDefault();
    await csrf();

    const form = {nickname: nickname, email: email, password:password};
    const respuesta = await sendRequest('POST', form, '/api/register','',true, false);

    if(respuesta.status == true){
      storage.set('authToken', respuesta.token);
      storage.set('authUser', JSON.stringify(respuesta.user));
      navegar('/');
    }
  }

  // const openModal = () => {
  //   NO es obligatoria esta función (aquí puedes hacer otras cosas)
  // }

  return (
    <>
    <div className="container-fluid" id='login'>
      <div className="row">
        <div className="mt-5">
          <div className="col-md-4 offset-md-4">
            <div className="card border border-primary">
              <div className="card-header bg-primary border border-primary text-white">
                  REGISTER
              </div>
              <div className="card-body">
                <form onSubmit={register}>
                  <DivInput type='text' icon='fa-user' value={nickname}
                  className='form-control' placeholder='Nickname' required="required"
                  handleChange={ (e) => setNickname(e.target.value) } />
                  <DivInput type='email' icon='fa-at' value={email}
                  className='form-control' placeholder='Email' required="required"
                  handleChange={ (e) => setEmail(e.target.value) } />
                  <DivInput type='password' icon='fa-key' value={password}
                  className='form-control' placeholder='Password' required="required"
                  handleChange={ (e) => setPassword(e.target.value) } />
                  <div className="d-grid col-10 mx-auto">
                    <button className="btn btn-dark">
                      <i className='fa-solid fa-door-open'></i> Register
                    </button>
                  </div>
                </form>

                <Link to='/login'>
                    <i className="fa-solid fa-user"></i> Login
                </Link>

              </div>
            </div>

            {/* <button className='btn btn-dark' data-bs-toggle='modal'
              data-bs-target='#miModal' onClick={() => openModal()}> //No es obligatorio la funcion openModal para abir el modal
              <i className="fa-solid fa-circle-plus"></i> Add
            </button> */}

          </div>

          {/* <Modal title='Mi primer modal' modal='miModal'>
            <div className="modal-body">
              <div className='col-md-6 offset-md-3'>
                <h1>Mi primer modal funciona bien</h1>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-dark" data-bs-dismiss='modal'
              ref={close}>Close</button>
            </div>
          </Modal> */}
        </div>
      </div>
    </div>
    </>
  );
}

export default Register
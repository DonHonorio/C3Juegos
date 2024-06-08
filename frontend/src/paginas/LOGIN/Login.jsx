import React,{ useState, useContext, useEffect } from 'react'
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import sendRequest, { show_alerta } from '../../servicios/functions';
import storage from '../../Storage/storage';

import { Input } from 'antd';

import IdiomaContext from '../../contextos/IdiomaContext';
import './Login.css';
import Boton from '../../componentes/Boton/Boton';

const Login = () => {
  const idioma = useContext(IdiomaContext);
  const navegar = useNavigate();

  // datos del formulario rellenados por el usuario
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  function navegarHome() {
    navegar("/");
  } 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const respuesta = await sendRequest('POST', formData, `/api/login`,'',false, false);

    if(respuesta.status == true){
      storage.set('authToken', respuesta.token);
      storage.set('authUser', JSON.stringify(respuesta.user));
      navegar('/');
      show_alerta(respuesta.message, 'success');
    } else {
      setErrors(respuesta.errors);
    }
  };

  return (
    <section className='row'>

      <form onSubmit={handleSubmit} className='container-lg' id='login'>

        <div className="row">
          <h1>{idioma.navbar.iniciar_sesion}</h1>
        </div>
        
        <div className="row campos">

          {/* Dirección de Correo */}
          <div className="col-12 campo">
            <p className='nombreCampo'>{idioma.perfil.direccionDeCorreo}</p>
            <Input placeholder={idioma.perfil.direccionDeCorreo}
              onChange={handleChange}
              name='email'
              value={formData.email || ''}
              status={errors.password ? "error" : ''}
            />
          </div>

          {/* Contraseña */}
          <div className="col-12 campo">
            <p className='nombreCampo'>{idioma.perfil.passwordNueva}</p>
            <Input.Password
              prefix={<UserOutlined />}
              onChange={handleChange}
              value={formData.password || ''}
              name='password'
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              status={errors.password ? "error" : ''}
            />
          </div>

          {(errors && errors.password) ? errors.password.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>

        <div className="row">
          <div className="col-12 botonera gap-2 d-flex justify-content-center justify-content-md-end flex-wrap">
            <div className='botonCancelar'>
              <Boton value={idioma.perfil.botonera.cancelar} buttonFunction={navegarHome} />
            </div>
            <div className="botonGuardar">
              <Boton 
                value={idioma.navbar.iniciar_sesion}
                type="submit"
                />
            </div>
          </div>
        </div>
        
      </form>

    </section>
  )
}

export default Login

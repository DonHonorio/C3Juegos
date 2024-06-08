import React,{ useState, useContext, useEffect } from 'react'
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import sendRequest, { show_alerta } from '../../servicios/functions';
import { Input } from 'antd';
import storage from '../../Storage/storage';

import IdiomaContext from '../../contextos/IdiomaContext';
import LineaDivisoria from '../../componentes/LineaDivisoria/LineaDivisoria';
import './Register.css';
import Boton from '../../componentes/Boton/Boton';

const Register = () => {
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

    const respuesta = await sendRequest('POST', formData, `/api/register`,'',false, false);

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

      <form onSubmit={handleSubmit} className='container-lg' id='register'>

        <div className="row">
          <h1>{idioma.navbar.registrarse}</h1>
        </div>
        
        <div className="row campos">
          {/* Nombre */}
          <div className="col-12 col-md-6 campo">
            <p className='nombreCampo'>{idioma.perfil.nombre}</p>
            <Input placeholder={idioma.perfil.nombre}
              onChange={handleChange}
              name='name'
              value={formData.name || ''}
              status={(errors && errors.name) ? "error" : ''}
            />
            {(errors && errors.name) ? errors.name.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
          </div>
          {/* Apellidos */}
          <div className="col-12 col-md-6 campo">
            <p className='nombreCampo'>{idioma.perfil.apellidos}</p>
            <Input placeholder={idioma.perfil.apellidos}
              onChange={handleChange}
              name='apellidos'
              value={formData.apellidos || ''}
              status={(errors && errors.apellidos) ? "error" : ''}
            />
            {(errors && errors.apellidos) ? errors.apellidos.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
          </div>

          {/* NickName */}
          <div className="col-12 col-md-6 campo">
            <p className='nombreCampo'>{idioma.perfil.nickname}</p>
            <Input placeholder={idioma.perfil.nickname}
              onChange={handleChange}
              name='nickname'
              value={formData.nickname || ''}
              status={(errors && errors.nickname) ? "error" : ''}
            />
            {(errors && errors.nickname) ? errors.nickname.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
          </div>
          {/* Modulo */}
          <div className="col-12 col-md-6 campo">
            <p className='nombreCampo'>{idioma.perfil.modulo}</p>
            <Input placeholder={idioma.perfil.modulo}
              onChange={handleChange}
              name='modulo'
              value={formData.modulo || ''}
              status={(errors && errors.modulo) ? "error" : ''}
            />
            {(errors && errors.modulo) ? errors.modulo.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
          </div>

          <LineaDivisoria />
          {/* Dirección de Correo */}
          <div className="col-12 col-md-8 col-lg-6 campo">
            <p className='nombreCampo'>{idioma.perfil.direccionDeCorreo}</p>
            <Input placeholder={idioma.perfil.direccionDeCorreo}
              onChange={handleChange}
              name='email'
              value={formData.email || ''}
              status={(errors && errors.email) ? "error" : ''}
            />
            {(errors && errors.email) ? errors.email.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
          </div>
          {/* Separador */}
          <div className='col-md-4 col-lg-6' />
          <LineaDivisoria />


          {/* Contraseña */}
          <div className="col-12 col-md-6 campo">
            <p className='nombreCampo'>{idioma.perfil.passwordNueva}</p>
            <Input.Password
              prefix={<UserOutlined />}
              onChange={handleChange}
              value={formData.password || ''}
              name='password'
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              status={(errors && errors.password) ? "error" : ''}
            />
            {(errors && errors.password) ? errors.password.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
          </div>
          {/* Confirmar Contraseña */}
          <div className="col-12 col-md-6 campo">
            <p className='nombreCampo'>{idioma.perfil.passwordConfirmar}</p>
            <Input.Password
              prefix={<UserOutlined />}
              onChange={handleChange}
              value={formData.password_confirmation || ''}
              name='password_confirmation'
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              status={(errors && errors.password_confirmation) ? "error" : ''}
            />
            {(errors && errors.password_confirmation) ? errors.password_confirmation.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
          </div>
        </div>

        <div className="row">
          <div className="col-12 botonera gap-2 d-flex justify-content-center justify-content-md-end flex-wrap">
            <div className='botonCancelar'>
              <Boton value={idioma.perfil.botonera.cancelar} buttonFunction={navegarHome} />
            </div>
            <div className="botonGuardar">
              <Boton 
                value={idioma.navbar.registrarse}
                type="submit"
                />
            </div>
          </div>
        </div>
        
      </form>

    </section>
  )
}

export default Register

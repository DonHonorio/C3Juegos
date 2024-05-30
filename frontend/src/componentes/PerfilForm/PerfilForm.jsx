import React,{ useState, useContext, useEffect } from 'react'
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import sendRequest from '../../servicios/functions';
import storage from '../../Storage/storage';
import { Input } from 'antd';

import IdiomaContext from '../../contextos/IdiomaContext';
import LineaDivisoria from '../LineaDivisoria/LineaDivisoria';
import './PerfilForm.css';
import Boton from '../Boton/Boton';

const PerfilForm = ({user, updateUser}) => {
  const idioma = useContext(IdiomaContext);

  // datos del formulario rellenados por el usuario
  const [formData, setFormData] = useState({});
  // datos iniciales del usuario
  const [initialData, setInitialData] = useState({});
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    setInitialData(user);
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const csrf = async() => {
    await axios.get('/sanctum/csrf-cookie');
  }

  // función que evitar enviar campos vacíos al servidor, cuando el usuario ha empezado a escribir en un campo y luego lo ha dejado vacío
  // ya que si no escribe nada en el campo se queda con el valor inicial, pero si escribe algo y luego lo borra, el campo queda vacío
  function arreglarFormulario(obj) {
    // Recorre cada campo en formData
    for (let campo in obj) {
      // Si el campo está vacío, asigna el valor del campo correspondiente en initialData
      obj[campo] = obj[campo] || initialData[campo];
    }
    return obj;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();

    
    // Combinar formData con initialData para obtener los valores finales
    const updatedData = { ...initialData, ...arreglarFormulario(formData) };

    const respuesta = await sendRequest('PUT', updatedData, `/api/user/${user.id}`,'',false, true);

    if(respuesta.status == true){
      updateUser(respuesta.user);
      setFormData({});
      setErrors([]);
    } else {
      setErrors(respuesta.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} id='perfilForm'>
      
      <div className="row campos">
        {/* Nombre */}
        <div className="col-12 col-md-6">
          <p>{idioma.perfil.nombre}</p>
          <Input placeholder={initialData.name}
            onChange={handleChange}
            name='name'
            value={formData.name || ''}
            status={(errors && errors.name) ? "error" : ''}
          />
          {(errors && errors.name) ? errors.name.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>
        {/* Apellidos */}
        <div className="col-12 col-md-6">
          <p>{idioma.perfil.apellidos}</p>
          <Input placeholder={initialData.apellidos}
            onChange={handleChange}
            name='apellidos'
            value={formData.apellidos || ''}
            status={(errors && errors.apellidos) ? "error" : ''}
          />
          {(errors && errors.apellidos) ? errors.apellidos.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>

        {/* NickName */}
        <div className="col-12 col-md-6">
          <p>{idioma.perfil.nickname}</p>
          <Input placeholder={initialData.nickname}
            onChange={handleChange}
            name='nickname'
            value={formData.nickname || ''}
            status={(errors && errors.nickname) ? "error" : ''}
          />
          {(errors && errors.nickname) ? errors.nickname.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>
        {/* Modulo */}
        <div className="col-12 col-md-6">
          <p>{idioma.perfil.modulo}</p>
          <Input placeholder={initialData.modulo}
            onChange={handleChange}
            name='modulo'
            value={formData.modulo || ''}
            status={(errors && errors.modulo) ? "error" : ''}
          />
          {(errors && errors.modulo) ? errors.modulo.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>

        <LineaDivisoria />
        {/* Dirección de Correo */}
        <div className="col-12 col-md-8 col-lg-6">
          <p>{idioma.perfil.direccionDeCorreo}</p>
          <Input placeholder={initialData.email}
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


        {/* Contraseña Actual */}
        <div className="col-12 col-md-6">
          <p>{idioma.perfil.passwordActual}</p>
          <Input.Password
            prefix={<UserOutlined />}
            onChange={handleChange}
            value={formData.old_password || ''}
            name='old_password'
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            status={(errors && errors.old_password) ? "error" : ''}
          />
          {(errors && errors.old_password) ? errors.old_password.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>
        {/* Nueva Contraseña */}
        <div className="col-12 col-md-6">
          <p>{idioma.perfil.passwordNueva}</p>
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
        {/* Confirmar Nueva Contraseña */}
        <div className="col-12">
          <p>{idioma.perfil.passwordConfirmar}</p>
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
        <div className="col-12 botonera d-flex justify-content-end">
          <div className='botonCancelar'>
            <Boton value={idioma.perfil.botonera.cancelar} />
          </div>
          <div className="botonGuardar">
            <Boton 
              value={idioma.perfil.botonera.guardar}
              type="submit"
              />
          </div>
        </div>
      </div>
      
    </form>
  )
}

export default PerfilForm
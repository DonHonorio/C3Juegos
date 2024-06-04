import React,{ useState, useContext, useEffect } from 'react'
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const API_URL = import.meta.env.VITE_API_BASE_URL;
import { Input } from 'antd';
import storage from "../../Storage/storage";

import IdiomaContext from '../../contextos/IdiomaContext';
import LineaDivisoria from '../LineaDivisoria/LineaDivisoria';
import './VideojuegoForm.css';
import VideojuegoInput from '../VideojuegoInput/VideojuegoInput';

const VideojuegoForm = React.forwardRef(({user, updateUser}, ref) => {
  const idioma = useContext(IdiomaContext);
  const authToken = storage.get("authToken");

  // datos del formulario rellenados por el usuario
  const [formData, setFormData] = useState({});
  // lista de ficheros subidos por el usuario
  const [fileList, setFileList] = useState([]);
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
    if (e) e.preventDefault();
    await csrf();
  
    console.log('Uploading files:', fileList);
    const sendForm = new FormData();
    for (let key in formData) {
      sendForm.append(key, formData[key]);
    }
    fileList.forEach((file) => {
      sendForm.append('files[]', file.originFileObj);
    });
    
    try {
      const respuesta = await axios.post(`${API_URL}/api/game`, sendForm, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: ({ total, loaded }) => {
          const percent = Math.round((loaded / total) * 100);
          console.log(`Upload progress: ${percent}%`); // Porcentaje de subida
        },
      });
      const response = respuesta.data;
  
      if(response.status === true){
        // updateUser(response.user);
        // setFormData({...formData, controles: '', historia: '', genero: '', nombreJuego: '', portada: ''});
        setFormData({});
        setErrors([]);
        console.log('HA SIDO EXITOSO:', response.message);
      } else {
        console.log('HA FALLADO LA SUBIDA:', response.errors);
        setErrors(response.errors);
      }
    } catch (error) {

      console.error('Upload failed:', error); // Error en la subida
    }
    

  };
  
  ref.current = { handleSubmit  };

  return (
    <form id='perfilForm'>
      
      <div className="row campos">
        {/* Nombre Juego */}
        <div className="col-12 col-md-6">
          <p>{idioma.perfil.videojuego.formulario.nombreJuego}</p>
          <Input placeholder={'Nombre del Juego'}
            onChange={handleChange}
            name='nombreJuego'
            value={formData.nombreJuego || ''}
            status={(errors && errors.nombreJuego) ? "error" : ''}
          />
          {(errors && errors.nombreJuego) ? errors.nombreJuego.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>
        {/* Genero */}
        <div className="col-12 col-md-6">
          <p>{idioma.perfil.videojuego.formulario.genero}</p>
          <Input placeholder={'Género'}
            onChange={handleChange}
            name='genero'
            value={formData.genero || ''}
            status={(errors && errors.genero) ? "error" : ''}
          />
          {(errors && errors.genero) ? errors.genero.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>

        {/* Historia */}
        <div className="col-12 col-md-6">
          <p>{idioma.perfil.videojuego.formulario.historia}</p>
          <Input placeholder={'Historia'}
            onChange={handleChange}
            name='historia'
            value={formData.historia || ''}
            status={(errors && errors.historia) ? "error" : ''}
          />
          {(errors && errors.historia) ? errors.historia.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>
        {/* Controles */}
        <div className="col-12 col-md-6">
          <p>{idioma.perfil.videojuego.formulario.controles}</p>
          <Input placeholder={'Controles (Información que el usuario necesita saber para jugar al juego)'}
            onChange={handleChange}
            name='controles'
            value={formData.controles || ''}
            status={(errors && errors.controles) ? "error" : ''}
          />
          {(errors && errors.controles) ? errors.controles.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>

        <LineaDivisoria />
        {/* Portada */}
        <div className="col-12 col-md-8 col-lg-6">
          <p>{idioma.perfil.videojuego.formulario.portada}</p>
          <Input placeholder={'Portada del Juego (Imagen)'}
            onChange={handleChange}
            name='portada'
            value={formData.portada || ''}
            status={(errors && errors.portada) ? "error" : ''}
          />
          {(errors && errors.portada) ? errors.portada.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>
        {/* Separador */}
        <div className='col-md-4 col-lg-6' />
        <LineaDivisoria />

      </div>

      {/* Videojuego */}
      <div className="row">
        <div className="col-12">
          <VideojuegoInput setFileList={setFileList} fileList={fileList} formData={formData} setFormData={setFormData}/>
        </div>
        <div className="col-12">
          {(errors && errors.fichero) ? errors.fichero.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
          {(errors && errors.error) ? errors.error.map((error, index) => <p className='error' key={index}>{error}</p>) : ''}
        </div>
      </div>
      
    </form>
  )
})

export default VideojuegoForm
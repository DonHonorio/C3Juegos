import React,{ useState, useContext, useEffect } from "react";
import IdiomaContext from "../../contextos/IdiomaContext";
import axios from 'axios';
import storage from "../../Storage/storage";
const API_URL = import.meta.env.VITE_API_BASE_URL;

import { Upload, Button, Switch } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';


const VideojuegoInput = ({ fileList, setFileList, formData, setFormData }) => {
  const idioma = useContext(IdiomaContext);
  const [switchValue, setSwitchValue] = useState(true);
  const authToken = storage.get("authToken");

  const readFiles = async () => {
    const filePromises = fileList.map((file) => {
      return new Promise((resolve, reject) => {
        const extension = file.name.split('.').pop().toLowerCase();
      
        if (['html'].includes(extension)) {
          const reader = new FileReader();
          reader.onload = function(e) {
            // contenido del fichero
            let content = e.target.result;
        
            let oldUrl = /(src=['"])[^'"]*\/(?=[^'"]*['"])/g;
            let newUrl = `src="/juegos/${12}/${'nuevoJuego'}/`;
        
            // Reemplaza todas las ocurrencias de la URL antigua por la nueva
            content = content.replace(oldUrl, newUrl);
  
            // Crea un nuevo Blob con el contenido modificado
            let blob = new Blob([content], {type: file.originFileObj.type});
  
            // Crea un nuevo objeto File a partir del Blob
            let newFile = new File([blob], file.originFileObj.name, {type: file.originFileObj.type});
            newFile.originFileObj = file.originFileObj;
  
            // Resuelve la promesa con el nuevo archivo
            resolve(newFile);
          };
          reader.onerror = reject;
          reader.readAsText(file.originFileObj);
        } else {
          resolve(file);
        }
      });
    });
  
    const newFiles = await Promise.all(filePromises);
    setFileList(newFiles);
    console.log('YA SE HA SUBIDO:', newFiles);
  }

  useEffect(() => {
    console.log('FileList:', fileList);
  }, [fileList]);

  const csrf = async() => {
    await axios.get('/sanctum/csrf-cookie');
  }

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();
  
    console.log('Uploading files:', fileList);
    const sendForm = new FormData();
    sendForm.append('nombreJuego', 'mejor juego del mundo');
    sendForm.append('genero', 'RPG');
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
        setFormData({...formData, fileList: fileList});
        // setErrors([]);
        console.log('EXITOSO la subida:', response.message);
      } else {
        console.log('FALLADO la subida:', response.errors);
        // setErrors(response.errors);
      }
    } catch (error) {

      console.error('Upload failed:', error); // Error en la subida
    }
    

  };

  return (
    <>
    <Upload
      name="file"
      multiple
      directory={switchValue}
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={() => false} // Evita la subida automática
    >
      {/* Botón Sube Ficheros */}
      <Button icon={<UploadOutlined />}>{switchValue ? `Sube tu ${idioma.perfil.videojuego.carpeta}` : `Sube tus ${idioma.perfil.videojuego.fichero}`}</Button>
    </Upload>
    {/* Enviar */}
    <Button onClick={handleSubmit}>{idioma.perfil.videojuego.boton}</Button>
    {/* Botón Quitar Ficheros */}
    <Button icon={<DeleteOutlined />} onClick={() => setFileList([])}>{idioma.perfil.videojuego.quitarFicheros}</Button>
    {/* Botón Leer Archvios */}
    <div >
      {idioma.perfil.videojuego.switch}
      <Switch defaultChecked onChange={checked => { setSwitchValue(checked)}} />
      {switchValue ? <p>{idioma.perfil.videojuego.carpeta}</p> : <p>{idioma.perfil.videojuego.fichero}</p>}
    </div>
    </>
  );
};

export default VideojuegoInput;
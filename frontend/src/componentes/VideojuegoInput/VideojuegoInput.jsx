import React,{ useState, useContext, useEffect } from "react";
import IdiomaContext from "../../contextos/IdiomaContext";
import { Upload, Button, Switch } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';


const VideojuegoInput = ({ fileList, setFileList }) => {
  const idioma = useContext(IdiomaContext);
  const [switchValue, setSwitchValue] = useState(true);
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

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  }

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
    {/* Botón Quitar Ficheros */}
    <Button icon={<DeleteOutlined />} onClick={() => setFileList([])}>{idioma.perfil.videojuego.quitarFicheros}</Button>
    {/* Botón Leer Archvios */}
    <div >
      {switchValue ? <p>{idioma.perfil.videojuego.carpeta}</p> : <p>{idioma.perfil.videojuego.fichero}</p>}
      <Switch defaultChecked onChange={checked => { setSwitchValue(checked)}} />
    </div>
    </>
  );
};

export default VideojuegoInput;
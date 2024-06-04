import React, { createRef, useContext, useState } from "react";
import storage from "../../Storage/storage";
import IdiomaContext from "../../contextos/IdiomaContext";
import { PictureOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import VideojuegoForm from "../VideojuegoForm/VideojuegoForm";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const authToken = storage.get("authToken");

const SubirVideojuegoButton = ({ updateUser, user }) => {
  const idioma = useContext(IdiomaContext);
  const myFormComponentRef = createRef();

  // Modal: Ventana emergente
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    myFormComponentRef.current.handleSubmit();
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {idioma.perfil.videojuego.boton}
        <PictureOutlined />
      </Button>
      <Modal
        title={idioma.perfil.subirFoto.tituloVentana}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Contenido del modal */}
        <VideojuegoForm user={user} updateUser={updateUser} ref={myFormComponentRef}/>
        <button onClick={handleButtonClick}>Enviar</button>
      </Modal>
    </>
  );
};

export default SubirVideojuegoButton;

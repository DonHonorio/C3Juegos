import React, { createRef, useContext, useState } from "react";
import IdiomaContext from "../../contextos/IdiomaContext";
import { PictureOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import VideojuegoForm from "../VideojuegoForm/VideojuegoForm";

const SubirVideojuegoButton = () => {
  const idioma = useContext(IdiomaContext);
  const myFormComponentRef = createRef();

  // Modal: Ventana emergente
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleButtonClick();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    myFormComponentRef.current.handleSubmit();
  }

  return (
    <>
    <Button className="boton" 
      id="subirJuegoButton"
      block 
      onClick={showModal}>
      {idioma.perfil.videojuego.boton}
      <PictureOutlined />
    </Button>
    <Modal
      title={idioma.perfil.subirFoto.tituloVentana}
      open={isModalOpen}
      onOk={handleOk}
      okText={idioma.perfil.videojuego.publicar}
      cancelText={idioma.perfil.videojuego.cancelar}
      onCancel={handleCancel}
    >
      {/* Contenido del modal */}
      <VideojuegoForm ref={myFormComponentRef}/>
    </Modal>
    </>
  );
};

export default SubirVideojuegoButton;

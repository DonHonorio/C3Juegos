import React, { useContext, useState } from "react";
const API_URL = import.meta.env.VITE_API_BASE_URL;
import StoreContext from "../../contextos/StoreContext";
import storage from "../../Storage/storage";
import sendRequest from "../../servicios/functions";
import IdiomaContext from "../../contextos/IdiomaContext";
import { PictureOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Image, Upload } from "antd";
import ImgCrop from "antd-img-crop";

import "./SubirFotoButton.css";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const authToken = storage.get("authToken");

const SubirFotoButton = ({ updateUser, user }) => {
  const idioma = useContext(IdiomaContext);
  const { setAvatarUser, fileList, setFileList } = useContext(StoreContext);

  const csrfToken = async () => {
    return await axios.get("/sanctum/csrf-cookie");
  };

  // Upload: Subir imagen
  const [errors, setErrors] = useState({});

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = async (info) => {
    setFileList(info.fileList);
    console.log("INFO: ", info.fileList);
    if (info.file.status === "done") {
      if (info.file.response.status) {
        updateUser(info.file.response.user);
        setAvatarUser(
          `${API_URL}/api/user/fotoPerfil/${
            info.file.response.user.id
          }/?timestamp=${new Date().getTime()}`
        );
        console.log("AÑADIDO AVATAR: ");
        setErrors([]);
        console.log("DONE: ", info.file.response.message);
      } else {
        setErrors(info.file.response.errors);
      }
      // console.log(info.file.response); // Muestra la respuesta del servidor en la consola
    } else if (info.file.status === "removed") {
      const respuesta = await sendRequest(
        "DELETE",
        null,
        `/api/user/deleteFotoPerfil/${user.id}`,
        "",
        false,
        false
      );
      updateUser({ ...respuesta.user, fotoPerfil: null });
      setAvatarUser(null);
      setFileList([]);
      console.log("ELIMINADO AVATAR: ");
      setErrors([]);
    } else if (info.file.status === "error") {
      console.log("PASA POR AQUÍ");
      console.error(`${info.file.name} file upload failed.`);
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

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

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {idioma.perfil.subirFoto.boton}
        <PictureOutlined />
      </Button>
      <Modal
        title={idioma.perfil.subirFoto.tituloVentana}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Contenido del modal */}
        <ImgCrop rotationSlider>
          <Upload
            accept="image/*"
            name="fotoPerfil"
            action={`${API_URL}/api/uploadFotoPerfil`}
            headers={{
              "X-CSRF-TOKEN": csrfToken(),
              Authorization: `Bearer ${authToken}`,
            }}
            withCredentials
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList && fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </ImgCrop>
        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
        {errors && errors.fotoPerfil
          ? errors.fotoPerfil.map((error, index) => (
              <p className="text-danger error" key={index}>
                {error}
              </p>
            ))
          : ""}
      </Modal>
    </>
  );
};

export default SubirFotoButton;

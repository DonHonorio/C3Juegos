import React,{ useContext, useState} from 'react'
import IdiomaContext from '../../contextos/IdiomaContext';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import storage from '../../Storage/storage';
import { sendRequest, confirmation } from '../../servicios/functions';
import StoreContext from '../../contextos/StoreContext';

const BorrarCuentaButton = () => {
  const idioma = useContext(IdiomaContext);
  const authUser = useContext(StoreContext);

  // Modal: Ventana emergente
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async() => {
    setIsModalOpen(true);
  };

  const handleOk = async() => {
    console.log('BORRANDO CUENTA...');
    const respuesta = await sendRequest('DELETE', null, `/api/user/${authUser.id}`,'/login',false, false);
    // const respuesta2 = await confirmation('user', `/api/user/${authUser.id}`, '/login');

    if (respuesta.status) {
      console.log('CUENTA BORRADA', respuesta.message);
      storage.remove('authToken');
      storage.remove('authUser');
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button 
        id="borrarCuentaButton"
        className='boton'
        onClick={showModal}>
        {idioma.perfil.borrarCuenta} <ExclamationCircleOutlined />
      </Button>
      <Modal
        title={idioma.perfil.borrarCuenta}
        style={{ color: 'red', titleColor: '#f00' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ danger: true }}
        >
        <p>{idioma.perfil.confirmarBorrarCuenta}</p>
      </Modal>
    </>
  )
}

export default BorrarCuentaButton
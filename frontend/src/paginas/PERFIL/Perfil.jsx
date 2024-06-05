import React,{ useContext, useState, useCallback } from 'react';
import IdiomaContext from '../../contextos/IdiomaContext';
import storage from '../../Storage/storage';

import './Perfil.css';

import PerfilForm from '../../componentes/PerfilForm/PerfilForm';
import PerfilCard from '../../componentes/PerfilCard/PerfilCard';
import SubirFotoButton from '../../componentes/SubirFotoButton/SubirFotoButton';
import BorrarCuentaButton from '../../componentes/BorrarCuentaButton/BorrarCuentaButton';
import SubirVideojuegoButton from '../../componentes/SubirVideojuegoButton/SubirVideojuegoButton';

const Perfil = () => {
    const idioma = useContext(IdiomaContext);
    const [user, setUser] = useState(storage.get('authUser'));

    const updateUser = useCallback((updatedUser) => {
      setUser(updatedUser);
      storage.set('authUser', JSON.stringify(updatedUser));
    }, []);

    return (
      <article className='container-lg' id="perfil">
        <section className="row">
            <div className="col-12 titulo">
              <h1 className='text-white text-center'>{idioma.perfil.titulo}</h1>
            </div>
        </section>
        <section className="row perfilParteArriba">

          <PerfilCard user={user}/>

          <div className="col-12 col-sm-6 d-flex flex-column justify-content-evenly" id='botonesPerfil'>
            <div className='botonesArriba d-flex justify-content-evenly gap-4'>
              <SubirFotoButton updateUser={updateUser} user={user}/>
              <BorrarCuentaButton />
            </div>
            <div className='d-flex justify-content-center'>
              <SubirVideojuegoButton updateUser={updateUser} user={user}/>
            </div>
          </div>

        </section>
        <PerfilForm user={user} updateUser={updateUser}/>

      </article>
    );
};
export default Perfil;

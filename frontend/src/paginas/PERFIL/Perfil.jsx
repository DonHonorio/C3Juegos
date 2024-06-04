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
      <article className='container-xl' id="perfil">
        <section className="row">
            <div className="col-12 titulo">
              <h1 className='text-white text-center'>{idioma.perfil.titulo}</h1>
            </div>
        </section>
        <section className="row perfilParteArriba">

          <PerfilCard user={user}/>

          <div className="col-12 col-md-6">
            <SubirFotoButton updateUser={updateUser} user={user}/>
            <BorrarCuentaButton />
            <SubirVideojuegoButton updateUser={updateUser} user={user}/>
          </div>

        </section>
        <PerfilForm user={user} updateUser={updateUser}/>

      </article>
    );
};
export default Perfil;

import React, {useContext} from 'react'
import { useNavigate, Link, useLocation } from "react-router-dom";
import storage from '../../Storage/storage';

import './Navbar.css';
import IdiomaContext from '../../contextos/IdiomaContext';
import losIdiomas from '../../mocks/mock-idiomas';

import srcLogo from './../../assets/img/logoC3Juegos2.svg';
import Boton from '../Boton/Boton';
import Avatar from '../Avatar/Avatar';
import Idiomas from '../Idiomas/Idiomas';


const Navbar = () => {
    const navegar = useNavigate();
    let location = useLocation();
    const idiomas = useContext(IdiomaContext);
    const idioma = losIdiomas[idiomas.idiomaElegido];

    const authUser = (storage.get('authUser')) ? storage.get('authUser') : '';
    
    //navegamos al home
    function navegarHome() {
        navegar("/");
    }      

    const logout = async() => {
        //enviamos la petición de logout al servidor
        axios.defaults.headers.common['Authorization'] = 'Bearer '+storage.get('authToken');
        await axios.get('/api/logout');

        storage.remove('authToken');
        storage.remove('authUser');
        navegar('/');
    }

    // console.log('STORE GET', authUser);

    return (        
        //he usado un navbar de boostrap, que es responsive, y he añadido un botón para cambiar de idioma
        <nav className="navbar navbar-expand-lg row" id='navbar'>
            <a className="navbar-brand col-2 m-0" onClick={navegarHome}>
                <img src={srcLogo} className="d-inline-block align-top" alt="logoC3Juegos"/>
            </a>
            {/* botón para desplegar el menú en móvil */}
            <button className="navbar-toggler hamburguesa" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* resto del menú */}
            <div className="collapse navbar-collapse col-sm-12 col-lg-10 p-0" id="navbarNavDropdown">
                <ul className="navbar-nav row" id='listaNavbar'>
                    <li className="nav-item active col-7 p-0 text-center">
                        <div className="row d-flex align-items-center justify-content-around">
                            {(location.pathname === '/' ? <a href='#listaJuegos' className='col-sm-6 col-lg-3 enlace'>{idioma.navbar.ver_juegos}</a> : '')}
                            {(authUser ? 
                                <Link to={`/favoritos/${authUser.id}`} className="col-sm-6 col-lg-3">
                                    <p >{idioma.navbar.favoritos}</p>
                                </Link>
                                    : '' )}
                            <Link to="/acercaDe" className="col-sm-6 col-lg-3">
                                <p >{idioma.navbar.acerca_de}</p>
                            </Link>
                            <Idiomas />
                        </div>
                    </li>
                    {
                        (authUser) ? (
                            <li className="nav-item botonera botonera_avatar col-5 p-0">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-6 text-center">
                                        <Avatar nickname={authUser.nickname} id={authUser.id} />
                                    </div>
                                    <div className="col-sm-12 col-lg-6 d-flex justify-content-center align-items-center">
                                        <Boton 
                                            buttonFunction={logout} 
                                            clase={'botonRegistrarse botonCerrarSesion'}  
                                            value={idioma.navbar.cerrar_sesion} 
                                        />
                                    </div>
                                </div>
                            </li>
                        ) : (
                            <li className="nav-item botonera botonera_login col-5">
                                <div className='d-flex flex-column flex-lg-row gap-2 gap-lg-1 gap-xl-5'>
                                    <Link to="/register">
                                        <Boton value={idioma.navbar.registrarse}
                                            clase={'botonRegistrarse'}  
                                            />                                            
                                    </Link>
                                    <Link to="/login">
                                        <Boton clase={'botonIniciarSesion'}  
                                            value={idioma.navbar.iniciar_sesion}></Boton>
                                    </Link>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;
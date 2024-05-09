import React, {useContext} from 'react'
import { useNavigate, Link} from "react-router-dom";
import storage from '../../Storage/storage';

import './Navbar.css';
import IdiomaContext from '../../contextos/IdiomaContext';
import losIdiomas from '../../mocks/mock-idiomas';

import srcLogo from './../../assets/img/logo.svg';
import Boton from '../Boton/Boton';
import Avatar from '../Avatar/Avatar';
import Idiomas from '../Idiomas/Idiomas';


const Navbar = () => {
    const navegar = useNavigate();
    const idiomas = useContext(IdiomaContext);
    const idioma = losIdiomas[idiomas.idiomaElegido];
    
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

    console.log('STORE GET', storage.get('authUser'));

    return (        
        //he usado un navbar de boostrap, que es responsive, y he añadido un botón para cambiar de idioma
        <nav className="navbar navbar-expand-lg row" id='navbar'>
            <a className="navbar-brand col-2" onClick={navegarHome}>
                <img src={srcLogo} className="d-inline-block align-top" alt=""/>
            </a>
            {/* botón para desplegar el menú en móvil */}
            <button className="navbar-toggler hamburguesa" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* resto del menú */}
            <div className="collapse navbar-collapse col-sm-12 col-lg-10 p-0" id="navbarNavDropdown">
                <ul className="navbar-nav row" id='listaNavbar'>
                    <li className="nav-item active col-7 p-0 text-center">
                        <div className="row d-flex align-items-center">
                            <a href="#listaJuegos" className='col-sm-6 col-lg-3 enlace'>{idioma.navbar.ver_juegos}</a>
                            <Link to="/favoritos/1" className="col-sm-6 col-lg-3">
                                <p >{idioma.navbar.favoritos}</p>
                            </Link>
                            <Link to="/acercaDe" className="col-sm-6 col-lg-3">
                                <p >{idioma.navbar.acerca_de}</p>
                            </Link>
                            <Idiomas></Idiomas>
                        </div>
                    </li>
                    {
                        (storage.get('authUser')) ? (
                            <li className="nav-item botonera botonera_avatar col-5 p-0">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-6 text-center">
                                        <Avatar></Avatar>
                                    </div>
                                    <div className="col-sm-12 col-lg-6 text-center">
                                        <Boton buttonFunction={logout} clase={'botonRegistrarse botonCerrarSesion'}  value={idioma.navbar.cerrar_sesion} />
                                    </div>
                                </div>
                            </li>
                        ) : (
                            <li className="nav-item botonera col-5 d-flex justify-content-center">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-6 text-center">
                                        <Link to="/register">
                                            <Boton clase={'botonRegistrarse'}  value={idioma.navbar.registrarse}></Boton>
                                        </Link>
                                    </div>
                                    <div className="col-sm-12 col-lg-6 text-center">
                                        <Link to="/login">
                                            <Boton clase={'botonIniciarSesion'}  value={idioma.navbar.iniciar_sesion}></Boton>
                                        </Link>
                                    </div>
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
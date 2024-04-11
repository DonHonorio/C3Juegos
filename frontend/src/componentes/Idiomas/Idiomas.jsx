import React, {useContext} from 'react';
import './idiomas.css';
import IdiomaContext from '../../contextos/IdiomaContext';
import losIdiomas from '../../mocks/mock-idiomas';
import srcUK from '../../assets/img/idiomas/united-kingdom-uk-svgrepo-com.svg';
import srcES from '../../assets/img/idiomas/flag-for-flag-spain-svgrepo-com.svg';

const Idiomas = () => {
  const idiomas = useContext(IdiomaContext);
  //idiomas contiene funciones y variables para cambiar el idioma
  const idioma = losIdiomas[idiomas.idiomaElegido];
  const spainSelected = (idiomas.idiomaElegido === 'es');

  function changeSpanish(){
    idiomas.seleccionIdioma("es");
  }

  function changeEnglish(){
    idiomas.seleccionIdioma("gb");
  }

    return (
        <div className="dropdown col-sm-6 col-lg-3" id='idiomas'>
          
          <div className="btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={(spainSelected) ? srcES : srcUK} alt="BanderaEspañita" />
            <p className="textoIdioma">{idioma.navbar.siglasIdioma}</p>
          </div>
          <ul className="dropdown-menu dropdown-menu-dark">
              <li>
                <button className={(spainSelected) ? 'dropdown-item active' : 'dropdown-item'} onClick={changeSpanish}><img src={srcES} alt="BanderaEspañita" /></button>
              </li>
              <li><hr className="dropdown-divider"/></li>
              <li>
                <button className={(!spainSelected) ? 'dropdown-item active' : 'dropdown-item'} onClick={changeEnglish}><img src={srcUK} alt="BanderaGranBretaña" /></button>
              </li>
          </ul>
      </div>
    )
}
export default Idiomas;
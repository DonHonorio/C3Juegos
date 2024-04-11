import './AjaxLoader.css';
import loaderImage from '../../assets/img/loading.gif';

const AjaxLoader = () => {
  return (
    <div id="AjaxLoader">
      <img src={loaderImage} alt="cargando" />
    </div>
  );
}

export default AjaxLoader;
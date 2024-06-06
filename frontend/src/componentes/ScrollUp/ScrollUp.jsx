import './ScrollUp.css';

const ScrollUp = (props) => {    
    //el nombre de la clase span y su contenido es para que google-fonts ponga un icono.
    //Todo está en el css
    return (
      <div id="ScrollUp">
        <a href="#">
          <span className="material-symbols-outlined">arrow_upward</span>
        </a>
      </div>
    )


}

export default ScrollUp;

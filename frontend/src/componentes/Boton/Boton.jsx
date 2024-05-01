import React,{ useContext } from 'react';
import './Boton.css';

const Boton = (props) => {

    return (
        <div id='boton' className={props.clase}>
          <input type="button" onClick={props.buttonFunction} className="" value={props.value}/>
        </div>
    );
};
export default Boton;

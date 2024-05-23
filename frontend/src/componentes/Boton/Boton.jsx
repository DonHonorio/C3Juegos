import React,{ useContext } from 'react';
import './Boton.css';

const Boton = (props) => {

    return (
        <div id='boton' className={props.clase}>
          <input 
            type={(props.type) ? props.type : 'button'}
            value={props.value} 
            onClick={()=>{(props.buttonFunction) ? props.buttonFunction() : null}}
          />
        </div>
    );
};
export default Boton;

import React, { useEffect } from 'react';

import Notificacion from './Notificacion';

import { useStateUser } from '../../Hooks/HK-user';

function Notificaciones(props){
    const [userData, dispatch] = useStateUser();
    var element = document.getElementsByClassName("ntf-wrapper");
    
    function ClearNTFGlobal(){ 
        if(element.length === 0){ 
            dispatch({
                type:"CLEAR-NOTIFICATION"
            });
    
            return true;
        }
        return false;
    }

 
    return(
        <div className="allntf-wrapper">
            {
                props.notifications.length > 0 &&
                props.notifications.map((i,k) => {
                return <Notificacion key={k} titulo={i.titulo} descripcion={i.descripcion} close={ClearNTFGlobal} index={k}/>
            })}
        </div>
    )

}

export default  Notificaciones;




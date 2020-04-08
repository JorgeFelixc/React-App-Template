import React, {useEffect, useRef} from 'react';
import './Notificacion.css';
//titulo : string
//descripcion : string
//tiempo : int en ms
//close : metodo para cerrar la notificacion.
function Notificacion({titulo, descripcion, tiempo = 5000,close,index}){
    const ntfWrapper = useRef();


    useEffect(() => {
        ntfWrapper.current.style.opacity = 1;
    },[]);


    setTimeout(() =>{
        ntfClose(ntfWrapper.current);
    }, tiempo)
    
    function ntfClose(element){
        if(ntfWrapper.current != null || ntfWrapper.current != undefined){
        ntfWrapper.current.style.marginTop = "-40%";
        ntfWrapper.current.style.transform = "scale(0.7)";
        ntfWrapper.current.style.opacity = 0;
        setTimeout(() =>{ 
            if(ntfWrapper.current != null || ntfWrapper.current != undefined){
                ntfWrapper.current.remove();
                close();
            }
        },300)
            
        }

    }

    return(
        <div ref={ntfWrapper} id={`ntf${index}`} className="ntf-wrapper" >
            <span className="ntf-close" onClick={(el) => ntfClose(el)}>x</span>
            <p className="ntf-titulo">{titulo}</p>
            <p className="ntf-des">{descripcion}</p>
        </div>
    ) 
}

export default Notificacion;
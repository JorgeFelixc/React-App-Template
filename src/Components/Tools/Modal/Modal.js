import React, {useRef, useEffect} from 'react';

import './Modal.css';
//Este componente tendra distintos modos.
//Como el de mostrar información solamente o realizar una acción 
function Modal({done, close, titulo,buttons, ...restProps }){ 
    const ThisModal = useRef();

    useEffect(() => { 
        ThisModal.current.style.transform = 'scale(1)';
        ThisModal.current.style.top = '25%';
        ThisModal.current.style.opacity = '1';
    },[]);


    function Ok(){
        if(done()){
            Close();
        };
    }

    function Close(){ 
        ThisModal.current.style.transform = 'scale(0.3)';
        ThisModal.current.style.top = '-25%';
        ThisModal.current.style.opacity = '0';
        setTimeout(() => { 
            if(close){
                close();
            }
        }, 400);
    }

    return(
        
        <div ref={ThisModal} class="modal-wrapper" >
            <div className="modal-titulo">
                {titulo}
                <span onClick={Close} className="modal-x">x</span>
            </div>
            <div className="modal-content">
                {
                   restProps.children
                }
            </div>
            <div class="modal-footer">
                { (done && buttons) && 
                    <button onClick={Ok}>Accept</button>
                }
                {
                    buttons &&
                    <button onClick={Close} className="btn_grad">Close</button>
                }
            </div>
        </div>
    );
}

export default Modal;
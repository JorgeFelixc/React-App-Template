import React, {useEffect, useState } from 'react';


import './Form.css';
import { PostData } from '../../../Utils/PostAuth';
import { useStateUser } from '../../Hooks/HK-user';
import AutoCompleteBox from '../Autotext/AutoComplete';
import Checklist from '../CheckboxForm/Checklist';
import ImgUpload from '../ImageUploader/ImgUpload';
import Select from '../SelectBox/Select';

// <label tabIndex="1" className="input">
// <input required type="password" >
// </input>
// <span className="input-placeholder">Password</span>
// </label>
//Necesitas el nombre -> que sera el nombre del formulario

function Form({nombre, endpoint,method, campos, buttonTitle, globalState, datos}){
    const [userData, disptach] = useStateUser();
    useEffect(() => {
        if(nombre || endpoint || method || campos){
            // throw error;
        }
        if(datos){ 
            FillData();
        }
    }, []);

    async function SendData(){ 
        try{
            const InputsValue = document.getElementsByName(nombre);
            let formData = new FormData();
            let data = new Object;
            let valuesBox =  [];
            InputsValue.forEach((item) => {
                const inputType = item.getAttribute("type");
                if(inputType !== "checkbox" && inputType != "image"){
                    formData.append(item.getAttribute("valor"), item.value);
                    data[item.getAttribute("valor")] = item.value;
                }
                else if(inputType === "image"){
                    const bufferName = item.getAttribute("valor");
                    if(data.hasOwnProperty(bufferName)){ 
                        data[bufferName].push(item.getAttribute("src"));
                    }else{
                        data[bufferName] = [];
                        data[bufferName].push(item.getAttribute("src"));

                    }
                }
                else //Si es checkbox-list tomara los valores como un array.
                {
                    if(item.checked){
                        const bufferName = item.getAttribute("valor");
                        if(data.hasOwnProperty(bufferName)){
                            data[bufferName].push(item.getAttribute("keyprop"));
                        }else{
                            data[bufferName] = [];
                            data[bufferName].push(item.getAttribute("keyprop"));

                        }
                    }
                }
            });

            if(datos){ 
                data["id"] = datos.id;
            }

            const registerService = await PostData(data, endpoint);
    
            if(registerService){
                //Guarda el estado global que viene desde props si existe
                //El esquema de eso es {type: "NOMBRE_ACCION", value: "Lo que se metera alli."}
                if(globalState){
                    const { exito }  = registerService;
                    let bufferObject = new Object;
                    bufferObject[globalState.value] = exito;
                    disptach({ 
                        type:globalState.type,
                        action: exito
                    })
                }
    
                disptach({
                    type:"ntf",
                    newNotifications: { currentNtf: [
                        ...userData.notifications.currentNtf,
                        {titulo: "Exito", descripcion:"Accion correcta"}
                    ]}
                });
            }else{
                disptach({
                    type:"ntf",
                    newNotifications: { currentNtf: [
                        ...userData.notifications.currentNtf,
                        {titulo: "Mal", descripcion:"Accion incorrecta"}
                    ]}
                });
            }
        }
        catch(ex){
            disptach({
                type:"ntf",
                newNotifications: { currentNtf: [
                    ...userData.notifications.currentNtf,
                    {titulo: "Mal", descripcion:ex.toString()}
                ]}
            });

        }
    }

    // Datos debe tener la estructura de {id: ''/0, data: { }  }
    function FillData(){
        const InputsValue = document.getElementsByName(nombre);
        const { id, data } = datos;
        InputsValue.forEach((i) => { 
            const campoInput = i.getAttribute("valor");
            const typeInput = i.getAttribute("type");
            Object.entries(data).map((item) => { 
                if(campoInput === item[0]){
                    
                    switch(typeInput){
                        case "image":
                            
                            break;
                        case "checkbox":
                            break;
                        default:
                            i.value = item[1];
                            break;
                    }

                }
            });
        });
    }


    function GetParametros(name){ 
        const InputsValue = document.getElementsByName(nombre);
        const param = "";
        InputsValue.forEach((item, index) => {
            if(item.getAttribute("valor") === name){


                if(item.getAttribute("type") === "select"){
                    param = item[item.selectedIndex].text;
                }
                else{ 
                    param = item.value;
                }

            }
        });

        return param;
    }

    return(
        <>
            {
                campos.map((item,index) => {
                    if(item.type === "autocomplete"){
                        return <AutoCompleteBox key={index} placeholder={item.placeholder}
                            index={index}
                            nombre={item.nombre}
                            get={item.data} />
                    }
                    else if(item.type === "checklist"){
                        if(datos){
                            if(datos.hasOwnProperty("data")){
                                const checkData =  Object.entries(datos["data"]).filter(res => res[0] === item.nombre )[0][1];
                                return <Checklist get={item.data} name={nombre} valor={item.nombre} keyvalue={item.key} value={item.value} datos={checkData} />
                            }

                        }
                        return <Checklist get={item.data} name={nombre} valor={item.nombre} keyvalue={item.key} value={item.value} />
                    }
                    else if(item.type === "imguploader"){
                        if(datos){
                            if(datos.hasOwnProperty("data")){
                                const imgData =  Object.entries(datos["data"]).filter(res => res[0] === item.nombre )[0][1];
                                return <ImgUpload name={nombre} descripcion={item.placeholder} id={datos.id} valor={item.nombre} imagenes={imgData} />
                            }
                        }
                        return <ImgUpload name={nombre} descripcion={item.placeholder} valor={item.nombre} />

                    }
                    else if(item.type === "select"){
                        if(datos){ 
                            // <Select name={nombre} endpoint={item.data} valor={item.nombre}  /> 
                        }

                        if(item.parametros){
                            return <Select name={nombre} endpoint={item.data} parametros={item.parametros} valor={item.nombre} keyprop={["response", "estado"]} /> 


                        }
                        return <Select name={nombre} endpoint={item.data} valor={item.nombre} keyprop={["response", "estado"]} /> 

                    }
                    else{
                        return(
                            <label key={index} className="input" tabIndex={index}>
                                <input  type={item.type} name={nombre} valor={item.nombre} required/>
                                <span className="input-placeholder">{ item.placeholder  }</span>
                            </label>
                        )
                    }
                })
            }
            <button onClick={SendData} className="btn-send">{buttonTitle !== "" ? buttonTitle : "Aceptar"}</button>
        </>
    )
}

export default Form;
// {
        // button: 'Save'
//     nombre: "Login",
//     endpoint: "auth",
//     method: "post",
//     campos: [
//         {
            // nombre: "username",
            // placeholder: "Your nickname",
            // required: true,
            // type: "text"
//         },
//         {
//             nombre: "Password",
//             placeholder: "Your nickname",
//             required: true,
//             type: "text"
//         },

//     ]
// }
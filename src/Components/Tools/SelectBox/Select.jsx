import React, { useState, useEffect } from 'react';

import './Select.css';
import { GetData, GetDataNoCredentials } from '../../../Utils/PostAuth';

function Select({endpoint, keyprop, name, valor, valueprop, datos, parametros }){
    const [data, setData] = useState([]);
    const [paramInput, setParamInput] = useState(null);
    async function GetServiceData(){
        const serviceData = await GetDataNoCredentials(endpoint)
        console.log("data:",serviceData["response"]["estado"]);
        if(serviceData){
            if(Array.isArray(keyprop)){ 
                var bufferData = serviceData;
                keyprop.forEach((i) => { 
                    bufferData = bufferData[i];
                    console.log(i,"->",bufferData);
                })
                setData([...bufferData]);
            }
            else{
                setData([...serviceData]);
            }
        }
    }

    function GetParametros(name){ 
        const InputsValue = document.getElementsByName(name);

        InputsValue.forEach((item, index) => {
            if(item.getAttribute("valor") === name){
                setParamInput(item);
            }
        });
    }

    function GetValueOfInput(Dom_elemnt){   
        if(Dom_elemnt.getAttribute("type") === "select"){
            return Dom_elemnt[Dom_elemnt.selectedIndex].text;
        }
        else{ 
            return Dom_elemnt.value;
        }
    }

    async function GetServiceParamData(endpoint){
        const serviceData = await GetDataNoCredentials(endpoint)
        console.log("data:",serviceData["response"]["estado"]);
        if(serviceData){
            if(Array.isArray(keyprop)){ 
                var bufferData = serviceData;
                keyprop.forEach((i) => { 
                    bufferData = bufferData[i];
                    console.log(i,"->",bufferData);
                })
                setData([...bufferData]);
            }
            else{
                setData([...serviceData]);
            }
        }
    }

    
    useEffect(() => {
         if(datos){ 
             setData(datos);
         }
         else if(endpoint){ 
             GetServiceData();
         }

         if(parametros){ 
                GetParametros(parametros.formPiece);
         }
    }, [ ])


    useEffect(() => {
        if(paramInput){ 
            GetServiceParamData(parametros.URI + GetValueOfInput(paramInput));
        }
    }, [paramInput]);


    return(
        <div className="select-wrapper">
        <span className="select-des">{valor}</span>
        <select className="select-yo" name={name} valor={valor}>

            {
                data.length > 0 &&
                data.map((item, index) => { 
                    console.log(item);
                    return <option value={valueprop ? valueprop : index }> {item} </option>
                })
            }
        </select>
        </div>
    )

}

export default Select;

import React, { useState, useEffect } from "react";

import "./Checklist.css";
import { GetData } from "../../../Utils/PostAuth";

function Checklist({ get, name,valor, index, keyvalue, value, datos }) {
    const [data, setData] = useState();

  async function GetDataServer() {
    const getService = await GetData(get);
    if (getService) {
      if (getService["error"]) {
        return;
      }

      setData(getService);
    }
  }

  useEffect(() => { 
    GetDataServer();
  }, []);

  function isChecked(value){
    if(Array.isArray(datos)){
      if(datos.indexOf(value.toString()) !== -1){ 
        return true;
      }
      
    }
  }

  return (
    <div>
        {
            data &&
            data.map((item,jindex) => {
                return(
                    <label className="check-box" key={jindex}>
                      { 
                        isChecked(item[keyvalue]) ? 
                        <input className="check-input" type="checkbox" name={name} valor={valor} keyprop={item[keyvalue] } checked/>
                        :
                        <input className="check-input" type="checkbox" name={name} valor={valor} keyprop={item[keyvalue] }   />
                      }
                        <div className="check-toggle"></div>

                        <span>
                            { item[value] }
                        </span>
                    </label>
                )
            })
        }
    </div>
    );
}

export default Checklist;
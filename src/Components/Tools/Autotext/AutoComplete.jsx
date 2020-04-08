import React, { useState, useEffect } from "react";
import { GetData } from "../../../Utils/PostAuth";

function AutoCompleteBox({get, nombre, index, placeholder}) {
    const [boxdata, setBoxdata] = useState();
    const [filterdata, setFilterdata] = useState([]);

    async function GetDataServer(){ 
      const getService = await GetData(get);
      if(getService){
        if(getService["error"]){
          return;
        }

        setBoxdata(getService);
      }
    }

    function Filter(event){
      console.log("event->",event.target);
      
    }

    function show(event){
      console.log("focus", event.target.value);
    }
    useEffect(() => {
      GetDataServer();
    }, []);

  return (
      <>
    <label className="input" tabIndex={index}>
      <input type="text" onFocus={(e) => show(e)}
       onChange={(e) => Filter(e)} name={nombre} valor={nombre} required />
      <span className="input-placeholder">{placeholder}</span>
      <div>

      </div>
    </label>
    </>
  );
}

export default AutoCompleteBox;
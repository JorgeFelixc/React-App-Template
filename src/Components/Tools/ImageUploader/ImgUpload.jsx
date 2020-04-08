import React, { useState, useEffect } from "react";

import "./ImgUpload.css";
import { HOST, DELETE_IMAGE_PRODUCTO } from "../../../Utils/Endpoints";
import DeleteModal from "../DeleteModal/DeleteModal";

function ImgUpload({name, valor, descripcion, imagenes, id}) {
  const fileTypes = ["image/png", "image/jpg", "image/jpeg"];
  const [files, setFiles] = useState([]);
  const [dragtext, setDragtext] = useState(
    "Arrastra o click para subir archivos"
  );
  const [dragicon, setDragicon] = useState("cloud_download");
  const [modal, setModal] = useState(null);
  const DragDrop = React.useRef();


  useEffect(() => { 
    if(imagenes){
      if(Array.isArray(imagenes)){ 
        const buffer = imagenes.map((item) => { 
          const uri = HOST + item;
          console.log(uri);
          return uri;
        });
        setFiles([...buffer]);
      }
    }
  }, [ ]);

  function MakeBase64Url(url){ 
  }
  //Metodo para subir imagenes.
  async function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    var src = "";

    const fileList = e.dataTransfer.files;
    //Ciclo para validar cada archivo y meterlo al estado.
    if (fileList && fileList.length > 0) {
      for (var i = 0; i < fileList.length; i++) {
        if (fileTypes.indexOf(fileList[i].type) != -1) {
          src = await returnFile(fileList[i]);
          setFiles(old => [...old, src]);
        }
      }
    }

    if (DragDrop.current) {
      DragDrop.current.style.borderColor = "lightgray";
      DragDrop.current.style.borderWidth = "1px";
      DragDrop.current.style.backgroundColor = "transparent";
    }
    setDragicon("cloud_download");
    setDragtext("Arrastra o click para subir archivos");
  }

  //metodo que te regresa la imagen lista para usar como sources
  function returnFile(file) {
    var reader = new FileReader();
    return new Promise(resolve => {
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        resolve(reader.result);
      };
    });
  }

  function handleEnter(e) {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
    // setDragclass("upload-wrapper-on");
    // console.log("dataTransfer?", e.dataTransfer);
  }

  function handleLeave(e) {
    // setDragclass("upload-wrapper")
    e.preventDefault();
    e.stopPropagation();

    if (DragDrop.current) {
      DragDrop.current.style.borderColor = "lightgray";
      DragDrop.current.style.borderWidth = "1px";
      DragDrop.current.style.backgroundColor = "transparent";
    }
    setDragicon("cloud_download");
    setDragtext("Arrastra o click para subir archivos");

    // console.log("LEAVE:", e);
  }

  function hadnleOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (DragDrop.current) {
      DragDrop.current.style.borderColor = "#1890ff";
      DragDrop.current.style.borderWidth = "2px";
      DragDrop.current.style.backgroundColor = "rgba(119, 119, 255,0.1)";
    }
    setDragicon("move_to_inbox");
    setDragtext("Suelta aqui!!");
    // setDragclass("upload-wrapper-on");
    // console.log("OVER",e);
  }

  async function handleChange(e) {
    if (fileTypes.indexOf(e.target.files[0].type) !== -1) {
      var archivo = await returnFile(e.target.files[0]);
      setFiles(old => [...old, archivo]);
    }
  }

  function CloseImage(){
    
  }

  return (
    <>
    <p>{descripcion}</p>
      <div
        ref={DragDrop}
        className="upload-wrapper"
        onDragEnter={handleEnter}
        onDragLeave={handleLeave}
        onDragOver={hadnleOver}
        onDrop={handleDrop}>
          
        <input type="file" id="dragdrop" onChange={handleChange} />
        <label>
          <p>{dragtext}</p>
        </label>
      </div>
      <div className="uploaded-wrapper">
        {
            files.map((item,index) => { 
                return(
                  <div className="img-wrp">
                    <img tabIndex={index} type="image" name={name} valor={valor} src={item} />
                    <p onClick={() => setModal(item)}>x</p>
                  </div>
                );
            })
        }

        {
          modal &&
          <DeleteModal titulo="¿Seguró?"
            descripcion={`Se eliminara esta imagen para siemrpe.`}
            close={() => setModal(null)} 
            endpoint={DELETE_IMAGE_PRODUCTO} item={{id:id}} campo={{image: modal}}  />
        }
      </div>
    </>
  );
}

export default ImgUpload;

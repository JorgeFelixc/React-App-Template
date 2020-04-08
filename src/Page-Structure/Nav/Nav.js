import React, { useState, useEffect } from "react";

import "./Nav.css";

import Modal from "../../Components/Tools/Modal/Modal";
import Form from "../../Components/Tools/Forms/Form";

import {  LOGIN  } from "../../../Utils/Endpoints";
import { LoginForm } from "../../../Configs/FormsData";
import { useStateUser } from "../../Components/Hooks/HK-user";

function Nav(props) {
  const [userData, disptach] = useStateUser();
  const [loginModal, setLoginModal] = useState(false);


  function logout(){
    sessionStorage.removeItem("auth");
    disptach({ 
      type:'LOGIN',
      action: {
        name: 'no-user',
        theme: 'default',
        tipoUsuario: '0',
        email: '',
        idUsuario: null,
      }
    })
  }

  return (
    <nav>
      <ul>
        <li className="nav-logo">
          <a href="/">Floreria Premier</a>
        </li>

        <li className="underline">Nosotros</li>
        <li className="underline"><a href="/catalogo">Catalogo</a></li>


        <li className="nav-search">
          <input placeholder="Busqueda" type="text" />
          <button>Buscar</button>
        </li>

      </ul>
      {loginModal && (
        <Modal titulo="Autentificacion" close={() => setLoginModal(false)}>
          <div className="login-wrapper">
            <Form campos={LoginForm} 
              buttonTitle="Logear"
              nombre="login-post"
              endpoint={LOGIN}
              globalState={{type:'LOGIN'}} />

          </div>
          <p className="forget">
            <a>¿Olvidaste tu contraseña?</a>
          </p>
          <p className="register">
            <a href="/register">¿Quieres registrarte?</a>
          </p>
        </Modal>
      )}
    </nav>
  );
}

export default Nav;


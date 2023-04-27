
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "./";
import Autorizacion from '../services/auth.service';
// import Logo from "../assets/logo.png";
import Logo from "../components/logo_pdvsa.png";

// -------------------- NAVEGACION --------------------
function Header() {
  const [user, setUser] = useState('');
  
  useEffect(() => {
    setUser(Autorizacion.obtenerUsuario());
  }, []);

  return (
    
    <div className="flex flex-row justify-between items-center w-full h-20 bg-gray-200 fixed z-50 drop-shadow-md" >
      
      <Link className="linkNav" to="/">
        <img className="ml-8 w-28" src={Logo} alt="logo" />
      </Link>

      {user == null ? (
        <>
          <div className="text-xl font-bold">Repositorio de Infraestructura y Aplicaciones</div>
          <div className="mr-16 pr-14"></div>
        </>
      ) : ( 
        <>
          <div className="pl-14 text-xl font-bold">Repositorio de Infraestructura y Aplicaciones</div>
          <Dropdown user={user} />
        </>
      )}

    </div>
  );
} 

export default Header;
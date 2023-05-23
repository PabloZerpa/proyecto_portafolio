
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "./";
import Logo from "../components/logo_pdvsa.png";
import { obtenerUsuario } from "../utils/APIRoutes";

// -------------------- NAVEGACION --------------------
function Header() {
  const [user, setUser] = useState('');
  
  useEffect(() => { setUser(obtenerUsuario()); }, []);

  return (
    
    <div className="flex flex-row justify-between items-center w-full h-20 bg-blue-500 fixed z-50 drop-shadow-md" >
      
      <Link className="linkNav" to="/">
        <img className="ml-8 w-28" src={Logo} alt="logo" />
      </Link>

      {user == null ? (
        <>
          <div className="text-xl font-bold hidden md:block">Repositorio de Infraestructura y Aplicaciones</div>
          <div className="mr-16 pr-14"></div>
        </>
      ) : ( 
        <>
          <div className="pl-14 text-xl font-bold hidden md:block">Repositorio de Infraestructura y Aplicaciones</div>
          <Dropdown user={user} />
        </>
      )}

    </div>
  );
} 

export default Header;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Perfil } from "./";
import Autorizacion from '../services/auth.service';

const logo = "https://logodownload.org/wp-content/uploads/2019/03/pdvsa-logo.png";

// -------------------- NAVEGACION --------------------
function Header() {
  const [user, setUser] = useState('');
  
  useEffect(() => {
    setUser(Autorizacion.obtenerUsuario());
  }, []);

  return (
    
    <div className="flex flex-row justify-between items-center w-full h-20 bg-gray-200 fixed z-50 drop-shadow-md" >
      
      <Link className="linkNav" to="/">
        <img src={logo} alt="logo" className="ml-8 w-28" />
      </Link>

      {user == null ? (
        <>
          <div className="text-xl font-bold">Repositorio de Infraestructura y Aplicaciones</div>
          <div className="mr-16 pr-14"></div>
        </>
      ) : ( 
        <>
          <div className="pl-14 text-xl font-bold">Repositorio de Infraestructura y Aplicaciones</div>
          <Perfil user={user} />
        </>
      )}

    </div>
  );
} 

export default Header;
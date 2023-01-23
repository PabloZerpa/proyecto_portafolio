
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "../styles/Header.styles";
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
    
    <Container>

      <Link className="linkNav" to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <div className="title">Repositorio de Infraestructura y Aplicaciones</div>

      {user == null ? (
        <div></div>
      ) : ( 
        <Perfil user={user} />
      )}

    </Container>
  );
} 

export default Header;
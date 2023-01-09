
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from 'antd';
import { FaUserCircle, FaPowerOff, FaCog, FaChevronDown } from 'react-icons/fa';
import { Container } from "../styles/Header.styles";
import axios from "axios";
import Autorizacion from '../services/auth.service';

// -------------------- CONTENIDO INTERNO DROPDOWN --------------------
const items = [
  {
    key: '0',
    icon: <FaCog />,
    label: <Link className="linkNav" to="/dashboard" >Configuracion</Link>
  },
  {
    key: '1',
    icon: <FaPowerOff />,
    label: <Link className="linkNav" onClick={handleLogin} to="/" >Cerrar Sesion</Link>
  },
];

// -------------------- FUNCION PARA CERRAR SESION --------------------
async function handleLogin() {

  Autorizacion.logout();
  window.location.reload();
  try {
    await axios.get('http://localhost:3001/api/logout');
  } catch (error) {console.log(error);}
}

// -------------------- NAVEGACION --------------------
function Header() {

  const [user, setUser] = useState('');
  useEffect(() => {
    setUser(Autorizacion.obtenerUsuario());
  }, []);

  return (
    
    <Container>

      <Link className="linkNav" to="/">
        <img src="https://logodownload.org/wp-content/uploads/2019/03/pdvsa-logo.png" alt="logo" className="logo" />
      </Link>

      <div className="title">Repositorio de Infraestructura y Aplicaciones</div>

      {Autorizacion.obtenerUsuario() == null ? (
        <div></div>
      ) : (
        <div className="perfilUsuario">
            <Dropdown
                menu={{ items }}
                trigger={['click']}
                placement="bottom"
                style={{background: '#1980da'}}
            >
                <a href='/' className="center" style={{ marginRight: '32px' }} onClick={(e) => e.preventDefault()}>

                  <FaUserCircle style={{ color: '#1980da', fontSize: '42px', cursor: "pointer" }} />

                  <div className="perfil center" >
                    <div style={{fontSize: '18px'}} >{user.indicador}</div>
                    <div style={{fontSize: '14px', color: '#707070'}} >{user.rol}</div>
                  </div>

                  <FaChevronDown style={{fontSize: '12px'}} />
                  
                </a>
            </Dropdown>
        </div>
      )}

    </Container>
  );
} 

export default Header;
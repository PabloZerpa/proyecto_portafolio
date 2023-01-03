
import { Link } from "react-router-dom";
import { Dropdown } from 'antd';
import { FaUserCircle, FaPowerOff, FaCog, FaChevronDown } from 'react-icons/fa';
import styled from "styled-components";
import axios from "axios";
import AuthService from '../services/auth.service';

const baseURL = "http://localhost:3001/api/logout";

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

  AuthService.logout();
  window.location.reload();
  try {
    await axios.get(baseURL);
  } catch (error) {console.log(error);}
}

// -------------------- NAVEGACION --------------------
function Header({ user }) {

  return (
    
    <Container>
      <Link className="linkNav" to="/">
        <img src="https://logodownload.org/wp-content/uploads/2019/03/pdvsa-logo.png" alt="logo" className="logo" />
      </Link>
      <div className="title">Repositorio de Infraestructura y Aplicaciones</div>

      {AuthService.obtenerUsuario() == null ? (
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

const Container = styled.nav`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  position: fixed;
  box-shadow: 1px 1px 10px #696969;

  .center{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .logo{
    width: 120px;
    margin-left: 32px;
  }

  .title{
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-align: center;
  }

  a{
    text-decoration: none;
    color: #000;
  }

  .perfil{
    flex-direction: column;
    gap: 0px;
  }
`;


import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from 'antd';
import { FaUserCircle, FaPowerOff, FaCog } from 'react-icons/fa';
import styled from "styled-components";
import axios from "axios";

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
    label: <Link className="linkNav" onClick={logoutUser} to="/" >Cerrar Sesion</Link>
  },
];

// -------------------- FUNCION PARA CERRAR SESION --------------------
async function logoutUser() {

  console.log('LOGOUT');
  try {
    await axios.get(baseURL);
  } catch (error) {console.log(error);}
}

// -------------------- NAVEGACION --------------------
function Header({ login }) {

  const [data, setData] = useState([]);

  return (
    
    <Navegation>
      <Link className="linkNav" to="/">
        <img src="https://logodownload.org/wp-content/uploads/2019/03/pdvsa-logo.png" alt="logo" className="logo" />
      </Link>
      <div className="title">Repositorio de Infraestructura y Aplicaciones</div>

      {login ? (
        <div></div>
      ) : (
        <div className="perfilUsuario">
            <Dropdown
                menu={{ items }}
                trigger={['click']}
                placement="bottom"
                style={{background: '#1980da'}}
            >
                <a href='/' className="center" onClick={(e) => e.preventDefault()}>
                  {data.indicador}
                  <FaUserCircle style={{ color: '#1980da', fontSize: '42px', marginRight: '32px', cursor: "pointer" }} />
                </a>
            </Dropdown>
        </div>
      )}

    </Navegation>
  );
} 

export default Header;

const Navegation = styled.nav`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  position: fixed;

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
  
`;


import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from 'antd';
import { FaUserCircle, FaPowerOff, FaCog } from 'react-icons/fa';
import styled from "styled-components";

const items = [
  {
    key: '0',
    icon: <FaCog />,
    label: <Link className="linkNav" to="/dashboard" >Configuracion</Link>
  },
  {
    key: '1',
    icon: <FaPowerOff />,
    label: <Link className="linkNav" to="/" >Cerrar Sesion</Link>
  },
];

function Navbar() {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <Navegation>

      <Link className="linkNav" to="/">
        <img src="https://logodownload.org/wp-content/uploads/2019/03/pdvsa-logo.png" alt="logo" className="logo" />
      </Link>

      <div className="title">Repositorio de Infraestructura y Aplicaciones</div>

      {!isLogin ? (
        <div></div>
      ) : (
        <div>

            <Dropdown
                menu={{ items }}
                trigger={['click']}
                placement="bottom"
                style={{background: '#1980da'}}
              >
                <a className="center" onClick={(e) => e.preventDefault()}>
                  Nombre de Usuario
                  <FaUserCircle style={{ color: '#1980da', fontSize: '42px', marginRight: '32px', cursor: "pointer" }} />
                </a>
            </Dropdown>

        </div>
      )}

    </Navegation>
  );
} 

export default Navbar;

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
  
  .userOptions{
    width: 100%;
    height: 80px;
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    gap: 10px;

    *{
      width: 120px;
      height: 50px;
      background: none;
    }
    *:hover{
      width: 120px;
      height: 50px;
      background: #1f8bf0;
      border-radius: 5px;
    }

    .linkNav{
      text-decoration: none;
      gap: 5px;

      .icon{
        width: 16px;
      }
    }
    .linkNav:visited{
      color: #000;
    }

    .userMenu{
      cursor: pointer;
    }

  }

`;

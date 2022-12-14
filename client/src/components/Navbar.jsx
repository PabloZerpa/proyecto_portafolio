
import { Link } from "react-router-dom";
import { DatabaseOutlined, HomeOutlined, ScheduleOutlined, CloudServerOutlined } from '@ant-design/icons';
import { Avatar, Input } from 'antd';
import styled from "styled-components";
import { useState } from "react";

const { Search } = Input;
const onSearch = (value) => console.log(value);

function Navbar() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Navegation>

      <Link className="linkNav" to="/">
        <img src="https://logodownload.org/wp-content/uploads/2019/03/pdvsa-logo.png" alt="logo" className="logo" />
      </Link>

      {!isLogin ? (
          <div className="title">Repositorio de Infraestructura y Aplicaciones</div>
      ) : (
        <div className="userNavegation center">

          <ul className="userOptions center">
            <Link className="linkNav center" to="/dashboard" ><HomeOutlined className="icon" />Inicio</Link>
            <Link className="linkNav center" to="/" ><DatabaseOutlined className="icon" />Aplicaciones</Link>
            <Link className="linkNav center" to="/" ><ScheduleOutlined className="icon" />Administracion</Link>
            <Link className="linkNav center" to="/" ><CloudServerOutlined className="icon" />Servidores</Link>
          </ul>

          <Search 
            className="searchBar"
            allowClear
            placeholder="Search" 
            onSearch={onSearch} 
            enterButton
            size="large"
            style={{width: 250}}
          />

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
  justify-content: center;
  align-items: center;
  background: #ffffff;
  position: fixed;

  .center{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo{
    width: 120px;
    position: absolute;
    top: 20px;
    left: 80px;
  }

  .title{
    font-size: 24px;
    font-weight: bold;
    color: #000;
  }
  
  .linkNav{
    text-decoration: none;
  }

  .linkNav:visited{
    color: #000;
  }

  .userOptions{
    width: 100%;
    height: 80px;
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    gap: 10px;
    border: #0669c5 1px solid;

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
  }

  .searchBar{
    position: absolute;
    top: 20px;
    right: 80px;
  }
  
`;

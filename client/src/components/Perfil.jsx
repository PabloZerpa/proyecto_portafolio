
import { Link } from "react-router-dom";
import { Dropdown } from 'antd';
import { FaUserCircle, FaPowerOff, FaCog, FaChevronDown } from 'react-icons/fa';
import { PerfilContainer } from "../styles/Header.styles";
import Autorizacion from '../services/auth.service';
import axios from "axios";

function Perfil({ user }) {
  
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
  
  return (
    <PerfilContainer>

      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottom"
        style={{background: '#1980da'}}>

        <a href='/' className="center" style={{ marginRight: '32px' }} onClick={(e) => e.preventDefault()}>

          <FaUserCircle style={{ color: '#1980da', fontSize: '42px', cursor: "pointer" }} />

          <div className="perfil center" >
            <div style={{fontSize: '18px'}} >{user.indicador}</div>
            <div style={{fontSize: '14px', color: '#707070'}} >{user.rol}</div>
          </div>

          <FaChevronDown style={{fontSize: '12px'}} />

        </a>
      </Dropdown>

    </PerfilContainer>
  );
}

export default Perfil;
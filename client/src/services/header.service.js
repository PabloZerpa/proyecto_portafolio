
import { Link } from "react-router-dom";
import { FaPowerOff, FaCog } from 'react-icons/fa';
import Autorizacion from '../services/auth.service';

// -------------------- CONTENIDO INTERNO DROPDOWN --------------------
export const opcionesPerfil = [
    {
      key: '0',
      icon: <FaCog />,
      label: <Link className="linkNav" to="/dashboard" >Configuracion</Link>
    },
    {
      key: '1',
      icon: <FaPowerOff />,
      label: <Link className="linkNav" onClick={Autorizacion.logout} to="/" >Cerrar Sesion</Link>
    },
  ];
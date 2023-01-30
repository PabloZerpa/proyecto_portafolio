
import { Link } from "react-router-dom";
import { Dropdown } from 'antd';
import { FaUserCircle, FaPowerOff, FaCog, FaChevronDown } from 'react-icons/fa';
import Autorizacion from '../services/auth.service';

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
      label: <Link className="linkNav" onClick={Autorizacion.logout} to="/" >Cerrar Sesion</Link>
    },
  ];
  
  return (
    <div>

      {/* <div 
        id="dropdownHoverButton" 
        data-dropdown-toggle="dropdownHover" 
        data-dropdown-trigger="hover" 
        class="text-black bg-transparent gap-2 mr-6 font-medium flex justify-center items-center cursor-pointer" 
      >
          <FaUserCircle className="text-blue-500 text-5xl pointer" />

          <div className="flex flex-col justify-center items-center gap-0" >
            <div className="text-lg" >{user.indicador}</div>
            <div className="text-base text-zinc-500" >{user.rol}</div>
          </div>
          <FaChevronDown className="text-xs" />

      </div>
      
      <div id="dropdownHover" class="z-90 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownHoverButton">
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">Earnings</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">Sign out</a>
            </li>
          </ul>
      </div> */}

      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottom">

        <a href='/' className="flex justify-center items-center text-black no-underline gap-2 mr-6" onClick={(e) => e.preventDefault()}>

          <FaUserCircle className="text-blue-500 text-5xl pointer" />

          <div className="flex flex-col justify-center items-center gap-0" >
            <div className="text-lg" >{user.indicador}</div>
            <div className="text-base text-zinc-500" >{user.rol}</div>
          </div>

          <FaChevronDown className="text-xs" />

        </a>
      </Dropdown>

    </div>
  );
}

export default Perfil;
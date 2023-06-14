

import { FaUserCircle, FaChevronDown, FaSignOutAlt, FaRegIdCard } from 'react-icons/fa';
import { useState } from "react";
import { logout } from "../utils/APIRoutes";
import { Link } from "react-router-dom";

function Dropdown({ user }) {

  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(!open);
  
  return (
    <div className="flex">

      <div 
        className="relative text-black bg-transparent space-x-2 mr-6 font-medium flex justify-center items-center cursor-pointer" 
        onClick={openMenu} >

          <FaUserCircle className="text-white text-5xl pointer" />

          <div className="flex flex-col justify-center items-center" >
            <div className="text-xl" >{user.indicador}</div>
            <div className="text-base" >{user.rol}</div>
          </div>
          <FaChevronDown className="text-xs" />

          <div style={open ? {display: 'block'} : {display: 'none'}} className="z-1 absolute top-16 bg-zinc-200 divide-y divide-gray-100 rounded-lg shadow w-44">
              <ul className="m-0 p-0 text-sm text-center list-none text-gray-700">
                <span className="flex justify-center items-center space-x-2 px-2 py-2 text-black no-underline rounded-sm hover:bg-gray-800 hover:text-gray-100" >
                  <Link to="/perfil" >
                    <FaRegIdCard className="text-2xl cursor-pointer" />
                  </Link>
                  <span className="px-0">Ver Perfil</span>
                </span>

                <span className="flex justify-center items-center space-x-2 px-2 py-2 text-black no-underline rounded-sm hover:bg-gray-800 hover:text-gray-100" onClick={logout} >
                  <FaSignOutAlt className="text-lg cursor-pointer" />
                  <span className="px-0">Cerrar Sesion</span>
                </span>
                
              </ul>
          </div>
      </div>

    </div>
  );
}

export default Dropdown;
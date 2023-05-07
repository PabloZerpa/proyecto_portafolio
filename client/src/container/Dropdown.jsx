
import { Link } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import Autorizacion from '../services/auth.service';
import { useState } from "react";

function Dropdown({ user }) {

  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(!open);
  
  return (
    <div className="flex">

      <div 
        className="relative text-black bg-transparent space-x-2 mr-6 font-medium flex justify-center items-center cursor-pointer" 
        onClick={openMenu} >

          <FaUserCircle className="text-blue-500 text-5xl pointer" />

          <div className="flex flex-col justify-center items-center" >
            <div className="text-lg" >{user.indicador}</div>
            <div className="text-base text-zinc-500" >{user.rol}</div>
          </div>
          <FaChevronDown className="text-xs" />

          <div style={open ? {display: 'block'} : {display: 'none'}} className="z-1 absolute top-16 bg-zinc-300 divide-y divide-gray-100 rounded-lg shadow w-44">
              <ul className="m-0 p-0 text-sm text-center list-none text-gray-700">
                <span className="flex justify-center items-center space-x-2 px-2 py-2 text-black no-underline rounded-sm hover:bg-blue-400" onClick={Autorizacion.logout} >
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
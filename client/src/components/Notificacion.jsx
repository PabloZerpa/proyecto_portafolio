
import { useState } from "react";
import { FaCheckCircle, FaTimes, FaTimesCircle } from "react-icons/fa";

function Notificacion({ opcion, mensaje }) {
    
  const [open, setOpen] = useState(true);
  const openMenu = () => setOpen(!open);

  if(opcion === 'exito'){
      return(
        <div style={open ? {display: 'block'} : {display: 'none'}} className="bg-green-500 shadow-lg mx-auto w-80 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3">
          <div className="bg-green-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg">
            <p className="font-bold text-white flex items-center">
              <FaCheckCircle className="text-xl mr-1" />
              LOGIN COMPLETADO
            </p>
            <div className="flex items-center">
              <FaTimes 
                className="text-white text-xl mb-3 cursor-pointer" 
                onClick={openMenu}
              />
            </div>
          </div>
          <div className="p-2 text-lg bg-green-500 rounded-b-lg break-words text-white">
            <p>Bienvenido/a {mensaje}</p>
          </div>
        </div>
      )
  }

  if(opcion === 'error'){
      return(
        <div style={open ? {display: 'block'} : {display: 'none'}} className="bg-red-600 shadow-lg mx-auto w-80 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3">
                <div className="bg-red-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-red-500 rounded-t-lg">
                  <p className="font-bold text-white flex items-center">
                    <FaTimesCircle className="text-xl mr-1" />
                    LOGIN FALLIDO
                  </p>
                  <div className="flex items-center">
                    <FaTimes 
                        className="text-white text-xl mb-3 cursor-pointer" 
                        onClick={openMenu}
                    />
                  </div>
                </div>
                <div className="p-2 bg-red-600 rounded-b-lg break-words text-white">
                  <p>{mensaje}</p>
                </div>
              </div>
      )
  }

  if(opcion === 'confirmar'){
      return(
              <div style={open ? {display: 'block'} : {display: 'none'}} className="bg-blue-600 shadow-lg mx-auto w-80 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3">
                <div className="bg-blue-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-blue-500 rounded-t-lg">
                  <p className="font-bold text-white flex items-center">
                    <FaTimesCircle className="text-xl mr-1" />
                    Esta seguro de actualizar
                  </p>
                  <div className="flex items-center">
                    <FaTimes 
                        className="text-white text-xl mb-3 cursor-pointer" 
                        onClick={openMenu}
                    />
                  </div>
                </div>
                <div className="p-2 bg-blue-600 rounded-b-lg break-words text-white">
                  <p>{mensaje}</p>
                </div>
              </div>
      )
  }

};

export default Notificacion;
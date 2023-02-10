
import { useState } from "react";
import { FaHome, FaRegListAlt, FaCode,FaDatabase, FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Autorizacion from '../services/auth.service';


function Navegacion() {

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const openMenu1 = () => setOpen1(!open1);
    const openMenu2 = () => setOpen2(!open2);
    const openMenu3 = () => setOpen3(!open3);

    if (Autorizacion.obtenerUsuario() === null)
        return null

    return (
        <nav className="m-0 p-0 z-60 fixed drop-shadow-md">

            <aside className="mt-20 top-0 left-0 w-64 h-screen transition-transform" >
                
                <div className="w-56 h-full px-5 pt-20 overflow-y-auto bg-gray-200 text-black" >
                    <ul className="list-none p-0 m-0 flex flex-col gap-4">
                        <li>
                            <Link to="/dashboard" className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100">
                                <FaHome />
                                <span className="ml-2">Inicio</span>
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" 
                            onClick={openMenu2}>
                                <FaRegListAlt/>
                                <span className="px-2">Administracion</span>
                                {open2 ? <FaChevronUp /> : <FaChevronDown />}
                            </div>

                            <div style={open2 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
                                <Link to="/administracion/agregar" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                        Agregar
                                </Link>
                                <Link to="/administracion" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                        Actualizacion
                                </Link>
                                <Link to="/administracion/solicitudes" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                        Solicitudes
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" 
                                onClick={openMenu1}>
                                <FaCode/>
                                <span className="px-2">Aplicaciones</span>
                                {open1 ? <FaChevronUp /> : <FaChevronDown />}
                            </div>

                            <div style={open1 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
                                <Link to="/aplicaciones" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                    Busqueda
                                </Link>
                                <Link to="/aplicaciones/diagramas" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                    Visualizacion
                                </Link>
                                <Link to="/aplicaciones" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                    Otros
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" 
                                onClick={openMenu3}>
                                <FaDatabase />
                                <span className="px-2">Base de datos</span>
                                {open3 ? <FaChevronUp /> : <FaChevronDown />}
                            </div>

                            <div style={open3 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
                                <Link to="/basedatos" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                    Busqueda
                                </Link>
                                <Link to="/basedatos" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                    Visualizacion
                                </Link>
                                <Link to="/basedatos" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                    Otros
                                </Link>
                            </div>
                        </li>
                    </ul>
                    
                </div>
            </aside>
            
        </nav>
    );
}

export default Navegacion;


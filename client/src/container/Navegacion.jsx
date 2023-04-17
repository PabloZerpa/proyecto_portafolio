
import { useState } from "react";
import { FaHome, FaRegListAlt, FaCode,FaDatabase, FaChevronDown, FaChevronRight, FaChevronUp, FaListAlt, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import Autorizacion from '../services/auth.service';

function Navegacion() {
    
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const openMenu1 = () => setOpen1(!open1);
    const openMenu2 = () => setOpen2(!open2);
    const openMenu3 = () => setOpen3(!open3);
    const openMenu4 = () => setOpen4(!open4);

    if (Autorizacion.obtenerUsuario() === null)
        return null

    return (
        <nav className="m-0 p-0 z-50 fixed drop-shadow-md">

            <aside className="mt-20 top-0 left-0 w-64 h-screen transition-transform" >
                
                <div className="w-56 h-full px-5 pt-20 overflow-y-auto bg-gray-200 text-black" >
                    <ul className="list-none p-0 m-0 flex flex-col gap-4">
                        <li>
                            <Link to="/dashboard" className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100">
                                <FaHome />
                                <span className="ml-2">Inicio</span>
                            </Link>
                        </li>
                        <li style={Autorizacion.obtenerUsuario().rol!=='admin' ? {pointerEvents: 'none'} : {pointerEvents: 'auto'} } >
                            <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" onClick={openMenu2}>
                                <FaKey/>
                                <span className="px-2">Administracion</span>
                                {open2 ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            
                            {Autorizacion.obtenerUsuario().rol!=='admin' ? (
                                <div></div>
                            ) : (
                                <div style={open2 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
                                    <Link to="/administracion/permisos" 
                                        className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                            Permisos
                                    </Link>
                                    <Link to="/administracion" 
                                        className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                            Actualizacion
                                    </Link>
                                    <Link to="/administracion/registro" 
                                        className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                            Registro
                                    </Link>
                                </div>
                            )} 

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
                                <Link to="/aplicaciones/fallas" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                    Fallas
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
                                <Link to="/basedatos/registro" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                    Registro
                                </Link>
                                <Link to="/basedatos" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                    Visualizacion
                                </Link>
                            </div>
                        </li>

                        {/* <li>
                            <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" 
                                onClick={openMenu4}>
                                <FaListAlt />
                                <span className="px-2">Solicitudes</span>
                                {open3 ? <FaChevronUp /> : <FaChevronDown />}
                            </div>

                            <div style={open4 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
                                <Link to="/solicitudes" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                    Lista de Solicitudes
                                </Link>
                                <Link to="/solicitudes/crear" 
                                    className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                    Crear Solicitud
                                </Link>
                            </div>
                        </li> */}
                        
                    </ul>
                    
                </div>
            </aside>
            
        </nav>
    );
}

export default Navegacion;


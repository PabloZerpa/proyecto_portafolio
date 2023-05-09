
import { useEffect, useState } from "react";
import { FaHome, FaCode,FaDatabase, FaChevronDown, FaChevronUp, FaKey, FaSignOutAlt, FaBars, FaTimes, FaHardHat, FaServer, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Autorizacion from '../services/auth.service';

function Navegacion() {

    const [open, setOpen] = useState(true);
    
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const openMenu1 = () => setOpen1(!open1);
    const openMenu2 = () => setOpen2(!open2);
    const openMenu3 = () => setOpen3(!open3);
    const openMenu4 = () => setOpen4(!open4);
    const openMenu5 = () => setOpen5(!open5);

    if (Autorizacion.obtenerUsuario() === null)
        return null
    
    return (
        <div className='relative'>
            <span
                className="fixed flex mt-32 ml-4 text-zinc-800 text-xl z-50 cursor-pointer"
                onClick={(e) => setOpen(!open)}
            >
                <FaChevronRight />
            </span>

            <div className={` ${ open ? "flex" : "hidden" }
                h-screen p-3 px-5 overflow-y-auto bg-gray-200 m-0 mt-20 p-0 z-50 fixed drop-shadow-md`}>

                <div className="pt-12 space-y-3">

                    <div className="flex items-center justify-between">
                        <button onClick={(e) => setOpen(!open)}>
                            {<FaTimes className="ml-32" />}
                        </button>
                    </div>
                    
                        <ul className="list-none p-0 m-0 flex flex-col space-y-4">
                            <li>
                                <Link to="/dashboard" className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100">
                                    <FaHome />
                                    <span className="px-2">Inicio</span>
                                </Link>
                            </li>
                            
                            {Autorizacion.obtenerUsuario().rol==='user' ? (
                                null
                            ) : (
                                <li>
                                    <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" onClick={openMenu2}>
                                        <FaKey/>
                                        <span className="px-2">Administracion</span>
                                        {open2 ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                    <div style={open2 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
                                        <Link 
                                            style={Autorizacion.obtenerUsuario().rol!=='admin' ? {pointerEvents: 'none', display: 'none'} : {pointerEvents: 'auto'} }
                                            to="/administracion/permisos" 
                                            className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                                Permisos
                                        </Link>
                                        <Link to="/administracion/registro" 
                                            className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                                Registro
                                        </Link>
                                    </div>
                                </li>
                            )} 
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
                                    <Link to="/aplicaciones/fallas" 
                                        className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                        Fallas
                                    </Link>
                                    <Link to="/aplicaciones/diagramas" 
                                        className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                        Charts
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
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" 
                                    onClick={openMenu4}>
                                    <FaServer />
                                    <span className="px-2">Servidor</span>
                                    {open4 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>

                                <div style={open4 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
                                    <Link to="/servidores" 
                                        className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                        Servidores
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" 
                                    onClick={openMenu5}>
                                    <FaHardHat />
                                    <span className="px-2">Custodios</span>
                                    {open5 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>

                                <div style={open5 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
                                    <Link to="/custodios" 
                                        className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                        Custodios
                                    </Link>
                                </div>
                            </li>

                            <li>
                                <span className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100 cursor-pointer" onClick={Autorizacion.logout} >
                                    <FaSignOutAlt />
                                    <span className="px-2">Cerrar Sesion</span>
                                </span>
                            </li>
                            
                        </ul>

                </div>
            </div>
        </div>
        
    );
}

export default Navegacion;


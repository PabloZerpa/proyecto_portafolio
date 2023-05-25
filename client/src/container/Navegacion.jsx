
import { useState } from "react";
import { FaHome, FaCode,FaDatabase, FaChevronDown, FaChevronUp, 
    FaKey, FaSignOutAlt, FaBars, FaHardHat, FaServer } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logout, obtenerUsuario } from "../utils/APIRoutes";

function Navegacion() {
    
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const openMenu1 = () => setOpen1(!open1);
    const openMenu2 = () => setOpen2(!open2);
    const openMenu3 = () => setOpen3(!open3);
    const openMenu4 = () => setOpen4(!open4);
    const openMenu5 = () => setOpen5(!open5);
    const openMenu6 = () => setOpen6(!open6);

    const [check, setCheck] = useState(false);

    if (obtenerUsuario() === null)
        return null

    return (
        <div>
            <input className="hidden" type="checkbox" id="check" onClick={(e) => setCheck(!check)} />
            <label htmlFor="check" className="fixed flex mt-24 ml-4 text-zinc-500 text-3xl z-50 cursor-pointer lg:hidden "><FaBars /></label>

            <div className={` ${ check ? "flex" : "hidden lg:flex" } `} id="responsiveNav">
                <nav className="flex flex-col mt-20 pt-20 space-y-10 items-center 
                fixed z-40 text-gray-400 bg-gray-100 w-2/3 h-screen lg:w-1/6">

                    <ul className="list-none p-0 m-0 flex flex-col space-y-4">
                            <li>
                                <Link to="/dashboard" className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100">
                                    <FaHome />
                                    <span className="px-2">Inicio</span>
                                </Link>
                            </li>

                            <div className="w-full h-0.5 bg-gray-500 opacity-50"></div>
                            
                            {obtenerUsuario().rol==='user' ? (
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
                                            style={obtenerUsuario().rol!=='admin' ? {pointerEvents: 'none', display: 'none'} : {pointerEvents: 'auto'} }
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
                                    <Link to="/aplicaciones/diagramas" 
                                        className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                        Diagramas
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
                                        Busqueda
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
                                        Busqueda
                                    </Link>
                                </div>
                            </li>
                            
                            <div className="w-full h-0.5 bg-gray-500 opacity-50"></div>

                            <li>
                                <span className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100 cursor-pointer" onClick={logout} >
                                    <FaSignOutAlt />
                                    <span className="px-2">Cerrar Sesion</span>
                                </span>
                            </li>
                            
                        </ul>
                </nav>
            </div>
        </div>
        
    );
}

export default Navegacion;


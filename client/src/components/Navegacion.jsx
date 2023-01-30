
import { useState } from "react";
import { Menu } from 'antd';
import { 
    FaChevronDown, 
    FaChevronLeft, 
    FaChevronRight, 
    FaHome, 
    FaRegListAlt, 
    FaServer, 
    FaCode, 
    FaDatabase, 
    FaFileAlt, 
    FaEnvelopeOpenText, } from "react-icons/fa";
import { opcionesNav } from "../services/nav.service";
import Autorizacion from '../services/auth.service';
import { Link } from "react-router-dom";

function Navegacion() {

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => setCollapsed(!collapsed);

    if (Autorizacion.obtenerUsuario() === null)
        return <div></div>

    return (
        <nav className="m-0 p-0 z-60 fixed drop-shadow-md">

            <aside 
                id="sidebar-multi-level-sidebar" 
                class="mt-20 top-0 left-0 w-64 h-screen transition-transform" 
                aria-label="Sidebar">
                
                <div class="w-48 h-full px-5 pt-20 overflow-y-auto bg-gray-200 text-black">
                    <ul class="list-none p-0 m-0 flex flex-col gap-3">
                        <li>
                            <Link to="/dashboard" class="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                <FaHome />
                                <span class="ml-2">Inicio</span>
                            </Link>
                        </li>
                        <li>
                            <div
                                class="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <FaCode />
                                <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Aplicaciones</span>
                                <FaChevronDown />
                            </div>
                            <ul id="dropdown-example" class="hidden py-2 space-y-2">
                                <li>
                                    <Link to="/aplicacion/" class="flex items-center w-full p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100">Actualizacion</Link>
                                </li>
                                <li>
                                    <Link to="/aplicacion/" class="flex items-center w-full p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100">Software</Link>
                                </li>
                                <li>
                                    <Link to="/aplicacion/" class="flex items-center w-full p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100">Interfaces</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/aplicaciones" class="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                <FaRegListAlt />
                                <span class="flex-1 ml-3 whitespace-nowrap">Administracion</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" class="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                <FaDatabase />
                                <span class="flex-1 ml-3 whitespace-nowrap">Base de datos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" class="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                <FaServer />
                                <span class="flex-1 ml-3 whitespace-nowrap">Servidores</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" class="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                <FaFileAlt />
                                <span class="flex-1 ml-3 whitespace-nowrap">Documentacion</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" class="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                <FaEnvelopeOpenText />
                                <span class="flex-1 ml-3 whitespace-nowrap">Solicitudes</span>
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </aside>

            {/* <div 
                onClick={toggleCollapsed} 
                className="text-stone-900 pointer absolute left-8 top-20">
                {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </div>

            <Menu 
                mode="inline" 
                className="h-full fixed mt-20 pt-20 bg-gray-200 drop-shadow-md" 
                inlineCollapsed={collapsed} 
                style={collapsed ? {width: '80px'} : {width: '190px'} } 
                items={opcionesNav} 
            /> */}

        </nav>
    );
}

export default Navegacion;



import { useState } from "react";
import { FaHome, FaCode,FaDatabase, FaChevronDown, FaChevronUp, FaKey, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Autorizacion from '../services/auth.service';

function Navegacion() {

    const [open, setOpen] = useState(false);
    
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const openMenu1 = () => setOpen1(!open1);
    const openMenu2 = () => setOpen2(!open2);
    const openMenu3 = () => setOpen3(!open3);

    if (Autorizacion.obtenerUsuario() === null)
        return null

    
    return (
        <>
        <div className="flex">
            <div className={` ${ open ? "w-12" : "w-56 " }
                flex flex-col h-screen p-3 overflow-y-auto bg-gray-200 m-0 mt-20 p-0 z-50 fixed drop-shadow-md`}>

                <div className="space-y-3">

                    <div className="flex items-center justify-between">
                        <button onClick={() => setOpen(!open)}>
                            {open ? <FaChevronRight /> : <FaChevronLeft className="ml-36" />}
                        </button>
                    </div>
                    
                    {open ? null : 
                    
                        <ul className="list-none p-0 m-0 flex flex-col space-y-4">
                            <li>
                                <Link to="/dashboard" className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100">
                                    <FaHome />
                                    {open ? null : <span className="px-2">Inicio</span> }
                                </Link>
                            </li>
                            
                            {Autorizacion.obtenerUsuario().rol==='user' ? (
                                null
                            ) : (
                                <li>
                                    <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" onClick={openMenu2}>
                                        <FaKey/>
                                        {open ? null : <span className="px-2">Administracion</span> }
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
                                    {open ? null : <span className="px-2">Aplicaciones</span> }
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
                                    {open ? null : <span className="px-2">Base de datos</span> }
                                    {open3 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>

                                <div style={open3 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
                                    <Link to="/basedatos" 
                                        className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                        Busqueda
                                    </Link>
                                    <Link to="/servidores" 
                                        className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
                                        Servidores
                                    </Link>
                                </div>
                            </li>
                            
                        </ul>
                    }

                </div>
            </div>
        </div>
            
        </>
        

        // <nav className="w-20 md:w-36 lg:w-56 m-0 p-0 z-50 fixed drop-shadow-md border-2 border-blue-500 border-dashed ">

        //     <aside className="w-20 md:w-36 lg:w-56 mt-20 top-0 left-0 h-screen transition-transform border-2 border-red-500 border-dashed" >
                
        //         <div className="w-20 md:w-36 lg:w-56 h-full px-5 pt-20 overflow-y-auto bg-gray-200 text-black border-2 border-green-500 border-dashed" >
        //             <ul className="list-none p-0 m-0 flex flex-col space-y-4">
        //                 <li>
        //                     <Link to="/dashboard" className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100">
        //                         <FaHome />
        //                         <span className="ml-0 md:m-1 lg:ml-2">Inicio</span>
        //                     </Link>
        //                 </li>
                        
                            
        //                 {Autorizacion.obtenerUsuario().rol==='user' ? (
        //                     null
        //                 ) : (
        //                     <li>
        //                         <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" onClick={openMenu2}>
        //                             <FaKey/>
        //                             <span className="px-2">Administracion</span>
        //                             {open2 ? <FaChevronUp /> : <FaChevronDown />}
        //                         </div>
        //                         <div style={open2 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
        //                             <Link 
        //                                 style={Autorizacion.obtenerUsuario().rol!=='admin' ? {pointerEvents: 'none', display: 'none'} : {pointerEvents: 'auto'} }
        //                                 to="/administracion/permisos" 
        //                                 className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
        //                                     Permisos
        //                             </Link>
        //                             <Link to="/administracion/registro" 
        //                                 className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
        //                                     Registro
        //                             </Link>
        //                         </div>
        //                     </li>
        //                 )} 
        //                 <li>
        //                     <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" 
        //                         onClick={openMenu1}>
        //                         <FaCode/>
        //                         <span className="px-2">Aplicaciones</span>
        //                         {open1 ? <FaChevronUp /> : <FaChevronDown />}
        //                     </div>

        //                     <div style={open1 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
        //                         <Link to="/aplicaciones" 
        //                             className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
        //                             Busqueda
        //                         </Link>
        //                         <Link to="/aplicaciones/fallas" 
        //                             className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
        //                             Fallas
        //                         </Link>
        //                         <Link to="/aplicaciones/diagramas" 
        //                             className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
        //                             Charts
        //                         </Link>
        //                     </div>
        //                 </li>
        //                 <li>
        //                     <div className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-gray-100" 
        //                         onClick={openMenu3}>
        //                         <FaDatabase />
        //                         <span className="px-2">Base de datos</span>
        //                         {open3 ? <FaChevronUp /> : <FaChevronDown />}
        //                     </div>

        //                     <div style={open3 ? {display: 'block'} : {display: 'none'}} className='pl-4'>
        //                         <Link to="/basedatos" 
        //                             className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
        //                             Busqueda
        //                         </Link>
        //                         <Link to="/servidores" 
        //                             className="flex items-center p-2 no-underline text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100" >
        //                             Servidores
        //                         </Link>
        //                     </div>
        //                 </li>
                        
        //             </ul>
                    
        //         </div>
        //     </aside>
            
        // </nav>
    );
}

export default Navegacion;


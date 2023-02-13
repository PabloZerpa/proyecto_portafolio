
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Autorizacion from '../services/auth.service';

const columnasUser = ['ID','Acronimo','Nombre','Estatus','Region','Responsable Funcional',
    'Responsable Tecnico','Prioridad','Tipo','Ver'
];
const columnasAdmin = ['ID','Acronimo','Nombre','Estatus','Region','Responsable Funcional',
    'Responsable Tecnico','Prioridad','Tipo','Ver','Editar'
];

function Tabla({datos, opciones}) {
    
    return (
        <div className="relative mx-8 mb-4 shadow-md sm:rounded">
            <table className="table-auto border-separate w-full text-sm text-center text-gray-700">
                <thead className="text-xs text-gray-700 font-bold bg-zinc-200 uppercase">
                    
                    <tr className="bg-zinc-200 border-b hover:bg-zinc-300">
                        {opciones ? (
                            columnasAdmin.map(dato => { return  <td scope="col" className="px-2 py-2">{dato}</td> })
                        ) : (
                            columnasUser.map(dato => { return  <td scope="col" className="px-2 py-2">{dato}</td> })
                        )}    
                    </tr>
                    
                </thead>
                <tbody>
                    {datos.map((dato) => { 
                        return (
                        <tr key={dato.id} className="bg-white border-b hover:bg-gray-100">
                            <td scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">{dato.id}</td>
                            <td className="px-2 py-2">{dato.acronimo}</td>
                            <td className="px-2 py-2">{dato.nombre}</td>
                            <td className="px-2 py-2">{dato.estatus}</td>
                            <td className="px-2 py-2">{dato.region}</td>
                            <td className="px-2 py-2">{dato.responsablef}</td>
                            <td className="px-2 py-2">{dato.responsablet}</td>
                            <td className="px-2 py-2">{dato.prioridad}</td>
                            <td className="px-2 py-2">{dato.tipo}</td>
                            <td className="px-2 py-2">
                                <Link to={dato.id ? `/aplicaciones/${dato.id}` : `/dashboard`} className='text-lg' state={dato} >
                                    <FaEye className="text-blue-500" />
                                </Link>
                            </td>
                            {opciones ? (
                                <td className="px-2 py-2">
                                    <Link to={dato.id ? `/administracion/actualizacion/${dato.id}` : `/dashboard`} className='text-lg' state={dato} >
                                        <FaEdit className="text-blue-500" />
                                    </Link>
                                </td>) : (null)
                            }
                        </tr>
                    );
                })}
                </tbody>
            </table>
            
            {/* {opciones ? (
                <nav className="flex items-center justify-between pt-4">
                    <span className="text-sm font-normal text-gray-500">Showing <span className="font-semibold text-gray-900">1-10</span> of <span className="font-semibold text-gray-900">1000</span></span>
                    <ul className="list-none inline-flex items-center -space-x-px">
                        <li>
                            <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                                <span className="sr-only">Previous</span>
                                <FaChevronLeft />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
                        </li>
                        <li>
                            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
                        </li>
                        <li>
                            <a href="#" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">3</a>
                        </li>
                        <li>
                            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</a>
                        </li>
                        <li>
                            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">100</a>
                        </li>
                        <li>
                            <a href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                                <span className="sr-only">Next</span>
                                <FaChevronRight />
                            </a>
                        </li>
                    </ul>
                </nav>
            ) : (null)} */}
            

        </div>
    );
}

export default Tabla;
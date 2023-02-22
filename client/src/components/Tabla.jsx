
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";

const columnasUser = ['ID','Acronimo','Nombre','Estatus','Region','Responsable Funcional',
    'Responsable Tecnico','Prioridad','Tipo','Ver'
];
const columnasAdmin = ['ID','Acronimo','Nombre','Estatus','Region','Responsable Funcional',
    'Responsable Tecnico','Prioridad','Tipo','Ver','Editar'
];

function Tabla({datos, opciones, campo=null}) {

    const [campo2, setCampo] = useState(['ID', campo, 'Editar']);
    const [datosArray, setDatosArray] = useState('');

    useEffect(() => {
        setDatosArray(Object.keys(datos));
        console.log(datos);
		console.log(datosArray);
	}, []);

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

        </div>
    );
}

export default Tabla;
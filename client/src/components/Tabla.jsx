
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Paginacion from "./Paginacion";

const columnasUser = ['Ver','ID','Acronimo','Nombre','Estatus','Prioridad','Critica','Region','Localidad','Custodio Funcional',
'Custodio Tecnico','Alcance','Plataforma','Lenguaje','Framework','Base de datos','Servidor','Cliente','N° Usuarios',
'Mantenimiento','Horas Prom','Documentacion','Fecha Implantacion','Ult Actualizacion'];
const columnasAdmin = ['Operaciones','ID','Acronimo','Nombre','Estatus','Prioridad','Critica','Region','Localidad','Custodio Funcional',
'Custodio Tecnico','Alcance','Plataforma','Lenguaje','Framework','Base de datos','Servidor','Cliente','N° Usuarios',
'Mantenimiento','Horas Prom','Documentacion','Fecha Implantacion','Ult Actualizacion'];

function Tabla({columnas, datos, opciones, paginacion=false, campo=null}) {

    const [campo2, setCampo] = useState(['ID', campo, 'Editar']);
    const [datosArray, setDatosArray] = useState('');

    useEffect(() => {
        setDatosArray(Object.keys(datos));
        console.log(datos);
		console.log(datosArray);
	}, []);

    return (
        <div>
            <div className="relative overflow-x-auto w-[960px] mx-8 mb-4 sm:rounded">

                <table className="table-auto border-separate w-full text-xs text-center text-gray-700 shadow-md">
                    <thead className="text-xs text-gray-700 font-bold bg-zinc-200 uppercase">
                        
                        <tr className="bg-zinc-200 border-b hover:bg-zinc-300">
                            {opciones ? (
                                columnasAdmin.map((dato,index) => { 
                                    if(index===0)
                                        return  <td key={dato.id} scope="col" className="px-1 py-1">{dato}</td> 
                                    else
                                        return  <td key={dato.id} scope="col" className="px-1 py-1">{dato}</td> 
                                })
                            ) : (
                                columnasUser.map(dato => { return  <td key={dato.id} scope="col" className="px-1 py-1">{dato}</td> })
                            )}    
                        </tr>
                        
                    </thead>
                    <tbody>
                        {datos.map((dato, index) => { 
                            const valor = Object.values(dato);
                            //console.log(valor.length);
                            return (
                                <tr key={index} className="bg-white border-b hover:bg-gray-100">
                                    {valor.map((valor, index) => {
                                        if(index===0)
                                            return ( 
                                                <td key={index} className="px-2 py-2 flex justify-center items-center gap-4">
                                                    <Link to={dato.id ? `/aplicaciones/${dato.id}` : `/dashboard`} className='text-lg' state={dato} >
                                                        <FaEye className="text-blue-500" />
                                                    </Link>
                                                    {opciones ? (
                                                        <Link to={dato.id ? `/administracion/actualizacion/${dato.id}` : `/dashboard`} className='text-lg' state={dato} >
                                                            <FaEdit className="text-blue-500" />
                                                        </Link>) 
                                                        : 
                                                        (null) 
                                                    }
                                                </td> 
                                            );
                                        if(index===3)
                                            return ( 
                                                null
                                            );
                                        else
                                            return ( <td key={index} className="px-2 py-2">{valor}</td> );
                                    })}
                                </tr>
                            );

                            return (
                            <tr key={dato.id} className="bg-white border-b hover:bg-gray-100">
                                <td className="px-1 py-1">
                                    <Link to={dato.id ? `/aplicaciones/${dato.id}` : `/dashboard`} className='text-lg' state={dato} >
                                        <FaEye className="text-blue-500" />
                                    </Link>
                                </td>
                                {opciones ? (
                                    <td className="px-1 py-1">
                                        <Link to={dato.id ? `/administracion/actualizacion/${dato.id}` : `/dashboard`} className='text-lg' state={dato} >
                                            <FaEdit className="text-blue-500" />
                                        </Link>
                                    </td>) : (null)
                                }
                                <td scope="row" className="px-1 py-1 font-medium text-gray-900 whitespace-nowrap">{dato.id}</td>
                                <td className="px-1 py-1">{dato.acronimo}</td>
                                <td className="px-1 py-1">{dato.nombre}</td>
                                <td className="px-1 py-1">{dato.estatus}</td>
                                <td className="px-1 py-1">{dato.region}</td>
                                <td className="px-1 py-1">{dato.responsablef}</td>
                                <td className="px-1 py-1">{dato.responsablet}</td>
                                <td className="px-1 py-1">{dato.prioridad}</td>
                                <td className="px-1 py-1">{dato.tipo}</td>
                                
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {paginacion ? ( <Paginacion primero={1} ultimo={datos.length} total={100} />) : (null)}
            
        </div>
    );
}

export default Tabla;
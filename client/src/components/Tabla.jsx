
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Paginacion from "./Paginacion";
import { columnasUser, columnasAdmin } from "../services/campos.service";


function Tabla({datos, opciones, paginacion=false}) {
 
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
                            let valor = Object.values(dato);
                            if(opciones){
                                valor.unshift(
                                    <Link to={dato.aplicacion_id ? `/administracion/actualizacion/${dato.aplicacion_id}` : `/dashboard`} className='text-lg' state={dato} >
                                        <FaEdit className="text-blue-500" />
                                    </Link>
                                )
                            }
                            valor.unshift(
                                <Link to={dato.aplicacion_id ? `/aplicaciones/${dato.aplicacion_id}` : `/dashboard`} className='text-lg' state={dato} >
                                    <FaEye className="text-blue-500" />
                                </Link>
                            )
                            return (
                                <tr key={index} className="bg-white border-b hover:bg-gray-100">
                                    {valor.map((valor, index) => {
                                            return ( <td key={index} className="px-2 py-2">{valor}</td> );
                                    })}
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
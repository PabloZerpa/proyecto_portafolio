
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Paginacion from "./Paginacion";
 

function Tabla({columnas, datos, opciones, paginacion=false, count=10, devolverPagina=null}) {

    const [pagina, setPagina] = useState(1);
    const [primerResultado, setPrimer] = useState([pagina-1]*count);
    const [ultimoResultado, setUltimo] = useState([pagina*count] - 1);
    const obtenerPagina = (respuesta) => {setPagina(respuesta); /*console.log('PAGINA EN TABLA 2: ' + pagina)*/};

    const cambioPagina = () => {
        setPrimer([pagina-1]*count);
        setUltimo([pagina*count] - 1);
        if(devolverPagina)
            devolverPagina(pagina);
    }

    useEffect(() => {
        cambioPagina();
    }, [pagina, datos])
     
    return (
        <div>
            <div className="relative overflow-x-auto w-[960px] mx-8 mb-4 rounded">

                <table className="w-full text-xs text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        
                        <tr className="bg-zinc-200 border-b hover:bg-gray-600 hover:text-gray-100">
                            {opciones ? (
                                columnas.map((dato,index) => { 
                                    if(index===0)
                                        return  <td key={index} scope="col" className="px-3 py-3">{dato}</td> 
                                    else
                                        return  <td key={index} scope="col" className="px-3 py-3">{dato}</td> 
                                })
                            ) : (
                                columnas.map((dato, index) => { return  <td key={index} scope="col" className="px-3 py-3">{dato}</td> })
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
                                            return ( <td key={index} className="px-3 py-3">{valor}</td> );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {paginacion ? ( 
                <Paginacion 
                    del={primerResultado+1} 
                    al={ultimoResultado+1} 
                    total={100} 
                    devolver={obtenerPagina} />
                ) : 
                (null)
            }
            
        </div>
    );
}

export default Tabla;
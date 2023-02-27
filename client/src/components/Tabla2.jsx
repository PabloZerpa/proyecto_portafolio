
import { useState,useEffect } from "react";
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import Autorizacion from '../services/auth.service';

function Tabla2({columnas, datos, campo}) {

    const [valor, setValor] = useState('');
    const [edicion, setEdicion] = useState(null);
    const habilitar = (id) => {setEdicion(id)}

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function updateData(e) {
        
        e.preventDefault();
        console.log('DENTRO DEL UPDATE DE ACTUALIZACION');

        try {
            console.log('TRY DEL UPDATE');
            
            if(Autorizacion.obtenerUsuario().rol === 'admin'){
                const datoModificacion = { campo,valor };
                console.log(campo,valor);
                
                await Autorizacion.actualizarDato(datos[0].id, datoModificacion); 
                habilitar();
            }
        }
        catch (error) { console.log('ERROR AL ACTUALIZAR APL_ACT'); }
    }

    useEffect(() => {
        // console.log(datos[0]);
		// console.log(Object.values(datos[0]).length);
        // console.log(columnas);
	}, []);

    return (
        <div className="relative mx-8 mb-4 shadow-md sm:rounded">
            <table className="table-auto border-separate w-full text-sm text-center text-gray-700">
                <thead className="text-xs text-gray-700 font-bold bg-zinc-200 uppercase">
                    
                    <tr className="bg-zinc-200 border-b hover:bg-zinc-300">
                        {columnas.map((dato) => { return  <td scope="col" className="px-2 py-2">{dato}</td> }) }
                    </tr> 
                    
                </thead>
                <tbody>

                    {datos.map((dato, index) => { 
                        const valor = Object.values(dato);
                        return (
                        <tr key={dato.id} className="bg-white border-b hover:bg-gray-100">
                            <td className="px-2 py-2">{valor[0]}</td>
                            <td className="px-2 py-2">{valor[1]}</td>
                            <td className="px-2 py-2">{valor[2]}</td>
                            <td className="px-2 py-2">
                                {edicion!==dato.id ? (
                                    <input type='text' defaultValue={valor[3]} disabled
                                    className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm text-center rounded-md" />
                                ) : (
                                    <input type='text' defaultValue={valor[3]}
                                    onChange={(e) => {setValor(e.target.value)}}
                                    className="w-full p-2.5 bg-gray-50 border border-solid border-blue-500 text-gray-900 text-sm text-center rounded-md" />
                                )}
                                </td>
                            <td className="px-2 py-2">

                                {edicion===dato.id ? 
                                    <FaCheckCircle 
                                        onClick={updateData}
                                        className="ml-3 text-green-500 text-lg cursor-pointer"/>
                                    :
                                    <FaEdit 
                                        onClick={(e) => habilitar(dato.id)}
                                        className="ml-3 text-blue-500 text-lg cursor-pointer" />
                                }

                            </td>

                        </tr>
                    );
                })}
                </tbody>
            </table>

        </div>
    );
}

export default Tabla2;
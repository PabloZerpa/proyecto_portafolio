

import DataTable from "react-data-table-component";
import Base from '../services/basedatos.service';
import Servidor from '../services/servidor.service';
import Usuario from '../services/usuario.service';
import { FaSearch } from "react-icons/fa";
import { paginacionOpciones } from "../utils/TablaOpciones";
import Button from "./Button";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";


function TableRegistro({devolverSelecciones, setIsOpen, columnas, objetivo, busqueda=false, selectDefault=0}) {

    const [searchTerm, setSearchTerm] = useState(" ");
    const [resultado, setResultado] = useState('');
    const [debounceValue] = useDebounce(searchTerm, 500);
    const [elementos, setElementos] = useState([0]);

    useEffect(() => {
        console.log(selectDefault);
		if (debounceValue)
            onSearch(debounceValue);
        else
            setResultado(null);
	}, [debounceValue]); 


    const onSearch = async (value) => {
        try {
            let respuesta = null;

            if(objetivo === 'base_datos'){
                respuesta = await Base.obtenerBDPorBusqueda(value);
            }
            else if(objetivo === 'servidor'){
                respuesta = await Servidor.obtenerServidorPorBusqueda(value);
            }
            else if(objetivo === 'lenguaje'){
                respuesta = await Usuario.obtenerOpcion('lenguajesTabla');
            }
            else if(objetivo === 'framework'){
                respuesta = await Usuario.obtenerOpcion('frameworksTabla');
            }

            setResultado(respuesta.data);
        } catch (error) {
            console.log('ERROR AL BUSCAR DATOS');
        }
    }

    const handleRowSelected = useCallback(state => {
        setElementos(elementos[0] = state.selectedRows);
	}, []);
    

    const sendDatos = () => {
        if(elementos[0] !== 0){
            devolverSelecciones(elementos);
            setIsOpen(false)
        }
    }

    const rowSelectCritera = useCallback( row => {
        if(selectDefault > 0){
            for (const id of selectDefault){
                if(row['base_datos_id'] === id)
                    return true;
                else if(row['servidor_id'] === id)
                    return true;
                else if(row['lenguaje_id'] === id)
                    return true;
            }
        }
    }, []);

    return (
        <>
            {busqueda ? (
                <form className='flex justify-center items-center flex-col p-0 bg-zinc-400 border-solid rounded'>
                    <div className='flex flex-col gap-0 w-full py-2 border-solid'>

                        <div className="radioArea">
                            <div className='mt-4 flex justify-center items-center gap-0'>
                                <div className="relative w-96">
                                    <input 
                                        type="search" 
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block p-2 pr-12 w-96 text-sm text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
                                    <button 
                                        type="submit" 
                                        onClick={(e) => {e.preventDefault(); onSearch(debounceValue)}}
                                        className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            ) : null}

            {resultado ? (
                <div className="w-full bg-zinc-400 p-4 rounded">
                    <DataTable
                        columns={columnas}
                        data={resultado}
                        pagination
                        paginationComponentOptions={paginacionOpciones}
                        paginationRowsPerPageOptions={[10,20,30,50,100]}
                        selectableRows 
                        selectableRowSelected={rowSelectCritera}
                        onSelectedRowsChange={handleRowSelected}
                        noDataComponent={"SIN RESULTADOS"}
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        highlightOnHover
                        pointerOnHover
                        dense
                    />

                </div>
            ) : (null)}

            <div className="flex items-center gap-4 p-2 space-x-2 border-t border-gray-200 rounded-b">
                <Button color='blue' manejador={(e) => {sendDatos()}}>Agregar</Button>
                <Button color='blue' manejador={(e) => setIsOpen(false)}>Cerrar</Button>
            </div>
        </>
    );
}

export default TableRegistro;
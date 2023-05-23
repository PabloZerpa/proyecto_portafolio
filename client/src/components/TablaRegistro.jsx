
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";
import { paginacionOpciones } from "../utils/TablaOpciones";
import Button from "./Button";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { rutaBaseDatos, rutaCustodio, rutaServidor, rutaUsuario } from "../utils/APIRoutes";
import axios from "axios";
import authHeader from "../utils/header";


function TableRegistro({devolverSelecciones, setIsOpen, columnas, objetivo, busqueda=false, selectDefault=0}) {

    // =================== VARIABLES PARA LA BUSQUEDA ===================
    const [resultado, setResultado] = useState('');
    const [datos, setDatos] = useState({ terminoBusqueda: '',});
    const [debounceValue] = useDebounce(datos, 500);
    const [elementos, setElementos] = useState([0]);

    useEffect(() => {
		if (debounceValue)
            onSearch(debounceValue);
        else
            setResultado(null);
	}, [debounceValue]); 

    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = (e) => {
        setDatos({ ...datos, [e.target.name] : e.target.value })    
    }

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async function obtenerPorBusqueda(objetivo,term) {

        try {
            if(objetivo === 'base_datos'){
                return axios.post(`${rutaBaseDatos}/busqueda`, 
                    {term}, { headers: authHeader() });
            }
            else if(objetivo === 'servidor'){
                return axios.post(`${rutaServidor}/busqueda`, 
                    {term}, { headers: authHeader() });
            }
            else if(objetivo === 'lenguaje'){
                const respuesta = await axios.get(`${rutaUsuario}/lenguajesTabla`, { headers: authHeader() });
                return respuesta;
            }
            else if(objetivo === 'custodio'){
                return axios.post(`${rutaCustodio}/busqueda`, 
                    {term}, { headers: authHeader() });
            }
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    const onSearch = async (value) => {
        try {
            let respuesta = null;
            const { terminoBusqueda } = value;

            respuesta = await obtenerPorBusqueda(objetivo,terminoBusqueda);
            
            setResultado(respuesta.data);
        } catch (error) {
            console.log('ERROR AL BUSCAR DATOS');
        }
    }

    const handleRowSelected = useCallback(state => {
        if(objetivo === 'custodio'){
            if(state.selectedRows[0]){
                devolverSelecciones(state.selectedRows[0].cus_indicador);
                setIsOpen(false);
            }
        }
        else{
            setElementos(elementos[0] = state.selectedRows);
        }
	}, []);
    

    const sendDatos = () => {
        if(elementos[0] !== 0){
            devolverSelecciones(elementos);
            setIsOpen(false)
        }
    }

    const rowSelectCritera = useCallback( row => {
        if(selectDefault){
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
                <form className='flex justify-center items-center flex-col p-0 border-solid rounded'>
                    <div className='flex flex-col w-full py-2 border-solid'>

                        <div className="radioArea">
                            <div className='mt-4 flex justify-center items-center'>
                                <div className="relative w-96">
                                    <input 
                                        type="search" 
                                        name='terminoBusqueda'
                                        // onChange={(e) => setSearchTerm(e.target.value)}
                                        onChange={(e) => setValores(e)}
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
                <div className="w-full bg-zinc-400 p-0 rounded">
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
                        fixedHeaderScrollHeight="220px"
                        highlightOnHover
                        pointerOnHover
                        dense
                    />

                </div>
            ) : (null)}

            {objetivo !== 'custodio' ? 
                <div className="flex items-center space-x-8 p-0 ">
                    <Button color='blue' manejador={(e) => {sendDatos()}}>Agregar</Button>
                    <Button color='blue' manejador={(e) => setIsOpen(false)}>Cerrar</Button>
                </div>
                : 
                null
            }

        </>
    );
}

export default TableRegistro;
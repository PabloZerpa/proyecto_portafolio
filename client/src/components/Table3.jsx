
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { FaSearch } from 'react-icons/fa';
import Select from './Select';
import Usuario from '../services/usuario.service';
import DataTable from 'react-data-table-component';
import { opcionEstatus, opcionLenguaje, opcionRegion } from '../services/campos.service';
import {paginacionOpciones} from "../utils/TablaOpciones"
import Button from './Button';


const columns = [
    {
        name: 'Lenguaje ID',
        selector: row => row.lenguaje_id,
        left: true,
        width: "150px"
    },
    {
        name: 'Lenguaje',
        selector: row => row.lenguaje,
        left: true,
        width: "200px"
    },
];


function Tabla3({devolverSelecciones, setIsOpen3}) {

    const [resultado, setResultado] = useState(''); 
    const [elementos, setElementos] = useState([0]);
    
    useEffect(() => {
        async function getData(){
            const respuesta = await Usuario.obtenerOpcion('lenguajesTabla');
            setResultado(respuesta.data);
            console.log(resultado);

        }
        getData();
    }, [])

	const handleRowSelected = useCallback(state => {
        setElementos(elementos[0] = state.selectedRows);
	}, []);

    const sendDatos = () => {
        devolverSelecciones(elementos);
    }
 
    return (
        <>
            {opcionLenguaje ? (
                <div className="w-full bg-zinc-400 p-4 rounded">
                    <DataTable
                        columns={columns}
                        data={resultado}
                        pagination
                        paginationComponentOptions={paginacionOpciones}
                        paginationRowsPerPageOptions={[10,20,30,50,100]}
                        selectableRows 
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
                <Button color='blue' manejador={(e) => {sendDatos(); setIsOpen3(false)}}>Agregar</Button>
                <Button color='blue' manejador={(e) => setIsOpen3(false)}>Cerrar</Button>
            </div>
        </>
    );
}

export default Tabla3;
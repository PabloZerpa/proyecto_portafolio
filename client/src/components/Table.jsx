
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { FaSearch } from 'react-icons/fa';
import Select from './Select';
import Base from '../services/basedatos.service';
import DataTable from 'react-data-table-component';
import { opcionEstatus, opcionManejadores, opcionTipoBD, selectTipoAmbiente } from '../services/campos.service';
import {paginacionOpciones} from "../utils/TablaOpciones"
import Button from './Button';


const columns = [
    {
        name: 'ID',
        selector: row => row.base_datos_id,
        sortable: true,
        left: true,
        width: '60px'
    },
    {
        name: 'Nombre',
        selector: row => row.base_datos,
        sortable: true,
        left: true
    },
    {
        name: 'Estatus',
        selector: row => row.bas_estatus,
        sortable: true,
        left: true
    },
    {
        name: 'Tipo',
        selector: row => row.tipo,
        sortable: true,
        left: true
    },
    {
        name: 'Manejador',
        selector: row => row.manejador,
        sortable: true,
        left: true
    },
    {
      name: 'N° de Usuarios',
      selector: row => row.bas_cantidad_usuarios,
      sortable: true,
      left: true
    },
    {
      name: 'Ambiente',
      selector: row => row.tipo_ambiente,
      sortable: true,
      left: true
    },
];


function Table({devolverSelecciones, setIsOpen}) {

    const [searchTerm, setSearchTerm] = useState("a");
    const [resultado, setResultado] = useState('');
    const [debounceValue] = useDebounce(searchTerm, 500);

    const [datos, setDatos] = useState({
        estatus: '',
        tipo: '',
        manejador: '',
        ambiente: '', 
        registros: 10,
        orden: 'ASC',
    }); 

    const resetCampos = () => {
        for (let clave in datos){
            if(clave==='orden')
                datos[clave] = 'ASC';
            else if(clave==='registros')
                datos[clave] = 10;
            else
                datos[clave] = '';
        }
        onSearch(debounceValue)
    }

    const handleInputChange = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    useEffect(() => {
		if (debounceValue)
            onSearch(debounceValue);
        else
            setResultado(null);
	}, [debounceValue, datos]); 


    const onSearch = async (value) => {
        try {
            const { estatus,tipo,manejador,ambiente,registros,orden } = datos;

            const respuesta = await Base.obtenerBDPorBusqueda(
                value,estatus,tipo,manejador,ambiente,registros,orden);
            
            setResultado(respuesta.data);
            
        } catch (error) {
            console.log('ERROR AL BUSCAR DATOS');
        }
    }

    const [elementos, setElementos] = useState([0]);

	const handleRowSelected = useCallback(state => {

        // PRINT DEL ARREGLO CON LOS VALORES SELECCIONADOS
        // console.log(state.selectedRows);

        // PRINT DEL LA VARIABLE CON LAS SELECCIONES
        setElementos(elementos[0] = state.selectedRows);
        // console.log(elementos);

	}, []);

    const sendDatos = () => {
        devolverSelecciones(elementos);
    }
 
    return (
        <>
            <form className='flex justify-center items-center flex-col p-4 bg-zinc-400 border-solid rounded'>
                <div className='flex flex-col gap-0 w-full py-2 border-solid'>

                    <div className="border-solid">
                        <div className="grid grid-cols-4">
                            <Select campo='Estatus' name='estatus' busqueda={true} byId={false} opciones={opcionEstatus} manejador={handleInputChange} />
                            <Select campo='Tipo' name='tipo' busqueda={true} byId={false} opciones={opcionTipoBD} manejador={handleInputChange} />
                            <Select campo='Manejador' name='manejador' busqueda={true} byId={false} opciones={opcionManejadores} manejador={handleInputChange} />
                            <Select campo='Ambiente' name='ambiente' busqueda={true} byId={false} opciones={selectTipoAmbiente} manejador={handleInputChange} />
                        </div>
                    </div>

                    <div className="radioArea">
                        <div className='mt-8 flex justify-center items-center gap-4'>
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
                            <input type='reset' value='Restablecer' 
                                onClick={resetCampos}
                                className='w-20 h-8 text-xs bg-blue-600 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-500' size='small' 
                            />
                        </div>
                    </div>
                </div>
            </form>

            {resultado ? (
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
                <Button color='blue' manejador={(e) => {sendDatos(); setIsOpen(false)}}>Agregar</Button>
                <Button color='blue' manejador={(e) => setIsOpen(false)}>Cerrar</Button>
            </div>
        </>
    );
}

export default Table;

/*


import DataTable from "react-data-table-component";
import { Container } from "../../components/";
import { FaUserEdit, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Table from "../../components/Table";

function Permisos() {

    const [nombre, setName] = useState();
    const [edad, setAge] = useState();
    const [id, setId] = useState(1);

    const [isOpen, setIsOpen] = useState(false);
    const [tableData, setData] = useState([{
        base: '',
        nombre: ''
    }]);
    

    const [selecciones, setSelecciones] = useState([]);
    const obtenerSelecciones = (respuesta) => {

        console.log(respuesta);

        setSelecciones(selecciones[0] = respuesta);
        //const campo = `base${selecciones[0][0].base_datos_id}`;

        setData(tableData[`base${selecciones[0][0].base_datos_id}`] = selecciones[0][0].base_datos_id);
        setData(tableData[`nombre${selecciones[0][0].base_datos_id}`] = selecciones[0][0].base_datos_id);
        console.log(tableData);

    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.base1,
            sortable: true,
            left: true,
            width: "60px"
        },
        {
            name: 'Nombre',
            selector: row => row.nombre1,
            sortable: true,
            left: true
        },
    ];

    const addRow = (id,name,age) => {
        setData(tableData => [...tableData, tableData]);
        setId(id=id+1);
        console.log(tableData);
    }

    //const [selectedRows, setSelectedRows] = useState([0]);

	// const handleRowSelected = useCallback(state => {
    //     setSelectedRows(selectedRows[0] = state.selectedRows);
    //     //console.log(state.selectedRows);
    //     console.log(selectedRows[0]);
	// }, []);

    

    return(
        <Container>
            <button onClick={() => setIsOpen(!isOpen)}>
                Open Modal
            </button>

            {isOpen ? (
                <Modal setIsOpen={setIsOpen}>
                    <Table
                        devolverSelecciones={obtenerSelecciones}
                     /> 
                </Modal> 
            ) : (null) }

            <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
            <input type="text" name="age" onChange={(e) => setAge(e.target.value)} />
            <button onClick={(e) => addRow(id,nombre,edad)} className="bg-blue-600 text-white">ADD</button>
            <div className="w-1/2">
                <DataTable
                    columns={columns}
                    data={tableData}
                    highlightOnHover
                    pointerOnHover
                    selectableRows 
                    //onSelectedRowsChange={handleRowSelected}
                    dense
                />
            </div>

            <ul className="grid grid-cols-2 gap-4">
                <Link to="/administracion/permisos/crear" className="flex items-center justify-between w-72 p-4 text-gray-600 bg-white border-2 border-white rounded-lg cursor-pointer hover:text-blue-500 hover:border-blue-500">            
                    <div className="block">
                        <FaUserPlus className="text-2xl" />
                        <div className="w-full text-lg font-semibold">Crear Usuario</div>
                    </div>
                </Link>

                <Link to="/administracion/permisos/buscar" className="flex items-center justify-between w-72 p-4 text-gray-600 bg-white border-2 border-white rounded-lg cursor-pointer hover:text-blue-500 hover:border-blue-500">            
                    <div className="block">
                        <FaUserEdit className="text-2xl" />
                        <div className="w-full text-lg font-semibold">Editar Usuario</div>
                    </div>
                </Link>
            </ul>
        </Container>
    );
}

export default Permisos;



*/
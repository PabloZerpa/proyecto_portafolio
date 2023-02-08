
import { useState, useEffect } from 'react';
import { Form, Radio } from 'antd';
import { useDebounce } from 'use-debounce';
import { FaSearch } from 'react-icons/fa';
import Usuarios from "../services/user.service";

function Busqueda({manejarBusqueda}) {
    
    const [id, setId] = useState("");
    const [estatus, setEstatus] = useState("");
    const [region, setRegion] = useState("");
    const [depart, setDepart] = useState("");
    const [count, setCount] = useState(10);
    const [fecha, setFecha] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [order, setOrder] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [resultados, setResultados] = useState([]);
    const [debounceValue] = useDebounce(searchTerm,500);

    useEffect(() => {
		if (debounceValue) {
            onSearch(debounceValue,estatus,region,prioridad,order,count);
        } else {
            setResultados(null);
        }
	}, [debounceValue]);

    const onSearch = async (value,estatus,region,prioridad,order,count) => {
        try {
            // console.log(`Valor a buscar: ${value}`);
            // console.log(`POR Estatus: ${estatus}`);
            // console.log(`POR REGION: ${region}`);
            // console.log(`POR DEPARTAMENTO: ${depart}`);
            // console.log(`POR FECHA: ${fecha}`);
            // console.log(`POR PRIORIDAD: ${prioridad}`);
            // console.log(`POR ORDEN: ${order}`);
            // console.log(`POR COUNT: ${count}`);

            const datos = await Usuarios.obtenerPorTermino(value,estatus,region,prioridad,order,count);
            setResultados(datos.data);
            manejarBusqueda(datos.data);

            console.log(resultados);
        } catch (error) {
            console.log('ERROR AL BUSCAR DATOS');
        }
    }

    return (
        <form className='flex justify-center items-center flex-col pb-4 px-20 bg-zinc-400 rounded'>
            <div className='flex flex-col gap-4 w-full py-4 pr-4'>

                <div className="selectArea">
                    <div className="flex justify-center items-center gap-4">

                        <div className='flex items-center text-sm'>
                            <label className="pr-1">Estatus:</label>
                            <select 
                                name="estatus" 
                                placeholder='Estatus'
                                onChange={(e) => {setEstatus(e.target.value)}}
                                className="block w-40 p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500">
                                    <option value=''>Todas</option>
                                    <option value="Desarrollo">Desarrollo</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>

                        <div className='flex items-center text-sm'>
                            <label className="pr-1">Region:</label>
                            <select 
                                name="region" 
                                placeholder='Region'
                                onChange={(e) => {setRegion(e.target.value)}}
                                className='block w-40 p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'>
                                    <option value=''>Todas</option>
                                    <option value="Centro">Centro</option>
                                    <option value="Oriente">Oriente</option>
                                    <option value="Andes">Andes</option>
                            </select>
                        </div>

                        {/* <div className='flex items-center text-sm'>
                            <label className="pr-1">Departamento:</label>
                            <select 
                                name="departamento" 
                                placeholder='Departamento'
                                onChange={(e) => {setDepart(e.target.value)}}
                                className='block w-40 p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'>
                                    <option value=''>Todas</option>
                                    <option value="Informatica">Informatica</option>
                                    <option value="Telecomunicaciones">Telecomunicaciones</option>
                                    <option value="Automatizacion">Automatizacion</option>
                            </select>
                        </div> */}

                        <div className='flex items-center text-sm'>
                            <label className="pr-1">Resultados:</label>
                            <select 
                                name="count" 
                                placeholder='Count'
                                onChange={(e) => {setCount(parseInt(e.target.value))}}
                                className='block w-40 p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    <option value={40}>40</option>
                                    <option value={50}>50</option>
                            </select>
                        </div>

                        {/* <div className='flex items-center text-sm'>
                            <label className="pr-1">Fecha:</label>
                            <input type='date' value="2018-07-22"
                                className='block w-40 p-2 text-gray-900 border-none outline-none rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500' 
                                placeholder="Fecha" 
                                onChange={(e) => {setFecha(e.target.value); console.log(fecha)}} />
                        </div> */}

                    </div>
                </div>
                
                <div className="radioArea">
                    <div className="flex justify-center items-center">

                        <div className="flex justify-center items-center gap-4">
                            <Form.Item className="m-0 p-0" label="Prioridad" initialValue='todo' />
                            <Radio.Group defaultValue='' onChange={(e) => {setPrioridad(e.target.value)}}>
                                <Radio value=''>Todas</Radio>
                                <Radio value='alta'>Alta</Radio>
                                <Radio value='medio'>Media</Radio>
                                <Radio value='baja'>Baja</Radio>
                            </Radio.Group>
                        </div>

                        <div className="flex justify-center items-center gap-4">
                            <Form.Item className="m-0 p-0" label="Orden" />
                            <Radio.Group defaultValue='ASC' onChange={(e) => {setOrder(e.target.value)}}>
                                    <Radio value='ASC'>Ascendente</Radio>
                                    <Radio value='DESC'>Descendente</Radio>
                            </Radio.Group>
                        </div>
                        
                        <button 
                            onClick={(e) => {e.preventDefault()}}
                            className='w-28 h-8 text-sm bg-blue-600 text-white border-none outline-none rounded-md cursor-pointer hover:bg-blue-500' size='small' >
                            Restablecer
                        </button>
                    </div>
                </div>
            </div>

            <br /><br />

            <div class="relative w-96">
                <input 
                    type="search" 
                    onChangeCapture={(e) => setSearchTerm(e.target.value)}
                    class="block p-2 w-96 text-sm text-black bg-white rounded-lg border-none outline-none" placeholder="Buscar" />
                <button 
                    type="submit" 
                    onClick={(e) => {e.preventDefault(); onSearch(debounceValue, estatus, region, depart, fecha, prioridad, order, count)}}
                    class="absolute top-0 right-0 w-14 p-2 text-sm font-medium text-white bg-blue-600 rounded-r-lg border-none outline-none cursor-pointer">
                    
                    <FaSearch />
                </button>

            </div>
        </form>
    );
}

export default Busqueda;
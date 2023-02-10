
import { useState, useEffect } from 'react';
import { Form, Radio } from 'antd';
import { useDebounce } from 'use-debounce';
import { FaSearch } from 'react-icons/fa';
import Usuarios from "../services/user.service";

function Busqueda({manejarBusqueda}) {
    
    const [avanzados, setAvanzados] = useState(false);
    const [id, setId] = useState("");
    const [estatus, setEstatus] = useState("");
    const [region, setRegion] = useState("");
    const [tipo, setTipo] = useState("");
    const [fecha, setFecha] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [count, setCount] = useState(10);
    const [order, setOrder] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [resultados, setResultados] = useState([]);
    const [debounceValue] = useDebounce(searchTerm,500);

    useEffect(() => {
		if (debounceValue) {
            onSearch(debounceValue,estatus,region,prioridad,tipo,order,count);
        } else {
            setResultados(null);
        }
	}, [debounceValue]);

    const onSearch = async (value,estatus,region,prioridad,tipo,order,count) => {
        try {
            // console.log(`Valor a buscar: ${value}`);
            // console.log(`POR Estatus: ${estatus}`);
            // console.log(`POR REGION: ${region}`);
            // console.log(`POR DEPARTAMENTO: ${depart}`);
            // console.log(`POR FECHA: ${fecha}`);
            // console.log(`POR PRIORIDAD: ${prioridad}`);
            // console.log(`POR ORDEN: ${order}`);
            // console.log(`POR COUNT: ${count}`);

            const datos = await Usuarios.obtenerPorTermino(value,estatus,region,prioridad,tipo,order,count);
            console.log(Object.keys(datos.data).length);
            setResultados(datos.data);
            manejarBusqueda(datos.data);

            console.log(resultados);
        } catch (error) {
            console.log('ERROR AL BUSCAR DATOS');
        }
    }

    return (
        <form className='flex justify-center items-center flex-col p-4 bg-zinc-400 rounded'>
            <div className='flex flex-col gap-4 w-full py-2 pr-2'>

                <div className="selectArea">
                    <div className="flex justify-center items-center gap-4">

                        <div className='flex items-center text-sm'>
                            <label className="pr-1">Estatus:</label>
                            <select 
                                name="estatus" 
                                placeholder='Estatus'
                                onChange={(e) => {setEstatus(e.target.value)}}
                                className="w-32 p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500">
                                    <option value=''>Todas</option>
                                    <option value="Desarrollo">Desarrollo</option>
                                    <option value="Activo">Mantenimiento</option>
                                    <option value="Inactivo">Estabilizacion</option>
                                    <option value="Activo">Desincorporada</option>
                                    <option value="Inactivo">Sin Uso</option>
                                    <option value="Inactivo">Anulado</option>
                                    <option value="Activo">Visualizacion</option>
                                    <option value="Inactivo">Prueba</option>
                            </select>
                        </div>

                        <div className='flex items-center text-sm'>
                            <label className="pr-1">Region:</label>
                            <select 
                                name="region" 
                                placeholder='Region'
                                onChange={(e) => {setRegion(e.target.value)}}
                                className='w-32 p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'>
                                    <option value=''>Todas</option>
                                    <option value="Centro">Centro</option>
                                    <option value="Oriente">Centro Norte</option>
                                    <option value="Oriente">Centro Sur</option>
                                    <option value="Oriente">Oriente Norte</option>
                                    <option value="Oriente">Oriente Sur</option>
                                    <option value="Oriente">Occidente Norte</option>
                                    <option value="Oriente">Occidente Sur</option>
                                    <option value="Andes">Carabobo</option>
                                    <option value="Andes">Andes</option>
                                    <option value="Andes">Metropolitana</option>
                                    <option value="Andes">Faja</option>
                                    <option value="Andes">Exterior</option>
                                    <option value="Andes">Por Determinar</option>
                            </select>
                        </div>

                        <div className='flex items-center text-sm'>
                            <label className="pr-1">Resultados:</label>
                            <select 
                                name="count" 
                                placeholder='Count'
                                onChange={(e) => {setCount(parseInt(e.target.value))}}
                                className='w-32 p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    <option value={40}>40</option>
                                    <option value={50}>50</option>
                            </select>
                        </div>

                        <div className='flex items-center text-sm'>
                            <label className="pr-1">Tipo:</label>
                            <select 
                                name="tipo" 
                                placeholder='Tipo'
                                onChange={(e) => {setTipo(e.target.value)}}
                                className='w-32 p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'>
                                    <option value=''>Todas</option>
                                    <option value="Web">Web</option>
                                    <option value="Escritorio">Escritorio</option>
                                    <option value="Mobil">Mobil</option>
                                    <option value="Servidor">Servidor</option>
                                    <option value="Mixta">Mixta</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div style={avanzados ? {display: 'block'} : {display: 'none'}} className="selectArea">
                    <div className="flex flex-wrap justify-center items-center gap-4">

                        <div className='flex items-center text-sm'>
                            <label className="pr-1">Plataforma:</label>
                            <select 
                                name="plataforma" 
                                placeholder='Plataforma'
                                className='w-32 p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'>
                                    <option value=''>Todas</option>
                                    <option value="Web">Web</option>
                                    <option value="Escritorio">Cliente-Servidor</option>
                                    <option value="Mobil">Stand Alone</option>
                                    <option value="Servidor">Mini</option>
                                    <option value="Mixta">Mainframe</option>
                            </select>
                        </div>

                        <div className='flex items-center text-sm'>
                            <label className="pr-1">Alcance:</label>
                            <select 
                                name="alcance" 
                                placeholder='Alcance'
                                className='w-32 p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'>
                                    <option value=''>Todas</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Funcional">Funcional</option>
                                    <option value="Departamental">Departamental</option>
                                    <option value="Interdepartamental">Interdepartamental</option>
                                    <option value="Corporativo">Corporativo</option>
                            </select>
                        </div>

                        <div className='flex items-center text-sm'>
                            <label className="pr-1">Mantenimiento:</label>
                            <select 
                                name="mantenimiento" 
                                placeholder='Mantenimiento'
                                className='w-32 p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'>
                                    <option value=''>Todas</option>
                                    <option value="Personal">Diario</option>
                                    <option value="Funcional">Semanal</option>
                                    <option value="Funcional">Quincenal</option>
                                    <option value="Departamental">Mensual</option>
                                    <option value="Departamental">Bimensual</option>
                                    <option value="Departamental">Trimestral</option>
                                    <option value="Departamental">Semestral</option>
                                    <option value="Departamental">Anual</option>
                                    <option value="Departamental">No Aplica</option>

                            </select>
                        </div>

                        <div className='flex items-center text-sm'>
                            <label className="pr-1">Fecha:</label>
                            <input type='date' value="2018-07-22"
                                className='w-32 p-2 text-gray-900 border-none outline-none rounded bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500' 
                                placeholder="Fecha" 
                                onChange={(e) => {setFecha(e.target.value); console.log(fecha)}} />
                        </div>

                    </div>
                </div>
                
                <div className="radioArea">
                    <div className="flex flex-wrap justify-center items-center">

                        <div className="flex justify-center items-center gap-4">
                            <Form.Item className="m-0 p-0" label="Orden" />
                            <Radio.Group defaultValue='ASC' onChange={(e) => {setOrder(e.target.value)}}>
                                    <Radio value='ASC'>Ascendente</Radio>
                                    <Radio value='DESC'>Descendente</Radio>
                            </Radio.Group>
                        </div>

                        <div className="flex justify-center items-center gap-4">
                            <Form.Item className="m-0 p-0" label="Prioridad" initialValue='todo' />
                            <Radio.Group defaultValue='' onChange={(e) => {setPrioridad(e.target.value)}}>
                                <Radio value=''>Todas</Radio>
                                <Radio value='alta'>Alta</Radio>
                                <Radio value='medio'>Media</Radio>
                                <Radio value='baja'>Baja</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    
                    <div style={avanzados ? {display: 'flex'} : {display: 'none'}} className="flex flex-wrap justify-center items-center">

                        <div className="flex justify-center items-center gap-4">
                            <Form.Item className="m-0 p-0" label="Criticidad" />
                            <Radio.Group defaultValue='' >
                                    <Radio value=''>Critico</Radio>
                                    <Radio value='No'>No Critico</Radio>
                            </Radio.Group>
                        </div>

                        <div className="flex justify-center items-center gap-4">
                            <Form.Item className="m-0 p-0" label="Codigo" />
                            <Radio.Group defaultValue='SI' >
                                    <Radio value='SI'>Si</Radio>
                                    <Radio value='No'>No</Radio>
                                    <Radio value='No'>Mixto</Radio>
                            </Radio.Group>
                        </div>

                        <div className="flex justify-center items-center gap-4">
                            <Form.Item className="m-0 p-0" label="Licencia" />
                            <Radio.Group defaultValue='' >
                                    <Radio value=''>Ninguna</Radio>
                                    <Radio value='Logica'>Logica</Radio>
                                    <Radio value='Fisica'>Fisica</Radio>
                            </Radio.Group>
                        </div>

                        <div className="flex justify-center items-center gap-4">
                            <Form.Item className="m-0 p-0" label="Impacto" />
                            <Radio.Group defaultValue='' >
                                    <Radio value=''>Ninguno</Radio>
                                    <Radio value='Si'>Si</Radio>
                                    <Radio value='No'>No</Radio>
                            </Radio.Group>
                        </div>
                    </div>

                    <div className='mt-4 ml-96 pl-24 flex justify-center items-center'>
                        <input type='reset' value='Restablecer' 
                            onClick={(e) => {e.preventDefault()}}
                            className='w-24 h-8 text-xs bg-blue-600 text-white border-none outline-none rounded-md cursor-pointer hover:bg-blue-500' size='small' 
                        />

                        <input className='mx-2 rounded' type="checkbox" onChange={(e) => setAvanzados(e.target.checked)} /> 
                        <label className='text-sm' >Avanzados</label>
                    </div>

                </div>
            </div>

            <br /><br />

            <div className="relative w-96">
                <input 
                    type="search" 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block p-2 w-96 text-sm text-black bg-white rounded-lg border-none outline-none" placeholder="Buscar" />
                <button 
                    type="submit" 
                    onClick={(e) => {e.preventDefault(); onSearch(debounceValue, estatus, region, fecha, prioridad, tipo, order, count)}}
                    className="absolute top-0 right-0 w-14 p-2 text-sm font-medium text-white bg-blue-600 rounded-r-lg border-none outline-none cursor-pointer">
                    
                    <FaSearch />
                </button>

            </div>
        </form>
    );
}

export default Busqueda;


{/* <div className="flex flex-wrap justify-center items-center">
                        <RadioButton label='Orden' opciones={['Ascendente', 'Descendente']} />
                        <RadioButton label='Prioridad' opciones={['Todas', 'Alta','Media', 'Baja']} />
                        <RadioButton label='Criticidad' opciones={['Critica', 'No Critica']} />
                    </div>
                    <div style={avanzados ? {display: 'flex'} : {display: 'none'}} className="flex flex-wrap justify-center items-center">
                        <RadioButton label='Codigo' opciones={['Si', 'No', 'Mixto']} />
                        <RadioButton label='Licencia' opciones={['Ninguna', 'Logica', 'Fisica']} />
                        <RadioButton label='Impacto' opciones={['Ninguna', 'Si', 'No']} />
                        <RadioButton label='BaseDatos' opciones={['Si', 'No']} />
                        <RadioButton label='Servidor' opciones={['Si', 'No']} />
                    </div> */}
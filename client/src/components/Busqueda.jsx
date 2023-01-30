
import { useState, useEffect } from 'react';
import { Input, InputNumber, Select, DatePicker, Form, Button, Radio, Divider } from 'antd';
import { useDebounce } from 'use-debounce';
import Usuarios from "../services/user.service";
import { FaSearch } from 'react-icons/fa';
const { Search } = Input;

function Busqueda({manejarBusqueda}) {
    
    const [id, setId] = useState("");
    const [estatus, setEstatus] = useState("");
    const [region, setRegion] = useState("");
    const [depart, setDepart] = useState("");
    const [fecha, setFecha] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [order, setOrder] = useState("");

    const [isLoading, setIsLoading] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [resultados, setResultados] = useState([]);
    const [debounceValue] = useDebounce(searchTerm,500);

    useEffect(() =>{
		if (debounceValue) {
            onSearch(debounceValue, estatus, region, depart, fecha, prioridad, order);
            setIsLoading(false);
        } else {
            setResultados(null);
            setIsLoading(true);
        }
	}, [debounceValue]);

    const onSearch = async (value, estatus, region, depart, fecha, prioridad, order) => {
        try {
            console.log(`Valor a buscar: ${value}`);
            console.log(`POR Estatus: ${estatus}`);
            console.log(`POR REGION: ${region}`);
            console.log(`POR DEPARTAMENTO: ${depart}`);
            console.log(`POR FECHA: ${fecha}`);
            console.log(`POR PRIORIDAD: ${prioridad}`);
            console.log(`POR ORDEN: ${order}`);

            const datos = await Usuarios.obtenerPorTermino(value,estatus,region,depart,fecha,prioridad,order);
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

                        {/* <Form.Item className="m-0 p-0" label="ID" name="id">
                            <InputNumber size='small' placeholder='ID' min={1}
                                onChange={(e) => setId(e)}
                            />
                        </Form.Item> */}

                        <div className='flex text-sm'>
                            <label className="pr-1">Estatus:</label>
                            <select 
                                name="estatus" 
                                placeholder='Estatus'
                                onChange={(e) => {setEstatus(e.target.value)}}
                                className='w-36 h-8 text-sm border-none outline-none rounded'>
                                    <option value={null}>Todas</option>
                                    <option value="Desarrollo">Desarrollo</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>

                        <div className='flex text-sm'>
                            <label className="pr-1">Region:</label>
                            <select 
                                name="region" 
                                placeholder='Region'
                                onChange={(e) => {setRegion(e.target.value)}}
                                className='w-36 h-8 text-sm border-none outline-none rounded'>
                                    <option value={null}>Todas</option>
                                    <option value="Centro">Centro</option>
                                    <option value="Oriente">Oriente</option>
                                    <option value="Andes">Andes</option>
                            </select>
                        </div>

                        <div className='flex text-sm'>
                            <label className="pr-1">Departamento:</label>
                            <select 
                                name="departamento" 
                                placeholder='Departamento'
                                onChange={(e) => {setDepart(e.target.value)}}
                                className='w-36 h-8 text-sm border-none outline-none rounded'>
                                    <option value={null}>Todas</option>
                                    <option value="Informatica">Informatica</option>
                                    <option value="Telecomunicaciones">Telecomunicaciones</option>
                                    <option value="Automatizacion">Automatizacion</option>
                            </select>
                        </div>
                    
                        {/* <Form.Item className="m-0 p-0" label="Depart" name="departamento">
                            <Select style={{ width: 160,}} placeholder="Departamento" size='small' defaultValue='Todos'
                            onChange={(e) => {setDepart(e)}}
                            options={[
                                { value: null, label: "Todos" },
                                { value: "Informatica", label: "Informatica" },
                                { value: "Telecomunicaciones", label: "Telecomunicaciones" },
                                { value: "Servidores", label: "Servidores" },
                                { value: "Automatizacion", label: "Automatizacion" },
                            ]}
                            className="select"
                        /> 
                        </Form.Item> */}

                        <div className='flex text-sm'>
                            <label className="pr-1">Fecha:</label>
                            <input type='number'min="2000" max="2100" step="1" value="2023"
                                className='w-36 h-8 p-3 text-sm bg-white border-none outline-none rounded' 
                                placeholder="Fecha" 
                                onChange={(e) => {setFecha(e.target.value)}} />
                        </div>

                        {/* <Form.Item className="m-0 p-0" label="Año" name="año">
                            <DatePicker size='small' placeholder='Año' picker="year"
                            onChange={(e) => setFecha(e.$y)} /> 
                        </Form.Item> */}

                    </div>
                </div>
                
                <div className="radioArea">
                    <div className="flex justify-center items-center">

                        <div className="flex justify-center items-center gap-4">
                            <Form.Item className="m-0 p-0" label="Prioridad" initialValue='todo' />
                            <Radio.Group defaultValue={null} onChange={(e) => {setPrioridad(e.target.value)}}>
                                <Radio value={null}>Todas</Radio>
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
                            className='w-28 h-8 text-sm bg-blue-500 text-white border-none outline-none rounded-md cursor-pointer hover:bg-blue-400' size='small' >
                            Restablecer
                        </button>
                    </div>
                </div>
            </div>

            <Divider />

            <div class="relative w-96">
                <input 
                    type="search" 
                    onChangeCapture={(e) => setSearchTerm(e.target.value)}
                    class="block p-2 w-96 text-sm text-black bg-white rounded-lg border-none outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Buscar" />
                <button type="submit" class="absolute top-0 right-0 w-14 p-2 text-sm font-medium text-white bg-blue-500 rounded-r-lg border-none outline-none hover:bg-blue-400 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300">
                <FaSearch />
            </button>

        </div>

            {/* <Search 
                allowClear 
                enterButton 
                placeholder="Buscar" 
                style={{width: '600px'}}
                onChangeCapture={(e) => setSearchTerm(e.target.value)}
                //onChange={onSearch} 
            /> */}

        </form>
    );
}

export default Busqueda;
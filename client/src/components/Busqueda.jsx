
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { FaSearch } from 'react-icons/fa';
import Select from './Select';
import RadioButton from './RadioButton';
import Usuarios from "../services/user.service";

const opcionCount = [10,20,30,40,50];
const opcionEstatus = ['TODAS', 'DESARROLLO', 'MANTENIMIENTO', 'DESINCORPORADA', 'ESTABILIZACION',
    'SIN USO', 'VISAULIZACION', 'PRUEBA'];
const opcionRegion = ['TODAS', 'CENTRO', 'CENTRO SUR', 'CENTRO OCCIDENTE','ORIENTE NORTE', 
'ORIENTE SUR', 'OCCIDENTE','FAJA','METROPOLITANA',];
const opcionTipo = ['TODAS', 'WEB', 'ESCRITORIO', 'MOVIL', 'SERVIDOR', 'MIXTA'];
const opcionPlataforma = ['TODAS', 'WEB', 'ESCRITORIO', 'MOVIL', 'CLIENTE-SERVIDOR', 'STAND ALONE', 'MINI', 'MAINFRAME'];
const opcionAlcance = ['TODAS', 'LOCAL', 'REGIONAL', 'CORPORATIVO'];
const opcionMantenimiento = ['TODAS', 'DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL',
    'BIMENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL', 'NO APLICA'];


function Busqueda({manejarBusqueda}) {
    
    const [searchTerm, setSearchTerm] = useState("");
    const [resultados, setResultados] = useState([]);
    const [debounceValue] = useDebounce(searchTerm, 500);

    const [avanzados, setAvanzados] = useState(false);
    const [id, setId] = useState("");
    const [estatus, setEstatus] = useState(null);
    const [region, setRegion] = useState(null);
    const [tipo, setTipo] = useState(null);
    const [fecha, setFecha] = useState("");
    const [prioridad, setPrioridad] = useState(null);
    const [count, setCount] = useState(10);
    const [order, setOrder] = useState("ASC");
    const [critico, setCritico] = useState("");
    const [licencia, setLicencia] = useState("");
    const [codigo, setCodigo] = useState("");
    const [impacto, setImpacto] = useState("");
    const [basedatos, setBasedatos] = useState("");
    const [servidor, setServidor] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [alcance, setAlcance] = useState("");
    const [mantenimiento, setMantenimiento] = useState("");

    const obtenerCount = (respuesta) => { setCount(respuesta) };
    const obtenerOrder = (respuesta) => { setOrder(respuesta) };
    const obtenerPrioridad = (respuesta) => { setPrioridad(respuesta) };
    const obtenerTipo = (respuesta) => { setTipo(respuesta) };
    const obtenerRegion = (respuesta) => { setRegion(respuesta) };
    const obtenerEstatus = (respuesta) => { setEstatus(respuesta) };
    const obtenerCritico = (respuesta) => { setCritico(respuesta) };
    const obtenerLicencia = (respuesta) => { setLicencia(respuesta) };
    const obtenerCodigo = (respuesta) => { setCodigo(respuesta) };
    const obtenerImpacto = (respuesta) => { setImpacto(respuesta) };
    const obtenerBasedatos = (respuesta) => { setBasedatos(respuesta) };
    const obtenerServidor = (respuesta) => { setServidor(respuesta) };
    const obtenerPlataforma = (respuesta) => { setCodigo(respuesta) };
    const obtenerAlcance = (respuesta) => { setImpacto(respuesta) };
    const obtenerMantenimiento = (respuesta) => { setBasedatos(respuesta) };

    useEffect(() => {
		if (debounceValue) {
            onSearch(debounceValue,estatus,region,prioridad,tipo,order,count);
        } else {
            setResultados(null);
        }
	}, [debounceValue]);

    const onSearch = async (value,estatus,region,prioridad,tipo,order,count) => {
        try {
            const datos = await Usuarios.obtenerPorTermino(value,estatus,region,prioridad,tipo,order,count);
            console.log(estatus,region,prioridad,tipo,order,count);
            console.log(Object.keys(datos.data).length);

            setResultados(datos.data);
            manejarBusqueda(datos.data);
            console.log(resultados);
            
        } catch (error) {
            console.log('ERROR AL BUSCAR DATOS');
        }
    }

    return (
        <form className='flex justify-center items-center flex-col p-4 bg-zinc-400 border-solid rounded'>
            <div className='flex flex-col gap-4 w-full py-2 border-solid'>

                <div className="selectArea border-solid">
                    <div className="flex justify-center items-center gap-4">
                        <Select campo='Estatus' name='estatus' busqueda={true} opciones={opcionEstatus} manejador={obtenerEstatus} />
                        <Select campo='Region' name='region' busqueda={true} opciones={opcionRegion} manejador={obtenerRegion} />
                        <Select campo='Resultados' name='count' busqueda={true} opciones={opcionCount} manejador={obtenerCount} />
                        <Select campo='Tipo' name='tipo' busqueda={true} opciones={opcionTipo} manejador={obtenerTipo} />
                    </div>
                </div>

                <div style={avanzados ? {display: 'block'} : {display: 'none'}} className="selectArea">
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <Select campo='Plataforma' name='plataforma' busqueda={true} opciones={opcionPlataforma} manejador={obtenerPlataforma} />
                        <Select campo='Alcance' name='alcance' busqueda={true} opciones={opcionAlcance} manejador={obtenerAlcance} />
                        <Select campo='Mantenimiento' name='mantenimiento' busqueda={true} opciones={opcionMantenimiento} manejador={obtenerMantenimiento} />
                        <Select campo='Fecha' name='fecha' busqueda={true} opciones={['2023','2022','2021','2020','2019','2018']} />
                    </div>
                </div>
                
                <div className="radioArea">
                    <div className="flex flex-wrap justify-center items-center">
                        <RadioButton label='Orden' opciones={['ASC', 'DESC']} manejador={obtenerOrder} />
                        <RadioButton label='Prioridad' opciones={['Todas', 'Alta', 'Media', 'Baja']} manejador={obtenerPrioridad} />
                        <RadioButton label='Criticidad' opciones={['Todas','Critica', 'Ninguna']} manejador={obtenerCritico} />
                    </div>
                    
                    <div style={avanzados ? {display: 'flex'} : {display: 'none'}} className="flex flex-wrap justify-center items-center">
                        <RadioButton label='Codigo' opciones={['Mixto','Si', 'No']} manejador={obtenerCodigo} />
                        <RadioButton label='Licencia' opciones={['Ninguna', 'Logica', 'Fisica']} manejador={obtenerLicencia} />
                        <RadioButton label='Impacto' opciones={['Ninguno','Si', 'No']} manejador={obtenerImpacto} />
                        {/* <RadioButton label='BaseDatos' opciones={['Si', 'No']} manejador={obtenerBasedatos} />
                        <RadioButton label='Servidor' opciones={['Si', 'No']} manejador={obtenerServidor} /> */}
                    </div>

                    <div className='mt-8 flex justify-center items-center gap-4'>

                        <div className="relative w-96">
                            <input 
                                type="search" 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block p-2 pr-12 w-96 text-sm text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
                            <button 
                                type="submit" 
                                onClick={(e) => {e.preventDefault(); onSearch(debounceValue,estatus,region,prioridad,tipo,order,count)}}
                                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">
                                <FaSearch />
                            </button>
                        </div>
                        
                        <div>
                            <input className='mx-2 rounded' type="checkbox" onChange={(e) => setAvanzados(e.target.checked)} /> 
                            <label className='text-sm' >Avanzados</label>
                        </div>

                        <input type='reset' value='Restablecer' 
                            onClick={(e) => {e.preventDefault()}}
                            className='w-20 h-8 text-xs bg-blue-600 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-500' size='small' 
                        />

                    </div>

                </div>
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
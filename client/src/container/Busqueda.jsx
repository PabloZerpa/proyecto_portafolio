
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { FaSearch } from 'react-icons/fa';
import { Select, Radio } from '../components';
import Usuarios from "../services/user.service";
import { opcionEstatus, opcionRegion, opcionPlataforma, opcionAlcance, opcionMantenimiento, opcionCount, opcionLocalidad } from '../services/campos.service';

  
function Busqueda({manejarBusqueda}) {
     
    const [searchTerm, setSearchTerm] = useState("");
    const [resultados, setResultados] = useState([]);
    const [debounceValue] = useDebounce(searchTerm, 500);

    const [avanzados, setAvanzados] = useState(false);
    const [datos, setDatos] = useState({
        estatus: '',
        plataforma: '',
        prioridad: '',
        region: '',
        alcance: '',
        mantenimiento: '',
        fecha: '',
        basedatos: '',
        servidor: '',
        critico: '',
        codigo: '',
        registros: 10,
        orden: 'ASC',
    });

    const handleInputChange = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    useEffect(() => {
		if (debounceValue) {
            onSearch(debounceValue);
        } else {
            setResultados(null);
        }
	}, [debounceValue, datos]);

    const onSearch = async (value) => {
        try {
            const { estatus,alcance,plataforma,prioridad,registros,orden } = datos;
            
            console.log('BUSQUEDA')
            const respuesta = await Usuarios.obtenerPorBusqueda(value,estatus,alcance,prioridad,plataforma,orden,registros);
            console.log(estatus,alcance,prioridad,plataforma,orden,registros);
            console.log(Object.keys(respuesta.data).length);

            setResultados(respuesta.data);
            manejarBusqueda(respuesta.data);
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
                        <Select campo='Estatus' name='estatus' busqueda={true} opciones={opcionEstatus} manejador={handleInputChange} />
                        <Select campo='Region' name='region' busqueda={true} opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Plataforma' name='plataforma' busqueda={true} opciones={opcionPlataforma} manejador={handleInputChange} />
                        <Select campo='Registros' name='registros' busqueda={true} opciones={opcionCount} manejador={handleInputChange} />
                    </div>
                </div>

                <div style={avanzados ? {display: 'block'} : {display: 'none'}} className="selectArea">
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <Select campo='Localidad' name='localidad' busqueda={true} opciones={opcionLocalidad} manejador={handleInputChange} />
                        <Select campo='Alcance' name='alcance' busqueda={true} opciones={opcionAlcance} manejador={handleInputChange} />
                        <Select campo='Mantenimiento' name='mantenimiento' busqueda={true} opciones={opcionMantenimiento} manejador={handleInputChange} />
                        <Select campo='Fecha' name='fecha' busqueda={true} opciones={['2023','2022','2021','2020','2019','2018']} />
                    </div>
                </div>
                
                <div className="radioArea">
                    <div className="flex flex-wrap justify-center items-center">
                        <Radio label='Orden' name='orden' opciones={['ASC', 'DESC']} manejador={handleInputChange} />
                        <Radio label='Prioridad' name='prioridad' opciones={['TODAS', 'ALTA', 'MEDIA', 'BAJA']} manejador={handleInputChange} />
                        <Radio label='Critica' name='critica' opciones={['SI','NO']} manejador={handleInputChange} />
                    </div>
                    
                    <div style={avanzados ? {display: 'flex'} : {display: 'none'}} className="flex flex-wrap justify-center items-center">
                        <Radio label='Codigo Fuente' name='codigo' opciones={['SI', 'NO']} manejador={handleInputChange} />
                        <Radio label='Licencia' name='licencia' opciones={['NO', 'LOGICA', 'FISICA']} manejador={handleInputChange} />
                        <Radio label='Base de Datos' name='basedatos' opciones={['SI', 'NO']} manejador={handleInputChange} />
                        <Radio label='Servidor' name='servidor' opciones={['SI', 'NO']} manejador={handleInputChange} />
                    </div>

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
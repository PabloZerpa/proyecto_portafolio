
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { FaSearch } from 'react-icons/fa';
import { Select, Radio } from '../components';
import Aplicacion from "../services/aplicacion.service";
import { opcionEstatus, opcionRegion, opcionPlataforma, opcionAlcance, 
    opcionMantenimiento, opcionCount } from '../services/campos.service';

function Busqueda({manejarBusqueda}) {

    const [resultados, setResultados] = useState([]);
    const [avanzados, setAvanzados] = useState(false);
    const [datos, setDatos] = useState({
        terminoBusqueda: '',
        estatus: '',
        plataforma: '', 
        prioridad: '',
        region: '',
        alcance: '',
        mantenimiento: '',
        critico: '',
        codigo: '',
        cantidad_usuarios: '',
        orden: 'ASC',
    }); 
    const [debounceValue] = useDebounce(datos, 500);

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
		if (debounceValue) {
            onSearch(debounceValue);
        } else {
            setResultados(null);
        }
	}, [debounceValue, datos]); 


    const onSearch = async (datos) => {
        try {
            const { terminoBusqueda, estatus,plataforma,prioridad,region,alcance,mantenimiento,
                critico,codigo,registros,orden } = datos;

            const respuesta = await Aplicacion.obtenerPorBusqueda
            (terminoBusqueda,estatus,plataforma,prioridad,region,alcance,mantenimiento,
                critico,codigo,registros,orden);

            setResultados(respuesta.data);
            manejarBusqueda(respuesta.data);
            
        } catch (error) {
            console.log('ERROR AL BUSCAR DATOS');
        }
    }

    return (
        <form className='flex flex-col justify-center items-center p-4 bg-zinc-400 border-solid rounded'>
            <div className='flex flex-col space-y-2 w-full py-2 border-solid'>

                <div className="selectArea border-solid">
                    <div className="flex justify-center items-center space-x-4">
                        <Select campo='Estatus' name='estatus' busqueda={true} byId={false} opciones={opcionEstatus} manejador={handleInputChange} />
                        <Select campo='Region' name='region' busqueda={true} byId={false} opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Plataforma' name='plataforma' busqueda={true} byId={false} opciones={opcionPlataforma} manejador={handleInputChange} />
                    </div>
                </div>

                <div style={avanzados ? {display: 'block'} : {display: 'none'}} className="selectArea">
                    <div className="flex flex-wrap justify-center items-center space-x-4">
                        <Select campo='Alcance' name='alcance' busqueda={true} byId={false} opciones={opcionAlcance} manejador={handleInputChange} />
                        <Select campo='Mantenimiento' name='mantenimiento' busqueda={true} byId={false} opciones={opcionMantenimiento} manejador={handleInputChange} />
                        <Select campo='N° Usuarios' name='cantidad_usuarios' busqueda={true} byId={false} opciones={opcionCount} manejador={handleInputChange} />
                    </div>
                </div>
                
                <div className="radioArea">
                    <div className="flex flex-wrap justify-center items-center">
                        <Radio label='Orden' name='orden' opciones={['ASC', 'DESC']} manejador={handleInputChange} />
                        <Radio label='Prioridad' name='prioridad' opciones={['TODAS', 'ALTA', 'MEDIA', 'BAJA']} manejador={handleInputChange} />
                    </div>
                    
                    <div style={avanzados ? {display: 'flex'} : {display: 'none'}} className="flex flex-wrap justify-center items-center">
                        <Radio label='Critica' name='critico' opciones={['TODAS', 'SI','NO']} manejador={handleInputChange} />
                        <Radio label='Codigo Fuente' name='codigo' opciones={['TODAS', 'SI', 'NO']} manejador={handleInputChange} />
                    </div>

                    <div className='mt-8 flex flex-col md:flex-row justify-center items-center space-y-2 space-x-4'>

                        <div className="relative w-96">
                            <input 
                                type="text" 
                                name='terminoBusqueda'
                                onChange={(e) => handleInputChange(e)}
                                className="block p-2 pr-12 w-96 text-sm text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
                            
                            <button 
                                type="button" 
                                onClick={(e) => {e.preventDefault(); onSearch(debounceValue)}}
                                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">
                                <FaSearch />
                            </button>
                        </div>
                        
                        <div className='flex space-x-4'>
                            <div>
                                <input className='mx-2 rounded' type="checkbox" onChange={(e) => setAvanzados(e.target.checked)} /> 
                                <label className='text-sm' >Avanzados</label>
                            </div>

                            <input type='reset' value='Restablecer' 
                                onClick={resetCampos}
                                className='w-20 h-8 text-xs bg-blue-600 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-500' size='small' 
                            />
                        </div>

                    </div>
                </div>
            </div>
            
        </form>
    );
}

export default Busqueda;

import { useEffect, useState } from "react";
import { Container, Select, Tabla } from "../../components";
import { useDebounce } from 'use-debounce';
import { FaEdit, FaEye, FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Opciones from "../../utils/Opciones";
import { obtenerUsuario, rutaBaseDatos } from "../../utils/APIRoutes";
import axios from "axios";
import authHeader from "../../utils/header";


const columns = [
    {
        name: 'Operaciones',
        button: true,
        cell: row => 
        <div className="flex space-x-8">
            <Link to={row ? `/basedatos/${row.base_datos_id}` : `/dashboard`} >
                <FaEye className="text-blue-500 text-lg" />
            </Link>
            
            {obtenerUsuario().rol === 'user' ? 
                null
            : 
                <Link to={row ? `/basedatos/actualizacion/${row.base_datos_id}` : `/dashboard`} >
                <   FaEdit className="text-blue-500 text-lg" />
                </Link>
            }
        </div>,
    },
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
        width: "150px",
        left: true
    },
    {
        name: 'Estatus',
        selector: row => row.estatus,
        sortable: true,
        width: "150px",
        left: true
    },
    {
        name: 'Tipo',
        selector: row => row.tipo,
        sortable: true,
        width: "150px",
        left: true
    },
    {
        name: 'Manejador',
        selector: row => row.manejador,
        sortable: true,
        width: "150px",
        left: true
    },
    {
        name: 'N° de Usuarios',
        selector: row => row.base_cantidad_usuarios,
        sortable: true,
        width: "60px",
        left: true
    },
    {
        name: 'Ambiente',
        selector: row => row.ambiente,
        sortable: true,
        width: "150px",
        left: true
    },
    {
        name: 'Ultima Actualizacion',
        selector: row => row.base_fecha_actualizacion,
        sortable: true,
        width: "160px",
        left: true
    },
    {
        name: 'Por',
        selector: row => row.indicador,
        sortable: true,
        width: "100px",
        left: true
    },
];

function BaseDatos() {
    
    // =================== VARIABLES PARA LA BUSQUEDA ===================
    const [resultado, setResultado] = useState('');
    const [datos, setDatos] = useState({
        terminoBusqueda: '',
        estatus: '',
        tipo: '',
        manejador: '',
        ambiente: '', 
        registros: 10,
        orden: 'ASC',
    }); 
    const [debounceValue] = useDebounce(datos, 500);

    const [mane, setMane] = useState('');
    const [tipos, setTipos] = useState('');
    const [estatus, setEstatus] = useState('');
    const [ambientes, setAmbientes] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setMane(await Opciones('manejadores',true));
        setEstatus(['SELECCIONE','TODAS', 'POR DETERMINAR', 'ACTIVO', 'INACTIVO']);
        setTipos(await Opciones('tipos',true));
        setAmbientes(await Opciones('ambientes',true));
    }

    useEffect(() => {
        establecerDatos();
    }, []);

    // =================== RESTABLECE LOS CAMPOS DE BUSQUEDA ===================
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

    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
            
    }

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async function obtenerBDPorBusqueda(term,estatus,tipo,manejador,ambiente,count,orden) {
        try {
            return axios.post(`${rutaBaseDatos}/busqueda`, 
            {term,estatus,tipo,manejador,ambiente,count,orden}, { headers: authHeader() });
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    // FUNCION PARA BUSCAR DATOS EN LA DATABASE
    const onSearch = async (datos) => {
        try {
            const { terminoBusqueda,estatus,tipo,manejador,ambiente,registros,orden } = datos;

            const respuesta = await obtenerBDPorBusqueda(terminoBusqueda,estatus,tipo,manejador,ambiente,registros,orden);
            setResultado(respuesta.data);
            
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    // FUNCION PARA BUSCAR AL ESCRIBIR EN EL INPUT
    useEffect(() => {
		if (debounceValue) {
            onSearch(debounceValue);
        } else {
            setResultado(null);
        }
	}, [debounceValue, datos]); 

    // =================== FUNCION PARA MOSTRAR LOAD EN TABLA DE BUSQUEDA ===================
    const [pending, setPending] = useState(true);
    const loading = () => { 
        const timeout = setTimeout(() => { setPending(false) }, 500);
        return () => clearTimeout(timeout);
    }
    
    useEffect(() => {
        setPending(true);
        loading();
    }, [resultado]);


    return(
        <Container>

            <form className='flex justify-center items-center flex-col p-4 bg-zinc-400 border-solid rounded'>
                <div className='flex flex-col space-x-4 w-full justify-center items-center py-2 border-solid'>

                    <div className="border-solid">
                        <div className="grid grid-cols-2 md:grid-cols-4 space-x-4">
                            <Select campo='Estatus' name='estatus' busqueda={true} byId={false} opciones={estatus ? estatus : ['SELECCIONE']} manejador={setValores} />
                            <Select campo='Tipo' name='tipo' busqueda={true} byId={false} opciones={tipos ? tipos : ['SELECCIONE']} manejador={setValores} />
                            <Select campo='Manejador' name='manejador' busqueda={true} byId={false} opciones={mane ? mane : ['SELECCIONE']} manejador={setValores} />
                            <Select campo='Ambiente' name='ambiente' busqueda={true} byId={false} opciones={ambientes ? ambientes : ['SELECCIONE']} manejador={setValores} />
                        </div>
                    </div>

                    <div className="radioArea">
                        <div className='mt-8 flex flex-col md:flex-row justify-center items-center space-x-4'>
                            <div className="relative w-96">
                                <input 
                                    type="search" 
                                    name='terminoBusqueda'
                                    onChange={(e) => setValores(e)}
                                    className="block p-2 pr-12 w-96 text-sm text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
                                <button 
                                    type="button" 
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
                <div className="w-[480px] md:w-[720px] lg:w-[960px] px-8">
                    <Tabla columnas={columns} datos={resultado} paginacion={true} pending={pending} />
                </div>
            ) : (null)}

        </Container>
        
    )
};

export default BaseDatos;

import { useEffect, useState } from "react";
import { Container, Select, Tabla } from "../../components";
import { useDebounce } from 'use-debounce';
import { FaEdit, FaEye, FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Opciones from "../../utils/Opciones";
import { obtenerUsuario, rutaServidor } from "../../utils/APIRoutes";
import axios from "axios";
import authHeader from "../../utils/header";

const columns = [
    {
        name: 'Operaciones',
        button: true,
        cell: row => 
        <div className="flex space-x-8">
            <Link to={row ? `/servidor/${row.servidor_id}` : `/dashboard`} >
                <FaEye className="text-blue-500 text-lg" />
            </Link>
            
            {obtenerUsuario().rol === 'user' ? 
                null
            : 
                <Link to={row ? `/servidor/actualizacion/${row.servidor_id}` : `/dashboard`} >
                    <FaEdit className="text-blue-500 text-lg" />
                </Link>
            }
        </div>,
    },
    {
        name: 'ID',
        selector: row => row.servidor_id,
        sortable: true,
        width: '60px',
        left: true,
    },
    {
        name: 'Nombre',
        selector: row => row.servidor,
        sortable: true,
        width: '150px',
        left: true
    },
    {
        name: 'Estatus',
        selector: row => row.estatus,
        sortable: true,
        width: '150px',
        left: true
    },
    {
        name: 'Direccion',
        selector: row => 
        <a className='text-blue-700' href={`https://${row.ser_direccion}`} rel="noreferrer" target='_blank' >
            {row.ser_direccion}
        </a>
        ,
        sortable: true,
        width: '200px',
        left: true
    },
    {
        name: 'OS',
        selector: row => row.sistema,
        sortable: true,
        width: '150px',
        left: true
    },
    {
      name: 'Modelo',
      selector: row => row.modelo,
      sortable: true,
      width: '150px',
      left: true
    },
    {
      name: 'Marca',
      selector: row => row.marca,
      sortable: true,
      width: '150px',
      left: true
    },
    {
        name: 'Region',
        selector: row => row.region,
        sortable: true,
        width: '150px',
        left: true
      },
      {
        name: 'Localidad',
        selector: row => row.localidad,
        sortable: true,
        width: '150px',
        left: true
      },
    {
        name: 'Ultima Actualizacion',
        selector: row => row.ser_fecha_actualizacion,
        sortable: true,
        width: '160px',
        left: true
    },
    {
      name: 'Por',
      selector: row => row.indicador,
      sortable: true,
      width: '100px',
      left: true
  },
];

function Servidores() {

    // =================== VARIABLES PARA LA BUSQUEDA ===================
    const [resultado, setResultado] = useState('');
    const [datos, setDatos] = useState({
        terminoBusqueda: '',
        estatus: '',
        region: '',
        sistema: '',
        marca: '', 
        orden: 'ASC',
    }); 
    const [debounceValue] = useDebounce(datos, 500);

    const [marcas, setMarcas] = useState('');
    const [sistemas, setSistemas] = useState('');
    const [estatus, setEstatus] = useState('');
    const [regiones, setRegiones] = useState('');
    const [localidades, setLocalidades] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setMarcas(await Opciones('marcas',true));
        setEstatus(['SELECCIONE', 'TODAS', 'POR DETERMINAR', 'ACTIVO', 'INACTIVO']);
        setSistemas(await Opciones('sistemas',true));
        setRegiones(await Opciones('regiones',true));
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
    async function obtenerServidorPorBusqueda(term,estatus,region,sistema,marca,orden) {
        try {
            return axios.post(`${rutaServidor}/busqueda`, 
            {term,estatus,region,sistema,marca,orden}, { headers: authHeader() });
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    // FUNCION PARA BUSCAR DATOS EN LA DATABASE
    const onSearch = async (datos) => {
        try {
            const { terminoBusqueda,estatus,region,sistema,marca,orden } = datos;

            const respuesta = await obtenerServidorPorBusqueda(
                terminoBusqueda,estatus,region,sistema,marca,orden);

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
                            <Select campo='Region' name='region' busqueda={true} byId={false} opciones={regiones ? regiones : ['SELECCIONE']} manejador={setValores} />
                            <Select campo='Sistema' name='sistema' busqueda={true} byId={false} opciones={sistemas ? sistemas : ['SELECCIONE']} manejador={setValores} />
                            <Select campo='Marca' name='marca' busqueda={true} byId={false} opciones={marcas ? marcas : ['SELECCIONE']} manejador={setValores} />
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
                <div className="w-[480px] md:w-[720px] lg:w-[960px] px-8">
                    <Tabla columnas={columns} datos={resultado} paginacion={true} pending={pending} />
                </div>
            ) : (null)}

        </Container>
        
    )
};

export default Servidores;
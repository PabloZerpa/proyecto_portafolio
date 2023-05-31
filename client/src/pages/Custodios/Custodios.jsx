
import { useEffect, useState } from "react";
import { Container, Select, Tabla } from "../../components";
import { useDebounce } from 'use-debounce';
import { FaEdit, FaEye, FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Opciones from "../../utils/Opciones";
import axios from "axios";
import { obtenerUsuario, rutaCustodio } from "../../utils/APIRoutes";
import authHeader from "../../utils/header";
import { Notificacion } from "../../utils/Notificacion";

const columns = [
    {
        name: 'Operaciones',
        button: true,
        cell: row => 
        <div className="flex space-x-8">
            <Link to={row ? `/custodios/${row.custodio_id}` : `/dashboard`} >
                <FaEye className="text-blue-500 text-lg" />
            </Link>

            {obtenerUsuario().rol === 'user' ? 
                null
            : 
                <Link to={row ? `/custodios/actualizacion/${row.custodio_id}` : `/dashboard`} >
                    <FaEdit className="text-blue-500 text-lg" />
                </Link>
            }
        </div>,
    },
    {
        name: 'ID',
        selector: row => row.custodio_id,
        sortable: true,
        width: '60px',
        left: true,
    },
    {
        name: 'Indicador',
        selector: row => row.cus_indicador,
        sortable: true,
        width: '120px',
        left: true
    },
    {
        name: 'Nombre',
        selector: row => row.cus_nombre,
        sortable: true,
        width: '120px',
        left: true
    },
    {
        name: 'Apellido',
        selector: row => row.cus_apellido,
        sortable: true,
        width: '120px',
        left: true
    },
    {
        name: 'Cedula',
        selector: row => row.cus_cedula,
        sortable: true,
        width: '100px',
        left: true
    },
    {
      name: 'Telefono',
      selector: row => row.telefono,
      sortable: true,
      width: '120px',
      left: true
    },
    {
      name: 'Cargo',
      selector: row => row.cargo,
      sortable: true,
      width: '120px',
      left: true
    },
    {
        name: 'Gerencia',
        selector: row => row.gerencia,
        sortable: true,
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
];

function Custodios() {

    // =================== VARIABLES PARA LA BUSQUEDA ===================
    const [resultado, setResultado] = useState('');
    const [datos, setDatos] = useState({
        terminoBusqueda: '',
        cargo: '',
        gerencia: '',
        region: '',
        orden: 'ASC',
    }); 
    const [debounceValue] = useDebounce(datos, 500);

    const [gerencias, setGerencias] = useState('');
    const [cargos, setCargos] = useState('');
    const [regiones, setRegiones] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setRegiones(await Opciones('regiones',true));
        setGerencias(await Opciones('gerencias',true));
        setCargos(await Opciones('cargos',true));
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

    async function obtenerCustodioPorBusqueda(term,cargo,gerencia,region) {
        try {
            return axios.post(`${rutaCustodio}/busqueda`, 
            {term,cargo,gerencia,region}, { headers: authHeader() });
        } catch (error) {
            Notificacion(error.response.data.message, 'error');
        }
    }

    // FUNCION PARA BUSCAR DATOS EN LA DATABASE
    const onSearch = async (datos) => {
        try {
            const { terminoBusqueda,cargo,gerencia,region } = datos;
            const respuesta = await obtenerCustodioPorBusqueda(terminoBusqueda,cargo,gerencia,region);
            setResultado(respuesta.data);
            
        } catch (error) {
            Notificacion(error.response.data.message, 'error');
        }
    }

    // FUNCION PARA BUSCAR AL ESCRIBIR EN EL INPUT
    useEffect(() => {
		if (debounceValue) {
            onSearch(debounceValue);
        } else {
            setResultado(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        <div className="flex space-x-4">
                            <Select campo='Cargo' name='cargo' busqueda={true} byId={false} opciones={cargos ? cargos : ['SELECCIONE']} manejador={setValores} />
                            <Select campo='Gerencia' name='gerencia' busqueda={true} byId={false} opciones={gerencias ? gerencias : ['SELECCIONE']} manejador={setValores} />
                            <Select campo='Region' name='region' busqueda={true} byId={false} opciones={regiones ? regiones : ['SELECCIONE']} manejador={setValores} />
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

export default Custodios;

import { useEffect, useState } from "react";
import { Container, Button, Tabla } from "../../../components";
import { useDebounce } from 'use-debounce';
import { FaCheckCircle, FaEdit, FaEye, FaSearch } from 'react-icons/fa';
import Autorizacion from "../../../services/auth.service";
import Falla from "../../../services/falla.service";
import { Link } from "react-router-dom";
import { Notificacion } from "../../../utils/Notificacion";
import ActualizarFalla from "./ActualizarFalla";
import VerFalla from "./VerFalla";

function Fallas() {

    const [searchTerm, setSearchTerm] = useState("a");
    const [resultados, setResultados] = useState('');
    const [debounceValue] = useDebounce(searchTerm, 500);

    const [falla, setFalla] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [update, setUpdate] = useState(false);
    
    const habilitar = (dato,operacion) => {
        setFalla(dato);

        if(operacion === 'editar')
            setIsOpen(!isOpen);
        else if(operacion === 'ver')
            setIsOpen2(!isOpen2);
    }

    // FUNCION PARA BUSCAR AL ESCRIBIR EN EL INPUT
    useEffect(() => {
        if (debounceValue)
            onSearch(debounceValue);
        else
            setResultados(null) 
        
    }, [debounceValue, update]);

    // FUNCION PARA BUSCAR DATOS EN LA DATABASE
    const onSearch = async (termino) => {
        try {
            const datos = await Falla.obtenerFallaPorBusqueda(termino);
            setResultados(datos.data);
        } catch (error) { 
            console.log('ERROR AL BUSCAR DATOS') 
        }
    }

    const columnas = [
        {
          name: 'Operaciones',
          button: true,
          cell: row => 
            <div className="flex space-x-4">
                <FaEye
                    onClick={(e) => habilitar(row, 'ver')}
                    className="text-blue-500 text-lg" 
                />
                <FaEdit
                    onClick={(e) => habilitar(row, 'editar')}
                    className="text-blue-500 text-lg" 
                />
            </div>
        },
        {
            name: 'Falla ID',
            selector: row => row.falla_id,
            sortable: true,
            left: true,
            width: "60px"
        },
        {
            name: 'Acronimo',
            selector: row => row.apl_acronimo,
            sortable: true,
            left: true
        },
        {
            name: 'Nombre',
            selector: row => row.apl_nombre,
            sortable: true,
            left: true
        },
        {
            name: 'Clase',
            selector: row => row.fal_clase,
            sortable: true,
            left: true
        },
        {
            name: 'Impacto',
            selector: row => row.fal_impacto,
            sortable: true,
            left: true
        },
        {
            name: 'Descripcion',
            selector: row => row.fal_descripcion,
            sortable: true,
            left: true
        },
        {
            name: 'Solucion',
            selector: row => row.fal_solucion,
            sortable: true,
            left: true
        },
      ];

    const [pending, setPending] = useState(true);
    const loading = () => { 
        const timeout = setTimeout(() => { setPending(false) }, 500);
        return () => clearTimeout(timeout);
    }
    useEffect(() => {
        setPending(true);
        loading();
    }, [resultados]);

    return(
        <Container>
            {/* --------------- VENTANA MODAL PARA ACTUALIZAR DATOS --------------- */}
            {isOpen ? (
                <div className="fixed w-full max-w-2xl max-h-full z-50 overflow-y-auto">
                    <ActualizarFalla
                        setIsOpen={setIsOpen} 
                        valores={falla ? falla : null}
                        setUpdate={setUpdate}
                    />
                </div>
                        
            ) : (null) }

            {/* --------------- VENTANA MODAL PARA ACTUALIZAR DATOS --------------- */}
            {isOpen2 ? (
                <div className="fixed w-full max-w-2xl max-h-full z-50 overflow-y-auto">
                    <VerFalla
                        setIsOpen={setIsOpen2} 
                        valores={falla ? falla : null}
                    />
                </div>
                        
            ) : (null) }

            <h2 className='font-bold text-lg'>Buscar Falla</h2>

            <form className='flex justify-center items-center space-x-4 p-4 bg-zinc-400 border-solid rounded'>

                <div className="relative w-96">
                    <input 
                        type="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block p-2 pr-12 w-96 text-xs text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
                    <button 
                        type="button" 
                        className="absolute top-0 right-0 p-2 h-8 text-xs font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">          
                        <FaSearch />
                    </button>
                </div>

                <Link to={`/aplicaciones/fallas/registro`}><Button>Registrar +</Button></Link>

            </form>

            {resultados ? (
                <>
                <div className="w-[480px] md:w-[720px] lg:w-[960px] px-8">
                    <Tabla columnas={columnas} datos={resultados} paginacion={true} pending={pending} />
                </div>
                </>
            ) : (
                <div></div>
            )}


        </Container>
        
    )
};

export default Fallas;

import { useEffect, useState } from "react";
import { Container, Button, Tabla } from "../../../components";
import { useDebounce } from 'use-debounce';
import { FaEdit, FaEye, FaSearch, FaTimesCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { Notificacion } from "../../../utils/Notificacion";
import ActualizarFalla from "./ActualizarFalla";
import VerFalla from "./VerFalla";
import swal from "sweetalert";
import axios from "axios";
import { obtenerUsuario, rutaAplicacion } from "../../../utils/APIRoutes";
import authHeader from "../../../utils/header";

function Fallas() {

    // =================== VARIABLES PARA LA BUSQUEDA ===================
    const [datos, setDatos] = useState({terminoBusqueda: ''});
    const [resultados, setResultados] = useState('');
    const [debounceValue] = useDebounce(datos, 500);

    // =================== VARIABLES PARA LA EDICION ===================
    const [falla, setFalla] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [update, setUpdate] = useState(false);
    
    // =================== FUNCION PARA HABILITAR VENTANA MODAL DE EDICION ===================
    const habilitar = (dato,operacion) => {
        setFalla(dato);

        if(operacion === 'editar')
            setIsOpen(!isOpen);
        else if(operacion === 'ver')
            setIsOpen2(!isOpen2);
    }

    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = (e) => {
        setDatos({ ...datos, [e.target.name] : e.target.value })    
    } 

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async function obtenerBusqueda(term) {
        try {
            return axios.post(`${rutaAplicacion}/fallas/busqueda`,{term}, { headers: authHeader() });
        } catch (error) {
            Notificacion(error.response.data.message, 'error');
        }
    }


    // FUNCION PARA BUSCAR DATOS EN LA DATABASE
    const onSearch = async (termino) => {
        try {
            const { terminoBusqueda } = termino;
            const datos = await obtenerBusqueda(terminoBusqueda);
            setResultados(datos.data);
        } catch (error) { 
            Notificacion(error.response.data.message, 'error');
        }
    }

    // FUNCION PARA BUSCAR AL ESCRIBIR EN EL INPUT
    useEffect(() => {
        if (debounceValue)
            onSearch(debounceValue);
        else
            setResultados(null) 

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue, update, datos]);


    // =================== FUNCION PARA ELIMINAR USUARIO ===================
  const eliminarFalla = async (row) => {
    try {
      if(obtenerUsuario().rol !== 'user'){
        await axios.delete(`${rutaAplicacion}/fallas/${row.falla_id}`, { headers: authHeader() });
        onSearch(debounceValue);
        Notificacion('USUARIO ELIMINADO EXITOSAMENTE', 'success');
      }
    }
    catch (error) { 
      Notificacion(error.response.data.message, 'error');
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
                
                {obtenerUsuario().rol === 'user' ? 
                    null
                :
                    <FaEdit
                        onClick={(e) => habilitar(row, 'editar')}
                        className="text-blue-500 text-lg" 
                    />
                }
            </div>
        },
        {
            name: 'Falla ID',
            selector: row => row.falla_id,
            sortable: true,
            width: "100px",
            left: true,
        },
        {
            name: 'Acronimo',
            selector: row => row.apl_acronimo,
            sortable: true,
            width: "100px",
            left: true
        },
        {
            name: 'Nombre',
            selector: row => row.apl_nombre,
            sortable: true,
            width: "150px",
            left: true
        },
        {
            name: 'Impacto',
            selector: row => row.fal_impacto,
            sortable: true,
            width: "100px",
            left: true
        },
        {
            name: 'Remover',
            button: true,
            cell: row => 
              <div>
                <FaTimesCircle
                    onClick={() => {
                        if(obtenerUsuario().rol === 'admin'){
                            swal({
                                text: `¿Esta seguro de Eliminar a la falla numero ${row.falla_id}?`,
                                icon: 'warning',
                                buttons: {
                                cancel: {
                                    text: "Cancel",
                                    value: false,
                                    visible: true,
                                    className: "bg-red-600 text-white outline-none border-none hover:bg-red-500",
                                },
                                confirm: {
                                    text: "Aceptar",
                                    value: true,
                                    visible: true,
                                    className: "bg-blue-600 text-white outline-none border-none hover:bg-blue-500",
                                }
                                },
                            }).then((result) => {
                                if (result)
                                eliminarFalla(row);
                            })
                        }
                    }
                    } 
                    className="ml-3 text-red-500 text-lg cursor-pointer"
                />
              </div>,
            center: true
        },
    ];

    // =================== FUNCION PARA MOSTRAR LOAD EN TABLA DE BUSQUEDA ===================
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
                <div className="fixed top-24 w-full max-w-2xl max-h-full z-50 overflow-y-auto">
                    <ActualizarFalla
                        setIsOpen={setIsOpen} 
                        valores={falla ? falla : null}
                        setUpdate={setUpdate}
                    />
                </div>
                        
            ) : (null) }

            {/* --------------- VENTANA MODAL PARA VER DATOS --------------- */}
            {isOpen2 ? (
                <div className="fixed top-24 w-full max-w-2xl max-h-full z-50 overflow-y-auto">
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
                        name='terminoBusqueda'
                        onChange={(e) => setValores(e)}
                        className="block p-2 pr-12 w-96 text-xs text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
                    <button 
                        type="button" 
                        onClick={(e) => {e.preventDefault(); onSearch(debounceValue)}}
                        className="absolute top-0 right-0 p-2 h-8 text-xs font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">          
                        <FaSearch />
                    </button>
                </div>
                
                { obtenerUsuario().rol === 'user' ?
                    null
                    :
                    <Link to={`/aplicaciones/fallas/registro`}><Button>Registrar +</Button></Link>
                }

            </form>

            {resultados ? (
                <>
                <div className="w-[480px] lg:w-[800px] px-8">
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
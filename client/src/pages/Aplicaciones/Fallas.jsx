
import { useEffect, useState } from "react";
import { Container, Button, Tabla } from "../../components";
import { useDebounce } from 'use-debounce';
import { FaCheckCircle, FaEdit, FaSearch } from 'react-icons/fa';
import Autorizacion from "../../services/auth.service";
import Falla from "../../services/falla.service";
import { Link } from "react-router-dom";
import { Notificacion } from "../../utils/Notificacion";

function Fallas() {

    const [searchTerm, setSearchTerm] = useState("a");
    const [resultados, setResultados] = useState('');
    const [debounceValue] = useDebounce(searchTerm, 500);

    const [datos, setDatos] = useState({
        aplicacion: '',
        clase: '',
        impacto: '',
        descripcion: '',
        solucion: '',
        usuario: Autorizacion.obtenerUsuario().indicador,
		actualizador: Autorizacion.obtenerUsuario().indicador,
    }); 

    const [clase, setClase] = useState("");
    const [impacto, setImpacto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [solucion, setSolucion] = useState("");
    const [edicion, setEdicion] = useState(null);
    
    const habilitar = (dato) => {
        setEdicion(dato.falla_id); 
        setClase(dato.fal_clase); 
        setImpacto(dato.fal_impacto);
        setDescripcion(dato.fal_descripcion);
        setSolucion(dato.fal_solucion);
    }

    // VARIABLES PARA LA PAGINA
    const [pagina, setPagina] = useState(1);
    const obtenerPagina = (respuesta) => {setPagina(respuesta); console.log('PAGINA EN ADMINISTRACION: ' + pagina)};

    // FUNCION PARA BUSCAR AL ESCRIBIR EN EL INPUT
    useEffect(() => {
        if (debounceValue)
            onSearch(debounceValue);
        else
            setResultados(null) 
        
    }, [debounceValue, pagina]);

    // FUNCION PARA BUSCAR DATOS EN LA DATABASE
    const onSearch = async (termino) => {
        try {
            const datos = await Falla.obtenerFallaPorBusqueda(termino);
            setResultados(datos.data);
        } catch (error) { 
            console.log('ERROR AL BUSCAR DATOS') 
        }
    }

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function updateData(e) {
        e.preventDefault();
        try {
            if(Autorizacion.obtenerUsuario().rol === 'admin'){
                const datoModificacion = { edicion, clase, impacto, descripcion, solucion };
                await Falla.actualizarFalla(datoModificacion); 
                onSearch(debounceValue);
                Notificacion('FALLA MODDIFICADA EXITOSAMENTE', 'success');
                habilitar('','','');
            }
        }
        catch (error) {
            Notificacion(error.response.data.message, 'error');
        }
    }

    // SELECT PERSONALIZADO
    const selectCampo = (opciones,elemento) => {
        return (
            <select 
                className={`w-full p-2 bg-gray-50 border border-solid border-blue-500 text-gray-900 text-xs text-center rounded-md`} 
                onChange={(e) => {elemento(e.target.value)}}
            >
                {opciones.map((opcion, index) => {
                    if(index === 0)
                        return <option key={index} value={opcion} disabled selected>{opcion}</option>
                    else
                        return <option key={index} value={opcion}>{opcion}</option>
                })}
            </select>
        )
    }

    // FUNCION PARA VERIFICAR Y ELEGIR SELECT SEGUN LA OPCION SELECCIONADA
    const verificarCampo = (campo, valor) => {
        if(campo === 'Clase')
            return (selectCampo(['SELECCIONE','CLASE1','CLASE2','CLASE3'],setClase));
        else if(campo === 'Impacto')
            return (selectCampo(['SELECCIONE','ALTA','MEDIA','BAJA'],setImpacto));
        else if(campo === 'Descripcion'){
            return (
                <input type='text' defaultValue={valor}
                onChange={(e) => {setDescripcion(e.target.value)}}
                className="w-full p-2 bg-gray-50 border border-solid border-blue-500 text-gray-900 text-xs text-center rounded-md" />
            )
        }
        else if(campo === 'Solucion'){
            return (
                <input type='text' defaultValue={valor}
                onChange={(e) => {setSolucion(e.target.value)}}
                className="w-full p-2 bg-gray-50 border border-solid border-blue-500 text-gray-900 text-xs text-center rounded-md" />
            )
        }
        else
            return (<td key={campo} className="px-2 py-2">{valor}</td>)
    }


    const columnas = [
        {
          name: 'Editar',
          button: true,
          cell: row => 
            <div>
                {edicion === row.falla_id ?
                    (<FaCheckCircle 
                    onClick={updateData} 
                    className="ml-3 text-green-500 text-lg cursor-pointer"
                    />)
                    :
                    (<FaEdit
                    onClick={(e) => habilitar(row)}
                    className="text-blue-500 text-lg" 
                    />)
                }
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
            selector: row => 
                <did>
                {edicion === row.falla_id ? 
                ( verificarCampo('Clase',row.fal_clase) ) 
                : 
                ( row.fal_clase )
                }
                </did>,
            sortable: true,
            left: true
        },
        {
            name: 'Impacto',
            selector: row => 
            <did>
                {edicion === row.falla_id ? 
                ( verificarCampo('Impacto',row.fal_impacto) ) 
                : 
                ( row.fal_impacto )
                }
            </did>,
            sortable: true,
            left: true
        },
        {
            name: 'Descripcion',
            selector: row => 
            <did>
                {edicion === row.falla_id ? 
                ( verificarCampo('Descripcion',row.fal_descripcion) ) 
                : 
                ( row.fal_descripcion )
                }
            </did>,
            sortable: true,
            left: true
        },
        {
            name: 'Solucion',
            selector: row => 
            <did>
                {edicion === row.falla_id ? 
                ( verificarCampo('Solucion',row.fal_solucion) ) 
                : 
                ( row.fal_solucion )
                }
            </did>,
            sortable: true,
            left: true
        },
      ];

    return(
        <Container>
            <h2 className='font-bold text-lg'>Buscar Falla</h2>

            <form className='flex justify-center items-center flex-row gap-4 p-4 bg-zinc-400 border-solid rounded'>

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

                <Button color='blue' ><Link to={`/aplicaciones/fallas/registro`}>Registrar +</Link></Button>

            </form>

            {resultados ? (
                <>
                {console.log(resultados)}
                <div className="w-[1080px]">
                    <Tabla columnas={columnas} datos={resultados} paginacion={true} />
                </div>
                </>
            ) : (
                <div></div>
            )}


        </Container>
        
    )
};

export default Fallas;
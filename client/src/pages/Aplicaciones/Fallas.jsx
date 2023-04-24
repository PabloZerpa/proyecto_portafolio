
import { useEffect, useState } from "react";
import { Container, Button } from "../../components";
import { useDebounce } from 'use-debounce';
import { FaCheckCircle, FaEdit, FaSearch } from 'react-icons/fa';
import Autorizacion from "../../services/auth.service";
import Falla from "../../services/falla.service";
import { Link } from "react-router-dom";
import { Notificacion } from "../../utils/Notificacion";
import DataTable from "react-data-table-component";

const columnas = ['Editar','Falla_ID','Acronimo','Nombre','Clase','Impacto','Descripcion','Solucion'];

const columns = [
    {
        name: 'Editar',
        button: true,
        cell: row => 
        <div className="flex gap-8">
            <Link to={`/dashboard`} >
                <FaEdit className="text-blue-500 text-lg" />
            </Link>
        </div>,
    },
    {
        name: 'Falla ID',
        selector: row => row.falla_id,
        sortable: true,
        center: true,
    },
    {
        name: 'APP Acronimo',
        selector: row => row.apl_acronimo,
        sortable: true,
        left: true
    },
    {
        name: 'APP Nombre',
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

const paginacionOpciones = {
    rowsPerPageText: 'Filas por Pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}

function Fallas() {

    const [searchTerm, setSearchTerm] = useState("");
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
            console.log(resultados);
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

                <Button><Link to={`/aplicaciones/fallas/registro`}>Registrar +</Link></Button>

            </form>

            {resultados ? (
                
                // <div className="w-[1080px]">
                //     <DataTable
                //         columnas={columns}
                //         data={resultados}
                //         pagination
                //         paginationComponentOptions={paginacionOpciones}
                //         fixedHeader
                //         fixedHeaderScrollHeight="600px"
                //         highlightOnHover
                //         pointerOnHover
                //         dense
                //     />
                // </div>

                <table className="w-1/2 table-auto border-separate w-full text-xs text-center text-gray-700 shadow-md">
                <thead className="text-xs text-gray-700 font-bold bg-zinc-200 uppercase">
                                
                    <tr className="bg-zinc-200 border-b hover:bg-zinc-300">
                    {columnas.map((dato,index) => { 
                        return  <td key={index} scope="col" className="px-1 py-1">{dato}</td> 
                    })}    
                    </tr>
                                
                </thead>
                    
                <tbody>
                    {resultados.map((dato, index) => { 
                    let valores = Object.values(dato);

                    {edicion === dato.falla_id ? 
                        valores.unshift(
                        <Link to='' className='text-lg' state={dato} >
                        <FaCheckCircle
                            onClick={updateData}
                            className="ml-3 text-green-500 text-lg cursor-pointer"
                        />
                        </Link>)
                        :
                        valores.unshift(
                        <Link to='' className='text-lg' state={dato} >
                            <FaEdit 
                            onClick={(e) => habilitar(dato)}
                            className="ml-3 text-blue-500 text-lg cursor-pointer" 
                            />
                        </Link>)
                    }

                    return (
                        <tr key={index} className="bg-white border-b hover:bg-gray-100">
                        {valores.map((valor, index) => {
                            
                            return (
                            <td key={index}>
                                {edicion == dato.falla_id ? (
                                    verificarCampo(columnas[index],valor)
                                ) : (
                                    <td className="px-2 py-2 flex justify-center items-center">{valor}</td>
                                )}
                            </td>
                            );
                        })}
                        </tr>
                    );
                    })}

                </tbody>
                </table>
            ) : (
                <div></div>
            )}


        </Container>
        
    )
};

export default Fallas;
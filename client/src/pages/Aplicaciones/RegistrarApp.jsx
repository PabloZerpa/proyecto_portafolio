
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Input, Radio, Select, TextArea, Tabla } from '../../components';
import { Notificacion } from '../../utils/Notificacion';
import { FaTimesCircle } from 'react-icons/fa';
import { columnasModalBD,columnasModalCustodio,columnasModalLenguaje,columnasModalServidor } from '../../utils/columnas';
import Opciones from '../../utils/Opciones';
import TableRegistro from '../../components/TablaRegistro';
import DocumentosForm from '../../components/DocumentosForm';
import axios from 'axios';
import { obtenerUsuario, rutaAplicacion } from '../../utils/APIRoutes';
import authHeader from '../../utils/header';
 
function RegistrarApp() {

    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }
    
    // ---------- ESTADOS ----------
    const [datos, setDatos] = useState({
        apl_codigo_fuente: 'SI',
        apl_critico: 'SI',
        apl_usuario_registro: obtenerUsuario().indicador,
        apl_usuario_actualizo: obtenerUsuario().indicador,
    });

    // =================== OPCIONES PARA LOS SELECTS ===================
    const [estatus, setEstatus] = useState('');
    const [alcance, setAlcance] = useState('');
    const [plataformas, setPlataformas] = useState('');
    const [frecuencia, setFrecu] = useState('');
    const [regiones, setRegiones] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setPlataformas(await Opciones('plataformas'));
        setEstatus(await Opciones('estatus'));
        setAlcance(await Opciones('alcance'));
        setFrecu(await Opciones('frecuencias'));
        setRegiones(await Opciones('regiones'));
    }

    useEffect(() => {
        establecerDatos();
    }, []);

    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = (e) => {
        const valor = e.target.value.toUpperCase();

        if(e.target.name === 'apl_direccion' || e.target.name === 'doc_direccion')
            setDatos({ ...datos, [e.target.name] : e.target.value.toLowerCase() });
        else
            setDatos({ ...datos, [e.target.name] : valor });
    }

    // =================== FUNCION PARA ACTUALIZAR DATOS ===================
    async function crearDatos(e) {
        e.preventDefault();

        if(obtenerUsuario().rol !== 'user'){
            try {
                let datosServidor = datos;
                datosServidor.select_lenguaje = tableDataLenguaje;
                datosServidor.select_base = tableDataBase;
                datosServidor.select_servidor = tableDataServidor;
                datosServidor.select_documentos = tableDataDoc;

                const id = await axios.post(`${rutaAplicacion}/`, datosServidor, { headers: authHeader() }) 
                    .then(response => { return response.data; });

                Notificacion('REGISTRO EXITOS', 'success');
                navigate(`/aplicaciones/${id}`);
            }
            catch (error) { 
                Notificacion(error.response.data.message, 'error');
            }
        }
    }


    // -------------------- FUNCION Y VARIABLES PARA LA SELECCION DE BASES DE DATOS --------------------
    
    // VARIABLE QUE ABRE Y CIERRA MODAL DE BASE DE DATOS
    const [isOpen, setIsOpen] = useState(false);
    // VARIABLE QUE GUARDA LAS BASES DE DATOS SELECCIONADAS
    const [select_base, setSelectBase] = useState([]);
    // VARIABLE QUE CONTIENE LOS ELEMENTOS DE LA TABLA EN EL FORMULARIO
    const [tableDataBase, setDataBase] = useState([]);

    const obtenerSeleccionesBase = (respuesta) => {
        let selecciones = [];
        setDataBase([]);

        for (let i = 0; i < respuesta.length; i++) {
            const x = respuesta[i];
            setDataBase(tableDataBase => [...tableDataBase, { base_datos_id: x.base_datos_id, base_datos: x.base_datos}]);
            selecciones.push(respuesta[i].base_datos_id);
        }
        setSelectBase(selecciones);
    };

    // -------------------- FUNCION Y VARIABLES PARA LA SELECCION DE SERVIDORES --------------------
    const [isOpen2, setIsOpen2] = useState(false);
    const [select_servidor, setSelectServidor] = useState([]);
    const [tableDataServidor, setDataServidor] = useState([]);

    const obtenerSeleccionesServidor = (respuesta) => {
        let selecciones = [];
        setDataServidor([]);

        for (let i = 0; i < respuesta.length; i++) {
            const x = respuesta[i];
            setDataServidor(tableDataServidor => [...tableDataServidor, { servidor_id: x.servidor_id, servidor: x.servidor}]);
            selecciones.push(respuesta[i].servidor_id);
        }

        setSelectServidor(selecciones); 
    };

    // -------------------- FUNCION Y VARIABLES PARA LA SELECCION DE LENGUAJES --------------------
    const [isOpen3, setIsOpen3] = useState(false);
    const [select_lenguaje, setSelectLenguaje] = useState([]);
    const [tableDataLenguaje, setDataLenguaje] = useState([]);

    const obtenerSeleccionesLenguaje = (respuesta) => {
        let selecciones = [];
        setDataLenguaje([]);

        for (let i = 0; i < respuesta.length; i++) {
            const x = respuesta[i];
            setDataLenguaje(tableDataLenguaje => [...tableDataLenguaje, { lenguaje_id: x.lenguaje_id, lenguaje: x.lenguaje}]);
            selecciones.push(respuesta[i].lenguaje_id);
        }

        setSelectLenguaje(selecciones); 
    };

    // -------------------- FUNCION Y VARIABLES PARA LA SELECCION DE DOCUMENTOS --------------------
    const [isOpen4, setIsOpen4] = useState(false);
    const [select_documento, setSelectDoc] = useState([]);
    const [tableDataDoc, setDataDoc] = useState([]);

    const obtenerSeleccionesDoc = (respuesta) => {
        let selecciones = [];

        setDataDoc(tableDataDoc => [...tableDataDoc, 
        { doc_descripcion: respuesta.doc_descripcion, doc_direccion: respuesta.doc_direccion, doc_tipo: respuesta.doc_tipo}]);
            
        selecciones.push(respuesta);
        select_documento.push(respuesta);

        setSelectDoc(selecciones);
    };

    // -------------------- FUNCION Y VARIABLES PARA LA SELECCION DE CUSTODIOS --------------------
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);

    const obtenerCustodioFuncional = (respuesta) => {
        setDatos({ ...datos, ['select_funcional'] : respuesta });
    };

    const obtenerCustodioTecnico = (respuesta) => {
        setDatos({ ...datos, ['select_tecnico'] : respuesta });
    };

    // -------------------- FUNCION QUE ELIMINA ELEMENTO SELECCIONADA DE LA TABLA --------------------
    const eliminarElemento = (row, elemento, tabla, setTabla, setSelecciones) => {

        if (window.confirm(`Estas seguro de eliminar: ${row[elemento]}?`)) {
            const nuevo = tabla.filter((i) => i[elemento] !== row[elemento]);
            setTabla(nuevo);

            let selecciones = [];
            for (let i = 0; i < nuevo.length; i++) 
                selecciones.push(nuevo[i][elemento]);
                
            setSelecciones(selecciones);
        }
    };

    // -------------------- COLUMNAS PARA TABLAS DE ELEMENTOS SELECCIONADOS --------------------
    const generarColumna = (titulo,key,width) => {
        return{
            name: titulo,
            selector: row => row[key],
            left: true,
            width: width
        }
    }

    const columnasBase = [
        generarColumna('Base de datos ID','base_datos_id','160px'),
        generarColumna('Base de datos Nombre','base_datos',null),
        {
            name: 'Remover',
            button: true,
            cell: row => 
            <div>
                <FaTimesCircle
                    onClick={() => eliminarElemento(row,'base_datos_id',tableDataBase,setDataBase,setSelectBase)} 
                    className="ml-3 text-red-500 text-lg cursor-pointer"
                />
            </div>,
            left: true
        },
    ];

    const columnasServidor = [
        generarColumna('Servidor ID','servidor_id','160px'),
        generarColumna('Servidor Nombre','servidor',null),
        {
            name: 'Remover',
            button: true,
            cell: row => 
            <div>
                <FaTimesCircle
                    onClick={() => eliminarElemento(row,'servidor_id',tableDataServidor,setDataServidor,setSelectServidor)} 
                    className="ml-3 text-red-500 text-lg cursor-pointer"
                />
            </div>,
            left: true
        },
    ];
    

    const columnasLenguaje = [
        generarColumna('Lenguaje ID','lenguaje_id','160px'),
        generarColumna('Lenguaje','lenguaje','160px'),
        {
            name: 'Remover',
            button: true,
            cell: row => 
            <div>
                <FaTimesCircle
                    onClick={() => eliminarElemento(row,'lenguaje_id',tableDataLenguaje,setDataLenguaje,setSelectLenguaje)} 
                    className="ml-3 text-red-500 text-lg cursor-pointer"
                />
            </div>,
            left: true
        },
    ];

    const columnasDoc = [
        generarColumna('Descripcion','doc_descripcion','150px'),
        generarColumna('Direccion','doc_direccion','150px'),
        generarColumna('Tipo','doc_tipo','150px'),
        {
            name: 'Remover',
            button: true,
            cell: row => 
            <div>
                <FaTimesCircle
                    onClick={() => eliminarElemento(row,'doc_descripcion',tableDataDoc,setDataDoc,setSelectDoc)} 
                    className="ml-3 text-red-500 text-lg cursor-pointer"
                />
            </div>,
            left: true
        },
    ];
    
    return (
        <Container>

            {/* --------------- VENTANA MODAL PARA REGISTRAR BASES DE DATOS --------------- */}
            {isOpen ? (
                <TableRegistro
                    setIsOpen={setIsOpen}
                    devolverSelecciones={obtenerSeleccionesBase}
                    columnas={columnasModalBD}
                    objetivo='base_datos'
                    busqueda={true}
                    selectDefault={select_base}
                />
                
            ) : (null) }

            {/* --------------- VENTANA MODAL PARA REGISTRAR SERVIDORES --------------- */}
            {isOpen2 ? (
                <TableRegistro
                    setIsOpen={setIsOpen2}
                    devolverSelecciones={obtenerSeleccionesServidor}
                    columnas={columnasModalServidor}
                    objetivo='servidor'
                    busqueda={true}
                    selectDefault={select_servidor}
                />
            ) : (null) }

            {/* --------------- VENTANA MODAL PARA REGISTRAR LENGUAJES --------------- */}
            {isOpen3 ? (
                <TableRegistro
                    setIsOpen={setIsOpen3}
                    devolverSelecciones={obtenerSeleccionesLenguaje}
                    columnas={columnasModalLenguaje}
                    objetivo='lenguaje'
                    selectDefault={select_lenguaje}
                />
            ) : (null) }

            {/* --------------- VENTANA MODAL PARA REGISTRAR DOCUMENTOS --------------- */}
            {isOpen4 ? (
                <DocumentosForm
                    setIsOpen={setIsOpen4}
                    devolverSelecciones={obtenerSeleccionesDoc}
                />
            ) : (null) }

            {/* --------------- VENTANA MODAL PARA REGISTRAR CUSTODIOS --------------- */}
            {isOpen5 ? (
                <TableRegistro
                    setIsOpen={setIsOpen5}
                    devolverSelecciones={obtenerCustodioFuncional}
                    columnas={columnasModalCustodio}
                    objetivo='custodio'
                    busqueda={true}
                    selectDefault={null}
                />
            ) : (null) }

            {isOpen6 ? (
                <TableRegistro
                    setIsOpen={setIsOpen6}
                    devolverSelecciones={obtenerCustodioTecnico}
                    columnas={columnasModalCustodio}
                    objetivo='custodio'
                    busqueda={true}
                    selectDefault={null}
                />
            ) : (null) }


            <h1 className='font-bold text-lg'>Registro de Aplicacion</h1>

            <form className="flex flex-col justify-center items-center w-full p-4 mb-10 z-40" onSubmit={crearDatos} >
                
                {/* --------------- INFORMACION BASICA --------------- */}
                <div className="flex flex-col w-full md:w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    <h2 className='font-bold text-base mb-6'>Informacion General</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
                        <Input campo='Acronimo' name='apl_acronimo' required={true} manejador={setValores} />
                        <Select campo='Estatus' name='apl_estatus' required={true} opciones={estatus ? estatus : ['SELECCIONE']} manejador={setValores}/>
                    </div>

                    <TextArea campo='Nombre' name='apl_nombre' required={true} manejador={setValores} />
                    <TextArea campo='Descripcion' required={true} name='apl_descripcion' manejador={setValores} />

                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-4 mb-0">
                        <Input campo='Version' name='apl_version' required={true} manejador={setValores} />
                        <Select campo='Prioridad' name='apl_prioridad' opciones={['SELECCIONE','BAJA','MEDIA','ALTA',]} manejador={setValores} />
                        <Select campo='Alcance' name='apl_alcance' opciones={alcance ? alcance : ['SELECCIONE']} manejador={setValores} />
                        <Input campo='Direccion' name='apl_direccion' manejador={setValores} />
                        <Input campo='N° Usuarios' name='apl_cantidad_usuarios' manejador={setValores} />
                        <Select campo='Region' name='apl_region' opciones={regiones ? regiones : ['SELECCIONE']} manejador={setValores} />
                        <Radio label='Critico' name='apl_critico' opciones={['SI','NO']} manejador={setValores} />
                        <Radio label='Codigo Fuente' name='apl_codigo_fuente' opciones={['SI', 'NO']} manejador={setValores} />
                    </div>
                </div>

                {/* --------------- CUSTODIOS --------------- */} 
                <div className="flex flex-col w-full md:w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 space-x-0 md:space-x-4 md:space-y-0">

                        <div>
                            <p className='font-bold text-base my-1'>Custodio Funcional</p>
                            <Input campo='' name='select_funcional' editable={false} propiedad={datos.select_funcional ? datos.select_funcional : ''} />
                            <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                                onClick={(e) => {setIsOpen5(!isOpen5)}} >
                                Agregar
                            </button>
                        </div>

                        <div>
                            <p className='font-bold text-base my-1'>Custodio Tecnico</p>
                            <Input campo='' name='select_tecnico' editable={false} propiedad={datos.select_tecnico ? datos.select_tecnico : ''} />
                            <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                                onClick={(e) => {setIsOpen6(!isOpen6)}} >
                                Agregar
                            </button>
                        </div>

                    </div>
                </div>

                
                {/* --------------- TECNOLOGIAS --------------- */}
                <div className="flex flex-col w-full md:w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    <h2 className='font-bold text-base my-4'>Tecnologia</h2>
                    <div className="grid grid-cols-2">
                        <Select campo='Plataforma' name='plataforma' opciones={plataformas ? plataformas : ['SELECCIONE']} manejador={setValores} />
                    </div>

                    {/* --------------- LENGUAJES --------------- */}
                    <p className='font-bold text-sm my-4'>Lenguajes</p>
                    <div className='flex flex-col justify-center items-center space-y-4'>

                        <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                            onClick={(e) => {setIsOpen3(!isOpen3)}} >
                            Agregar
                        </button>

                        <div className="w-4/3">
                            <Tabla columnas={columnasLenguaje} datos={tableDataLenguaje} />
                        </div>
                    </div>

                    {/* --------------- BASE DE DATOS --------------- */}
                    <p className='font-bold text-sm my-4'>Base de datos</p>
                    <div className='flex flex-col justify-center items-center space-y-4'>

                        <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                            onClick={(e) => {setIsOpen(!isOpen)}} >
                            Agregar
                        </button>

                        <div className="w-4/3">
                            <Tabla columnas={columnasBase} datos={tableDataBase} />
                        </div>
                    </div>

                    {/* --------------- SERVIDOR --------------- */}
                    <p className='font-bold text-sm my-4'>Servidor</p>
                    <div className='flex flex-col justify-center items-center space-y-4'>

                        <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                            onClick={(e) => {setIsOpen2(!isOpen2)}} >
                            Agregar
                        </button>

                        <div className="w-4/3">
                            <Tabla columnas={columnasServidor} datos={tableDataServidor} />
                        </div>
                    </div>

                    {/* --------------- DOCUMENTACION --------------- */}
                    <p className='font-bold text-sm my-4'>Documentos</p>
                    <div className='flex flex-col justify-center items-center space-y-4'>

                        <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                            onClick={(e) => {setIsOpen4(!isOpen4)}} >
                            Agregar
                        </button>

                        <div className="w-4/3">
                            <Tabla columnas={columnasDoc} datos={tableDataDoc} />
                        </div>
                    </div>

                </div>

 
                <div className="flex flex-col w-full md:w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    {/* --------------- MANTENIMIENTO --------------- */}
                    <p className='font-bold text-base my-4'>Mantenimiento</p>
                    <div className="flex flex-col ">
                        <Select campo='Frecuencia' name='man_frecuencia' opciones={frecuencia ? frecuencia : ['SELECCIONAR']} manejador={setValores}/>
                        <Input campo='Horas Pro' name='man_horas_prom' manejador={setValores} />
                        <Input campo='Horas Anu' name='man_horas_anuales' manejador={setValores} />
                    </div>
                </div>

                <div className="flex space-x-2 md:space-x-12">
                    <Button tipo='button' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                    <Button tipo='submit' width={32}>Registrar</Button>
                </div>

            </form>

        </Container>
    )
};

export default RegistrarApp;
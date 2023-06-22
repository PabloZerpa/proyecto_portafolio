
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Input, Radio, Select, Tabla, TextArea, TableRegistro } from '../../components';
import { BiLoaderAlt } from "react-icons/bi";
import { FaTimesCircle } from 'react-icons/fa';
import { Notificacion } from '../../utils/Notificacion';
import { obtenerUsuario, rutaAplicacion } from '../../utils/APIRoutes';
import { columnasModalBD, columnasModalCustodio, columnasModalLenguaje, columnasModalServidor } from '../../utils/columnas';
import Opciones from '../../utils/Opciones';
import swal from 'sweetalert';
import DocumentosForm from '../../components/DocumentosForm';
import axios from 'axios';
import authHeader from '../../utils/header';  

function ActualizarAplicacionApp() {

    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar() { navigate(-1) } 

    // ---------- ESTADOS ----------
    const { id } = useParams();
    const [load, setLoad] = useState(true);
    const [datos, setDatos] = useState({
        usuario_actualizo: obtenerUsuario().indicador, 
    }); 

    // VALORES POR DEFECTO EN LOS INPUTS
    const [general, setGeneral] = useState('');
    const [lenguaje, setLenguaje] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [basedatos, setBaseDatos] = useState('');
    const [servidor, setServidor] = useState('');
    const [funcional, setFuncional] = useState('');
    const [tecnico, setTecnico] = useState('');
    const [mantenimiento, setMantenimiento] = useState('');
    const [documentacion, setDocumentacion] = useState('');

    // =================== OPCIONES PARA LOS SELECTS ===================
    const [estatus, setEstatus] = useState('');
    const [alcance, setAlcance] = useState('');
    const [plataformas, setPlataformas] = useState('');
    const [frecuencia, setFrecu] = useState('');
    const [regiones, setRegiones] = useState('');

    // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
    const setValores = (e) => {
        const valor = e.target.value.toUpperCase();

        if(e.target.name === 'apl_direccion' || e.target.name === 'doc_direccion')
            setDatos({ ...datos, [e.target.name] : e.target.value.toLowerCase() });
        else
            setDatos({ ...datos, [e.target.name] : valor });
    }

    // -------------------- FUNCION Y VARIABLES PARA LA SELECCION DE BASES DE DATOS --------------------
    const [isOpen, setIsOpen] = useState(false);
    const [select_base, setSelectBase] = useState([]);
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

    // -------------------- FUNCION Y VARIABLES PARA LA SELECCION DE SERVIDOcus --------------------
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

    // -------------------- FUNCION Y VARIABLES PARA LA SELECCION DE APLICACIONES --------------------
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
        setDatos({ ...datos, 'select_funcional' : respuesta });
    };

    const obtenerCustodioTecnico = (respuesta) => {
        setDatos({ ...datos, 'select_tecnico' : respuesta });
    };

    // -------------------- FUNCION PARA LLENAR TABLA POR DEFECTO --------------------
    const llenarTabla = async (datos, id, nombre, setTabla, setSelect) => {

        if(nombre === 'documentacion'){
            let selecciones = [];
            for (let i = 0; i < datos.length; i++) {
                const x = datos[i];
                setTabla(tabla => [...tabla, 
                    { [`doc_descripcion`]: x[`doc_descripcion`], [`doc_direccion`]: x[`doc_direccion`], [`doc_tipo`]: x[`doc_tipo`]}]); 
                selecciones.push(datos[i][id]); 
            }
            setSelect(selecciones);
        }
        else{
            let selecciones = [];
            for (let i = 0; i < datos.length; i++) {
                const x = datos[i];
                setTabla(tabla => [...tabla, { [`${id}`]: x[id], [`${nombre}`]: x[nombre]}]); 
                selecciones.push(datos[i][id]); 
            }
            setSelect(selecciones);
        }
    }

    // -------------------- FUNCION PARA ELIMINAR ELEMENTOS DE LA TABLA --------------------
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
        generarColumna('Lenguaje','lenguaje',null),
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
        generarColumna('Descripcion','doc_descripcion','250px'),
        generarColumna('Direccion','doc_direccion','250px'),
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

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setPlataformas(await Opciones('plataformas'));
        setEstatus(await Opciones('estatus'));
        setAlcance(await Opciones('alcance'));
        setFrecu(await Opciones('frecuencias'));
        setRegiones(await Opciones('regiones')); 
    }

    // =================== FUNCION PARA CARGOR LOS VALORES POR DEFECTO AL ESTADO ===================
    async function valoresPorDefecto(){
        setDatos({
            ...datos,
            apl_acronimo : general.apl_acronimo,
            apl_nombre : general.apl_nombre,
            apl_descripcion : general.apl_descripcion,
            apl_prioridad : general.prioridad,
            apl_alcance : general.alcance,
            apl_critico : general.apl_critico,
            apl_direccion : general.apl_direccion,
            apl_estatus : general.estatus,
            apl_version : general.apl_version,
            apl_codigo_fuente : general.apl_codigo_fuente,
            apl_cantidad_usuarios : general.apl_cantidad_usuarios,
            apl_region : general.region, 
            plataforma : plataforma,
            select_funcional: funcional,
            select_tecnico: tecnico,
            man_frecuencia: mantenimiento.frecuencia,
            man_horas_prom: mantenimiento.man_horas_prom,
            man_horas_anuales: mantenimiento.man_horas_anuales,
        });
    }

    // =============== OBTIENE TOTAL LLAMANDO A LAS OTRAS FUNCIONES ===============
    async function obtenerTodo(id) { 
        try { 
            const general = await axios.get(`${rutaAplicacion}/${id}`, { headers: authHeader() });
            const tecnologia = await axios.get(`${rutaAplicacion}/tecnologia/${id}`, { headers: authHeader() });
            const plataformas = await tecnologia.data.plataformas[0];
            const lenguajes = await tecnologia.data.lenguajes;
            const basedatos = await axios.get(`${rutaAplicacion}/basedatos/${id}`, { headers: authHeader() });
            const servidor = await axios.get(`${rutaAplicacion}/servidor/${id}`, { headers: authHeader() });
            const custodio = await axios.get(`${rutaAplicacion}/custodio/${id}`, { headers: authHeader() });
            const funcional = await custodio.data.funcional[0];
            const tecnico = await custodio.data.tecnico[0];
            const documentacion = await axios.get(`${rutaAplicacion}/documentacion/${id}`, { headers: authHeader() });

            const respuesta = {
                general: general.data[0],
                tecnologia: tecnologia.data.datos[0],
                plataformas: plataformas.plataforma,
                lenguajes: lenguajes,
                basedatos: basedatos.data.datos,
                servidor: servidor.data.datos,
                funcional: funcional.cus_indicador,
                tecnico: tecnico.cus_indicador,
                documentacion: documentacion.data.datos,
            } 

            return respuesta;
        } catch (error) {
            Notificacion(error.response.data.message, 'error');
        }
    }


    useEffect(() => {
        async function fetchData(){
        try { 

            // ========== OPCIONES PARA LOS SELECTS ==========
            establecerDatos();

            // ========== DATOS POR DEFECTO ==========
            const todo = await obtenerTodo(id);
    
            setGeneral(todo.general);
            setBaseDatos(todo.basedatos);
            setServidor(todo.servidor);
            setFuncional(todo.funcional);
            setTecnico(todo.tecnico); 
            setLenguaje(todo.lenguajes);
            setPlataforma(todo.plataformas);
            if(todo.documentacion)
                setDocumentacion(todo.documentacion);
            if(todo.tecnologia)
                setMantenimiento(todo.tecnologia);

            // ========== LLENA LA TABLA CON LOS VALORES POR DEFECTO ==========
            llenarTabla(lenguaje,'lenguaje_id','lenguaje',setDataLenguaje,setSelectLenguaje);
            llenarTabla(basedatos,'base_datos_id','base_datos',setDataBase,setSelectBase);
            llenarTabla(servidor,'servidor_id','servidor',setDataServidor,setSelectServidor);
            llenarTabla(documentacion,'documentacion_id','documentacion',setDataDoc,setSelectDoc);

            await valoresPorDefecto(); 
            setLoad(false);

        }catch (error) { 
            Notificacion(error.response.data.message, 'error');
        } 
    } 
        fetchData();
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [load]);

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function actualizarAplicacion(e) {
        e.preventDefault();
        try {
            if(obtenerUsuario().rol !== 'user'){

                let datosServidor = datos;
                datosServidor.select_lenguaje = tableDataLenguaje;
                datosServidor.select_base = tableDataBase;
                datosServidor.select_servidor = tableDataServidor;
                datosServidor.select_documentos = tableDataDoc;

                await axios.put(`${rutaAplicacion}/${id}`, datosServidor, { headers: authHeader() }) 
                .then(response => { return response.data; });

                Notificacion('ACTUALIZACION EXITOSA', 'success');
                navigate(`/aplicaciones/${id}`);
            }
        } 
        catch (error) { 
            Notificacion(error.response.data.message, 'error');
        }
    }

    const eliminar = async (id) => {
        try {
            if(obtenerUsuario().rol !== 'user'){
                await axios.delete(`${rutaAplicacion}/${id}`, { headers: authHeader() });

                Notificacion('APLICACION ELIMINADA EXITOSAMENTE', 'success');
                navegar(`/aplicaciones/`);
            }
        }
        catch (error) { 
            Notificacion(error.response.data.message, 'error');
        }
    }

    if(load){
        return <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
    }
    else{
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
            {/* --------------- VENTANA MODAL PARA REGISTRAR SERVIDOcus --------------- */}
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

            <h2 className='font-bold text-lg'>Actualizacion de Aplicacion</h2>

            <form className="flex flex-col justify-center items-center relative w-full p-4 mb-10 z-40" onSubmit={actualizarAplicacion} >

                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >

                    <h2 className='font-bold text-base mb-6'>Informacion General</h2>
                    <div className="grid grid-cols-2 space-x-2">
                        {/* --------------- INFORMACION BASICA --------------- */}
                        <Input campo='Acronimo' name='apl_acronimo' required={true} propiedad={general.apl_acronimo} manejador={setValores} />
                        <Select campo='Estatus' name='apl_estatus' required={true} byId={false} opciones={estatus ? estatus : ['SELECCIONE']} propiedad={general.estatus} manejador={setValores}/>
                    </div>

                    <TextArea campo='Nombre' name='apl_nombre' required={true} propiedad={general.apl_nombre} manejador={setValores} />
                    <TextArea campo='Descripcion' name='apl_descripcion' required={true} propiedad={general.apl_descripcion} manejador={setValores} />

                    <div className="w-full grid grid-cols-1 md:grid-cols-2">
                        <div className='w-full flex flex-col'>
                            <Input campo='Version' name='apl_version' required={true} propiedad={general.apl_version} manejador={setValores} />
                            <Select campo='Alcance' name='apl_alcance' required={true} byId={false} opciones={alcance ? alcance : ['SELECCIONE']} propiedad={general.alcance} manejador={setValores} />
                            <Input campo='N° Usuarios' name='apl_cantidad_usuarios' required={true} propiedad={general.apl_cantidad_usuarios} manejador={setValores} />
                            <Radio label='Critico' name='apl_critico' required={true} opciones={['SI','NO']} manejador={setValores} />
                        </div>

                        <div className='w-full flex flex-col md:ml-2'>
                            <Select campo='Prioridad' name='apl_prioridad' required={true} byId={false} opciones={['SELECCIONE','ALTA','MEDIA','BAJA',]} propiedad={general.prioridad} manejador={setValores} />
                            <Input campo='Direccion' name='apl_direccion' required={true} propiedad={general.apl_direccion} manejador={setValores} />
                            <Select campo='Region' name='apl_region' required={true} byId={false} opciones={regiones ? regiones : ['SELECCIONE']} propiedad={general.region} manejador={setValores} />
                            <Radio label='Codigo Fuente' name='apl_codigo_fuente' required={true} opciones={['SI', 'NO']} manejador={setValores} />
                        </div>
                    </div>

                </div> 

                {/* --------------- CUSTODIOS --------------- */} 
                <div className="flex flex-col w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 space-x-0 md:space-x-4 md:space-y-0">

                        <div>
                            <p className='font-bold text-base my-4'>Custodio Funcional</p>
                            <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                                onClick={(e) => {setIsOpen5(!isOpen5)}} >
                                Agregar
                            </button>
                            <Input campo='Custodio Funcional' name='select_funcional' editable={false} propiedad={datos.select_funcional ? datos.select_funcional : ''} />
                        </div>

                        <div>
                            <p className='font-bold text-base my-4'>Custodio Tecnico</p>
                            <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                                onClick={(e) => {setIsOpen6(!isOpen6)}} >
                                Agregar
                            </button>
                            <Input campo='Custodio Tecnico' name='select_tecnico' editable={false} propiedad={datos.select_tecnico ? datos.select_tecnico : ''} />
                        </div>

                    </div>
                </div>

                {/* --------------- TECNOLOGIAS --------------- */}
                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >

                    <h2 className='font-bold text-base my-4'>Tecnologia</h2>
                    <div className="grid grid-cols-2 space-x-4">
                        <Select campo='Plataforma' name='plataforma' propiedad={datos.plataforma} byId={false} opciones={plataformas ? plataformas : ['SELECCIONE']} manejador={setValores} />
                    </div>

                    {/* --------------- LENGUAJES --------------- */}
                    <p className='font-bold text-sm my-4'>Lenguajes</p>
                    <div className='flex flex-col justify-center items-center space-y-4'>

                        <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                            onClick={(e) => {setIsOpen3(!isOpen3)}} >
                            Agregar
                        </button>

                        <div className="w-full">
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

                        <div className="w-full">
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

                        <div className="w-full">
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

                        <div className="w-full">
                            <Tabla columnas={columnasDoc} datos={tableDataDoc} />
                        </div>
                    </div>

                </div>

                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    {/* --------------- MANTENIMIENTO --------------- */}
                    <p className='font-bold text-base my-4'>Mantenimiento</p>
                    <div className="flex flex-col">
                        <Select campo='Frecuencia' name='man_frecuencia' propiedad={datos.man_frecuencia} byId={false} opciones={frecuencia ? frecuencia : ['SELECCIONE']} manejador={setValores}/>
                        <Input campo='Horas Pro' name='man_horas_prom' propiedad={datos.man_horas_prom} manejador={setValores} />
                        <Input campo='Horas Anu' name='man_horas_anuales' propiedad={datos.man_horas_anuales} manejador={setValores} />
                    </div>
                </div>

                <div className="flex space-x-2 md:space-x-12">
                    <Button tipo='button' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                    <Button tipo='submit' width={32}>ActualizarAplicacion</Button>
                    {obtenerUsuario().rol === 'admin' ? (
                        <Button tipo='button' color='red' width={32} manejador={(e) => {
                            swal({
                                text: `¿Esta seguro de Eliminar la aplicacion ${general.apl_acronimo}?`,
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
                                  eliminar(id);
                              })
                        }} >Eliminar</Button>
                    ) : null}

                </div>
            </form>
            
        </Container>
        )
    }
};

export default ActualizarAplicacionApp;
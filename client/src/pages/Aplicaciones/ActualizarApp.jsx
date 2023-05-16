
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Button, Container, Input, Radio, Select, Tabla, TextArea, Modal, TableRegistro } from '../../components';
import { BiLoaderAlt } from "react-icons/bi";
import Autorizacion from '../../services/auth.service';
import Aplicacion from '../../services/aplicacion.service';
import Opciones from '../../utils/Opciones';
import { columnasModalBD, columnasModalLenguaje, columnasModalServidor } from '../../utils/columnas';
import { FaTimesCircle } from 'react-icons/fa';
import { Notificacion } from '../../utils/Notificacion';
import swal from 'sweetalert';

function ActualizarApp() {

    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar() { navigate(-1) } 

    // ---------- ESTADOS ----------
    const { id } = useParams();
    const [load, setLoad] = useState(true);
    const [datos, setDatos] = useState({
        usuario_actualizo: Autorizacion.obtenerUsuario().indicador, 
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
    const [custodios, setCustodios] = useState('');
    const [estatus, setEstatus] = useState('');
    const [alcance, setAlcance] = useState('');
    const [plataformas, setPlataformas] = useState('');
    const [frecuencia, setFrecu] = useState('');
    const [documentos, setDoc] = useState('');
    const [regiones, setRegiones] = useState('');

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function actualizar(e) {
        e.preventDefault();
        try {
            if(Autorizacion.obtenerUsuario().rol === 'admin'){
                await Aplicacion.actualizarDatos(id, datos, tableDataLenguaje, tableDataBase, tableDataServidor); 
                Notificacion('ACTUALIZACION EXITOSA', 'success');
                navigate(`/aplicaciones/${id}`);
            }
        } 
        catch (error) { 
            Notificacion(error.cusponse.data.message, 'error');
        }
    }

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

    // -------------------- FUNCION PARA LLENAR TABLA POR DEFECTO --------------------
    const llenarTabla = async (datos, id, nombre, setTabla, setSelect) => {
        let selecciones = [];

        for (let i = 0; i < datos.length; i++) {
            const x = datos[i];
            setTabla(tabla => [...tabla, { [`${id}`]: x[id], [`${nombre}`]: x[nombre]}]); 
            selecciones.push(datos[i][id]); 
        }
        
        setSelect(selecciones);
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

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setCustodios(await Opciones('custodios'));
        setPlataformas(await Opciones('plataformas'));
        setEstatus(await Opciones('estatus'));
        setAlcance(await Opciones('alcance'));
        setFrecu(await Opciones('frecuencias'));
        setDoc(await Opciones('documentos'));
        setRegiones(await Opciones('regiones')); 
    }

    // =================== FUNCION PARA CARGOR LOS VALORES POR DEFECTO AL ESTADO ===================
    async function llenarDatos(){
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
            select_funcional: funcional.cus_indicador,
            select_tecnico: tecnico.cus_indicador,
            man_frecuencia: mantenimiento.frecuencia,
            man_horas_prom: mantenimiento.man_horas_prom,
            man_horas_anuales: mantenimiento.man_horas_anuales,
            doc_descripcion: documentacion.doc_descripcion,
            doc_direccion: documentacion.doc_direccion,
            doc_tipo: documentacion.doc_tipo,
        });
    }


    useEffect(() => {
        async function fetchData(){
        try { 

            // ========== OPCIONES PARA LOS SELECTS ==========
            establecerDatos();

            // ========== DATOS POR DEFECTO ==========
            const todo = await Aplicacion.obtenerTodo(id);
    
            setGeneral(todo.general);
            setBaseDatos(todo.basedatos);
            setServidor(todo.servidor);
            setFuncional(todo.funcional);
            setTecnico(todo.tecnico); 
            setLenguaje(todo.lenguajes);
            setPlataforma(todo.plataformas.plataforma);
            {todo.documentacion[0] ? setDocumentacion(todo.documentacion[0]) : setDocumentacion('')}
            {todo.tecnologia ? setMantenimiento(todo.tecnologia) : setMantenimiento('')}

            // ========== LLENA LA TABLA CON LOS VALORES POR DEFECTO ==========
            llenarTabla(lenguaje,'lenguaje_id','lenguaje',setDataLenguaje,setSelectLenguaje);
            llenarTabla(basedatos,'base_datos_id','base_datos',setDataBase,setSelectBase);
            llenarTabla(servidor,'servidor_id','servidor',setDataServidor,setSelectServidor);

            await llenarDatos(); 
            setLoad(false);

        }catch (error) { console.log(error) }
        } 
        fetchData();
    }, [id, load]);


    const eliminar = async (id) => {
        try {
            if(Autorizacion.obtenerUsuario().rol === 'admin'){
                await Aplicacion.eliminar(id); 
                Notificacion('USUARIO ELIMINADO EXITOSAMENTE', 'success');
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
                <Modal>
                    <TableRegistro
                        setIsOpen={setIsOpen}
                        devolverSelecciones={obtenerSeleccionesBase}
                        columnas={columnasModalBD}
                        objetivo='base_datos'
                        busqueda={true}
                        selectDefault={select_base}
                    />
                </Modal> 
            ) : (null) }
            {/* --------------- VENTANA MODAL PARA REGISTRAR SERVIDOcus --------------- */}
            {isOpen2 ? (
                <Modal>
                    <TableRegistro
                        setIsOpen={setIsOpen2}
                        devolverSelecciones={obtenerSeleccionesServidor}
                        columnas={columnasModalServidor}
                        objetivo='servidor'
                        busqueda={true}
                        selectDefault={select_servidor}
                    />
                </Modal>
            ) : (null) }
            {/* --------------- VENTANA MODAL PARA REGISTRAR LENGUAJES --------------- */}
            {isOpen3 ? (
                <Modal>
                    <TableRegistro
                        setIsOpen={setIsOpen3}
                        devolverSelecciones={obtenerSeleccionesLenguaje}
                        columnas={columnasModalLenguaje}
                        objetivo='lenguaje'
                        selectDefault={select_lenguaje}
                    />
                </Modal>
            ) : (null) }

            <h2 className='font-bold text-lg'>Actualizacion de Aplicacion</h2>

            <form className="flex flex-col justify-center items-center relative w-full p-4 mb-10 z-40" onSubmit={actualizar} >

                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >

                    <h2 className='font-bold text-base mb-6'>Informacion General</h2>
                    <div className="grid grid-cols-2 space-x-4">
                        {/* --------------- INFORMACION BASICA --------------- */}
                        <Input campo='Acronimo' name='apl_acronimo' required={true} propiedad={general.apl_acronimo} manejador={setValores} />
                        <Select campo='Estatus' name='apl_estatus' required={true} byId={false} opciones={estatus ? estatus : ['SELECCIONE']} propiedad={general.estatus} manejador={setValores}/>
                    </div>

                    <TextArea campo='Nombre' name='apl_nombre' required={true} propiedad={general.apl_nombre} manejador={setValores} />
                    <TextArea campo='Descripcion' name='apl_descripcion' required={true} propiedad={general.apl_descripcion} manejador={setValores} />

                    <div className="relative grid grid-cols-2 space-x-4 mb-0">
                        <Input campo='Version' name='apl_version' required={true} propiedad={general.apl_version} manejador={setValores} />
                        <Select campo='Prioridad' name='apl_prioridad' required={true} byId={false} opciones={['SELECCIONE','ALTA','MEDIA','BAJA',]} propiedad={general.prioridad} manejador={setValores} />
                        <Select campo='Alcance' name='apl_alcance' required={true} byId={false} opciones={alcance ? alcance : ['SELECCIONE']} propiedad={general.alcance} manejador={setValores} />
                        <Input campo='Direccion' name='apl_direccion' required={true} propiedad={general.apl_direccion} manejador={setValores} />
                        <Input campo='N° Usuarios' name='apl_cantidad_usuarios' required={true} propiedad={general.apl_cantidad_usuarios} manejador={setValores} />
                        <Select campo='Region' name='apl_region' required={true} opciones={regiones ? regiones : ['SELECCIONE']} propiedad={general.region} manejador={setValores} />
                        <Radio label='Critico' name='apl_critico' required={true} opciones={['SI','NO']} manejador={setValores} />
                        <Radio label='Codigo Fuente' name='apl_codigo_fuente' required={true} opciones={['SI', 'NO']} manejador={setValores} />
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

                </div>

                {/* --------------- CUSTODIOS --------------- */} 
                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                        
                    <div className="grid grid-cols-2 space-x-4">
                        <p className='font-bold text-base my-4'>Custodio Funcional</p>
                        <p className='font-bold text-base my-4'>Custodio Tecnico</p>
 
                        <div className="grid grid-cols-2 space-x-4">
                            <Select campo='Seleccione Custodio' name='select_funcional' byId={false} propiedad={datos.select_funcional} opciones={custodios ? custodios : ['SELECCIONE']} manejador={setValores}/>
                        </div>
                        <div className="grid grid-cols-2 space-x-4">
                            <Select campo='Seleccione Custodio' name='select_tecnico' byId={false} propiedad={datos.select_tecnico} opciones={custodios ? custodios : ['SELECCIONE']} manejador={setValores}/>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    {/* --------------- DOCUMENTACION --------------- */}
                    <p className='font-bold text-base my-4'>Documentacion</p>
                    <div className="grid grid-cols-2 space-x-4">
                        <Input campo='Descripcion' name='doc_descripcion' propiedad={datos.doc_descripcion} manejador={setValores} />
                        <Input campo='Direccion' name='doc_direccion' propiedad={datos.doc_direccion} manejador={setValores} />
                        <Select campo='Tipo de Doc' name='doc_tipo' propiedad={datos.doc_tipo} required={true} opciones={documentos ? documentos : ['SELECCIONAR']} manejador={setValores} />
                    </div>

                    {/* --------------- MANTENIMIENTO --------------- */}
                    <p className='font-bold text-base my-4'>Mantenimiento</p>
                    <div className="grid grid-cols-2 space-x-4">
                        <Select campo='Frecuencia' name='man_frecuencia' propiedad={datos.man_frecuencia} byId={false} opciones={frecuencia ? frecuencia : ['SELECCIONE']} manejador={setValores}/>
                        <Input campo='Horas Pro' name='man_horas_prom' propiedad={datos.man_horas_prom} manejador={setValores} />
                        <Input campo='Horas Anu' name='man_horas_anuales' propiedad={datos.man_horas_anuales} manejador={setValores} />
                    </div>
                </div>

                <div className="flex space-x-2 md:space-x-12">
                    <Button tipo='button' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                    <Button tipo='submit' width={32}>Actualizar</Button>
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
                </div>
            </form>
            
        </Container>
        )
    }
};

export default ActualizarApp;
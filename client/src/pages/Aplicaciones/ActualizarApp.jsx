
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Button, Container, Input, Radio, Select, Tabla, TextArea, Modal, TableRegistro } from '../../components';
import { BiLoaderAlt } from "react-icons/bi";
import Autorizacion from '../../services/auth.service';
import Aplicacion from '../../services/aplicacion.service';
import { opcionMantenimiento } from '../../services/campos.service';
import Opciones from '../../utils/Opciones';
import { columnasModalBD, columnasModalLenguaje, columnasModalServidor } from '../../utils/columnas';
import { FaTimesCircle } from 'react-icons/fa';
import { Notificacion } from '../../utils/Notificacion';

function ActualizarApp() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [datos, setDatos] = useState({
        usuario_actualizo: Autorizacion.obtenerUsuario().indicador,
    });
    const [load, setLoad] = useState(true);
    
    // VALORES POR DEFECTO EN LOS INPUTS
    const [general, setGeneral] = useState('');
    //const [tecnologia, setTecnologia] = useState('');
    const [lenguaje, setLenguaje] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [basedatos, setBaseDatos] = useState('');
    const [servidor, setServidor] = useState('');
    const [funcional, setFuncional] = useState('');
    const [tecnico, setTecnico] = useState('');
    const [mantenimiento, setMantenimiento] = useState('');
    const [documentacion, setDocumentacion] = useState('');

    // =================== OPCIONES PARA LOS SELECTS ===================
    const [responsables, setResponsables] = useState('');
    const [estatus, setEstatus] = useState('');
    const [alcance, setAlcance] = useState('');
    const [plataformas, setPlataformas] = useState('');
    const [mante, setMante] = useState('');
    const [regiones, setRegiones] = useState('');

    function navegar() { navigate(-1) } 

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function updateData(e) {
        e.preventDefault();
        try {
            if(Autorizacion.obtenerUsuario().rol === 'admin'){
                await Aplicacion.actualizarDatos(id, datos, tableDataLenguaje, tableDataBase, tableDataServidor); 
                Notificacion('REGISTRO EXITOSO', 'success');
                // navigate("/dashboard");
            }
        } 
        catch (error) { 
            console.log('ERROR AL ACTUALIZAR APL_ACT'); 
            Notificacion(error.response.data.message, 'error');
        }
    }

    // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
    const setValores = (e) => {

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null });
        else
            setDatos({ ...datos, [e.target.name] : e.target.value });
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
    const llenarTabla = async (datos, id, nombre, setTabla, tabla, setSelect) => {

        let selecciones = [];

        for (let i = 0; i < datos.length; i++) {
            const x = datos[i];
            setTabla(tabla => [...tabla, { [`${id}`]: x[id], [`${nombre}`]: x[nombre]}]); 
            selecciones.push(datos[i].base_datos_id); 
        }

        return selecciones;
    }

    // -------------------- FUNCION PARA ELIMINAR ELEMENTOS DE LA TABLA --------------------
    const eliminarElemento = (row, elemento, tabla, setTabla, setSelecciones) => {

        if (window.confirm(`Estas seguro de eliminar: ${row[elemento]}?`)) {
            const nuevo = tabla.filter((i) => i[elemento] != row[elemento]);
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


    useEffect(() => {
        async function fetchData(){
        try { 

            setResponsables(await Opciones('responsables'));
            setPlataformas(await Opciones('plataformas'));
            setEstatus(await Opciones('estatus'));
            setAlcance(await Opciones('alcance'));
            setMante(await Opciones('mantenimientos'));
            setRegiones(await Opciones('regiones')); 

            const gen = await Aplicacion.obtenerGeneral(id);
            const tec = await Aplicacion.obtenerTecnologia(id);
            const doc = await Aplicacion.obtenerDocumentacion(id);
            const bas = await Aplicacion.obtenerBaseDatos(id);
            const ser = await Aplicacion.obtenerServidor(id);
            const res = await Aplicacion.obtenerResponsable(id);
    
            setGeneral(gen.data);
            setBaseDatos(bas.data.datos);
            setServidor(ser.data.datos);
            setFuncional(res.data.funcional[0].res_indicador);
            setTecnico(res.data.tecnico[0].res_indicador); 
            setLenguaje(tec.data.lenguajes);
            setPlataforma(tec.data.plataformas);
            setMantenimiento(tec.data.datos[0]);
            setDocumentacion(doc.data.datos[0]);

            llenarTabla(basedatos,'base_datos_id','base_datos',setDataBase,tableDataBase,setSelectBase);
            llenarTabla(servidor,'servidor_id','servidor',setDataServidor,tableDataServidor,setSelectServidor);
            llenarTabla(lenguaje,'lenguaje_id','lenguaje',setDataLenguaje,tableDataLenguaje,setSelectLenguaje);

            setDatos({
                ...datos,
                apl_acronimo : gen.data[0].apl_acronimo,
                apl_nombre : gen.data[0].apl_nombre,
                apl_descripcion : gen.data[0].apl_descripcion,
                apl_prioridad : gen.data[0].prioridad,
                apl_alcance : gen.data[0].alcance,
                apl_critico : gen.data[0].apl_critico,
                apl_direccion : gen.data[0].apl_direccion,
                apl_estatus : gen.data[0].estatus,
                apl_version : gen.data[0].apl_version,
                apl_codigo_fuente : gen.data[0].apl_codigo_fuente,
                apl_cantidad_usuarios : gen.data[0].apl_cantidad_usuarios,
                apl_region : gen.data[0].region,
                plataforma : tec.data.plataformas[0].plataforma,
                select_funcional: res.data.funcional[0].res_indicador,
                select_tecnico: res.data.tecnico[0].res_indicador,
                man_frecuencia: mantenimiento.man_frecuencia,
                man_horas_prom: mantenimiento.man_horas_prom,
                man_horas_anuales: mantenimiento.man_horas_anuales,
                doc_descripcion: documentacion.doc_descripcion,
                doc_direccion: documentacion.doc_direccion,
                doc_tipo: documentacion.doc_tipo,
            });

            setLoad(false);

        }catch (error) { console.log(error) }
        } 
        fetchData();
    }, [id, load]);



    if(Autorizacion.obtenerUsuario().rol !== 'admin') 
        return <Navigate to='/' />

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
            {/* --------------- VENTANA MODAL PARA REGISTRAR SERVIDORES --------------- */}
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

            <form className="flex flex-col justify-center items-center relative w-full p-4 mb-10 z-40" onSubmit={updateData} >

                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >

                    <h2 className='font-bold text-base mb-6'>Informacion General</h2>
                    <div className="grid grid-cols-2 space-x-4">
                        {/* --------------- INFORMACION BASICA --------------- */}
                        <Input campo='Acronimo' name='apl_acronimo' required={true} propiedad={general[0].apl_acronimo} manejador={setValores} />
                        <Select campo='Estatus' name='apl_estatus' required={true} opciones={estatus ? estatus : ['SELECCIONE']} propiedad={general[0].estatus} manejador={setValores}/>
                    </div>

                    <TextArea campo='Nombre' name='apl_nombre' required={true} propiedad={general[0].apl_nombre} manejador={setValores} />
                    <TextArea campo='Descripcion' name='apl_descripcion' required={true} propiedad={general[0].apl_descripcion} manejador={setValores} />

                    <div className="relative grid grid-cols-2 space-x-4 mb-0">
                        <Input campo='Version' name='apl_version' required={true} propiedad={general[0].apl_version} manejador={setValores} />
                        <Select campo='Prioridad' name='apl_prioridad' required={true} propiedad={general[0].prioridad} opciones={['SELECCIONE','ALTA','MEDIA','BAJA',]} manejador={setValores} />
                        <Select campo='Alcance' name='apl_alcance' required={true} propiedad={general[0].alcance} opciones={alcance ? alcance : ['SELECCIONE']} manejador={setValores} />
                        <Input campo='Direccion' name='apl_direccion' required={true} propiedad={general[0].apl_direccion} manejador={setValores} />
                        <Input campo='N° Usuarios' name='apl_cantidad_usuarios' required={true} propiedad={general[0].apl_cantidad_usuarios} manejador={setValores} />
                        <Select campo='Region' name='apl_region' required={true} propiedad={general[0].region} opciones={regiones ? regiones : ['SELECCIONE']} manejador={setValores} />
                        <Radio label='Critico' name='apl_critico' required={true} opciones={['SI','NO']} manejador={setValores} />
                        <Radio label='Codigo Fuente' name='apl_codigo_fuente' required={true} opciones={['SI', 'NO']} manejador={setValores} />
                    </div>
                </div> 

                {/* --------------- TECNOLOGIAS --------------- */}
                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >

                    <h2 className='font-bold text-base my-4'>Tecnologia</h2>
                    <div className="grid grid-cols-2 space-x-4">
                        <Select campo='Plataforma' name='plataforma' propiedad={plataforma} byId={false} opciones={plataformas ? plataformas : ['SELECCIONE']} manejador={setValores} />
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

                {/* --------------- RESPONSABLES --------------- */} 
                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                        
                    <div className="grid grid-cols-2 space-x-4">
                        <p className='font-bold text-base my-4'>Responsable Funcional</p>
                        <p className='font-bold text-base my-4'>Responsable Tecnico</p>
 
                        <div className="grid grid-cols-2 space-x-4">
                            <Select campo='Seleccione Custodio' name='select_funcional' byId={false} propiedad={datos.select_funcional} opciones={responsables ? responsables : ['SELECCIONE']} manejador={setValores}/>
                        </div>
                        <div className="grid grid-cols-2 space-x-4">
                            <Select campo='Seleccione Custodio' name='select_tecnico' byId={false} propiedad={tecnico ? tecnico : null} opciones={responsables ? responsables : ['SELECCIONE']} manejador={setValores}/>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    {/* --------------- DOCUMENTACION --------------- */}
                    <p className='font-bold text-base my-4'>Documentacion</p>
                    <div className="grid grid-cols-2 space-x-4">
                        <Input campo='Descripcion' name='doc_descripcion' propiedad={documentacion.doc_descripcion} manejador={setValores} />
                        <Input campo='Direccion' name='doc_direccion' propiedad={documentacion.doc_direccion} manejador={setValores} />
                        <Input campo='Tipo de Doc' name='doc_tipo' propiedad={documentacion.doc_tipo} manejador={setValores} />
                    </div>

                    {/* --------------- MANTENIMIENTO --------------- */}
                    <p className='font-bold text-base my-4'>Mantenimiento</p>
                    <div className="grid grid-cols-2 space-x-4">
                        <Select campo='Frecuencia' name='man_frecuencia' propiedad={mantenimiento.man_frecuencia} byId={false} opciones={opcionMantenimiento} manejador={setValores}/>
                        <Input campo='Horas Pro' name='man_horas_prom' propiedad={mantenimiento.man_horas_prom} manejador={setValores} />
                        <Input campo='Horas Anu' name='man_horas_anuales' propiedad={mantenimiento.man_horas_anuales} manejador={setValores} />
                    </div>
                </div>

                <div className="flex gap-2 md:gap-12">
                    <Button tipo='button' color='blue' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                    <Button tipo='submit' color='blue' width={32}>Registrar</Button>
                </div>

            </form>
            
        </Container>
        )
    }
};

export default ActualizarApp;
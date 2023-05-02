
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Container, Input, Radio, Select, TextArea, Tabla } from '../../components';
import { Notificacion } from '../../utils/Notificacion';
import { FaTimesCircle } from 'react-icons/fa';
import { columnasModalBD, columnasModalFramework, 
    columnasModalLenguaje, columnasModalServidor } from '../../utils/columnas';
import Autorizacion from '../../services/auth.service';
import Aplicacion from '../../services/aplicacion.service';
import Opciones from '../../utils/Opciones';
import TableRegistro from '../../components/TablaRegistro';
import Modal from '../../components/Modal';


function RegistrarApp() {

    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }
    
    const [datos, setDatos] = useState({
        apl_acronimo: '',
        apl_estatus: '',
        apl_nombre: '',
        apl_descripcion: '',
        apl_prioridad: '',
        apl_version: '',
        apl_critico: '',
        apl_alcance: '',
        apl_codigo_fuente: '',
        apl_direccion: '',
        apl_region: '',
        apl_usuario_registro: Autorizacion.obtenerUsuario().indicador,
        apl_usuario_actualizo: Autorizacion.obtenerUsuario().indicador,
    
        plataforma: '',
        select_base: '',
        select_servidor: '',
        select_lenguaje: '',
        select_framework: '',
    });

    // =================== OPCIONES PARA LOS SELECTS ===================
    const [responsables, setResponsables] = useState('');
    const [estatus, setEstatus] = useState('');
    const [alcance, setAlcance] = useState('');
    const [plataformas, setPlataformas] = useState('');
    const [mante, setMante] = useState('');
    const [regiones, setRegiones] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setResponsables(await Opciones('responsables'));
        setPlataformas(await Opciones('plataformas'));
        setEstatus(await Opciones('estatus'));
        setAlcance(await Opciones('alcance'));
        setMante(await Opciones('mantenimientos'));
        setRegiones(await Opciones('regiones'));
    }

    useEffect(() => {
        establecerDatos();
    }, []);

    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = (e) => {
        console.log(e.target.value);

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

    }

    // =================== FUNCION PARA ACTUALIZAR DATOS ===================
    async function crearDatos(e) {
        e.preventDefault();

        if(Autorizacion.obtenerUsuario().rol === 'admin'){
            try {

                await Aplicacion.crearDatos(datos, tableDataLenguaje, tableDataBase, tableDataServidor);
                Notificacion('REGISTRO EXITOSO', 'success');
                //navigate("/dashboard");
            }
            catch (error) { 
                console.log('ERROR AL ACTUALIZAR APL_ACT');
                Notificacion(error.response.data.message, 'error');
            }
        }
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

    // -------------------- FUNCION Y VARIABLES PARA LA SELECCION DE APLICACIONES --------------------
    const [isOpen4, setIsOpen4] = useState(false);
    const [select_framework, setSelectFramework] = useState([]);
    const [tableDataFramework, setDataFramework] = useState([]);

    const obtenerSeleccionesFramework = (respuesta) => {
        console.log(respuesta);
        setSelectFramework(select_framework.push(respuesta));
        console.log(select_framework[0]);

        for (let i = 0; i < respuesta.length; i++) {
            const x = respuesta[i];
            setDataFramework(tableDataFramework => [...tableDataFramework, { framework_id: x.framework_id, framework: x.framework}]);
        }
    };

    const eliminarElemento = (row, elemento, tabla, setTabla, setSelecciones) => {
		console.log(row);
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

    const columnasFramework = [
        generarColumna('Framework ID','framework_id','160px'),
        generarColumna('Framework','framework',null),
        {
            name: 'Remover',
            button: true,
            cell: row => 
            <div>
                <FaTimesCircle
                    onClick={() => eliminarElemento(row,'framework_id',tableDataFramework,setDataFramework)} 
                    className="ml-3 text-red-500 text-lg cursor-pointer"
                />
            </div>,
            left: true
        },
    ];


    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
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

            {/* --------------- VENTANA MODAL PARA REGISTRAR FRAMEWORKS --------------- */}
            {isOpen4 ? (
                <Modal>
                    <TableRegistro
                        setIsOpen={setIsOpen4}
                        devolverSelecciones={obtenerSeleccionesFramework}
                        columnas={columnasModalFramework}
                        objetivo='framework'
                    />
                </Modal>
            ) : (null)}

            <h1 className='font-bold text-lg'>Registro de Aplicacion</h1>

            <form className="flex flex-col justify-center items-center relative w-full p-4 pb-24 mb-10 z-40" onSubmit={crearDatos} >
                
                {/* --------------- INFORMACION BASICA --------------- */}
                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    <h2 className='font-bold text-base mb-6'>Informacion General</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input campo='Acronimo' name='apl_acronimo' required={true} manejador={setValores} />
                        <Select campo='Estatus' name='apl_estatus' required={true} opciones={estatus ? estatus : ['SELECCIONE']} manejador={setValores}/>
                    </div>

                    <TextArea campo='Nombre' name='apl_nombre' required={true} manejador={setValores} />
                    <TextArea campo='Descripcion' required={true} name='apl_descripcion' manejador={setValores} />

                    <div className="relative grid grid-cols-2 gap-4 mb-0">
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

                
                {/* --------------- TECNOLOGIAS --------------- */}
                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    <h2 className='font-bold text-base my-4'>Tecnologia</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Select campo='Plataforma' name='plataforma' opciones={plataformas ? plataformas : ['SELECCIONE']} manejador={setValores} />
                    </div>

                    {/* --------------- LENGUAJES --------------- */}
                    <p className='font-bold text-sm my-4'>Lenguajes</p>
                    <div className='flex flex-col justify-center items-center gap-4'>

                        <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                            onClick={(e) => {setIsOpen3(!isOpen3)}} >
                            Agregar
                        </button>

                        <div className="w-full">
                            <Tabla columnas={columnasLenguaje} datos={tableDataLenguaje} />
                        </div>
                    </div>

                    {/* --------------- FRAMEWORKS --------------- */}
                    <p className='font-bold text-sm my-4'>Frameworks</p>
                    <div className='flex flex-col justify-center items-center gap-4'>

                        <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                            onClick={(e) => {setIsOpen4(!isOpen4)}} >
                            Agregar
                        </button>

                        <div className="w-full">
                            <Tabla columnas={columnasFramework} datos={tableDataFramework} />
                        </div>
                    </div>

                    {/* --------------- BASE DE DATOS --------------- */}
                    <p className='font-bold text-sm my-4'>Base de datos</p>
                    <div className='flex flex-col justify-center items-center gap-4'>

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
                    <div className='flex flex-col justify-center items-center gap-4'>

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
                    
                    <div className="grid grid-cols-2 gap-4">
                        <p className='font-bold text-base my-4'>Responsable Funcional</p>
                        <p className='font-bold text-base my-4'>Responsable Tecnico</p>

                        <div className="grid grid-cols-2 gap-4">
                            <Select campo='Seleccione Custodio' name='select_funcional' byId={false} opciones={responsables ? responsables : ['SELECCIONE']} manejador={setValores}/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Select campo='Seleccione Custodio' name='select_tecnico' byId={false} opciones={responsables ? responsables : ['SELECCIONE']} manejador={setValores}/>
                        </div>

                    </div>
                </div>


                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    {/* --------------- DOCUMENTACION --------------- */}
                    <p className='font-bold text-base my-4'>Documentacion</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Input campo='Descripcion' name='doc_descripcion' required={true} manejador={setValores} />
                        <Input campo='Direccion' name='doc_direccion' required={true} manejador={setValores} />
                        <Input campo='Tipo de Doc' name='doc_tipo' required={true} manejador={setValores} />
                    </div>

                    {/* --------------- MANTENIMIENTO --------------- */}
                    <p className='font-bold text-base my-4'>Mantenimiento</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Select campo='Frecuencia' name='man_frecuencia' byId={false} opciones={mante ? mante : ['SELECCIONE']} manejador={setValores}/>
                        <Input campo='Horas Pro' name='man_horas_prom' required={true} manejador={setValores} />
                        <Input campo='Horas Anu' name='man_horas_anuales' required={true} manejador={setValores} />
                    </div>
                </div>

                <div className="absolute bottom-16 right-1/3">
                    <Button tipo='submit' color='blue' width={32}>Registrar</Button>
                </div>
                <div className="absolute bottom-16 left-1/3">
                    <Button tipo='button' color='blue' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                </div>

            </form>

        </Container>
    )
};

export default RegistrarApp;
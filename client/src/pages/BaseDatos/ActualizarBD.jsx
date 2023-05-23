
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Input, Modal, Select, Tabla, TableRegistro, TextArea } from '../../components';
import { BiLoaderAlt } from "react-icons/bi";
import { useEffect, useState } from 'react';
import { columnasModalServidor } from '../../utils/columnas';
import { FaTimesCircle } from 'react-icons/fa';
import Opciones from '../../utils/Opciones';
import { Notificacion } from '../../utils/Notificacion';
import axios from 'axios';
import authHeader from '../../utils/header';
import { obtenerUsuario, rutaBaseDatos } from '../../utils/APIRoutes';

function ActualizarBD() {

    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar() { navigate(-1) } 

    // ---------- ESTADOS ----------
    const { id } = useParams();
    const [load, setLoad] = useState(true);
    const [datos, setDatos] = useState({
        usuario_actualizo: obtenerUsuario().indicador,
    });

    // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
    const setValores = (e) => {
        const valor = e.target.value.toUpperCase();
        setDatos({ ...datos, [e.target.name] : valor });
    }

    const [mane, setMane] = useState('');
    const [tipos, setTipos] = useState('');
    const [estatus, setEstatus] = useState('');
    const [ambientes, setAmbientes] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setMane(await Opciones('manejadores'));
        setEstatus(['SELECCIONE', 'POR DETERMINAR', 'ACTIVO', 'INACTIVO']);
        setTipos(await Opciones('tipos'));
        setAmbientes(await Opciones('ambientes'));
    }

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

    // VALORES POR DEFECTO EN LOS INPUTS
    const [general, setGeneral] = useState('');
    const [servidor, setServidor] = useState('');

    useEffect(() => {
        async function fetchData(){
            try {
                // ========== OPCIONES PARA LOS SELECTS ==========
                establecerDatos();

                // ========== DATOS POR DEFECTO ==========
                const gen = await axios.get(`${rutaBaseDatos}/general/${id}`, { headers: authHeader() });
                const ser = await axios.get(`${rutaBaseDatos}/servidor/${id}`, { headers: authHeader() });

                setGeneral(gen.data[0]);
                setServidor(ser.data.datos);

                // ========== LLENAN LA TABLA CON LOS VALORES POR DEFECTO ==========
                llenarTabla(ser.data.datos,'servidor_id','servidor',setDataServidor,setSelectServidor);

                //await llenarDatos();
                setDatos({
                    ...datos,
                    base_datos : gen.data[0].base_datos,
                    estatus : gen.data[0].estatus,
                    cantidad_usuarios : gen.data[0].base_cantidad_usuarios,
                    manejador : gen.data[0].manejador,
                    tipo : gen.data[0].tipo,
                    ambiente : gen.data[0].ambiente,
                });
                
                setLoad(false);
            }catch (error) { console.log(error); }
        } 
        fetchData();  
    }, [id]); 

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function actualizar(e) {
        e.preventDefault();

        try {
          if(obtenerUsuario().rol === 'admin'){

            let datosServidor = datos;
            datosServidor.select_servidor = tableDataServidor;

            await axios.patch(`${rutaBaseDatos}/${id}`, datosServidor, { headers: authHeader() }) 
            .then(response => { return response.data; });

            Notificacion('ACTUALIZACION EXITOSA', 'success');
            navigate(`/basedatos/${id}`);
          }
        }
        catch (error) { 
            console.log('ERROR AL ACTUALIZAR APL_ACT'); 
        }
      }

    const [isOpen, setIsOpen] = useState(false);
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

    
    if(load)
        <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
    else{
        return (
            <Container>

            {/* --------------- VENTANA MODAL PARA REGISTRAR SERVIDORES --------------- */}
            {isOpen ? (
                <Modal>
                    <TableRegistro
                        setIsOpen={setIsOpen}
                        devolverSelecciones={obtenerSeleccionesServidor}
                        columnas={columnasModalServidor}
                        objetivo='servidor'
                        busqueda={true}
                        selectDefault={select_servidor}
                    />
                </Modal>
            ) : (null) }


            <h1 className='font-bold text-lg'>Registro de Base de datos</h1>

            <form className="flex flex-col items-center space-y-4 relative w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmit={actualizar}>

                <div className='w-full'>
                    <TextArea campo='Nombre' name='base_datos' required={true} editable={true} propiedad={general.base_datos} manejador={setValores} />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 relative space-x-4 mb-0">
                    <Select campo='Estatus' name='estatus' required={true} byId={false} propiedad={general.estatus} opciones={estatus ? estatus : ['SELECCIONE']} manejador={setValores}/>
                    <Select campo='Tipo' name='tipo' required={true} byId={false} propiedad={general.tipo} opciones={tipos ? tipos : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Manejador' name='manejador' required={true} byId={false} propiedad={general.manejador} opciones={mane ? mane : ['SELECCIONE']} manejador={setValores} />
                    <Input campo='Version' name='version_manejador' propiedad={general.version_manejador} editable={true} manejador={setValores} />
                    <Select campo='Ambiente' name='ambiente' required={true} byId={false} propiedad={general.ambiente} opciones={ambientes ? ambientes : ['SELECCIONE']} manejador={setValores} />
                    <Input campo='N° Usuario' name='cantidad_usuarios' propiedad={general.base_cantidad_usuarios} required={true} editable={true} manejador={setValores} />
                </div>
 
                {/* --------------- SERVIDOR --------------- */}
                <p className='font-bold text-sm my-4'>Servidor</p>
                    <div className='w-full flex flex-col justify-center items-center space-y-4'>

                        <button type='button' className="p-1 bg-blue-600 text-white rounded" 
                            onClick={(e) => {setIsOpen(!isOpen)}} >
                            Agregar
                        </button>

                        <div className="w-full">
                        <Tabla columnas={columnasServidor} datos={tableDataServidor} />
                    </div>
                </div>
                    
                <div className="flex space-x-2 md:space-x-12 mt-12">
                    <Button tipo='button' color='blue' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                    <Button tipo='submit' color='blue' width={32}>Actualizar</Button>
                </div>

            </form>
            

        </Container>
        )
    }
};

export default ActualizarBD;
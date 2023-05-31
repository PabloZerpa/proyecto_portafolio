
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Input, Select, Tabla, TextArea } from '../../components';
import { Notificacion } from '../../utils/Notificacion';
import { FaTimesCircle } from 'react-icons/fa';
import Modal from '../../components/Modal';
import TableRegistro from '../../components/TablaRegistro';
import { columnasModalServidor } from '../../utils/columnas';
import Opciones from '../../utils/Opciones';
import { obtenerUsuario, rutaBaseDatos } from '../../utils/APIRoutes';
import axios from 'axios';
import authHeader from '../../utils/header';

function RegistrarBD() {

    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }
    
    // ---------- ESTADOS ----------
    const [datos, setDatos] = useState({
        usuario_registro: obtenerUsuario().indicador,
    });

    const [mane, setMane] = useState('');
    const [tipos, setTipos] = useState('');
    const [estatus, setEstatus] = useState('');
    const [ambientes, setAmbientes] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setEstatus(['SELECCIONE', 'POR DETERMINAR', 'ACTIVO', 'INACTIVO']);
        setTipos(await Opciones('tipos'));
        setAmbientes(await Opciones('ambientes'));
    }

    useEffect(() => {
        establecerDatos();
    }, []);


    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = async(e) => {
        const valor = e.target.value.toUpperCase();
        setDatos({ ...datos, [e.target.name] : valor });

        if(e.target.name === 'tipo'){
            setMane(await OpcionesManejadores(e.target.value));
        }
    }

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async function obtenerManejadores(tipo) {
        try { 
            const respuesta = await axios.post(`${rutaBaseDatos}/manejadores`, {tipo}, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            Notificacion(error.response.data.message, 'error');
        }
    }

    async function OpcionesManejadores(valor){
        try {
            const respuesta = await obtenerManejadores(valor);
            const data = respuesta.data;
            let opciones = ['SELECCIONE'];
        
            for (let i = 0; i < data.length; i++) {
                const valor = Object.values(data[i]);
                opciones.push(valor[0]);
            }
            return opciones;
        } catch (error) {
            Notificacion(error.response.data.message, 'error');
        }
    }

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function createData(e) {
        e.preventDefault();

        try {
            if(obtenerUsuario().rol !== 'user'){
                let datosServidor = datos;
                datosServidor.select_servidor = tableDataServidor;

                const id = await axios.post(`${rutaBaseDatos}/`, datosServidor, { headers: authHeader() }) 
                .then(response => { return response.data; });
                
                Notificacion('REGISTRO EXITOSO', 'success');
                navigate(`/basedatos/${id}`);
            }
        } 
        catch (error) { 
            Notificacion(error.response.data.message, 'error');
        }
    }

    // -------------------- FUNCION Y VARIABLES PARA LA SELECCION DE SERVIDORES --------------------
    const [isOpen, setIsOpen] = useState(false);
    const [select_servidor, setSelectServidor] = useState([]);
    const [tableDataServidor, setDataServidor] = useState([]);

    const obtenerSeleccionesServidor = (respuesta) => {
        setSelectServidor(select_servidor.push(respuesta));

        for (let i = 0; i < respuesta.length; i++) {
            const x = respuesta[i];
            setDataServidor(tableDataServidor => [...tableDataServidor, { servidor_id: x.servidor_id, servidor: x.servidor}]);
        }
    };

    // -------------------- FUNCION QUE ELIMINA ELEMENTO SELECCIONADA DE LA TABLA --------------------
    const eliminarElemento = (row, elemento, tabla, setTabla) => {
        if (window.confirm(`Estas seguro de eliminar: ${row[elemento]}?`)) {
            const nuevo = tabla.filter((i) => i[elemento] !== row[elemento]);
            setTabla(nuevo);
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
                    onClick={() => eliminarElemento(row,'servidor_id',tableDataServidor,setDataServidor)} 
                    className="ml-3 text-red-500 text-lg cursor-pointer"
                />
            </div>,
            left: true
        },
    ];

    
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
                />
            </Modal>
            ) : (null) }


            <h1 className='font-bold text-lg'>Registro de Base de datos</h1>

            <form className="flex flex-col items-center space-y-4 relative w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmit={createData}>

                <div className='w-full'>
                    <TextArea campo='Nombre' name='base_datos' required={true} editable={true} area={true} manejador={setValores} />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 relative space-x-4 mb-0">
                    <Select campo='Estatus' name='estatus' required={true} opciones={estatus ? estatus : ['SELECCIONE']} manejador={setValores}/>
                    <Select campo='Tipo' name='tipo' byId={false} required={true} opciones={tipos ? tipos : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Manejador' name='manejador' byId={false} required={true} opciones={mane ? mane : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Ambiente' name='ambiente' required={true} opciones={ambientes ? ambientes : ['SELECCIONE']} manejador={setValores} />
                    <Input campo='N° Usuario' name='cantidad_usuarios' required={true} editable={true} manejador={setValores} />
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
                    
                <div className="flex space-x-2 md:space-x-12 pt-12">
                    <Button tipo='button' color='blue' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                    <Button tipo='submit' color='blue' width={32}>Registrar</Button>
                </div>

            </form>
            

        </Container>
    )
};

export default RegistrarBD;
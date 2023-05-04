
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Container, Input, Select, Tabla, TextArea } from '../../components';
import Autorizacion from '../../services/auth.service';
import Usuario from '../../services/usuario.service';
import Base from '../../services/basedatos.service';
import { Notificacion } from '../../utils/Notificacion';
import { FaTimesCircle } from 'react-icons/fa';
import Modal from '../../components/Modal';
import TableRegistro from '../../components/TablaRegistro';
import { columnasModalServidor } from '../../utils/columnas';

function RegistrarBD() {

    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }

    const [opcionServidores, setOpcionServidores] = useState('');
    const [opcionMane, setOpcionMane] = useState('');
    const [opcionTipos, setOpcionTipos] = useState('');
    const [opcionEstatus, setOpcionEstatus] = useState('');
    const [opcionAmbientes, setOpcionAmbientes] = useState('');

    const [datos, setDatos] = useState({
        usuario_registro: Autorizacion.obtenerUsuario().indicador,
        usuario_actualizo: Autorizacion.obtenerUsuario().indicador,
    });

    async function getData(ruta, elemento){
        const respuesta = await Usuario.obtenerOpcion(ruta);
        const data = respuesta.data;
        let opciones = ['SELECCIONE'];

        for (let i = 0; i < data.length; i++) {
            const valor = Object.values(data[i]);
            opciones.push(valor[0]);
        }
        elemento(opciones);
    }

    useEffect(() => {
        getData('manejadores',setOpcionMane);
        getData('tipos',setOpcionTipos);
        getData('ambientes',setOpcionAmbientes);
        getData('estatus',setOpcionEstatus);
        getData('servidores',setOpcionServidores);
    }, []);

    const handleInputChange = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function createData(e) {
        e.preventDefault();

        try {
            if(Autorizacion.obtenerUsuario().rol === 'admin'){
            
            await Base.crearDatosDB(datos, tableDataServidor);
            Notificacion('REGISTRO EXITOSO', 'success');
            navigate("/dashboard");
            }
        }
        catch (error) { 
            Notificacion('ERROR AL REGISTRAR', 'error');
        }
    }

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

    const eliminarElemento = (row, elemento, tabla, setTabla) => {
        if (window.confirm(`Estas seguro de eliminar: ${row[elemento]}?`)) {
            const nuevo = tabla.filter((i) => i[elemento] != row[elemento]);
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



    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
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

            <form className="flex flex-col justify-content items-center space-y-4 relative w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmit={createData}>
                <h2 className='font-bold text-base mb-6'>Informacion General</h2>

                <div className='w-full'>
                    <TextArea campo='Nombre' name='base_datos' editable={true} area={true} manejador={handleInputChange} />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 relative space-x-4 mb-0">
                    <Select campo='Estatus' name='estatus' required={true} opciones={opcionEstatus ? opcionEstatus : ['SELECCIONE']} manejador={handleInputChange}/>
                    <Select campo='Tipo' name='tipo' required={true} opciones={opcionTipos ? opcionTipos : ['SELECCIONE']} manejador={handleInputChange} />
                    <Select campo='Manejador' name='manejador' required={true} opciones={opcionMane ? opcionMane : ['SELECCIONE']} manejador={handleInputChange} />
                    <Input campo='Version' name='version_manejador' editable={true} manejador={handleInputChange} />
                    <Select campo='Ambiente' name='tipo_ambiente' required={true} opciones={opcionAmbientes ? opcionAmbientes : ['SELECCIONE']} manejador={handleInputChange} />
                    <Input campo='N° Usuario' name='cantidad_usuarios' editable={true} manejador={handleInputChange} />
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
                    <Button tipo='submit' color='blue' width={32}>Registrar</Button>
                    <Button tipo='button' color='blue' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                </div>

            </form>
            

        </Container>
    )
};

export default RegistrarBD;

import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Input, Select, TextArea } from '../../components';
import { BiLoaderAlt } from "react-icons/bi";
import { useEffect, useState } from 'react';
import Opciones from '../../utils/Opciones';
import { Notificacion } from '../../utils/Notificacion';
import { obtenerUsuario, rutaServidor, rutaUsuario } from '../../utils/APIRoutes';
import axios from 'axios';
import authHeader from '../../utils/header';
import swal from 'sweetalert'; 

function ActualizarServidor() {
    
    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar() { navigate(-1) } 

    // ---------- ESTADOS ----------
    const { id } = useParams();
    const [load, setLoad] = useState(false);
    const [datos, setDatos] = useState({
        usuario_actualizo: obtenerUsuario().indicador,
    });

    const [general, setGeneral] = useState('');
    const [sistemas, setSistemas] = useState('');
    const [estatus, setEstatus] = useState('');
    const [regiones, setRegiones] = useState('');
    const [localidades, setLocalidades] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setEstatus(await Opciones('estados'));
        setSistemas(await Opciones('sistemas'));
        setRegiones(await Opciones('regiones'));
    }

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async function obtenerLocalidades(region) {
        try { 
            const respuesta = await axios.post(`${rutaUsuario}/localidades`, {region}, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            Notificacion(error.response.data.message, 'error');
        }
    }

    async function OpcionesLocalidades(valor){
        try {
            const respuesta = await obtenerLocalidades(valor);
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

    useEffect(() => {
        async function fetchData(){
            // ========== OPCIONES PARA LOS SELECTS ==========
            establecerDatos();
    
            // ========== DATOS POR DEFECTO ==========
            const {data} = await axios.get(`${rutaServidor}/${id}`, { headers: authHeader() });
            const x = data.general;
            //const gen = await axios.get(`${rutaServidor}/general/${id}`, { headers: authHeader() });
            setGeneral(data.general);

            setDatos({
                ...datos,
                servidor : x.servidor,
                estatus : x.estatus,
                direccion : x.ser_direccion,
                sistema : x.sistema,
                marca : x.marca,
                modelo : x.modelo,
                serial : x.mod_serial,
                velocidad : x.mod_velocidad_cpu,
                cantidad : x.mod_cantidad_cpu,
                memoria : x.mod_memoria,
                region : x.region,
                localidad : x.localidad,
            });
            
            setLocalidades(await OpcionesLocalidades(x.region));
            setLoad(false);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
    const setValores = async (e) => {
        const valor = e.target.value.toUpperCase();

        if(e.target.name === 'direccion')
            setDatos({ ...datos, [e.target.name] : e.target.value.toLowerCase() });
        else
            setDatos({ ...datos, [e.target.name] : valor });

        if(e.target.name === 'region'){
            setLocalidades(await OpcionesLocalidades(e.target.value));
        }
    }

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function actualizar(e) {
        e.preventDefault();

        try {
            if(obtenerUsuario().rol !== 'user'){

                await axios.patch(`${rutaServidor}/${id}`, datos, { headers: authHeader() }) 
                .then(response => { return response.data; });
                
                Notificacion('ACTUALIZACION EXITOSA', 'success');
                navigate(`/servidor/${id}`);
            }
        }
        catch (error) { 
            Notificacion(error.response.data.message, 'error');
        }
      }

    const eliminar = async (id) => {
        try {
            if(obtenerUsuario().rol !== 'user'){
                await axios.delete(`${rutaServidor}/${id}`, { headers: authHeader() });

                Notificacion('SERVIDOR ELIMINADO EXITOSAMENTE', 'success');
                navegar(`/servidores/`);
            }
        }
        catch (error) { 
            Notificacion(error.response.data.message, 'error');
        }
    }

    
    if(load)
        <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
    else{
        return (
            <Container>
            <h1 className='font-bold text-lg'>Actualización de Servidor</h1>

            <form className="flex flex-col items-center space-y-4 relative w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmit={actualizar}>
                <div className='w-full'>
                    <TextArea campo='Nombre' name='servidor' required={true} propiedad={general.servidor} manejador={setValores} />
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2'>

                    <div className='w-full flex flex-col'>
                        <Select campo='Estatus' name='estatus' required={true} byId={false} propiedad={general.estatus} opciones={estatus ? estatus : ['SELECCIONE']} manejador={setValores}/>
                        <Select campo='Sistema' name='sistema' required={true} byId={false} propiedad={general.sistema} opciones={sistemas ? sistemas : ['SELECCIONE']} manejador={setValores} />
                        <Input campo='Modelo' name='modelo' required={true} propiedad={general.modelo} editable={false} />
                        <Input campo='Velocidad CPU' name='velocidad' required={true} propiedad={general.mod_velocidad_cpu} manejador={setValores} />
                        <Input campo='Memoria' name='memoria' required={true} propiedad={general.mod_memoria} manejador={setValores} />
                        <Select campo='Localidad' name='localidad' required={true} byId={false} propiedad={general.localidad} opciones={localidades ? localidades : ['SELECCIONE']} manejador={setValores} />
                    </div>

                    
                    <div className='w-full flex flex-col md:ml-2'>
                        <Input campo='Direccion' name='direccion' required={true} propiedad={general.ser_direccion} manejador={setValores} />
                        <Input campo='Marca' name='marca' required={true} propiedad={general.marca} editable={false} />
                        <Input campo='Serial' name='serial' propiedad={general.mod_serial} editable={false} />
                        <Input campo='Cantidad CPU' name='cantidad' required={true} propiedad={general.mod_cantidad_cpu} manejador={setValores} />
                        <Select campo='Region' name='region' required={true} byId={false} propiedad={general.region} opciones={regiones ? regiones : ['SELECCIONE']} manejador={setValores} />
                    </div>
                </div>

                    
                <div className="flex flex-col space-x-0 space-y-3 pt-12 md:flex-row md:space-x-12 md:space-y-0">
                    <Button tipo='button' color='blue' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                    <Button tipo='submit' color='blue' width={32}>Actualizar</Button>
                    {obtenerUsuario().rol === 'admin' ? (
                        <Button tipo='button' color='red' width={32} manejador={(e) => {
                            swal({
                                text: `¿Esta seguro de Eliminar el servidor ${general.servidor}?`,
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

export default ActualizarServidor;
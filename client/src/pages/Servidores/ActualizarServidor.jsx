
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Input, Select, TextArea } from '../../components';
import { BiLoaderAlt } from "react-icons/bi";
import { useEffect, useState } from 'react';
import Opciones from '../../utils/Opciones';
import { Notificacion } from '../../utils/Notificacion';
import { obtenerUsuario, rutaServidor, rutaUsuario } from '../../utils/APIRoutes';
import axios from 'axios';
import authHeader from '../../utils/header';

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
    const [marcas, setMarcas] = useState('');
    const [sistemas, setSistemas] = useState('');
    const [estatus, setEstatus] = useState('');
    const [regiones, setRegiones] = useState('');
    const [localidades, setLocalidades] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setMarcas(await Opciones('marcas'));
        setEstatus(['SELECCIONE', 'POR DETERMINAR', 'ACTIVO', 'INACTIVO']);
        setSistemas(await Opciones('sistemas'));
        setRegiones(await Opciones('regiones'));
    }

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async function obtenerLocalidades(region) {
        try { 
            const respuesta = await axios.post(`${rutaUsuario}/localidades`, {region}, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL OBTENER LOCALIDADES');
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
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchData(){
            // ========== OPCIONES PARA LOS SELECTS ==========
            establecerDatos();
    
            // ========== DATOS POR DEFECTO ==========
            const gen = await axios.get(`${rutaServidor}/general/${id}`, { headers: authHeader() });
            setGeneral(gen.data[0]);

            setDatos({
                ...datos,
                servidor : gen.data[0].servidor,
                estatus : gen.data[0].estatus,
                direccion : gen.data[0].ser_direccion,
                sistema : gen.data[0].sistema,
                marca : gen.data[0].marca,
                modelo : gen.data[0].modelo,
                serial : gen.data[0].mod_serial,
                velocidad : gen.data[0].mod_velocidad_cpu,
                cantidad : gen.data[0].mod_cantidad_cpu,
                memoria : gen.data[0].mod_memoria,
                region : gen.data[0].region,
                localidad : gen.data[0].localidad,
            });
            
            setLocalidades(await OpcionesLocalidades(gen.data[0].region));
            setLoad(false);
        }
        fetchData();
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
            if(obtenerUsuario().rol === 'admin'){

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

    
    if(load)
        <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
    else{
        return (
            <Container>
            <h1 className='font-bold text-lg'>Registro de Servidor</h1>

            <form className="flex flex-col justify-content items-center space-y-8 relative w-full md:w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmit={actualizar}>
                <div className='w-full'>
                    <TextArea campo='Nombre' name='servidor' required={true} propiedad={general.servidor} manejador={setValores} />
                </div>

                <div className="w-full relative grid grid-cols-1 md:grid-cols-2 space-x-4 mb-0">
                    <Select campo='Estatus' name='estatus' required={true} byId={false} propiedad={general.estatus} opciones={estatus ? estatus : ['SELECCIONE']} manejador={setValores}/>
                    <Input campo='Direccion' name='direccion' required={true} propiedad={general.ser_direccion} manejador={setValores} />
                    
                    <Select campo='Sistema' name='sistema' required={true} byId={false} propiedad={general.sistema} opciones={sistemas ? sistemas : ['SELECCIONE']} manejador={setValores} />
                    <Input campo='Version' name='version' manejador={setValores} />
                    
                    <Input campo='Marca' name='marca' required={true} propiedad={general.marca} editable={false} />
                    <Input campo='Modelo' name='modelo' required={true} propiedad={general.modelo} editable={false} />
                    <Input campo='Serial' name='serial' propiedad={general.mod_serial} editable={false} />
                    <Input campo='Velocidad CPU' name='velocidad' required={true} propiedad={general.mod_velocidad_cpu} manejador={setValores} />
                    <Input campo='Cantidad CPU' name='cantidad' required={true} propiedad={general.mod_cantidad_cpu} manejador={setValores} />
                    <Input campo='Memoria' name='memoria' required={true} propiedad={general.mod_memoria} manejador={setValores} />

                    <Select campo='Region' name='region' required={true} byId={false} propiedad={general.region} opciones={regiones ? regiones : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Localidad' name='localidad' required={true} byId={false} propiedad={general.localidad} opciones={localidades ? localidades : ['SELECCIONE']} manejador={setValores} />
                </div>
                    
                <div className="flex space-x-2 md:space-x-12">
                    <Button tipo='button' color='blue' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                    <Button tipo='submit' color='blue' width={32}>Actualizar</Button>
                </div>

            </form>

        </Container>
        )
    }
};

export default ActualizarServidor;
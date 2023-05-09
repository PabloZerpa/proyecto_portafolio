
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Input, Select, TextArea } from '../../components';
import { BiLoaderAlt } from "react-icons/bi";
import Autorizacion from '../../services/auth.service';
import Base from '../../services/basedatos.service';
import Servidor from '../../services/servidor.service';
import { useEffect, useState } from 'react';
import Opciones from '../../utils/Opciones';
import { localidadCentro, localidadCentroOccidente, localidadCentroSur, 
    localidadFaja, localidadMetropolitana, localidadOccidente, localidadOrienteNorte, 
    localidadOrienteSur, opcionLocalidad } from '../../services/campos.service';
import { Notificacion } from '../../utils/Notificacion';

function ActualizarServidor() {
    
    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar() { navigate(-1) } 

    // ---------- ESTADOS ----------
    const { id } = useParams();
    const [load, setLoad] = useState(false);
    const [datos, setDatos] = useState({
        actualizador: Autorizacion.obtenerUsuario().indicador,
    });

    const [general, setGeneral] = useState('');
    const [marcas, setMarcas] = useState('');
    const [sistemas, setSistemas] = useState('');
    const [estatus, setEstatus] = useState('');
    const [regiones, setRegiones] = useState('');
    // OPCIONES DE SELECT ANIDADOS
    const [opcion1, setOpcion1] = useState(opcionLocalidad);

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setMarcas(await Opciones('marcas'));
        setEstatus(await Opciones('estatus'));
        setSistemas(await Opciones('sistemas'));
        setRegiones(await Opciones('regiones'));
    }

    useEffect(() => {
        async function fetchData(){
            // ========== OPCIONES PARA LOS SELECTS ==========
            establecerDatos();
    
            // ========== DATOS POR DEFECTO ==========
            const gen = await Servidor.obtenerGeneralServidor(id);
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
            
            setLoad(false);
        }
        fetchData();
    }, []);

    // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
    const setValores = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        if(e.target.name === 'region')
            cambioLocalidad(e.target.value, setOpcion1);
    }

    function cambioLocalidad(valor, elemento){
        if(valor === '1')
            elemento(localidadOrienteSur);
        else if(valor === '2')
            elemento(localidadOrienteNorte);
        else if(valor === '3')
            elemento(localidadCentro);
        else if(valor === '4')
            elemento(localidadCentroSur);
        else if(valor === '5')
            elemento(localidadCentroOccidente);
        else if(valor === '6')
            elemento(localidadOccidente);
        else if(valor === '7')
            elemento(localidadFaja);
        else if(valor === '8')
            elemento(localidadMetropolitana);

    }

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function actualizar(e) {
        e.preventDefault();

        try {
            if(Autorizacion.obtenerUsuario().rol === 'admin'){
                await Servidor.actualizarDatosServidor(id,datos);
                Notificacion('REGISTRO EXITOSO', 'success');
                navigate("/dashboard");
            }
        }
        catch (error) { 
            Notificacion(error.response.data.message, 'error');
        }
      }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
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
                    <Select campo='Localidad' name='localidad' required={true} byId={false} propiedad={general.localidad} opciones={localidadOrienteSur} manejador={setValores} />
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
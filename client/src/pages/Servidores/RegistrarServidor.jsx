
import { useNavigate } from 'react-router-dom';
import { Button, Container, Input, Select, TextArea } from '../../components';
import { useEffect, useState } from 'react';
import { Notificacion } from '../../utils/Notificacion';
import Opciones from '../../utils/Opciones';
import { obtenerUsuario, rutaServidor, rutaUsuario } from '../../utils/APIRoutes';
import axios from 'axios';
import authHeader from '../../utils/header';

function RegistrarServidor() {

    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }

    // ---------- ESTADOS ----------
    const [datos, setDatos] = useState({
        usuario_registro: obtenerUsuario().indicador,
    });

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

    useEffect(() => {
        establecerDatos();
    }, []);

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

    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
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
    async function createData(e) {
        e.preventDefault();

        try {
            if(obtenerUsuario().rol !== 'user'){

                const id = await axios.post(`${rutaServidor}/`, datos, { headers: authHeader() }) 
                .then(response => { return response.data; });

                Notificacion('REGISTRO EXITOSO', 'success');
                navigate(`/servidor/${id}`);
            }
        }
        catch (error) { 
            Notificacion(error.response.data.message, 'error');
        }
    }
    
    return (
        <Container>
            <h1 className='font-bold text-lg'>Registro de Servidor</h1>

            <form className="flex flex-col justify-content items-center space-y-8 relative w-full md:w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmit={createData}>
                <div className='w-full'>
                    <TextArea campo='Nombre' name='servidor' required={true} editable={true} manejador={setValores} />
                </div>

                <div className="w-full relative grid grid-cols-1 md:grid-cols-2 space-x-4 mb-0">
                    <Select campo='Estatus' name='estatus' required={true} opciones={estatus ? estatus : ['SELECCIONE']} manejador={setValores}/>
                    <Input campo='Direccion' name='direccion' required={true} manejador={setValores} />
                    
                    <Select campo='Sistema' name='sistema' required={true} opciones={sistemas ? sistemas : ['SELECCIONE']} manejador={setValores} />
                    
                    <Select campo='Marca' name='marca' required={true} opciones={marcas ? marcas : ['SELECCIONE']} manejador={setValores} />
                    <Input campo='Modelo' name='modelo' required={true} editable={true} manejador={setValores} />
                    <Input campo='Serial' name='serial' editable={true} manejador={setValores} />
                    <Input campo='Velocidad CPU' name='velocidad' required={true} editable={true} manejador={setValores} />
                    <Input campo='Cantidad CPU' name='cantidad' required={true} editable={true} manejador={setValores} />
                    <Input campo='Memoria' name='memoria' required={true} editable={true} manejador={setValores} />

                    <Select campo='Region' name='region' required={true} byId={false} opciones={regiones ? regiones : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Localidad' name='localidad' required={true} byId={false} opciones={localidades ? localidades : ['SELECCIONE']} manejador={setValores} />
                </div>
                    
                <div className="flex space-x-2 md:space-x-12">
                    <Button tipo='button' color='blue' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                    <Button tipo='submit' color='blue' width={32}>Registrar</Button>
                </div>

            </form>

        </Container>
    )
};

export default RegistrarServidor;
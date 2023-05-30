
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Input, Select } from '../../components';
import { BiLoaderAlt } from "react-icons/bi";
import { Notificacion } from '../../utils/Notificacion';
import { useEffect, useState } from 'react';
import Opciones from '../../utils/Opciones';
import { obtenerUsuario, rutaCustodio, rutaUsuario } from '../../utils/APIRoutes';
import axios from 'axios';
import authHeader from '../../utils/header';
import swal from 'sweetalert';

function ActualizarCustodio() {

    const navigate = useNavigate();
    function navegar() { navigate(-1) } 

    const { id } = useParams();
    const [load, setLoad] = useState(true);
    const [datos, setDatos] = useState({
        usuario_actualizo: obtenerUsuario().indicador,
    });

    // VALORES POR DEFECTO EN LOS INPUTS
    const [general, setGeneral] = useState('');
    
    // =================== OPCIONES PARA LOS SELECTS ===================
    const [gerencias, setGerencias] = useState('');
    const [cargos, setCargos] = useState('');
    const [regiones, setRegiones] = useState('');
    const [localidades, setLocalidades] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setGerencias(await Opciones('gerencias'));
        setCargos(await Opciones('cargos'));
        setRegiones(await Opciones('regiones'));
    }

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async function obtenerLocalidades(region) {
        try { 
            const respuesta = await axios.post(`${rutaUsuario}/localidades`, {region}, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log(error.response.data.message);
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

    const setValores = async (e) => {
        const valor = e.target.value.toUpperCase();
        setDatos({ ...datos, [e.target.name] : valor });

        if(e.target.name === 'region'){
            setLocalidades(await OpcionesLocalidades(e.target.value));
        }
    }

    useEffect(() => {
        async function fetchData(){
            establecerDatos();
    
            // ========== DATOS POR DEFECTO ==========
            const {data} = await axios.get(`${rutaCustodio}/${id}`, { headers: authHeader() });
            setGeneral(data.general);
 
            setDatos({
                ...datos,
                nombre : data.general.cus_nombre,
                apellido : data.general.cus_apellido,
                telefono : data.general.telefono,
                cargo : data.general.cargo,
                gerencia : data.general.gerencia,
                region : data.general.region,
                localidad : data.general.localidad,
            });
            
            setLocalidades(await OpcionesLocalidades(data.general.region));
            setLoad(false);
        }
        fetchData();
    }, []);


    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function actualizar(e) {
        e.preventDefault();

        try {
          if(obtenerUsuario().rol !== 'user'){
            await axios.patch(`${rutaCustodio}/${id}`, datos, { headers: authHeader() });
            
            Notificacion('ACTUALIZACION EXITOSA', 'success');
            navigate(`/custodios/${id}`);
          }
        }
        catch (error) { 
            Notificacion(error.response.data.message, 'error');
        }
      }

    const eliminar = async (id) => {
        try {
            if(obtenerUsuario().rol !== 'user'){
                await axios.delete(`${rutaCustodio}/${id}`, { headers: authHeader() });

                Notificacion('CUSTODIO ELIMINADO EXITOSAMENTE', 'success');
                navegar(`/custodios/`);
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
                <h1 className='font-bold text-lg'>Actualización de Responsable</h1>

                <form className="flex flex-col justify-content items-center space-y-8 relative w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmit={actualizar}>
                    <div className='w-full grid grid-cols-1'>
                        <Input campo='Nombre' name='nombre' required={true} propiedad={general.cus_nombre} manejador={setValores} />
                        <Input campo='Apellido' name='apellido' required={true} propiedad={general.cus_apellido} manejador={setValores} />
                        <Input campo='Telefono' name='telefono' required={true} propiedad={general.telefono} manejador={setValores} />
                        <Select campo='Cargo' name='cargo' required={true} byId={false} propiedad={general.cargo} opciones={cargos ? cargos : ['SELECCIONE']} manejador={setValores} />
                        <Select campo='Gerencia' name='gerencia' required={true} byId={false} propiedad={general.gerencia} opciones={gerencias ? gerencias : ['SELECCIONE']} manejador={setValores} />
                        <Select campo='Region' name='region' required={true} byId={false} propiedad={general.region} opciones={regiones ? regiones : ['SELECCIONE']} manejador={setValores} />
                        <Select campo='Localidad' name='localidad' required={true} byId={false} propiedad={general.localidad} opciones={localidades ? localidades : ['SELECCIONE']} manejador={setValores} />
                    </div>  

                    <div className="flex space-x-2 md:space-x-12">
                        <Button tipo='button' color='blue' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                        <Button tipo='submit' color='blue' width={32}>Actualizar</Button>
                        {obtenerUsuario().rol === 'admin' ? (
                                <Button tipo='button' color='red' width={32} manejador={(e) => {
                                swal({
                                    text: `¿Esta seguro de Eliminar el custodio ${general.cus_indicador}?`,
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

export default ActualizarCustodio;
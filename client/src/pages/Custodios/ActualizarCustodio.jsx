
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Checkbox, Container, Input, Select } from '../../components';
import { BiLoaderAlt } from "react-icons/bi";
import Autorizacion from '../../services/auth.service';
import Custodio from '../../services/custodios.service';
import { Notificacion } from '../../utils/Notificacion';
import { useEffect, useState } from 'react';
import { localidadCentro, localidadCentroOccidente, localidadCentroSur, localidadFaja, localidadMetropolitana, localidadOccidente, localidadOrienteNorte, localidadOrienteSur, opcionLocalidad } from '../../services/campos.service';
import Opciones from '../../utils/Opciones';

function ActualizarCustodio() {

    const navigate = useNavigate();
    function navegar() { navigate(-1) } 

    const { id } = useParams();
    const [load, setLoad] = useState(true);
    const [datos, setDatos] = useState({
        creador: Autorizacion.obtenerUsuario().indicador,
    });

    // VALORES POR DEFECTO EN LOS INPUTS
    const [general, setGeneral] = useState('');
    
    // =================== OPCIONES PARA LOS SELECTS ===================
    // OPCIONES DE SELECT ANIDADOS
    const [opcion1, setOpcion1] = useState(opcionLocalidad);
    const [gerencias, setGerencias] = useState('');
    const [cargos, setCargos] = useState('');
    const [regiones, setRegiones] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setGerencias(await Opciones('gerencias'));
        setCargos(await Opciones('cargos'));
        setRegiones(await Opciones('regiones'));
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

    const setValores = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        if(e.target.name === 'region')
            cambioLocalidad(e.target.value, setOpcion1);
    }

    useEffect(() => {
        async function fetchData(){
            establecerDatos();
    
            // ========== DATOS POR DEFECTO ==========
            const gen = await Custodio.obtenerGeneral(id);
            setGeneral(gen.data[0]);
 
            setDatos({
                ...datos,
                nombre : gen.data[0].cus_nombre,
                apellido : gen.data[0].cus_apellido,
                telefono : gen.data[0].telefono,
                cargo : gen.data[0].cargo,
                gerencia : gen.data[0].gerencia,
                region : gen.data[0].region,
                localidad : gen.data[0].localidad,
            });

            setLoad(false);
        }
        fetchData();
    }, []);


    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function actualizar(e) {
        e.preventDefault();

        try {
          if(Autorizacion.obtenerUsuario().rol === 'admin'){
            await Custodio.actualizarDatosCustodio(id,datos);
            Notificacion('ACTUALIZACION EXITOSA', 'success');
            navigate("/dashboard");
          }
        }
        catch (error) { 
            console.log('ERROR AL ACTUALIZAR APL_ACT'); 
        }
      }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    if(load)
        <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
    else{
        return (
            <Container>
                <h1 className='font-bold text-lg'>Actualizar de Responsable</h1>

                <form className="flex flex-col justify-content items-center space-y-8 relative w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmit={actualizar}>
                    <div className='w-full grid grid-cols-1'>
                        <Input campo='Nombre' name='nombre' required={true} propiedad={general.cus_nombre} manejador={setValores} />
                        <Input campo='Apellido' name='apellido' required={true} propiedad={general.cus_apellido} manejador={setValores} />
                        <Input campo='Telefono' name='telefono' required={true} propiedad={general.telefono} manejador={setValores} />
                        <Select campo='Cargo' name='cargo' required={true} byId={false} propiedad={general.cargo} opciones={cargos ? cargos : ['SELECCIONE']} manejador={setValores} />
                        <Select campo='Gerencia' name='gerencia' required={true} byId={false} propiedad={general.gerencia} opciones={gerencias ? gerencias : ['SELECCIONE']} manejador={setValores} />
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

export default ActualizarCustodio;

import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Container, Input, Select } from '../../components';
import Autorizacion from '../../services/auth.service';
import Custodio from '../../services/custodios.service';
import { useEffect, useState } from 'react';
import { Notificacion } from '../../utils/Notificacion';
import { localidadCentro, localidadCentroOccidente, localidadCentroSur, 
    localidadFaja, localidadMetropolitana, localidadOccidente, localidadOrienteNorte, 
    localidadOrienteSur, opcionLocalidad } from '../../services/campos.service';
import Opciones from '../../utils/Opciones';

function RegistrarCustodio() {

    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }

    // ---------- ESTADOS ----------
    const [datos, setDatos] = useState({
        usuario_registro: Autorizacion.obtenerUsuario().indicador,
        usuario_actualizo: Autorizacion.obtenerUsuario().indicador,
    });

    // =================== OPCIONES PARA LOS SELECTS ===================
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

    useEffect(() => {
        establecerDatos();
    }, []);

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
    
    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        if(e.target.name === 'region')
            cambioLocalidad(e.target.value, setOpcion1);
    }

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function registrar(e) {
        e.preventDefault();
        try {
            if(Autorizacion.obtenerUsuario().rol === 'admin'){
                await Custodio.registrarCustodio(datos);
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
    
    return (
        <Container>
            <h1 className='font-bold text-lg'>Registro de Responsable</h1>

            <form className="flex flex-col justify-content items-center space-y-8 relative w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmit={registrar}>
                <div className='w-full grid grid-cols-1'>
                    <Input campo='Nombre' name='nombre' required={true} manejador={setValores} />
                    <Input campo='Apellido' name='apellido' required={true} manejador={setValores} />
                    <Input campo='Indicador' name='indicador' required={true} manejador={setValores} />
                    <Input campo='Cedula' name='cedula' required={true} manejador={setValores} />
                    <Input campo='Telefono' name='telefono' required={true} manejador={setValores} />
                    <Select campo='Cargo' name='cargo' required={true} opciones={cargos ? cargos : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Gerencia' name='gerencia' required={true} opciones={gerencias ? gerencias : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Region' name='region' required={true} opciones={regiones ? regiones : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Localidad' name='localidad' required={true} opciones={opcion1} manejador={setValores} />
                </div>

                <div className="flex space-x-2 md:space-x-12">
                    <Button tipo='button' color='blue' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                    <Button tipo='submit' color='blue' width={32}>Registrar</Button>
                </div>
                
            </form>

            

        </Container>
    )
};

export default RegistrarCustodio;

import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Container, Input, Radio, Select } from '../../components';
import Autorizacion from '../../services/auth.service';
import Aplicacion from '../../services/aplicacion.service';
import { useEffect, useState } from 'react';
import { Notificacion } from '../../utils/Notificacion';
import { localidadCentro, localidadCentroOccidente, localidadCentroSur, 
    localidadFaja, localidadMetropolitana, localidadOccidente, localidadOrienteNorte, 
    localidadOrienteSur, opcionLocalidad } from '../../services/campos.service';
import Opciones from '../../utils/Opciones';

function RegistrarRespon() {

    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }

    const [datos, setDatos] = useState({
        usuario_registro: Autorizacion.obtenerUsuario().indicador,
        usuario_actualizo: Autorizacion.obtenerUsuario().indicador,
    });

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
    

    const setValores = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        if(e.target.name === 'region')
            cambioLocalidad(e.target.value, setOpcion1);

        console.log(datos);
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
        // else if (valor === 'TODAS')
        //     elemento(opcionLocalidad);

    }

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function registrar(e) {
        e.preventDefault();
        console.log(datos);
        try {
          if(Autorizacion.obtenerUsuario().rol === 'admin'){
            
            await Aplicacion.registrarResponsable(datos);
            Notificacion('REGISTRO EXITOSO', 'success');
            //navigate("/dashboard");
          }
        }
        catch (error) { 
            console.log('ERROR AL ACTUALIZAR APL_ACT'); 
            Notificacion(error.response.data.message, 'error');
        }
      }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    return (
        <Container>
            <h1 className='font-bold text-lg'>Registro de Responsable</h1>

            <form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" onSubmit={registrar}>
                <div className='grid grid-cols-1'>
                    <Input campo='Nombre' name='nombre' manejador={setValores} />
                    <Input campo='Apellido' name='apellido' manejador={setValores} />
                    <Input campo='Indicador' name='indicador' manejador={setValores} />
                    <Input campo='Cedula' name='cedula' manejador={setValores} />
                    <Input campo='Telefono' name='telefono' manejador={setValores} />
                    <Select campo='Cargo' name='cargo' opciones={cargos ? cargos : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Gerencia' name='gerencia' opciones={gerencias ? gerencias : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Region' name='region' opciones={regiones ? regiones : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Localidad' name='localidad' opciones={opcion1} manejador={setValores} />
                </div>

                <div className="absolute bottom-4 right-1/3">
                    <Button tipo='submit' color='blue' width={32}>Registrar</Button>
                </div>
                <div className="absolute bottom-4 left-1/3">
                    <Button tipo='button' color='blue' width={32} manejador={(e) => navegar(-1)} >Cancelar</Button>
                </div>
                
            </form>

            

        </Container>
    )
};

export default RegistrarRespon;

import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Container, Input, Select, TextArea } from '../../components';
import Autorizacion from '../../services/auth.service';
import Servidor from '../../services/servidor.service';
import Usuario from '../../services/usuario.service';
import { useEffect, useState } from 'react';
import { Notificacion } from '../../utils/Notificacion';
import { localidadCentro, localidadCentroOccidente, localidadCentroSur, 
    localidadFaja, localidadMetropolitana, localidadOccidente, localidadOrienteNorte, 
    localidadOrienteSur, opcionLocalidad } from '../../services/campos.service';
import Opciones from '../../utils/Opciones';

function RegistrarServidor() {

    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }

    const [datos, setDatos] = useState({
        usuario_registro: Autorizacion.obtenerUsuario().indicador,
        usuario_actualizo: Autorizacion.obtenerUsuario().indicador,

    });

    const [marcas, setMarcas] = useState('');
    const [sistemas, setSistemas] = useState('');
    const [estatus, setEstatus] = useState('');
    const [regiones, setRegiones] = useState('');

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setMarcas(await Opciones('marcas'));
        setEstatus(await Opciones('estatus'));
        setSistemas(await Opciones('sistemas'));
        setRegiones(await Opciones('regiones'));
    }

    useEffect(() => {
        establecerDatos();
    }, []);

    // OPCIONES DE SELECT ANIDADOS
    const [opcion1, setOpcion1] = useState(opcionLocalidad);
    

    const handleInputChange = (e) => {
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
    async function createData(e) {
        e.preventDefault();

        try {
            if(Autorizacion.obtenerUsuario().rol === 'admin'){
            
            await Servidor.crearDatosServidor(datos);
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
            <h1 className='font-bold text-lg'>Registro de Servidor</h1>

            <form className="flex flex-col justify-content items-center space-y-8 relative w-full md:w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmit={createData}>
                <h2 className='font-bold text-base mb-6'>Informacion General</h2>

                <div className='w-full'>
                    <TextArea campo='Nombre' name='servidor' required={true} editable={true} manejador={handleInputChange} />
                </div>

                <div className="w-full relative grid grid-cols-1 md:grid-cols-2 space-x-4 mb-0">
                    <Select campo='Estatus' name='estatus' required={true} opciones={estatus ? estatus : ['SELECCIONE']} manejador={handleInputChange}/>
                    <Input campo='Direccion' name='direccion' required={true} manejador={handleInputChange} />
                    
                    <Select campo='Sistema' name='sistema' required={true} opciones={sistemas ? sistemas : ['SELECCIONE']} manejador={handleInputChange} />
                    <Input campo='Version' name='version' editable={true} manejador={handleInputChange} />
                    
                    <Select campo='Marca' name='marca' required={true} opciones={marcas ? marcas : ['SELECCIONE']} manejador={handleInputChange} />
                    <Input campo='Modelo' name='modelo' required={true} editable={true} manejador={handleInputChange} />
                    <Input campo='Serial' name='serial' editable={true} manejador={handleInputChange} />
                    <Input campo='Velocidad CPU' name='velocidad' required={true} editable={true} manejador={handleInputChange} />
                    <Input campo='Cantidad CPU' name='cantidad' required={true} editable={true} manejador={handleInputChange} />
                    <Input campo='Memoria' name='memoria' required={true} editable={true} manejador={handleInputChange} />

                    <Select campo='Region' name='region' required={true} opciones={regiones ? regiones : ['SELECCIONE']} manejador={handleInputChange} />
                    <Select campo='Localidad' name='localidad' required={true} opciones={opcion1} manejador={handleInputChange} />
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
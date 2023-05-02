
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

function RegistrarServidor() {

    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }

    const [datos, setDatos] = useState({
        servidor: '',
        estatus: '',
        direccion: '',
        sistema: '',
        version: '',
        modelo: '',
        marca: '',
        serial: '',
        memoria: '',
        velocidad: '',
        cantidad: '',
        region: '',
        localidad: '',
        usuario_registro: Autorizacion.obtenerUsuario().indicador,
        usuario_actualizo: Autorizacion.obtenerUsuario().indicador,

    });

    const [opcionMarcas, setOpcionMarcas] = useState('');
    const [opcionSistemas, setOpcionSistemas] = useState('');
    const [opcionEstatus, setOpcionEstatus] = useState('');
    const [opcionRegiones, setOpcionRegiones] = useState('');

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
        getData('estatus',setOpcionEstatus);
        getData('sistemas',setOpcionSistemas);
        getData('marcas',setOpcionMarcas);
        getData('regiones',setOpcionRegiones);
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

    }

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function createData(e) {
        e.preventDefault();

        try {
          if(Autorizacion.obtenerUsuario().rol === 'admin'){
            
            await Servidor.crearDatosServidor(datos);
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
            <h1 className='font-bold text-lg'>Registro de Servidor</h1>

            <form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" onSubmit={createData}>
                <h2 className='font-bold text-base mb-6'>Informacion General</h2>

                <TextArea campo='Nombre' name='servidor' required={true} editable={true} manejador={handleInputChange} />

                <div className="relative grid grid-cols-2 gap-4 mb-0">
                    <Select campo='Estatus' name='estatus' required={true} opciones={opcionEstatus ? opcionEstatus : ['SELECCIONE']} manejador={handleInputChange}/>
                    <Input campo='Direccion' name='direccion' required={true} manejador={handleInputChange} />
                    
                    <Select campo='Sistema' name='sistema' required={true} opciones={opcionSistemas ? opcionSistemas : ['SELECCIONE']} manejador={handleInputChange} />
                    <Input campo='Version' name='version' editable={true} manejador={handleInputChange} />
                    
                    <Select campo='Marca' name='marca' required={true} opciones={opcionMarcas ? opcionMarcas : ['SELECCIONE']} manejador={handleInputChange} />
                    <Input campo='Modelo' name='modelo' required={true} editable={true} manejador={handleInputChange} />
                    <Input campo='Serial' name='serial' editable={true} manejador={handleInputChange} />
                    <Input campo='Velocidad CPU' name='velocidad' required={true} editable={true} manejador={handleInputChange} />
                    <Input campo='Cantidad CPU' name='cantidad' required={true} editable={true} manejador={handleInputChange} />
                    <Input campo='Memoria' name='memoria' required={true} editable={true} manejador={handleInputChange} />

                    <Select campo='Region' name='region' required={true} opciones={opcionRegiones ? opcionRegiones : ['SELECCIONE']} manejador={handleInputChange} />
                    <Select campo='Localidad' name='localidad' required={true} opciones={opcion1} manejador={handleInputChange} />
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

export default RegistrarServidor;
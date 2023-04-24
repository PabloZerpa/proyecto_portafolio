
import { useEffect, useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Button, Container, Input, Radio, Select, TextArea, Checkbox } from '../../components';
import { opcionLocalidad, frameworkPhp, frameworkJS, frameworkJAVA,frameworkCPP, frameworkCS, frameworkPY, 
    localidadCentro, localidadCentroOccidente, localidadCentroSur, localidadFaja, localidadMetropolitana, 
    localidadOccidente, localidadOrienteNorte, localidadOrienteSur } from '../../services/campos.service';
import Autorizacion from '../../services/auth.service';
import Aplicacion from '../../services/aplicacion.service';
import Usuario from '../../services/usuario.service';
import { Notificacion } from '../../utils/Notificacion';


function RegistrarApp() {

    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }
    
    const [datos, setDatos] = useState({
        apl_acronimo: '',
        apl_estatus: '',
        apl_nombre: '',
        apl_descripcion: '',
        apl_prioridad: '',
        apl_version: '',
        apl_critico: '',
        apl_alcance: '',
        apl_codigo_fuente: '',
        apl_direccion: '',
        apl_region: '',
        apl_usuario_registro: Autorizacion.obtenerUsuario().indicador,
        apl_usuario_actualizo: Autorizacion.obtenerUsuario().indicador,
        
        select_funcional: '',
        funcional_nombre: '',
        funcional_apellido: '',
        funcional_indicador: '',
        funcional_telefono: '',
        funcional_cedula: '',
        funcional_gerencia: '',
        funcional_cargo: '',
        funcional_region: '',
        funcional_localidad: '',

        select_tecnico: '',
        tecnico_nombre: '',
        tecnico_apellido: '',
        tecnico_indicador: '',
        tecnico_telefono: '',
        tecnico_cedula: '',
        tecnico_gerencia: '',
        tecnico_cargo: '',
        tecnico_region: '',
        tecnico_localidad: '',
    
        plataforma: '',
        lenguaje1: '',
        lenguaje2: '',
        lenguaje3: '',
        version1: '',
        version2: '',
        version3: '',
        framework1: '',
        framework2: '',
        framework3: '',

        select_base: '',
        select_servidor: '',
    });

    const [opcionResponsables, setOpcionResponsables] = useState('');
    const [opcionGerencias, setOpcionGerencias] = useState('');
    const [opcionCargos, setOpcionCargos] = useState('');
    const [opcionEstatus, setOpcionEstatus] = useState('');
    const [opcionAlcance, setOpcionAlcance] = useState('');
    const [opcionPlataformas, setOpcionPlataformas] = useState('');
    const [opcionLenguajes, setOpcionLenguajes] = useState('');
    const [opcionFrameworks, setOpcionFrameworks] = useState('');
    const [opcionBaseDatos, setOpcionBaseDatos] = useState('');
    const [opcionServidores, setOpcionServidores] = useState('');
    const [opcionMante, setOpcionMante] = useState('');
    const [opcionRegion, setOpcionRegion] = useState('');

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
        getData('gerencias',setOpcionGerencias);
        getData('cargos',setOpcionCargos);
        getData('responsables',setOpcionResponsables);
        getData('plataformas',setOpcionPlataformas);
        getData('lenguajes',setOpcionLenguajes);
        getData('frameworks',setOpcionFrameworks);
        getData('servidores',setOpcionServidores);
        getData('basesdatos',setOpcionBaseDatos);
        getData('estatus',setOpcionEstatus);
        getData('alcance',setOpcionAlcance);
        getData('mantenimientos',setOpcionMante);
        getData('regiones',setOpcionRegion);
    }, []);

    // OPCIONES DE SELECT ANIDADOS
    const [opcion1, setOpcion1] = useState(opcionLocalidad);
    const [opcion2, setOpcion2] = useState(opcionLocalidad);
    const [opcion3, setOpcion3] = useState(opcionLocalidad);
    const [opcion4, setOpcion4] = useState(opcionLocalidad);
    const [opcion5, setOpcion5] = useState(opcionLocalidad);

    // VARIABLES PARA ACTIVAR/DESACTIVAR
    const [registrarFuncional, setRegistrarFuncional] = useState(false);
    const [registrarTecnico, setRegistrarTecnico] = useState(false);

    const habilitarFuncional = () => {
        setRegistrarFuncional(!registrarFuncional)
        if(!registrarFuncional){
            setDatos({ ...datos, select_funcional : null })
        }
    }

    const habilitarTecnico = () => {
        setRegistrarTecnico(!registrarTecnico)
        if(!registrarTecnico){
            setDatos({ ...datos, select_tecnico : null })
        }
    }


    // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
    const handleInputChange = (e) => {
        console.log(e.target.value);

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        if(e.target.name === 'funcional_region')
            cambioLocalidad(e.target.value, setOpcion1);
        else if(e.target.name === 'tecnico_region')
            cambioLocalidad(e.target.value, setOpcion2);
        else if(e.target.name === 'lenguaje1')
            cambioFramework(e.target.value, setOpcion3);
        else if(e.target.name === 'lenguaje2')
            cambioFramework(e.target.value, setOpcion4);
        else if(e.target.name === 'lenguaje3')
            cambioFramework(e.target.value, setOpcion5);

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

    function cambioFramework(valor, elemento){

        if(valor === '1')
            elemento(frameworkPhp);
        else if(valor === '2')
            elemento(frameworkJS);
        else if(valor === '3')
            elemento(frameworkJAVA);
        else if(valor === '4')
            elemento(frameworkCPP);
        else if(valor === '5')
            elemento(frameworkCS);
        else if(valor === '8')
            elemento(frameworkPY);

    }

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function createData(e) {
        e.preventDefault();

        if(Autorizacion.obtenerUsuario().rol === 'admin'){
            try {
                await Aplicacion.crearDatos(datos);
                Notificacion('REGISTRO EXITOSO', 'success');
                //navigate("/dashboard");
            }
            catch (error) { 
                console.log('ERROR AL ACTUALIZAR APL_ACT');
                Notificacion(error.response.data.message, 'error');
            }
        }
    }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    return (
        <Container>

            <h1 className='font-bold text-lg'>Registro de Aplicacion</h1>

            <form className="flex flex-col justify-center items-center relative w-full p-4 pb-24 mb-10" onSubmitCapture={createData} >
                
                {/* --------------- INFORMACION BASICA --------------- */}
                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    <h2 className='font-bold text-base mb-6'>Informacion General</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input campo='Acronimo' name='apl_acronimo' required={true} manejador={handleInputChange} />
                        <Select campo='Estatus' name='apl_estatus' required={true} opciones={opcionEstatus ? opcionEstatus : ['SELECCIONE']} manejador={handleInputChange}/>
                    </div>

                    <TextArea campo='Nombre' name='apl_nombre' required={true} manejador={handleInputChange} />
                    <TextArea campo='Descripcion' required={true} name='apl_descripcion' manejador={handleInputChange} />

                    <div className="relative grid grid-cols-2 gap-4 mb-0">
                        <Input campo='Version' name='apl_version' required={true} manejador={handleInputChange} />
                        <Select campo='Prioridad' name='apl_prioridad' opciones={['SELECCIONE','BAJA','MEDIA','ALTA',]} manejador={handleInputChange} />
                        <Select campo='Alcance' name='apl_alcance' opciones={opcionAlcance ? opcionAlcance : ['SELECCIONE']} manejador={handleInputChange} />
                        <Input campo='Direccion' name='apl_direccion' manejador={handleInputChange} />
                        <Input campo='N° Usuarios' name='apl_cantidad_usuarios' manejador={handleInputChange} />
                        <Select campo='Region' name='apl_region' opciones={opcionRegion ? opcionRegion : ['SELECCIONE']} manejador={handleInputChange} />
                        <Radio label='Critico' name='apl_critico' opciones={['SI','NO']} manejador={handleInputChange} />
                        <Radio label='Codigo Fuente' name='apl_codigo_fuente' opciones={['SI', 'NO']} manejador={handleInputChange} />
                    </div>
                </div>

                
                {/* --------------- TECNOLOGIAS --------------- */}
                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    <h2 className='font-bold text-base my-4'>Tecnologia</h2>
                    <div className="grid grid-cols-2 gap-4">

                        <Select campo='Plataforma' name='plataforma' opciones={opcionPlataformas ? opcionPlataformas : ['SELECCIONE']} manejador={handleInputChange} />

                        <div className='flex gap-2'>
                            <Select campo='Lenguaje' name={`lenguaje1`} opciones={opcionLenguajes ? opcionLenguajes : ['SELECCIONE']} manejador={handleInputChange} />
                            <Input campo='Version Lenguaje' name='version1' manejador={handleInputChange} />
                            <Select campo='Framework' name={`framework1`} opciones={opcion3} manejador={handleInputChange} />
                        </div>
                        
                        <div className='flex gap-2'>
                            <Select campo='Lenguaje' name={`lenguaje2`} opciones={opcionLenguajes ? opcionLenguajes : ['SELECCIONE']} manejador={handleInputChange} />
                            <Input campo='Version Lenguaje' name='version2' manejador={handleInputChange} />
                            <Select campo='Framework' name={`framework2`} opciones={opcion4} manejador={handleInputChange} />
                        </div>

                        <div className='flex gap-2'>
                            <Select campo='Lenguaje' name={`lenguaje3`} opciones={opcionLenguajes ? opcionLenguajes : ['SELECCIONE']} manejador={handleInputChange} />
                            <Input campo='Version Lenguaje' name='version3' manejador={handleInputChange} />
                            <Select campo='Framework' name={`framework3`} opciones={opcion5} manejador={handleInputChange} />
                        </div>

                    </div>

                    {/* --------------- BASE DE DATOS --------------- */}
                    <p className='font-bold text-base my-4'>Base de datos</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Select campo='Seleccione Base de datos' name='select_base' byId={false} opciones={opcionBaseDatos ? opcionBaseDatos : ['SELECCIONE']} manejador={handleInputChange}/>
                        <div className='mt-6'>
                            <Button width={32}><Link to={`/administracion/registro/basedatos`} target="_blank">Registrar Nueva</Link></Button>
                        </div>
                    </div>

                    {/* --------------- SERVIDOR --------------- */}
                    <p className='font-bold text-base my-4'>Servidor</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Select campo='Seleccione Servidor' name='select_servidor' byId={false} opciones={opcionServidores ? opcionServidores : ['SELECCIONE']} manejador={handleInputChange}/>
                        
                        <div className='mt-6'>
                            <Button width={32}><Link to={`/administracion/registro/servidor`} target="_blank">Registrar Nuevo</Link></Button>
                        </div>
                    </div>
                </div>

                
                {/* --------------- RESPONSABLES --------------- */} 
                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    
                    <div className="grid grid-cols-2 gap-4">
                        <p className='font-bold text-base my-4'>Responsable Funcional</p>
                        <p className='font-bold text-base my-4'>Responsable Tecnico</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div style={registrarFuncional ? {display: 'none'} : {display: 'block'}}>
                                <Select campo='Seleccione Custodio' name='select_funcional' byId={false} opciones={opcionResponsables ? opcionResponsables : ['SELECCIONE']} manejador={handleInputChange}/>
                            </div>
                            <Checkbox id='registrar_funcional' name='registrar_funcional' opciones={['Registrar nuevo']} manejador={habilitarFuncional} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div style={registrarTecnico ? {display: 'none'} : {display: 'block'}}>
                                <Select campo='Seleccione Custodio' name='select_tecnico' byId={false} opciones={opcionResponsables ? opcionResponsables : ['SELECCIONE']} manejador={handleInputChange}/>
                            </div>
                            <Checkbox id='registrar_funcional' name='registrar_funcional' opciones={['Registrar nuevo']} manejador={habilitarTecnico} />
                        </div>
                        
                        {registrarFuncional ? (
                            <div style={registrarFuncional ? {display: 'grid'} : {display: 'none'}} className='grid grid-cols-1'>
                                <Input campo='Nombre' name='funcional_nombre' manejador={handleInputChange} />
                                <Input campo='Apellido' name='funcional_apellido' manejador={handleInputChange} />
                                <Input campo='Indicador' name='funcional_indicador' manejador={handleInputChange} />
                                <Input campo='Cedula' name='funcional_cedula' manejador={handleInputChange} />
                                <Input campo='Telefono' name='funcional_telefono' manejador={handleInputChange} />
                                <Select campo='Cargo' name='funcional_cargo' opciones={opcionCargos ? opcionCargos : ['SELECCIONE']} manejador={handleInputChange} />
                                <Select campo='Gerencia' name='funcional_gerencia' opciones={opcionGerencias ? opcionGerencias : ['SELECCIONE']} manejador={handleInputChange} />
                                <Select campo='Region' name='funcional_region' opciones={opcionRegion ? opcionRegion : ['SELECCIONE']} manejador={handleInputChange} />
                                <Select campo='Localidad' name='funcional_localidad' opciones={opcion1} manejador={handleInputChange} />
                            </div>
                        ) : 
                        (<div></div>)}
                        
                        {registrarTecnico ? (
                            <div className='relative grid grid-cols-1'>
                                <div className='absolute -left-2.5 top-0 w-1 h-full border-2 border-dashed border-gray-500'></div>
                                <Input campo='Nombre' name='tecnico_nombre' manejador={handleInputChange} />
                                <Input campo='Apellido' name='tecnico_apellido' manejador={handleInputChange} />
                                <Input campo='Indicador' name='tecnico_indicador' manejador={handleInputChange} />
                                <Input campo='Cedula' name='tecnico_cedula' manejador={handleInputChange} />
                                <Input campo='Telefono' name='tecnico_telefono' manejador={handleInputChange} />
                                <Select campo='Cargo' name='tecnico_cargo' opciones={opcionCargos ? opcionCargos : ['SELECCIONE']} manejador={handleInputChange} />
                                <Select campo='Gerencia' name='tecnico_gerencia' opciones={opcionGerencias ? opcionGerencias : ['SELECCIONE']} manejador={handleInputChange} />
                                <Select campo='Region' name='tecnico_region' opciones={opcionRegion ? opcionRegion : ['SELECCIONE']} manejador={handleInputChange} />
                                <Select campo='Localidad' name='tecnico_localidad' opciones={opcion2} manejador={handleInputChange} />
                            </div>
                        ) : 
                        (<div></div>)}
                        
                    </div>
                </div>


                <div className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" >
                    {/* --------------- DOCUMENTACION --------------- */}
                    <p className='font-bold text-base my-4'>Documentacion</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Input campo='Descripcion' name='doc_descripcion' required={true} manejador={handleInputChange} />
                        <Input campo='Direccion' name='doc_direccion' required={true} manejador={handleInputChange} />
                        <Input campo='Tipo de Doc' name='doc_tipo' required={true} manejador={handleInputChange} />
                    </div>

                    {/* --------------- MANTENIMIENTO --------------- */}
                    <p className='font-bold text-base my-4'>Mantenimiento</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Select campo='Frecuencia' name='man_frecuencia' byId={false} opciones={opcionMante ? opcionMante : ['SELECCIONE']} manejador={handleInputChange}/>
                        <Input campo='Horas Pro' name='man_horas_prom' required={true} manejador={handleInputChange} />
                        <Input campo='Horas Anu' name='man_horas_anuales' required={true} manejador={handleInputChange} />
                    </div>
                </div>

                <div className="absolute bottom-16 right-1/3">
                    <Button width={32}>Registrar</Button>
                </div>
                <div className="absolute bottom-16 left-1/3">
                    <Button tipo='button' color='red' width={32} accion={(e) => navegar(-1)} >Cancelar</Button>
                </div>

            </form>

        </Container>
    )
};

export default RegistrarApp;
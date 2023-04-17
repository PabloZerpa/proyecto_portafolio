
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Container, Input, Notificacion, Select } from '../../components';
import { campos, opcionEstatus, opcionRegion, opcionPlataforma, opcionAlcance, opcionMantenimiento,
        opcionLocalidad, opcionGerencia, opcionLenguaje, frameworkPhp, frameworkJS, frameworkJAVA, 
        frameworkCPP, frameworkCS, frameworkPY ,opcionBasedatos, opcionServidor, localidadCentro, 
        localidadCentroOccidente, localidadCentroSur, localidadFaja, localidadMetropolitana, 
        localidadOccidente, localidadOrienteNorte, localidadOrienteSur } from '../../services/campos.service';
import Autorizacion from '../../services/auth.service';
import Usuarios from "../../services/user.service";
import Checkbox from '../../components/Checkbox';

function Registro() {

    const navigate = useNavigate();
    const [datos, setDatos] = useState(campos);

    // OPCIONES DE SELECT ANIDADOS
    const [opcion1, setOpcion1] = useState(opcionLocalidad);
    const [opcion2, setOpcion2] = useState(opcionLocalidad);
    const [opcion3, setOpcion3] = useState(opcionLocalidad);
    const [opcion4, setOpcion4] = useState(frameworkPhp);
    const [opcion5, setOpcion5] = useState(frameworkPhp);
    const [opcion6, setOpcion6] = useState(frameworkPhp);

    // OPCIONES BUSCADAS DE LA BASE DE DATOS
    const [opcionResponsable, setResponsable] = useState([]);

    // VARIABLES PARA ACTIVAR/DESACTIVAR
    const [registrarBase, setRegistrarBase] = useState(false);
    const [registrarServidor, setRegistrarServidor] = useState(false);
    const [masLenguajes, setMasLenguajes] = useState(false);

    const habilitarBase = () => {
        setRegistrarBase(!registrarBase)
        if(!registrarBase){
            setDatos({ ...datos, select_base : null })
            console.log(datos.select_base);
        }
    }

    const habilitarServidor = () => {
        setRegistrarServidor(!registrarServidor)
        if(!registrarServidor){
            setDatos({ ...datos, select_servidor : null })
            console.log(datos.select_servidor);
        }
    }
    
    const habilitarMasLenguajes = () => {
        setMasLenguajes(!masLenguajes)
        if(!masLenguajes){
            setDatos({ ...datos, lenguaje2 : null })
            setDatos({ ...datos, lenguaje3 : null })
            setDatos({ ...datos, framework2 : null })
            setDatos({ ...datos, framework3 : null })
            console.log(datos.lenguaje2);
            console.log(datos.framework3);
        }
    }

    const [show, setShow] = useState(false);
    const [opcion, setOpcion] = useState('error');
    const [mensaje, setMensaje] = useState('error');

    useEffect(() => {
        if(show)
            setTimeout(() => { setShow(!show) }, "2000");
    }, [show]);

    // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        if(e.target.name === 'funcional_region')
            cambioDeOpcion(e.target.value, setOpcion1);
        else if(e.target.name === 'tecnico_region')
            cambioDeOpcion(e.target.value, setOpcion2);
        else if(e.target.name === 'ser_region')
            cambioDeOpcion(e.target.value, setOpcion3);
        else if(e.target.name === 'lenguaje')
            cambioDeOpcion(e.target.value, setOpcion4);
        else if(e.target.name === 'lenguaje2')
            cambioDeOpcion(e.target.value, setOpcion5);
        else if(e.target.name === 'lenguaje3')
            cambioDeOpcion(e.target.value, setOpcion6);

    }

    function cambioDeOpcion(valor, elemento){

        console.log(valor);

        if(valor === 'PHP')
            elemento(frameworkPhp);
        else if(valor === 'JAVASCRIPT')
            elemento(frameworkJS);
        else if(valor === 'JAVA')
            elemento(frameworkJAVA);
        else if(valor === 'C++')
            elemento(frameworkCPP);
        else if(valor === 'C#')
            elemento(frameworkCS);
        else if(valor === 'PYTHON')
            elemento(frameworkPY);

        if(valor === 'CENTRO')
            elemento(localidadCentro);
        else if(valor === 'CENTRO SUR')
            elemento(localidadCentroSur);
        else if(valor === 'CENTRO OCCIDENTE')
            elemento(localidadCentroOccidente);
        else if(valor === 'ORIENTE NORTE')
            elemento(localidadOrienteNorte);
        else if(valor === 'ORIENTE SUR')
            elemento(localidadOrienteSur);
        else if(valor === 'OCCIDENTE')
            elemento(localidadOccidente);
        else if(valor === 'FAJA')
            elemento(localidadFaja);
        else if(valor === 'METROPOLITANA')
            elemento(localidadMetropolitana);
        else if (valor === 'TODAS')
            elemento(opcionLocalidad);

    }

    function navegar() { navigate(-1) }

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function createData(e) {
        e.preventDefault();

        try {
          console.log('TRY DEL CREATE');
          if(Autorizacion.obtenerUsuario().rol === 'admin'){

            //console.log('DENTRO DEL TRY CREATE');
            //console.log(datos);
            
            await Autorizacion.crearDatos(datos);
            setOpcion('exito');
            setMensaje('Aplicacion registrada exitosamente');
            setShow(true);
            //navigate("/dashboard");
          }
        }
        catch (error) { 
            console.log('ERROR AL ACTUALIZAR APL_ACT'); 
            setMensaje(error.response.data.message);
            setOpcion('error');
            setShow(true);
        }
      }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    return (
        <Container>
            
            <div style={show ? {display: 'block'} : {display: 'none'}} className='fixed top-24' >
                <Notificacion opcion={opcion} titulo='REGISTRO' mensaje={mensaje} />
            </div>

            <h1 className='font-bold text-lg'>Registro de Aplicacion</h1>

            <form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" onSubmitCapture={createData} >
                
                <h2 className='font-bold text-base mb-6'>Informacion General</h2>
                <div className="grid grid-cols-2 gap-4">
                    {/* --------------- INFORMACION BASICA --------------- */}
                    <Input campo='Acronimo' name='apl_acronimo' editable={true} manejador={handleInputChange} />
                    <Select campo='Estatus' name='apl_estatus' opciones={opcionEstatus} manejador={handleInputChange}/>
                </div>

                <Input campo='Nombre' name='apl_nombre' editable={true} area={true} manejador={handleInputChange} />
                <Input campo='Descripcion' name='apl_descripcion' editable={true} area={true} manejador={handleInputChange} />

                <div className="relative grid grid-cols-2 gap-4 mb-0">
                    <Input campo='Version' name='apl_version' editable={true} manejador={handleInputChange} />
                    <Select campo='Prioridad' name='apl_prioridad' opciones={['SELECCIONE','ALTA','MEDIA','BAJA',]} manejador={handleInputChange} />
                    <Select campo='Critico' name='apl_critico' opciones={['SELECCIONE','SI','NO']} manejador={handleInputChange} />
                    <Select campo='Alcance' name='apl_alcance' opciones={opcionAlcance} manejador={handleInputChange} />
                    <Input campo='Direccion' name='apl_direccion' editable={true} manejador={handleInputChange} />
                    <Input campo='N° Usuarios' name='apl_cantidad_usuarios' editable={true} manejador={handleInputChange} />
                    <Select campo='Region' name='apl_region' opciones={opcionRegion} manejador={handleInputChange} />
                    <div className='flex flex-col gap-2 text-xs font-medium text-gray-900 mb-6'>
                        <label>Fecha de Registro</label>
                        <input
                            type='date'
                            name='apl_fecha_registro'
                            className='w-full p-2 bg-gray-50 border-none text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500' 
                            placeholder='Fecha de Registro'
                            onChange={(e) => {handleInputChange(e)}}
                        />
                    </div>
                </div>

                <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
                {/* --------------- RESPONSABLES --------------- */} 
                <div className="grid grid-cols-2 gap-4">
                    <p className='font-bold text-base my-4'>Responsable Funcional</p>
                    <p className='font-bold text-base my-4'>Responsable Tecnico</p>

                    <div className='grid grid-cols-1'>
                        <Input campo='Nombre' name='funcional_nombre' editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='funcional_apellido' editable={true} manejador={handleInputChange} />
                        <Input campo='Indicador' name='funcional_indicador' editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='funcional_cedula' editable={true} manejador={handleInputChange} />
                        <Input campo='Telefono' name='funcional_telefono' editable={true} manejador={handleInputChange} />
                        <Select campo='Cargo' name='funcional_cargo' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='funcional_gerencia' opciones={opcionGerencia} manejador={handleInputChange} />
                        <Select campo='Region' name='funcional_region' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='funcional_localidad' opciones={opcion1} manejador={handleInputChange} />
                    </div>
                    
                    <div className='relative grid grid-cols-1'>
                        <div className='absolute -left-2.5 top-0 w-1 h-full border-2 border-dashed border-gray-500'></div>
                        <Input campo='Nombre' name='tecnico_nombre' editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='tecnico_apellido' editable={true} manejador={handleInputChange} />
                        <Input campo='Indicador' name='tecnico_indicador' editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='tecnico_cedula' editable={true} manejador={handleInputChange} />
                        <Input campo='Telefono' name='tecnico_telefono' editable={true} manejador={handleInputChange} />
                        <Select campo='Cargo' name='tecnico_cargo' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='tecnico_gerencia' opciones={opcionGerencia} manejador={handleInputChange} />
                        <Select campo='Region' name='tecnico_region' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='tecnico_localidad' opciones={opcion2} manejador={handleInputChange} />
                    </div>
                    
                </div>

                <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
                {/* --------------- TECNOLOGIAS --------------- */}
                <h2 className='font-bold text-base my-4'>Tecnologia</h2>
                <div className="grid grid-cols-2 gap-4">

                    <Select campo='Plataforma' name='plataforma' opciones={opcionPlataforma} manejador={handleInputChange} />
                    <Select campo='Codigo Fuente' name='apl_codigo_fuente' opciones={['SELECCIONE','SI','NO']} manejador={handleInputChange} />
                    
                    <div>
                        <Select campo='Lenguaje' name='lenguaje' opciones={opcionLenguaje} manejador={handleInputChange} />
                        <div style={masLenguajes ? {display: 'block'} : {display: 'none'}} >
                            <Select campo='Lenguaje 2' name='lenguaje2' opciones={opcionLenguaje} manejador={handleInputChange} />
                            <Select campo='Lenguaje 3' name='lenguaje3' opciones={opcionLenguaje} manejador={handleInputChange} />
                        </div>

                        <button type='button' className='flex justify-center w-8 h-8 bg-blue-600 text-white text-lg font-bold rounded cursor-pointer hover:blue-500' onClick={habilitarMasLenguajes} >
                            {masLenguajes ? '-' : '+'}
                        </button>
                    </div>

                    <div>
                        <Select campo='Framework' name='framework' opciones={opcion4} manejador={handleInputChange} />
                        <div style={masLenguajes ? {display: 'block'} : {display: 'none'}} >
                            <Select campo='Framework 2' name='framework2' opciones={opcion5} manejador={handleInputChange} />
                            <Select campo='Framework 3' name='framework3' opciones={opcion6} manejador={handleInputChange} />
                        </div>
                    </div>
                    
                </div>
                    
                {/* --------------- BASE DE DATOS --------------- */}
                <p className='font-bold text-base my-4'>Base de datos</p>
                <div className="grid grid-cols-2 gap-4">
                    <div style={registrarBase ? {display: 'none'} : {display: 'block'}}>
                        <Select campo='Seleccione Base de datos' name='select_base' opciones={opcionBasedatos} manejador={handleInputChange}/>
                    </div>
                    <Checkbox id='registrar_base' name='registrar_base' opciones={['Registrar nueva']} manejador={habilitarBase} />
                </div>

                <div style={registrarBase ? {display: 'grid'} : {display: 'none'}} className="grid grid-cols-2 gap-4">
                    <Input campo='Nombre' name='base_datos' editable={true} manejador={handleInputChange} />
                    <Select campo='Estatus' name='base_estatus' opciones={opcionEstatus} manejador={handleInputChange}/>
                    <Select campo='Tipo' name='base_tipo' opciones={['SELECCIONE','Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
                    <Select campo='Tipo Amb' name='base_tipo_ambiente' opciones={['SELECCIONE','Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
                    <Select campo='Manejador' name='base_manejador' opciones={['SELECCIONE','MYSQL','POSTGRESS','MARIADB']} manejador={handleInputChange} />
                    <Input campo='Version' name='bas_manejador_version' editable={true}  manejador={handleInputChange} />
                    <Input campo='N° Usuarios' name='base_cantidad_usuarios' editable={true} manejador={handleInputChange} />
                    <Input campo='Servidor' name='base_servidor' editable={true} manejador={handleInputChange} />
                </div>

                {/* --------------- SERVIDOR --------------- */}
                <p className='font-bold text-base my-4'>Servidor</p>
                <div className="grid grid-cols-2 gap-4">
                    <div style={registrarServidor ? {display: 'none'} : {display: 'block'}}>
                        <Select campo='Seleccione Servidor' name='select_servidor' opciones={opcionServidor} manejador={handleInputChange}/>
                    </div>
                    <Checkbox id='registrar_servidor' name='registrar_servidor' opciones={['Registrar nuevo']} manejador={habilitarServidor} />
                </div>

                <div style={registrarServidor ? {display: 'grid'} : {display: 'none'}} className="grid grid-cols-2 gap-4">
                    <Input campo='Nombre' name='servidor' editable={true} manejador={handleInputChange} />
                    <Select campo='Estatus' name='ser_estatus' opciones={['SELECCIONE','SI','NO']} manejador={handleInputChange}/>
                    <Input campo='Direccion' name='ser_direccion' editable={true} manejador={handleInputChange} />
                    <Input campo='Sistema' name='ser_sistema' editable={true} manejador={handleInputChange} />
                    <Input campo='Version Sis' name='ser_sistemas_version' editable={true} manejador={handleInputChange} />
                    <Input campo='Modelo' name='ser_modelo' editable={true} manejador={handleInputChange} />
                    <Input campo='Marca' name='ser_marca' editable={true} manejador={handleInputChange} />
                    <Input campo='Serial' name='ser_serial' editable={true} manejador={handleInputChange} />
                    <Input campo='Cantidad' name='ser_cantidad_cpu' editable={true} manejador={handleInputChange} />
                    <Input campo='Velocidad' name='ser_velocidad_cpu' editable={true} manejador={handleInputChange} />
                    <Input campo='Memoria' name='ser_memoria' editable={true} manejador={handleInputChange} />
                    <Select campo='Region' name='ser_region' opciones={opcionRegion} manejador={handleInputChange} />
                    <Select campo='Localidad' name='ser_localidad' opciones={opcion3} manejador={handleInputChange} />
                </div>
                
                <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
                {/* --------------- DOCUMENTACION --------------- */}
                <p className='font-bold text-base my-4'>Documentacion</p>
                <div className="grid grid-cols-2 gap-4">
                    <Input campo='Descripcion' name='doc_descripcion' editable={true} manejador={handleInputChange} />
                    <Input campo='Direccion' name='doc_direccion' editable={true} manejador={handleInputChange} />
                    <Input campo='Tipo de Doc' name='doc_tipo' editable={true} manejador={handleInputChange} />
                </div>

                {/* --------------- MANTENIMIENTO --------------- */}
                <p className='font-bold text-base my-4'>Mantenimiento</p>
                <div className="grid grid-cols-2 gap-4">
                    <Select campo='Frecuencia' name='man_frecuencia' opciones={opcionMantenimiento} editable={true} manejador={handleInputChange}/>
                    <Input campo='Horas Pro' name='man_horas_prom' editable={true} manejador={handleInputChange} />
                    <Input campo='Horas Anu' name='man_horas_anuales' editable={true} manejador={handleInputChange} />
                </div>

                    
                <div className="absolute bottom-4 right-1/3">
                    <Button width={32}>Registrar</Button>
                </div>
                <div className="absolute bottom-4 left-1/3">
                    <Button color='red' width={32} accion={navegar} >Cancelar</Button>
                </div>

            </form>

        </Container>
    )
};

export default Registro;

import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Button, Container, Input, Select } from '../../components';
import { campos, opcionEstatus, opcionRegion, opcionPlataforma, opcionAlcance, opcionMantenimiento,
        opcionLocalidad, opcionGerencia, opcionLenguaje, frameworkPhp, frameworkJS, frameworkJAVA, 
        frameworkCPP, frameworkCS, frameworkPY ,opcionBasedatos, opcionServidor, localidadCentro, 
        localidadCentroOccidente, localidadCentroSur, localidadFaja, localidadMetropolitana, 
        localidadOccidente, localidadOrienteNorte, localidadOrienteSur } from '../../services/campos.service';
import Autorizacion from '../../services/auth.service';
import Aplicacion from '../../services/aplicacion.service';
import Checkbox from '../../components/Checkbox';
import { Notificacion } from '../../utils/Notificacion';

const defaultState = {
    lenguaje: "",
    framework: "",
};

function Row({ onRemove, numero }) {
    
    const [opcion, setOpcion] = useState(opcionLocalidad);
    const [datos, setDatos] = useState({
        lenguaje: "",
        framework: "",
    });

    const handleInputChange = (e) => {

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        if(e.target.name === `lenguajes${numero}`)
            cambioDeOpcion(e.target.value, setOpcion);

    }

    function cambioDeOpcion(valor, elemento){
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
    }
    
    return (
      <div className="flex justify-center items-center gap-8">
        <Select campo='Lenguaje' name={`lenguajes${numero}`} opciones={opcionLenguaje} manejador={handleInputChange} />
        <Select campo='Framework' name={`framework${numero}`} opciones={opcion} manejador={handleInputChange} />
        <Button color="red" accion={onRemove}>Remover</Button>
      </div>
    );
}

function RegistrarApp() {

    const navigate = useNavigate();
    const [datos, setDatos] = useState(campos);
    const [inputs, setInputs] = useState([defaultState]);

    const agregarInput = (e) => {
        setInputs(inputs.concat(defaultState));
    };
    
    const removerInput = index => {
        if(index > 0){
            const copyinputs = [...inputs];
            copyinputs.splice(index, 1);
            setInputs(copyinputs);
        }
    };

    // OPCIONES DE SELECT ANIDADOS
    const [opcion1, setOpcion1] = useState(opcionLocalidad);
    const [opcion2, setOpcion2] = useState(opcionLocalidad);

    // OPCIONES BUSCADAS DE LA BASE DE DATOS
    const [opcionResponsable, setResponsable] = useState([]);

    // VARIABLES PARA ACTIVAR/DESACTIVAR
    const [registrarBase, setRegistrarBase] = useState(false);
    const [registrarServidor, setRegistrarServidor] = useState(false);

    const habilitarBase = () => {
        setRegistrarBase(!registrarBase)
        if(!registrarBase){
            setDatos({ ...datos, select_base : null })
        }
    }

    const habilitarServidor = () => {
        setRegistrarServidor(!registrarServidor)
        if(!registrarServidor){
            setDatos({ ...datos, select_servidor : null })
        }
    }


    // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
    const handleInputChange = (e) => {

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        if(e.target.name === 'funcional_region')
            cambioDeOpcion(e.target.value, setOpcion1);
        else if(e.target.name === 'tecnico_region')
            cambioDeOpcion(e.target.value, setOpcion2);

    }

    function cambioDeOpcion(valor, elemento){

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
          if(Autorizacion.obtenerUsuario().rol === 'admin'){
            await Aplicacion.crearDatos(datos);
            Notificacion('REGISTRO EXITOSO', 'success');
            //navigate("/dashboard");
          }
        }
        catch (error) { 
            console.log('ERROR AL ACTUALIZAR APL_ACT');
            Notificacion('ERROR AL REGISTRAR APP', 'error'); 
        }
      }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    return (
        <Container>

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

                    <div className="grid grid-cols-2 gap-4">
                        <div style={registrarBase ? {display: 'none'} : {display: 'block'}}>
                            <Select campo='Seleccione Custodio' name='select_base' opciones={opcionBasedatos} manejador={handleInputChange}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div style={registrarBase ? {display: 'none'} : {display: 'block'}}>
                            <Select campo='Seleccione Custodio' name='select_base' opciones={opcionBasedatos} manejador={handleInputChange}/>
                        </div>
                        <Checkbox id='registrar_funcional' name='registrar_funcional' opciones={['Registrar nuevo']} manejador={habilitarBase} />
                    </div>
                    
                    <div style={registrarBase ? {display: 'grid'} : {display: 'none'}} className='grid grid-cols-1'>
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
                    
                    <div style={registrarBase ? {display: 'grid'} : {display: 'none'}} className='relative grid grid-cols-1'>
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
                        {inputs.map((row, index) => (
                            <Row
                                {...row}
                                onRemove={() => removerInput(index)}
                                numero={index+1}
                                key={index}
                            />
                        ))}
                        <Button tipo='button' accion={agregarInput}>Agregar</Button>
                    </div>
                    
                </div>
                    
                {/* --------------- BASE DE DATOS --------------- */}
                <p className='font-bold text-base my-4'>Base de datos</p>
                <div className="grid grid-cols-2 gap-4">
                    <Select campo='Seleccione Base de datos' name='select_base' opciones={opcionBasedatos} manejador={handleInputChange}/>
                    <div className='mt-6'>
                        <Button width={32}><Link to={`/basedatos/registro`} target="_blank">Registrar Nueva</Link></Button>
                    </div>
                </div>

                {/* --------------- SERVIDOR --------------- */}
                <p className='font-bold text-base my-4'>Servidor</p>
                <div className="grid grid-cols-2 gap-4">
                    <Select campo='Seleccione Servidor' name='select_servidor' opciones={opcionServidor} manejador={handleInputChange}/>
                    <div className='mt-6'>
                        <Button width={32}><Link to={`/basedatos/registro`} target="_blank">Registrar Nuevo</Link></Button>
                    </div>
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

export default RegistrarApp;
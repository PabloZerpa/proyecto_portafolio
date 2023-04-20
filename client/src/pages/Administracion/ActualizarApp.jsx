
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { Button, Container, Input, Select } from '../../components';
import { BiLoaderAlt } from "react-icons/bi";
import Autorizacion from '../../services/auth.service';
import Aplicacion from '../../services/aplicacion.service';
import { campos, opcionEstatus, opcionRegion, opcionPlataforma, opcionAlcance, opcionMantenimiento,
  opcionLocalidad, opcionGerencia, opcionLenguaje, frameworkPhp, frameworkJS, frameworkJAVA, 
  frameworkCPP, frameworkCS, frameworkPY ,opcionBasedatos, opcionServidor, localidadCentro, 
  localidadCentroOccidente, localidadCentroSur, localidadFaja, localidadMetropolitana, 
  localidadOccidente, localidadOrienteNorte, localidadOrienteSur } from '../../services/campos.service';

function ActualizarApp() {
  
    const navigate = useNavigate();
    const { id } = useParams();
    const [datos, setDatos] = useState(campos);
    // DATOS POR DEFECTO
    const [load, setLoad] = useState(true);
    const [valor, setValor] = useState('');

    // OPCIONES DE SELECT ANIDADOS
    const [opcion1, setOpcion1] = useState(opcionLocalidad);
    const [opcion2, setOpcion2] = useState(opcionLocalidad);
    const [opcion3, setOpcion3] = useState(opcionLocalidad);
    const [opcion4, setOpcion4] = useState(frameworkPhp);
    const [opcion5, setOpcion5] = useState(frameworkPhp);
    const [opcion6, setOpcion6] = useState(frameworkPhp);

    function navegar() { navigate(-1) }
  
    useEffect(() => {
        async function fetchData(){
            try {
                const valores = await Aplicacion.obtenerTodo(id);
                setValor(valores); 
                console.log(valores);
                setLoad(false); 

            }catch (error) { console.log(error); }
        } 
        fetchData();  

        
        setDatos({
            ...datos,
            apl_acronimo : valor.general.apl_acronimo,
            apl_nombre : valor.general.apl_nombre,
            apl_descripcion : valor.general.apl_descripcion,
            apl_prioridad : valor.general.apl_prioridad,
            apl_alcance : valor.general.apl_alcance,
            apl_critico : valor.general.apl_critico,
            apl_direccion : valor.general.apl_direccion,
            apl_estatus : valor.general.apl_estatus,
            apl_version : valor.general.apl_version,
            apl_codigo_fuente : valor.general.apl_codigo_fuente,
            apl_cantidad_usuarios : valor.general.apl_cantidad_usuarios,
            apl_region : valor.general.region,
            plataforma : valor.plataformas.plataforma,
            framework : valor.lenguajes.framework,
            lenguaje : valor.lenguajes.lenguaje,
            select_base: valor.basedatos.base_datos,
            select_servidor: valor.servidor.servidor,
            man_frecuencia: valor.tecnologia.man_frecuencia,
            man_horas_prom: valor.tecnologia.man_horas_prom,
            man_horas_anuales: valor.tecnologia.man_horas_anuales,
            doc_descripcion: valor.documentacion.doc_descripcion,
            doc_direccion: valor.documentacion.doc_direccion,
            doc_tipo: valor.documentacion.doc_tipo,
        });

        console.log(datos);
    }, [id, load]);

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function updateData(e) {
        e.preventDefault();
        //console.log('DENTRO DEL UPDATE DE ACTUALIZACION')
        try {
        //console.log('TRY DEL UPDATE');
        if(Autorizacion.obtenerUsuario().rol === 'admin'){
            console.log(datos);
            console.log(id);
            await Autorizacion.actualizarDatos(id, datos); 
            //navigate("/dashboard");
        }
        } 
        catch (error) { console.log('ERROR AL ACTUALIZAR APL_ACT'); }
    }

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


  if(Autorizacion.obtenerUsuario().rol !== 'admin') 
    return <Navigate to='/' />
 
  if(load){
    return <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
  }
  else{
    return (
      <Container>

        <h2 className='font-bold text-lg'>Actualizacion de Aplicacion</h2>

        <form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" onSubmitCapture={updateData} >

            <h2 className='font-bold text-base mb-6'>Informacion General</h2>
            <div className="grid grid-cols-2 gap-4">
                {/* --------------- INFORMACION BASICA --------------- */}
                <Input campo='Acronimo' name='apl_acronimo' editable={true} propiedad={valor.general.apl_acronimo} manejador={handleInputChange} />
                <Select campo='Estatus' name='apl_estatus' opciones={opcionEstatus} propiedad={valor.general.apl_estatus} manejador={handleInputChange}/>
            </div>

            <Input campo='Nombre' name='apl_nombre' editable={true} area={true} propiedad={valor.general.apl_nombre} manejador={handleInputChange} />
            <Input campo='Descripcion' name='apl_descripcion' editable={true} propiedad={valor.general.apl_descripcion} area={true} manejador={handleInputChange} />

            <div className="relative grid grid-cols-2 gap-4 mb-0">
                <Input campo='Version' name='apl_version' propiedad={valor.general.apl_version} editable={true} manejador={handleInputChange} />
                <Select campo='Prioridad' name='apl_prioridad' propiedad={valor.general.apl_prioridad} opciones={['ALTA','MEDIA','BAJA',]} manejador={handleInputChange} />
                <Select campo='Critico' name='apl_critico' propiedad={valor.general.apl_critico} opciones={['SI','NO']} manejador={handleInputChange} />
                <Select campo='Alcance' name='apl_alcance' propiedad={valor.general.apl_alcance} opciones={opcionAlcance} manejador={handleInputChange} />
                <Input campo='Direccion' name='apl_direccion' propiedad={valor.general.apl_direccion} editable={true} manejador={handleInputChange} />
                <Input campo='N° Usuarios' name='apl_cantidad_usuarios' propiedad={valor.general.apl_cantidad_usuarios} editable={true} manejador={handleInputChange} />
                <Select campo='Region' name='apl_region' propiedad={valor.general.region} opciones={opcionRegion} manejador={handleInputChange} />
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
                        <Input campo='Nombre' name='funcional_nombre' propiedad={valor.funcional.res_nombre} editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='funcional_apellido' propiedad={valor.funcional.res_apellido} editable={true} manejador={handleInputChange} />
                        <Input campo='Indicador' name='funcional_indicador' propiedad={valor.funcional.res_indicador} editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='funcional_cedula' propiedad={valor.funcional.res_cedula} editable={true} manejador={handleInputChange} />
                        <Input campo='Telefono' name='funcional_telefono' propiedad={valor.funcional.telefono} editable={true} manejador={handleInputChange} />
                        <Select campo='Cargo' name='funcional_cargo' propiedad={valor.funcional.res_cargo} opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='funcional_gerencia' propiedad={valor.funcional.gerencia} opciones={opcionGerencia} manejador={handleInputChange} />
                        <Select campo='Region' name='funcional_region' propiedad={valor.funcional.region} opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='funcional_localidad' propiedad={valor.funcional.localidad} opciones={opcion1} manejador={handleInputChange} />
                    </div>
                    
                    <div className='relative grid grid-cols-1'>
                        <div className='absolute -left-2.5 top-0 w-1 h-full border-2 border-dashed border-gray-500'></div>
                        <Input campo='Nombre' name='tecnico_nombre' propiedad={valor.tecnico.res_nombre} editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='tecnico_apellido' propiedad={valor.tecnico.res_apellido} editable={true} manejador={handleInputChange} />
                        <Input campo='Indicador' name='tecnico_indicador' propiedad={valor.tecnico.res_indicador} editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='tecnico_cedula' propiedad={valor.tecnico.res_cedula} editable={true} manejador={handleInputChange} />
                        <Input campo='Telefono' name='tecnico_telefono' propiedad={valor.tecnico.telefono} editable={true} manejador={handleInputChange} />
                        <Select campo='Cargo' name='tecnico_cargo' propiedad={valor.tecnico.res_cargo} opciones={opcionGerencia} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='tecnico_gerencia' propiedad={valor.tecnico.gerencia} opciones={opcionGerencia} manejador={handleInputChange} />
                        <Select campo='Region' name='tecnico_region' propiedad={valor.tecnico.region} opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='tecnico_localidad' propiedad={valor.tecnico.localidad} opciones={opcion2} manejador={handleInputChange} />
                    </div>
                    
                </div>

            <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
                {/* --------------- TECNOLOGIAS --------------- */}
                <h2 className='font-bold text-base my-4'>Tecnologia</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Select campo='Plataforma' name='plataforma' propiedad={valor.plataformas.plataforma} opciones={opcionPlataforma} manejador={handleInputChange} />
                    <Select campo='Codigo Fuente' name='apl_codigo_fuente' propiedad={valor.general.apl_codigo_fuente} opciones={['SI','NO']} manejador={handleInputChange} />
                    
                    <div>
                        <Select campo='Lenguaje' name='lenguaje' propiedad={valor.lenguajes.lenguaje} editable={true} opciones={opcionLenguaje} manejador={handleInputChange} />
                        {/* <div style={{display: 'block'}} >
                            <Select campo='Lenguaje 2' name='lenguaje2' propiedad={lenguajes[1].lenguaje} editable={true} opciones={opcionLenguaje} manejador={handleInputChange} />
                            <Select campo='Lenguaje 3' name='lenguaje3' propiedad={lenguajes[2].lenguaje} editable={true} opciones={opcionLenguaje} manejador={handleInputChange} />
                        </div> */}
                    </div>

                    <div>
                        <Select campo='Framework' name='framework' propiedad={valor.lenguajes.framework} editable={true} opciones={opcion4} manejador={handleInputChange} />
                        {/* <div style={{display: 'block'}} >
                            <Select campo='Framework 2' name='framework2' propiedad={lenguajes[1].framework} editable={true} opciones={opcion5} manejador={handleInputChange} />
                            <Select campo='Framework 3' name='framework3' propiedad={lenguajes[2].framework} editable={true} opciones={opcion6} manejador={handleInputChange} />
                        </div> */}
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
                <Input campo='Descripcion' name='doc_descripcion' propiedad={valor.documentacion.doc_descripcion} editable={true} manejador={handleInputChange} />
                <Input campo='Direccion' name='doc_direccion' propiedad={valor.documentacion.doc_direccion} editable={true} manejador={handleInputChange} />
                <Input campo='Tipo de Doc' name='doc_tipo' propiedad={valor.documentacion.doc_tipo} editable={true} manejador={handleInputChange} />
            </div>

            {/* --------------- MANTENIMIENTO --------------- */}
            <p className='font-bold text-base my-4'>Mantenimiento</p>
            <div className="grid grid-cols-2 gap-4">
                <Select campo='Frecuencia' name='man_frecuencia' propiedad={valor.tecnologia.man_frecuencia} opciones={opcionMantenimiento} editable={true} manejador={handleInputChange}/>
                <Input campo='Horas Pro' name='man_horas_prom' propiedad={valor.tecnologia.man_horas_prom} editable={true} manejador={handleInputChange} />
                <Input campo='Horas Anu' name='man_horas_anuales' propiedad={valor.tecnologia.man_horas_anuales} editable={true} manejador={handleInputChange} />
            </div>

                      
            <div className="absolute bottom-4 right-1/3">
                <Button width={32}>Actualizar</Button>
            </div>
            <div className="absolute bottom-4 left-1/3">
                <Button color='red' width={32} accion={navegar} >Cancelar</Button>
            </div>

        </form>
          
      </Container>
    )
  }
};

export default ActualizarApp;
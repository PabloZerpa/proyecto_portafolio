
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Button, Container, Input, Select } from '../../components';
import Autorizacion from '../../services/auth.service';
import Usuarios from '../../services/user.service';
import { campos, opcionEstatus, opcionRegion, opcionPlataforma, 
        opcionAlcance, opcionMantenimiento } from '../../services/campos.service';

function Actualizacion() {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const [datos, setDatos] = useState(campos);
  const [valor, setValor] = useState('');
  const location = useLocation();

  
  function navegar() { navigate(-1) }

  const handleInputChange = (e) => {
    //console.log(e.target.name);
    //console.log(e.target.value);

    if(e.target.value === 'TODAS')
        setDatos({ ...datos, [e.target.name] : null });
    else
        setDatos({ ...datos, [e.target.name] : e.target.value });
  }
  
  useEffect(() => {

    async function fetchData(){
      try {
        const response = await Usuarios.obtenerDato(id)
        setValor(response.data);
        console.log(response.data);
        console.log(valor);
      }catch (error) { console.log(error) }
    }
    fetchData();

    //console.log(location.state);
    setDatos({
      ...datos,
      apl_acronimo : valor.apl_acronimo,
      apl_nombre : valor.apl_nombre,
      apl_descripcion : valor.apl_descripcion,
      apl_prioridad : valor.apl_prioridad,
      apl_alcance : valor.apl_alcance,
      apl_critico : valor.apl_critico,
      apl_licencia : valor.apl_licencia,
      apl_direccion : valor.apl_direccion,
      apl_estatus : valor.apl_estatus,
      apl_version : valor.apl_version,
      apl_codigo_fuente : valor.apl_codigo_fuente,
      plataforma : valor.plataforma,
      framework : valor.framework,
      lenguaje : valor.lenguaje,
      base_datos : valor.base_datos,
      bas_estatus : valor.bas_estatus,
      bas_cantidad_usuarios : valor.bas_cantidad_usuarios,
      bas_direccion : valor.bas_direccion,
      bas_tipo_ambiente : valor.bas_tipo_ambiente,
      bas_tipo : valor.tipo,
      bas_manejador : valor.manejador,
      servidor: valor.servidor,
      ser_estatus: valor.ser_estatus,
      ser_direccion: valor.ser_direccion,
      ser_sistema: valor.sistema,
      ser_sistema_version: valor.sis_version,
      ser_marca: valor.marca,
      ser_modelo: valor.mar_modelo,
      ser_serial: valor.mar_serial,
      ser_cantidad_cpu: valor.mar_cantidad_cpu,
      ser_velocidad_cpu: valor.mar_velocidad_cpu,
      ser_memoria: valor.mar_memoria,
      man_frecuencia: valor.man_frecuencia,
      man_horas_prom: valor.man_horas_prom,
      man_horas_anuales: valor.man_horas_anuales,
      doc_descripcion: valor.doc_descripcion,
      doc_direccion: valor.doc_direccion,
      doc_tipo: valor.doc_tipo,
      cliente: valor.cliente,
      cli_cantidad: valor.cli_cantidad_usuarios,
    });

  }, [id]);

  // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
  async function updateData(e) {

    e.preventDefault();
    //console.log('DENTRO DEL UPDATE DE ACTUALIZACION')

    try {
      //console.log('TRY DEL UPDATE');
      
      if(Autorizacion.obtenerUsuario().rol === 'admin'){

        console.log(datos);
        console.log(id);
        //await Autorizacion.actualizarDatos(id, datos); 
        //navigate("/dashboard");
      }
    }
    catch (error) { console.log('ERROR AL ACTUALIZAR APL_ACT'); }
  }

  if(Autorizacion.obtenerUsuario().rol !== 'admin') 
    return <Navigate to='/' />

  return (
    <Container>

      <h2 className='font-bold text-lg'>Actualizacion de Aplicacion</h2>

      <form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" onSubmitCapture={updateData} >

      <h2 className='font-bold text-base mb-6'>Informacion General</h2>
      <div className="grid grid-cols-2 gap-4">
                    {/* --------------- INFORMACION BASICA --------------- */}
                    <Input campo='Acronimo' name='apl_acronimo' editable={true} propiedad={valor.apl_acronimo} manejador={handleInputChange} />
                    <Select campo='Estatus' name='apl_estatus' opciones={opcionEstatus} propiedad={valor.apl_estatus} manejador={handleInputChange}/>
                </div>

                <Input campo='Nombre' name='apl_nombre' editable={true} area={true} propiedad={valor.apl_nombre} manejador={handleInputChange} />
                <Input campo='Descripcion' name='apl_descripcion' editable={true} propiedad={valor.apl_descripcion} area={true} manejador={handleInputChange} />

                <div className="relative grid grid-cols-2 gap-4 mb-0">
                    <Select campo='Prioridad' name='apl_prioridad' propiedad={valor.apl_prioridad} opciones={['ALTA','MEDIA','BAJA',]} manejador={handleInputChange} />
                    <Select campo='Critico' name='apl_critico' propiedad={valor.apl_critico} opciones={['SI','NO']} manejador={handleInputChange} />
                    <Select campo='Alcance' name='apl_alcance' propiedad={valor.apl_alcance} opciones={opcionAlcance} manejador={handleInputChange} />
                    <Input campo='Direccion' name='apl_direccion' propiedad={valor.apl_direccion} editable={true} manejador={handleInputChange} />
                    <Input campo='N° Usuarios' name='apl_cantidad_usuarios' propiedad={valor.apl_cantidad_usuarios} editable={true} manejador={handleInputChange} />
                    <Input campo='Cliente' name='apl_cliente' propiedad={valor.apl_cliente} editable={true} manejador={handleInputChange} />
                    <Select campo='Region' name='apl_region' propiedad={valor.region} opciones={opcionRegion} manejador={handleInputChange} />
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
                        <Select campo='Gerencia' name='funcional_gerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Subgerencia' name='funcional_subgerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Region' name='funcional_region' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='funcional_localidad' opciones={opcionRegion} manejador={handleInputChange} />
                    </div>
                    
                    <div className='relative grid grid-cols-1'>
                        <div className='absolute -left-2.5 top-0 w-1 h-full border-2 border-dashed border-gray-500'></div>
                        <Input campo='Nombre' name='tecnico_nombre' editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='tecnico_apellido' editable={true} manejador={handleInputChange} />
                        <Input campo='Indicador' name='tecnico_indicador' editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='tecnico_cedula' editable={true} manejador={handleInputChange} />
                        <Input campo='Telefono' name='tecnico_telefono' editable={true} manejador={handleInputChange} />
                        <Select campo='Cargo' name='tecnico_cargo' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='tecnico_gerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Subgerencia' name='tecnico_subgerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Region' name='tecnico_region' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='tecnico_localidad' opciones={opcionRegion} manejador={handleInputChange} />
                    </div>
                    
                </div>

                <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
                {/* --------------- TECNOLOGIAS --------------- */}
                <h2 className='font-bold text-base my-4'>Tecnologia</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Input campo='Version' name='apl_version' propiedad={valor.apl_version} editable={true} manejador={handleInputChange} />
                    <Select campo='Licencia' name='apl_licencia' propiedad={valor.apl_licencia} opciones={['NINGUNA','FISICA','LOGICA']} manejador={handleInputChange} />
                    <Select campo='Plataforma' name='plataforma' propiedad={valor.plataforma} opciones={opcionPlataforma} manejador={handleInputChange} />
                    <Select campo='Codigo Fuente' name='apl_codigo_fuente' propiedad={valor.apl_codigo_fuente} opciones={['SI','NO']} manejador={handleInputChange} />
                    <Input campo='Lenguaje' name='lenguaje' propiedad={valor.lenguaje} editable={true} manejador={handleInputChange} />
                    <Input campo='Framework' name='framework' propiedad={valor.framework} editable={true} manejador={handleInputChange} />
                </div>
                    
                {/* --------------- BASE DE DATOS --------------- */}
                <p className='font-bold text-base my-4'>Base de datos</p>
                <div className="grid grid-cols-2 gap-4">
                    <Input campo='Nombre' name='base_datos' propiedad={valor.base_datos} editable={true} manejador={handleInputChange} />
                    <Select campo='Estatus' name='base_estatus' propiedad={valor.bas_estatus} opciones={opcionEstatus} manejador={handleInputChange}/>
                    <Select campo='Tipo' name='base_tipo' propiedad={valor.tipo} opciones={['Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
                    <Select campo='Manejador' name='base_manejador' propiedad={valor.manejador} opciones={['MYSQL','POSTGRESS','MARIADB']} manejador={handleInputChange} />
                    <Select campo='Tipo Amb' name='base_tipo_ambiente' propiedad={valor.bas_tipo_ambiente} opciones={['Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
                    <Input campo='N° Usuarios' name='base_cantidad_usuarios' propiedad={valor.bas_cantidad_usuarios} editable={true} manejador={handleInputChange} />
                    <Input campo='Servidor' name='base_servidor' propiedad={valor.servidor} editable={true} manejador={handleInputChange} />
                </div>

                {/* --------------- SERVIDOR --------------- */}
                <p className='font-bold text-base my-4'>Servidor</p>
                <div className="grid grid-cols-2 gap-4">
                    <Input campo='Nombre' name='servidor' propiedad={valor.servidor} editable={true} manejador={handleInputChange} />
                    <Select campo='Estatus' name='ser_estatus' propiedad={valor.ser_estatus} opciones={['SI','NO']} manejador={handleInputChange}/>
                    <Input campo='Direccion' name='ser_direccion' propiedad={valor.ser_direccion} editable={true} manejador={handleInputChange} />
                    <Input campo='Sistema' name='ser_sistema' propiedad={valor.sistema} editable={true} manejador={handleInputChange} />
                    <Input campo='Version Sis' name='ser_sistemas_version' propiedad={valor.sistema_version} editable={true} manejador={handleInputChange} />
                    <Input campo='Marca' name='ser_marca' propiedad={valor.marca} editable={true} manejador={handleInputChange} />
                    <Input campo='Modelo' name='ser_modelo' propiedad={valor.mar_modelo} editable={true} manejador={handleInputChange} />
                    <Input campo='Serial' name='ser_serial' propiedad={valor.mar_serial} editable={true} manejador={handleInputChange} />
                    <Input campo='Cantidad' name='ser_cantidad_cpu' propiedad={valor.mar_cantidad_cpu} editable={true} manejador={handleInputChange} />
                    <Input campo='Velocidad' name='ser_velocidad_cpu' propiedad={valor.mar_velocidad_cpu} editable={true} manejador={handleInputChange} />
                    <Input campo='Memoria' name='ser_memoria' propiedad={valor.mar_memoria} editable={true} manejador={handleInputChange} />
                    <Select campo='Region' name='ser_region' propiedad={valor.region} opciones={opcionRegion} manejador={handleInputChange} />
                    <Select campo='Localidad' name='ser_localidad' propiedad={valor.localidad} opciones={opcionRegion} manejador={handleInputChange} />
                </div>
                
                <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
                {/* --------------- DOCUMENTACION --------------- */}
                <p className='font-bold text-base my-4'>Documentacion</p>
                <div className="grid grid-cols-2 gap-4">
                    <Input campo='Descripcion' name='doc_descripcion' propiedad={valor.doc_descripcion} editable={true} manejador={handleInputChange} />
                    <Input campo='Direccion' name='doc_direccion' propiedad={valor.doc_direccion} editable={true} manejador={handleInputChange} />
                    <Input campo='Tipo de Doc' name='doc_tipo' propiedad={valor.doc_tipo} editable={true} manejador={handleInputChange} />
                </div>

                {/* --------------- MANTENIMIENTO --------------- */}
                <p className='font-bold text-base my-4'>Mantenimiento</p>
                <div className="grid grid-cols-2 gap-4">
                    <Select campo='Frecuencia' name='man_frecuencia' propiedad={valor.man_frecuencia} opciones={opcionMantenimiento} editable={true} manejador={handleInputChange}/>
                    <Input campo='Horas Pro' name='man_horas_prom' propiedad={valor.man_horas_prom} editable={true} manejador={handleInputChange} />
                    <Input campo='Horas Anu' name='man_horas_anuales' propiedad={valor.man_horas_anuales} editable={true} manejador={handleInputChange} />
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

export default Actualizacion;
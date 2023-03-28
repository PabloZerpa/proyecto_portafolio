
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Button, Container, Input, Select } from '../../components';
import Autorizacion from '../../services/auth.service';
import { campos, opcionEstatus, opcionRegion, opcionPlataforma, 
        opcionAlcance, opcionMantenimiento } from '../../services/campos.service';


function Actualizacion() {
  
  const navigate = useNavigate();
  const [datos, setDatos] = useState(campos);
  const location = useLocation();
  const { id } = useParams();
  
  function navegar() { navigate(-1) }

  const handleInputChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    if(e.target.value === 'TODAS')
        setDatos({ ...datos, [e.target.name] : null });
    else
        setDatos({ ...datos, [e.target.name] : e.target.value });
  }
  
  useEffect(() => {

    console.log(location.state);
    setDatos({
      ...datos,
      apl_acronimo : location.state.apl_acronimo,
      apl_nombre : location.state.apl_nombre,
      apl_descripcion : location.state.apl_descripcion,
      apl_prioridad : location.state.apl_prioridad,
      apl_alcance : location.state.apl_alcance,
      apl_critico : location.state.apl_critico,
      apl_licencia : location.state.apl_licencia,
      apl_direccion : location.state.apl_direccion,
      apl_estatus : location.state.apl_estatus,
      apl_version : location.state.apl_version,
      apl_codigo_fuente : location.state.apl_codigo_fuente,
      plataforma : location.state.plataforma,
      framework : location.state.framework,
      lenguaje : location.state.lenguaje,
      base_datos : location.state.base_datos,
      bas_estatus : location.state.bas_estatus,
      bas_cantidad_usuarios : location.state.bas_cantidad_usuarios,
      bas_direccion : location.state.bas_direccion,
      bas_tipo_ambiente : location.state.bas_tipo_ambiente,
      bas_tipo : location.state.tipo,
      bas_manejador : location.state.manejador,
      servidor: location.state.servidor,
      ser_estatus: location.state.ser_estatus,
      ser_direccion: location.state.ser_direccion,
      ser_sistema: location.state.sistema,
      ser_sistema_version: location.state.sis_version,
      ser_marca: location.state.marca,
      ser_modelo: location.state.mar_modelo,
      ser_serial: location.state.mar_serial,
      ser_cantidad_cpu: location.state.mar_cantidad_cpu,
      ser_velocidad_cpu: location.state.mar_velocidad_cpu,
      ser_memoria: location.state.mar_memoria,
      man_frecuencia: location.state.man_frecuencia,
      man_horas_prom: location.state.man_horas_prom,
      man_horas_anuales: location.state.man_horas_anuales,
      doc_descripcion: location.state.doc_descripcion,
      doc_direccion: location.state.doc_direccion,
      doc_tipo: location.state.doc_tipo,
      cliente: location.state.cliente,
      cli_cantidad: location.state.cli_cantidad_usuarios,

    })

  }, [id]);

  // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
  async function updateData(e) {

    e.preventDefault();
    console.log('DENTRO DEL UPDATE DE ACTUALIZACION')

    try {
      console.log('TRY DEL UPDATE');
      
      if(Autorizacion.obtenerUsuario().rol === 'admin'){

        console.log(datos);
        console.log(id);
        await Autorizacion.actualizarDatos(id, datos); 
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

        <div className="grid grid-cols-2 gap-4">
          {/* --------------- INFORMACION BASICA --------------- */}
          <Input campo='Acronimo' name='apl_acronimo' propiedad={location.state.apl_acronimo} editable={true} manejador={handleInputChange} />
          <Select campo='Estatus' name='apl_estatus' propiedad={location.state.apl_estatus} opciones={opcionEstatus} manejador={handleInputChange}/>
        </div>

        <Input campo='Nombre' name='apl_nombre' propiedad={location.state.apl_nombre} editable={true} area={true} manejador={handleInputChange} />
        <Input campo='Descripcion' name='apl_descripcion' propiedad={location.state.apl_descripcion} editable={true} area={true} manejador={handleInputChange} />

        <div className="relative grid grid-cols-2 gap-4 mb-0">

          <Input campo='Version' name='apl_version' propiedad={location.state.apl_version} editable={true} manejador={handleInputChange} />
          <Select campo='Prioridad' name='apl_prioridad' propiedad={location.state.apl_prioridad} opciones={['ALTA','MEDIA','BAJA',]} manejador={handleInputChange} />
          <Select campo='Critico' name='apl_critico' propiedad={location.state.apl_critico} opciones={['SI','NO']} manejador={handleInputChange} />
          <Select campo='Alcance' name='apl_alcance' propiedad={location.state.apl_alcance} opciones={opcionAlcance} manejador={handleInputChange} />
          <Select campo='Licencia' name='apl_licencia' propiedad={location.state.apl_licencia} opciones={['NINGUNA','FISICA','LOGICA']} manejador={handleInputChange} />
          <Input campo='Direccion' name='apl_direccion' propiedad={location.state.apl_direccion} editable={true} manejador={handleInputChange} />
          
          {/* --------------- RESPONSABLES --------------- */} 
          <div className='grid grid-cols-1'>
              <p className='ml-32 font-bold'>Responsable Funcional</p>
              <Input campo='Nombre' name='funcional_nombre' editable={true} manejador={handleInputChange} />
              <Input campo='Apellido' name='funcional_apellido' editable={true} manejador={handleInputChange} />
              <Input campo='Indicador' name='funcional_indicador' editable={true} manejador={handleInputChange} />
              <Input campo='Cedula' name='funcional_cedula' editable={true} />
              <Input campo='Telefono' name='funcional_telefono' editable={true} manejador={handleInputChange} />
              <Select campo='Rol' name='funcional_rol' opciones={opcionRegion} manejador={handleInputChange} />
              <Select campo='Gerencia' name='funcional_gerencia' opciones={opcionRegion} manejador={handleInputChange} />
              <Select campo='Subgerencia' name='funcional_subgerencia' opciones={opcionRegion} manejador={handleInputChange} />
              <Select campo='Region' name='funcional_region' opciones={opcionRegion} manejador={handleInputChange} />
              <Select campo='Localidad' name='funcional_localidad' opciones={opcionRegion} manejador={handleInputChange} />
          </div>

          <div className='grid grid-cols-1'>
              <div className='absolute -left-4 top-12 w-1 h-72 border-2 border-dashed border-gray-500'></div>
              <div className='absolute -left-4 top-80 w-1 h-80 border-2 border-dashed border-gray-500'></div>
              <p className='ml-32 font-bold'>Responsable Tecnico</p>
              <Input campo='Nombre' name='tecnico_nombre' editable={true} manejador={handleInputChange} />
              <Input campo='Apellido' name='tecnico_apellido' editable={true} manejador={handleInputChange} />
              <Input campo='Indicador' name='tecnico_indicador' editable={true} manejador={handleInputChange} />
              <Input campo='Cedula' name='tecnico_cedula' editable={true} />
              <Input campo='Telefono' name='tecnico_telefono' editable={true} manejador={handleInputChange} />
              <Select campo='Rol' name='tecnico_rol' opciones={opcionRegion} manejador={handleInputChange} />
              <Select campo='Gerencia' name='tecnico_gerencia' opciones={opcionRegion} manejador={handleInputChange} />
              <Select campo='Subgerencia' name='tecnico_subgerencia' opciones={opcionRegion} manejador={handleInputChange} />
              <Select campo='Region' name='tecnico_region' opciones={opcionRegion} manejador={handleInputChange} />
              <Select campo='Localidad' name='tecnico_localidad' opciones={opcionRegion} manejador={handleInputChange} />
          </div>

          {/* --------------- TECNOLOGIAS --------------- */}

          <Select campo='Plataforma' name='plataforma' propiedad={location.state.plataforma} opciones={opcionPlataforma} manejador={handleInputChange} />
          <Select campo='Codigo Fuente' name='apl_codigo_fuente' propiedad={location.state.apl_codigo_fuente} opciones={['SI','NO']} manejador={handleInputChange} />
          <Input campo='Lenguaje' name='lenguaje' propiedad={location.state.lenguaje} editable={true} manejador={handleInputChange} />
          <Input campo='Framework' name='framework' propiedad={location.state.framework} editable={true} manejador={handleInputChange} />
          
          {/* --------------- BASE DE DATOS --------------- */}
          <div className='relative flex flex-col'>
              <p className='ml-32 font-bold'>Base de datos</p>
              <Input campo='Nombre' name='base_datos' propiedad={location.state.base_datos} editable={true} manejador={handleInputChange} />
              <Select campo='Estatus' name='base_estatus' propiedad={location.state.bas_estatus} opciones={opcionEstatus} manejador={handleInputChange}/>
              <Select campo='Tipo' name='base_tipo' propiedad={location.state.tipo} opciones={['Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
              <Select campo='Manejador' name='base_manejador' propiedad={location.state.manejador} opciones={['MYSQL','POSTGRESS','MARIADB']} manejador={handleInputChange} />
              <Select campo='Tipo Amb' name='base_tipo_ambiente' propiedad={location.state.bas_tipo_ambiente} opciones={['Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
              <Input campo='N° Usuarios' name='base_cantidad_usuarios' propiedad={location.state.bas_cantidad_usuarios} editable={true} manejador={handleInputChange} />
              <Input campo='Direccion' name='base_direccion' propiedad={location.state.bas_direccion} editable={true} manejador={handleInputChange} />
              <Input campo='Servidor' name='base_servidor' propiedad={location.state.bas_servidor} editable={true} manejador={handleInputChange} />

          </div>

          {/* --------------- SERVIDOR --------------- */}
          <div className='relative flex flex-col'>
              <div className='absolute -left-4 top-12 w-1 h-56 border-2 border-dashed border-gray-500'></div>
              <div className='absolute -left-4 top-44 w-1 h-64 border-2 border-dashed border-gray-500'></div>
              <p className='ml-32 font-bold'>Servidor</p>
              <Input campo='Nombre' name='servidor' propiedad={location.state.servidor} editable={true} manejador={handleInputChange} />
              <Select campo='Estatus' name='ser_estatus' propiedad={location.state.ser_estatus} opciones={['SI','NO']} manejador={handleInputChange}/>
              <Input campo='Sistema' name='ser_sistema' propiedad={location.state.sistema} editable={true} manejador={handleInputChange} />
              <Input campo='Version Sis' name='ser_sistemas_version' propiedad={location.state.sis_version} editable={true} manejador={handleInputChange} />
              <Input campo='Direccion' name='ser_direccion' propiedad={location.state.ser_direccion} editable={true} manejador={handleInputChange} />
              <Input campo='Marca' name='ser_marca' propiedad={location.state.marca} editable={true} manejador={handleInputChange} />
              <Input campo='Modelo' name='ser_modelo' propiedad={location.state.mar_modelo} editable={true} manejador={handleInputChange} />
              <Input campo='Serial' name='ser_serial' propiedad={location.state.mar_serial} editable={true} manejador={handleInputChange} />
              <Input campo='Cantidad' name='ser_cantidad_cpu' propiedad={location.state.mar_cantidad_cpu} editable={true} manejador={handleInputChange} />
              <Input campo='Velocidad' name='ser_velocidad_cpu' propiedad={location.state.mar_velocidad_cpu} editable={true} manejador={handleInputChange} />
              <Input campo='Memoria' name='ser_memoria' propiedad={location.state.mar_memoria} editable={true} manejador={handleInputChange} />
              <Select campo='Region' name='ser_region' propiedad={location.state.ser_region} opciones={opcionRegion} manejador={handleInputChange} />
              <Select campo='Localidad' name='ser_localidad' propiedad={location.state.ser_localidad} opciones={opcionRegion} manejador={handleInputChange} />
          </div>

          {/* --------------- CLIENTE --------------- */}
          <Input campo='Cliente' name='cliente' propiedad={location.state.cliente} editable={true} manejador={handleInputChange} />
          <Input campo='N° Usuarios' name='cli_cantidad_usuarios' propiedad={location.state.cli_cantidad_usuarios} editable={true} manejador={handleInputChange} />
          <Input campo='Region' name='cli_region' propiedad={location.state.cli_region} editable={true} manejador={handleInputChange} />
          <Input campo='Localidad' name='cli_localidad' propiedad={location.state.cli_localidad} editable={true} manejador={handleInputChange} />

          {/* --------------- DOCUMENTACION --------------- */}
          <Input campo='Descripcion' name='doc_descripcion' propiedad={location.state.doc_descripcion} editable={true} manejador={handleInputChange} />
          <Input campo='Direccion' name='doc_direccion' propiedad={location.state.doc_direccion} editable={true} manejador={handleInputChange} />
          <Input campo='Tipo de Doc' name='doc_tipo' propiedad={location.state.doc_tipo} editable={true} manejador={handleInputChange} />

          {/* --------------- MANTENIMIENTO --------------- */}
          <Select campo='Frecuencia' name='man_frecuencia' propiedad={location.state.man_frecuencia} opciones={opcionMantenimiento} editable={true} manejador={handleInputChange}/>
          <Input campo='Horas Pro' name='man_horas_prom' propiedad={location.state.man_horas_prom} editable={true} manejador={handleInputChange} />
          <Input campo='Horas Anu' name='man_horas_anuales' propiedad={location.state.man_horas_anuales} editable={true} manejador={handleInputChange} />

          {/* --------------- UBICACION Y FECHA --------------- */}
          
          <div className='absolute top-0 left-0 w-full border-dashed border-gray-500'></div>
          <Select campo='Region' name='apl_region' propiedad={location.state.apl_region} opciones={opcionRegion} manejador={handleInputChange} />
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
          <Select campo='Localidad' name='apl_localidad' propiedad={location.state.apl_localidad} opciones={['PROPIO','TERCERO','COMPARTIDO']} manejador={handleInputChange} />
          
        </div>

        <div className="absolute bottom-4 right-1/3">
          <Button color='blue' width={32}>Registrar</Button>
        </div>
        <div className="absolute bottom-4 left-1/3">
          <Button color='red' width={32} accion={navegar} >Cancelar</Button>
        </div>

      </form>
        
    </Container>
  )
};

export default Actualizacion;
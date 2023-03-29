import { useState, useEffect } from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import { useLocation, useParams, Navigate, Link } from 'react-router-dom';
import { Button, Container, Input, Radio } from '../../components';
import Tabla3 from '../../components/Table3';
import Usuarios from '../../services/user.service';

const opcionesVista = ['General','Tecnologia',
  'Base de datos','Servidor','Responsables','Documentacion','Fallas'];

function Vista() {

  const { id } = useParams();
  const location = useLocation();
  const [valor, setValor] = useState(location.state);

  const [valorDevuelto, setValorDevuelto] = useState(false);
  const obtencionDeEstado = (parametroDevuelto) => {setValorDevuelto(parametroDevuelto)};
  const [valorDevuelto2, setValorDevuelto2] = useState(false);
  const obtencionDeEstado2 = (parametroDevuelto) => {setValorDevuelto2(parametroDevuelto)};
  const [opcion, setOpcion] = useState('General');

  const handleInputChange = (e) => {
    setOpcion(e.target.value);
  }
  
  useEffect(() => {
    console.log(location.state);
    async function fetchData(){
      try {
        const response = await Usuarios.obtenerDato(location.state.id)
        setValor(response.data);
      }catch (error) { console.log(error) }
    }
    fetchData();
  }, [id]);
  
    if(valor === null) 
      return <Navigate to='/' />

      function General(){
        return(
          <>
            <h2 className='font-bold text-lg'>Informacion General</h2>
            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
    
              <div className='grid gap-6 mb-6 md:grid-cols-2'>
                <Input campo='Acronimo' propiedad={valor.apl_acronimo} />
                <Input campo='Estatus' propiedad={valor.apl_estatus} />
                <Input campo='Version' propiedad={valor.apl_version} />
                <Input campo='Direccion' propiedad={valor.apl_direccion} />
              </div>
    
              <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6'>
                <Input campo='Nombre' area={true} propiedad={valor.apl_nombre} />
                <Input campo='Descripcion' area={true} propiedad={valor.apl_descripcion} />
              </div>
                
              <div className='grid gap-6 mb-6 md:grid-cols-2'>
                <Input campo='Prioridad' propiedad={valor.apl_prioridad} />
                <Input campo='Critico' propiedad={valor.apl_critico} />
                <Input campo='Alcance' propiedad={valor.apl_alcance} />
                <Input campo='Cliente' propiedad={valor.cliente} />
                <Input campo='N° Usuarios' propiedad={valor.apl_cantidad_usuarios} />
                <Input campo='Region' propiedad={valor.region} />  
              </div>
  
            </form>
          </>
        )
      }

      const columnasTec = ['id','Codigo','Licencia','Plataforma','Lenguaje','Framework','Base de datos',
      'Servidor','Mantenimiento','Horas Prom','Horas Anuales'];
      const resultadosTec = [
          {
            id: id,
            codigo: valor.apl_codigo_fuente,
            licencia: valor.apl_licencia,
            plataforma: valor.plataforma,
            lenguaje: valor.lenguaje,
            framework: valor.framework,
            basededatos: valor.base_datos,
            servidor: valor.servidor,
            mantenimiento: valor.man_frecuencia,
            horasprom: valor.man_horas_prom,
            horasanuales: valor.man_horas_anuales
          },
      ];

      function Tecnologia() {
        return(
          <>
            <h2 className='font-bold text-lg'>Tecnologia</h2>
            <form className="flex justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla3 columnas={columnasTec} datos={resultadosTec} />
            </form>
          </>
        )
      }

      const columnasBas = ['id','Nombre','Estatus','Tipo','Manejador','Tipo Ambiente','N° Usuarios','Servidor'];
      const resultadosBas = [
          {
            id: id,
            basededatos: valor.base_datos,
            estatus: valor.bas_estatus,
            tipo: valor.tipo,
            manejador: valor.manejador,
            tipo_ambiente: valor.bas_tipo_ambiente,
            cantidad_usuarios: valor.bas_cantidad_usuarios,
            servidor: valor.servidor,
          },
      ];
  
      function Basedatos (){
        return(
          <>
            <h2 className='font-bold text-lg'>Base de datos</h2>
            <form className="flex justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla3 columnas={columnasBas} datos={resultadosBas} />
            </form>
          </>
        )
      }
  
      const columnasSer = ['id','Nombre','Estatus','Direccion','Sistema Operativo','Version OS','Marca','Modelo',
      'Serial','Cantidad CPU','Velocidad','Memoria','Region','Localidad'];
      const resultadosSer = [
          {
            id: id,
            servidor: valor.servidor,
            estatus: valor.ser_estatus,
            direccion: valor.ser_direccion,
            sistema_operativo: valor.sistema,
            version_sistema: valor.sis_version,
            marca: valor.marca,
            modelo: valor.mar_modelo,
            serial: valor.mar_serial,
            cantidad_cpu: valor.mar_cantidad_cpu,
            velocidad_cpu: valor.mar_velocidad_cpu,
            memoria: valor.mar_memoria,
            region: valor.ser_region,
            localidad: valor.ser_localidad,
          },
      ];

      function Servidor(){
        return(
          <>
            <h2 className='font-bold text-lg'>Servidor</h2>
            <form className="flex justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla3 columnas={columnasSer} datos={resultadosSer} />
            </form>
          </>
        )
      }

      const columnasRes = ['id','Custodio','Nombre','Apellido','Indicador','Correo','Cedula','Telefono',
      'Region','Localidad','Rol','Gerencia','SubGerencia'];
      const resultadosRes = [
          {id:'1',tipo:'Funcional',nombre:'Fulano',apellido:'Mengano',indicador:'fulano1',
            correo:'fulano1@pdvsa.com',cedula:'123456',telefono:'0416-111111',region:'CENTRO',localidad:'CARACAS',
            rol:'Analista',gerencia:'AIT',subgerencia:'Informatica'},
          {id:'2',tipo:'Tecnico',nombre:'Fulano',apellido:'Mengano',indicador:'fulano2',
            correo:'fulano2@pdvsa.com',cedula:'24680',telefono:'0414-22222',region:'ORIENTE NORTE',localidad:'PTO LA CRUZ',
            rol:'Especialista',gerencia:'AIT',subgerencia:'Servidor'},
      ];
  
      function Responsable() {
        return(
          <>
            <h2 className='font-bold text-lg'>Responsables</h2>
            <form className="flex justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla3 columnas={columnasRes} datos={resultadosRes} />
            </form>
          </>
        )
      }

      const columnasDoc = ['id','Descripcion','Direccion','Tipo'];
      const resultadosDoc = [
          {id: id,descripcion: valor.doc_descripcion,direccion: valor.doc_direccion, tipo: valor.doc_tipo,},
          {id:'10',tipo:'Aplicaciones',descripcion:'aaaaaaaaaaaaaa',direccion:'xxxxxxx',fecha:'12/12/2009',},
          {id:'20',tipo:'Aplicaciones',descripcion:'bbbbbbb',direccion:'yyyy',fecha:'5/5/2015',},
          {id:'30',clatipose:'Base de datos',descripcion:'cccccccccccc',direccion:'zzzzzzzzzzzz',fecha:'9/9/2022',},
      ];
  
      function Documentacion(){
        return (
          <>
            <h2 className='font-bold text-lg'>Documentacion</h2>
            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla3 columnas={columnasDoc} datos={resultadosDoc} />
            </form>
          </>
        )
      }

      const columnasFallas = ['Numero','Clase','Descripcion','Solucion','Ver'];
      const resultadosFallas = [
          {
            id: id,
            clase: valor.fal_clase,
            descripcion: valor.fal_descripcion,
            solucion: valor.fal_solucion,
            editar:
            <Link to={`/solicitudes/${1}`}>
              <FaPlus className="text-base text-blue-500 cursor-pointer ml-4" />
            </Link>
          },
          {id:'10',clase:'Aplicaciones',descripcion:'aaaaaaaaaaaaaa',solucion:'xxxxxxx',
            editar:
            <Link to={`/solicitudes/${1}`}>
              <FaPlus className="text-base text-blue-500 cursor-pointer ml-4" />
            </Link>},
          {id:'20',clase:'Aplicaciones',descripcion:'bbbbbbb',solucion:'yyyy',
            editar:
            <Link to={`/solicitudes/${1}`}>
              <FaPlus className="text-base text-blue-500 cursor-pointer ml-4" />
            </Link>},
          {id:'30',clase:'Base de datos',descripcion:'cccccccccccc',solucion:'zzzzzzzzzzzz',
            editar:
            <Link to={`/solicitudes/${1}`}>
              <FaPlus className="text-base text-blue-500 cursor-pointer ml-4" />
            </Link>},
      ];

      function Fallas(){
        return (
          <>
            <h2 className='font-bold text-lg'>Fallas</h2>
            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla3 columnas={columnasFallas} datos={resultadosFallas} />

              {/* {paginacion ? ( <Paginacion />) : (null)} */}
            </form>
          </>
        )
      }
          
      function Todo(){
        return (
          <>
              <h2 className='font-bold text-lg'>Informacion General</h2>
              <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
  
                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                  <Input campo={'Acronimo'} propiedad={valor.acronimo} />
                  <Input campo={'Estatus'} propiedad={valor.estatus} />
                </div>
  
                <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6'>
                  <Input campo='Nombre' area={true} propiedad={valor.nombre} />
                  <Input campo='Descripcion' area={true} propiedad={valor.descripcion} />
                </div>
                
                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                  <Input campo='Prioridad' propiedad={valor.prioridad} />
                  <Input campo='Alcance' propiedad={valor.alcance} />
  
                  <Input campo={'Responsable Funcional'} propiedad={valor.responsablef} detalles={true} peticionEstado={obtencionDeEstado} />
                  <Input campo={'Responsable Tecnico'} propiedad={valor.responsablet} />
  
                  <div style={valorDevuelto ? {display: 'block'} : {display: 'none'}} className='' >
                    <Input campo={'Nombre'} propiedad={valor.responsablef_ind} />
                    <Input campo={'Apellido'} propiedad={valor.responsablef_ind} />
                    <Input campo={'Indicador'} propiedad={valor.responsablef_ind} />
                    <Input campo={'Cedula'} propiedad={valor.responsablef_cor} />
                    <Input campo={'Telefono'} propiedad={valor.responsablef_tlf} />
                    <Input campo={'Region'} propiedad={valor.responsablef_tlf} />
                    <Input campo={'Localidad'} propiedad={valor.responsablef_tlf} />
                  </div>
                  <div style={valorDevuelto ? {display: 'block'} : {display: 'none'}} className='' >
                    <Input campo={'Nombre'} propiedad={valor.responsablef_ind} />
                    <Input campo={'Apellido'} propiedad={valor.responsablef_ind} />
                    <Input campo={'Indicador'} propiedad={valor.responsablef_ind} />
                    <Input campo={'Cedula'} propiedad={valor.responsablef_cor} />
                    <Input campo={'Telefono'} propiedad={valor.responsablef_tlf} />
                    <Input campo={'Region'} propiedad={valor.responsablef_tlf} />
                    <Input campo={'Localidad'} propiedad={valor.responsablef_tlf} />
                  </div>
  
                  <Input campo='Negocio' propiedad={valor.negocio} />
                  <Input campo='Cliente' propiedad={valor.cliente} />
                  <Input campo='N° de Usuarios' propiedad={valor.cantidad} />
                  <Input campo='Ubicacion Cliente' propiedad={valor.ubicacionCliente} /> 
                
                </div>
              </form>
  
              <h2 className='font-bold text-lg'>Caracteristicas de la Aplicaciones</h2>
              <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                  <Input campo={'Codigo Fuente'} propiedad={valor.codigo_fuente} />
                  <Input campo={'Licencia'} propiedad={valor.licencia} />
                  <Input campo={'Direccion'} propiedad={valor.direccion} />
                  <Input campo='Plataforma' propiedad={valor.plataforma} />
                  <Input campo={'Base de datos'} propiedad={valor.nombreBase} detalles={true} peticionEstado={obtencionDeEstado2} />
                  <Input campo={'Servidor'} propiedad={valor.servidor} />
  
                  <div style={valorDevuelto2 ? {display: 'block'} : {display: 'none'}} className='' >
                    <Input campo={'Lenguaje'} propiedad={valor.lenguaje} />
                    <Input campo={'Nombre Base de datos'} propiedad={valor.nombreBase} />
                    <Input campo={'Estatus Base de datos'} propiedad={valor.estatuBase} />
                    <Input campo={'Tipo Base de datos'} propiedad={valor.tipoBase} />
                    <Input campo={'Manejador Base de datos'} propiedad={valor.manejadorBase} />
                    <Input campo={'Direccion Base de datos'} propiedad={valor.direccionBase} />
                  </div>
                  <div style={valorDevuelto2 ? {display: 'block'} : {display: 'none'}} className='' >
                    <Input campo='Framework' propiedad={valor.framework} />
                    <Input campo={'Nombre Servidor'} propiedad={valor.nombreServidor} />
                    <Input campo={'Estatus Servidor'} propiedad={valor.estatusServidor} />
                    <Input campo={'Ubicacion Servidor'} propiedad={valor.ubicacionServidor} />
                    <Input campo={'Direccion Servidor'} propiedad={valor.direccionServidor} />
                  </div>
  
                  <Input campo={'Documentacion'} propiedad={valor.documentacion} />
                  <Input campo={'Descripcion'} propiedad={valor.descripcionDoc} />
                  <Input campo={'Tipo'} propiedad={valor.tipoDoc} />
                  <Input campo={'Direccion'} propiedad={valor.direccionDoc} />
  
                  <Input campo={'Frecuencia de Mantenimiento'} propiedad={valor.frecuencia} />
                  <Input campo={'Horas Promedio de Mantenimiento'} propiedad={valor.horasProm} />
                  <Input campo={'Tipo de Mantenimiento'} propiedad={valor.tipoMan} />
                  <Input campo={'Horas Anuales de Mantenimiento'} propiedad={valor.horasAnuales} />
                </div>
              </form>
  
              <h2 className='font-bold text-lg'>Informacion de Gestion de la Plataforma</h2>
              <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                  <Input campo={'Region'} propiedad={valor.region} />
                  <Input campo={'Localidad'} propiedad={valor.localidad} />
                  <Input campo={'Fecha de Registro'} propiedad={valor.registro} />
                  <Input campo={'Ultima Actualizacion'} propiedad={valor.ultima} />
                </div>
              </form>
          </>
        )
      }

    return(
      <Container>
        <Radio label=' ' size='big' opciones={opcionesVista} manejador={handleInputChange} />
        {opcion === 'General' ? <General/> : null}
        {opcion === 'Tecnologia' ? <Tecnologia/> : null}
        {opcion === 'Base de datos' ? <Basedatos/> : null }
        {opcion === 'Servidor' ? <Servidor/> : null }
        {opcion === 'Responsables' ? <Responsable/> : null }
        {opcion === 'Documentacion' ? <Documentacion/> : null }
        {opcion === 'Fallas' ? <Fallas/> : null }
      </Container>
    )

};
export default Vista;
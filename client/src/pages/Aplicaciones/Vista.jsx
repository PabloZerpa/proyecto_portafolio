import { useState, useEffect } from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import { useLocation, useParams, Navigate, Link } from 'react-router-dom';
import { Button, Container, Input, Radio } from '../../components';
import Tabla3 from '../../components/Table3';
import Usuarios from '../../services/user.service';

const opcionesVista = ['Todo', 'General','Responsables','Tecnologia',
  'Base de datos','Servidor','Documentacion','Fallas'];

function Vista() {

  const { paramsId } = useParams();
  const location = useLocation();
  const [valor, setValor] = useState(location.state);

  const [valorDevuelto, setValorDevuelto] = useState(false);
  const obtencionDeEstado = (parametroDevuelto) => {setValorDevuelto(parametroDevuelto)};
  const [valorDevuelto2, setValorDevuelto2] = useState(false);
  const obtencionDeEstado2 = (parametroDevuelto) => {setValorDevuelto2(parametroDevuelto)};
  const [opcion, setOpcion] = useState('Todo');

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
  }, [paramsId]);
  
    if(valor === null) 
      return <Navigate to='/' />

      function Tecnologia() {
        return(
          <>
            <h2 className='font-bold text-lg'>Tecnologia</h2>
            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <div className='grid gap-6 mb-6 md:grid-cols-2'>
  
                <Input campo={'Codigo Fuente'} propiedad={valor.codigo_fuente} />
                <Input campo={'Licencia'} propiedad={valor.licencia} />
                <Input campo={'Direccion'} propiedad={valor.direccion} />
                <Input campo='Plataforma' propiedad={valor.plataforma} />
                <Input campo={'Lenguaje'} propiedad={valor.lenguaje} />
                <Input campo='Framework' propiedad={valor.framework} />
  
                <Input campo={'Frecuencia de Mantenimiento'} propiedad={valor.frecuencia} />
                <Input campo={'Horas Promedio de Mantenimiento'} propiedad={valor.horasProm} />
                <Input campo={'Tipo de Mantenimiento'} propiedad={valor.tipoMan} />
                <Input campo={'Horas Anuales de Mantenimiento'} propiedad={valor.horasAnuales} />
              </div>
            </form>
          </>
        )
      }
  
      function General(){
        return(
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
                <Input campo='Negocio' propiedad={valor.negocio} />
                <Input campo='Cliente' propiedad={valor.cliente} />
                <Input campo='N° de Usuarios' propiedad={valor.cantidad} />
                <Input campo='Ubicacion Cliente' propiedad={valor.ubicacionCliente} />  
              </div>
  
            </form>
          </>
        )
      }
  
      function Basedatos (){
        return(
          <>
            <h2 className='font-bold text-lg'>Base de datos</h2>
            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
  
              <div className='grid gap-6 mb-6 md:grid-cols-2'>
                <Input campo={'Base de datos'} propiedad={valor.nombreBase} />
                <Input campo={'Nombre Base de datos'} propiedad={valor.nombreBase} />
                <Input campo={'Estatus Base de datos'} propiedad={valor.estatuBase} />
                <Input campo={'Tipo Base de datos'} propiedad={valor.tipoBase} />
                <Input campo={'Manejador Base de datos'} propiedad={valor.manejadorBase} />
                <Input campo={'Version'} propiedad={valor.versionBase} />
                <Input campo={'Direccion Base de datos'} propiedad={valor.direccionBase} />
                <Input campo={'Sistema Operativo'} propiedad={valor.sistemaBase} />
                <Input campo={'Region'} propiedad={valor.regionBase} />
                <Input campo={'Localidad'} propiedad={valor.localidadBase} />
              </div>
            </form>
          </>
        )
      }
  
      function Servidor(){
        return(
          <>
            <h2 className='font-bold text-lg'>Servidor</h2>
            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
  
              <div className='grid gap-6 mb-6 md:grid-cols-2'>
                <Input campo={'Servidor'} propiedad={valor.servidor} />
                <Input campo={'Nombre Servidor'} propiedad={valor.nombreServidor} />
                <Input campo={'Estatus Servidor'} propiedad={valor.estatusServidor} />
                <Input campo={'Direccion Servidor'} propiedad={valor.direccionServidor} />
                <Input campo={'Sistema Operativo'} propiedad={valor.sistemaServidor} />
                <Input campo={'Marca'} propiedad={valor.direccionServidor} />
                <Input campo={'Modelo'} propiedad={valor.direccionServidor} />
                <Input campo={'Cantidad CPU'} propiedad={valor.direccionServidor} />
                <Input campo={'Velocidad CPU'} propiedad={valor.direccionServidor} />
                <Input campo={'Memoria'} propiedad={valor.direccionServidor} />
                <Input campo={'Region Servidor'} propiedad={valor.regionServidor} />
                <Input campo={'Localidad Servidor'} propiedad={valor.localidadServidor} />
              </div>
            </form>
          </>
        )
      }
  
      function Responsable() {
        return(
          <>
            <h2 className='font-bold text-lg'>Responsables</h2>
            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
  
              <div className='grid gap-6 mb-6 md:grid-cols-2'>
                    
                <Input campo={'Responsable Funcional'} propiedad={valor.responsablef} />
                <Input campo={'Responsable Tecnico'} propiedad={valor.responsablet} />
      
                <div>
                  <Input campo={'Nombre'} propiedad={valor.responsablef_ind} />
                  <Input campo={'Apellido'} propiedad={valor.responsablef_ind} />
                  <Input campo={'Indicador'} propiedad={valor.responsablef_ind} />
                  <Input campo={'Cedula'} propiedad={valor.responsablef_cor} />
                  <Input campo={'Telefono'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'Correo'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'Region'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'Localidad'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'Rol'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'Gerencia'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'SubGerencia'} propiedad={valor.responsablef_tlf} />
                </div>
                <div>
                  <Input campo={'Nombre'} propiedad={valor.responsablef_ind} />
                  <Input campo={'Apellido'} propiedad={valor.responsablef_ind} />
                  <Input campo={'Indicador'} propiedad={valor.responsablef_ind} />
                  <Input campo={'Cedula'} propiedad={valor.responsablef_cor} />
                  <Input campo={'Telefono'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'Correo'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'Region'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'Localidad'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'Rol'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'Gerencia'} propiedad={valor.responsablef_tlf} />
                  <Input campo={'SubGerencia'} propiedad={valor.responsablef_tlf} />
                </div>
                  
              </div>
            </form>
          </>
        )
      }
  
  
      function Documentacion(){
        return (
          <>
            <h2 className='font-bold text-lg'>Documentacion</h2>
            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
  
              <div className='grid gap-6 mb-6 md:grid-cols-2'>
                <Input campo={'Documentacion'} propiedad={valor.documentacion} />
                <Input campo={'Descripcion'} propiedad={valor.descripcionDoc} />
                <Input campo={'Tipo'} propiedad={valor.tipoDoc} />
                <Input campo={'Direccion'} propiedad={valor.direccionDoc} />
              </div>
  
            </form>
          </>
        )
      }

      const columnasFallas = ['Numero','Clase','Descripcion','Solucion','Ver'];
      const resultadosFallas = [
          {id:'10',clase:'Aplicaciones',descripcion:'aaaaaaaaaaaaaa',solucion:'xxxxxxx',
            editar:
            <Link to={`/administracion/solicitudes/${1}`}>
              <FaPlus className="text-base text-blue-500 cursor-pointer ml-4" />
            </Link>},
          {id:'20',clase:'Aplicaciones',descripcion:'bbbbbbb',solucion:'yyyy',
            editar:
            <Link to={`/administracion/solicitudes/${1}`}>
              <FaPlus className="text-base text-blue-500 cursor-pointer ml-4" />
            </Link>},
          {id:'30',clase:'Base de datos',descripcion:'cccccccccccc',solucion:'zzzzzzzzzzzz',
            editar:
            <Link to={`/administracion/solicitudes/${1}`}>
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
        {opcion === 'Todo' ? <Todo/> : null}
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

import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Container, Input, Radio } from '../../components';
import Tabla3 from '../../components/Table3';
import Usuarios from '../../services/user.service';

const opcionesVista = ['General','Tecnologia',
  'Base de datos','Servidor','Responsables','Documentacion','Fallas'];

function Vista() {

  const { id } = useParams();
  //const location = useLocation();
  const [valor, setValor] = useState('');
  const [opcion, setOpcion] = useState('General');

  const handleInputChange = (e) => {
    setOpcion(e.target.value);
  }
  
  useEffect(() => {
    //console.log(location.state);
    async function fetchData(){
      try {
        const response = await Usuarios.obtenerDato(id)
        setValor(response.data);
        console.log(response.data);
        console.log(valor);
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
                <Input campo='Cliente' propiedad={valor.apl_cliente} />
                <Input campo='N° Usuarios' propiedad={valor.apl_cantidad_usuarios} />
                <Input campo='Region' propiedad={valor.region} />  
              </div>
  
            </form>
          </>
        )
      }

      const columnasTec = ['Codigo','Licencia','Plataforma','Lenguaje','Framework','Base de datos',
      'Servidor','Mantenimiento','Horas Prom','Horas Anuales'];
      const resultadosTec = [
          {
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

      const columnasBas = ['Nombre','Estatus','Tipo','Manejador','Tipo Ambiente','N° Usuarios','Servidor'];
      const resultadosBas = [
        {
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
  
      const columnasSer = ['Nombre','Estatus','Direccion','Sistema Operativo','Version OS','Marca','Modelo',
      'Serial','Cantidad CPU','Velocidad','Memoria','Region','Localidad'];
      const resultadosSer = [
          {
            servidor: valor.servidor,
            estatus: valor.ser_estatus,
            direccion: valor.ser_direccion,
            sistema_operativo: valor.sistema,
            version_sistema: valor.sistema_version,
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

      const columnasRes = ['Custodio','Nombre','Apellido','Indicador','Cedula','Cargo','Telefono',
      'Region','Localidad','Gerencia','SubGerencia'];
      const resultadosRes = [
        {
          tipo: 'Funcional',
          nombre: valor.res_nombre,
          apellido: valor.res_apellido,
          indicador: valor.res_indicador,
          cedula: valor.res_cedula,
          cargo: valor.res_cargo,
          telefono: valor.res_telefono,
          region: valor.res_region,
          localidad: valor.res_localidad,
          gerencia: valor.res_gerencia,
          subgerencia: valor.res_subgerencia,
        },
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

      const columnasDoc = ['Descripcion','Direccion','Tipo','Fecha'];
      const resultadosDoc = [
          {descripcion: valor.doc_descripcion,direccion: valor.doc_direccion, tipo: valor.doc_tipo,},
          {tipo:'Aplicaciones',descripcion:'aaaaaaaaaaaaaa',direccion:'xxxxxxx',fecha:'12/12/2009',},
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
            numero: valor.fal_numero,
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
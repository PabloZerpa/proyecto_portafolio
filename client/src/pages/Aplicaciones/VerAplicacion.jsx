
import { useState, useEffect } from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Button, Container, Input, Radio, TextArea } from '../../components';
import Tabla3 from '../../components/Table3';
import Aplicacion from '../../services/aplicacion.service';

const opcionesVista = ['General','Tecnologia',
  'Base de datos','Servidor','Responsables','Documentacion','Fallas'];

function VerAplicacion() {

  const { id } = useParams();
  const [valor, setValor] = useState('');

  const [opcion, setOpcion] = useState('General');
  const [general, setGeneral] = useState('');
  const [tecnologia, setTecnologia] = useState('');
  const [basedatos, setBaseDatos] = useState('');
  const [servidor, setServidor] = useState('');
  const [responsables, setResponsables] = useState('');
  const [documentacion, setDocumentacion] = useState('');
  const [fallas, setFallas] = useState('');

  const handleInputChange = (e) => {
    setOpcion(e.target.value);
  }
  
  useEffect(() => {
    async function fetchData(){
      try {
        const gen = await Aplicacion.obtenerGeneral(id);
        const tec = await Aplicacion.obtenerTecnologia(id);
        const bas = await Aplicacion.obtenerBaseDatos(id);
        const ser = await Aplicacion.obtenerServidor(id);
        const res = await Aplicacion.obtenerResponsable(id);
        const doc = await Aplicacion.obtenerDocumentacion(id);
        const fal = await Aplicacion.obtenerFallas(id);

        setGeneral(gen.data[0]);
        setTecnologia(tec);
        setBaseDatos(bas);
        setServidor(ser);
        setResponsables(res);
        setDocumentacion(doc);
        setFallas(fal);
      }catch (error) { console.log(error) }
    } 
    fetchData();
  }, []);
  
    if(valor === null) 
      return <Navigate to='/' />

      function General(){
        return(
          <>
            <h2 className='font-bold text-lg'>Informacion General</h2>
            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
    
              <div className='grid gap-6 mb-6 md:grid-cols-2'>
                <Input campo='Acronimo' propiedad={general.apl_acronimo} editable={false} />
                <Input campo='Estatus' propiedad={general.apl_estatus} editable={false} />
                <Input campo='Version' propiedad={general.apl_version} editable={false} />
                <Input campo='Direccion' propiedad={general.apl_direccion} editable={false} />
              </div>
    
              <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6'>
                <TextArea campo='Nombre' propiedad={general.apl_nombre} editable={false} />
                <TextArea campo='Descripcion' propiedad={general.apl_descripcion} editable={false} />
              </div>
                
              <div className='grid gap-6 mb-6 md:grid-cols-2'>
                <Input campo='Prioridad' propiedad={general.apl_prioridad} editable={false} />
                <Input campo='Alcance' propiedad={general.apl_alcance} editable={false} />
                <Input campo='Critico' propiedad={general.apl_critico} editable={false} />
                <Input campo='Codigo Fuente' propiedad={general.apl_codigo_fuente} editable={false} />
                <Input campo='N° Usuarios' propiedad={general.apl_cantidad_usuarios} editable={false} />
                <Input campo='Region' propiedad={general.region} editable={false} /> 
              </div>
            </form>
          </>
        )
      }

      function Tecnologia() {
        const datos = tecnologia.data.datos;
        console.log(tecnologia.data.datos);
        const plataformas = tecnologia.data.plataformas;
        const lenguajes = tecnologia.data.lenguajes;

        return(
          <> 
            <h2 className='font-bold text-lg'>Tecnologia</h2>
            <form className="grid grid-cols-2 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >

              <div className='col-span-2'>
                <Tabla3 columnas={['Mantenimiento','Horas Prom','Horas Anuales']} datos={datos} />
              </div>
              
              <Tabla3 columnas={['Plataformas']} datos={plataformas} />
              <Tabla3 columnas={['Lenguaje', 'Version', 'Framework']} datos={lenguajes} />
            </form>
          </>
        )
      }

      const columnasBas = ['Nombre','Estatus','Tipo','Manejador','Version','N° Usuarios',
      'Tipo Ambiente','Servidor'];
  
      function Basedatos (){
        const datos = basedatos.data.datos;
        return(
          <>
            <h2 className='font-bold text-lg'>Base de datos</h2>
            <form className="flex justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla3 columnas={columnasBas} datos={datos} />
            </form>
          </>
        )
      }
  
      const columnasSer = ['Nombre','Direccion','Estatus','Sistema Operativo','Version OS','Region','Localidad'];
      const columnasMod = ['Modelo','Marca','Serial','Cantidad CPU','Velocidad','Memoria'];

      function Servidor(){
        const datos = servidor.data.datos;
        const modelos = servidor.data.modelos;
        return(
          <>
            <h2 className='font-bold text-lg'>Servidor</h2>
            <form className="flex flex-col justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla3 columnas={columnasSer} datos={datos} />
              <Tabla3 columnas={columnasMod} datos={modelos} />
            </form>
          </>
        )
      }

      const columnasRes = ['Nombre','Apellido','Indicador','Cedula','Telefono','Cargo',
      'Gerencia','Region','Localidad'];
  
      function Responsable() {
        const funcional = responsables.data.funcional;
        const tecnico = responsables.data.tecnico;
        return(
          <>
            <h2 className='font-bold text-lg'>Responsables</h2>
            <form className="flex flex-col justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              
              <div className="flex flex-col justify-center items-center">
                <h3 className='font-bold text-base'>Responsables Funcional</h3>
                <Tabla3 columnas={columnasRes} datos={funcional} />
              </div>

              <div className="flex flex-col justify-center items-center">
                <h3 className='font-bold text-base'>Responsables Tecnico</h3>
                <Tabla3 columnas={columnasRes} datos={tecnico} />
              </div>

            </form>
          </>
        )
      }

      const columnasDoc = ['Descripcion','Direccion','Tipo','Fecha'];

      function Documentacion(){
        const datos = documentacion.data.datos;
        return (
          <>
            <h2 className='font-bold text-lg'>Documentacion</h2>
            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla3 columnas={columnasDoc} datos={datos} />
            </form>
          </>
        )
      }

      const columnasFallas = ['ID','Clase','Descripcion','Solucion','Impacto'];

      function Fallas(){
        let datos = fallas.data.datos;
        return (
          <>
            <h2 className='font-bold text-lg'>Fallas</h2>
            <form className="relative w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla3 columnas={columnasFallas} datos={datos} />
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
export default VerAplicacion;
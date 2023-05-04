
import { useState, useEffect } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { useParams, Navigate, Link } from 'react-router-dom';
import { Container, Input, Radio, Tabla } from '../../components';
import Servidor from '../../services/servidor.service';

const opcionesVista = ['General','Base de datos','Aplicacion'];

function VerServidor() {

  const { id } = useParams();
  const [valor, setValor] = useState('');
  const [load, setLoad] = useState(true);

  const [opcion, setOpcion] = useState('General');
  const [general, setGeneral] = useState('');
  const [basedatos, setBaseDatos] = useState('');
  const [aplicacion, setAplicacion] = useState('');

  const handleInputChange = (e) => {
    setOpcion(e.target.value);
  }
  
  useEffect(() => {
    async function fetchData(){
      try {
        const gen = await Servidor.obtenerGeneralServidor(id);
        const bas = await Servidor.obtenerBDServidor(id);
        const apl = await Servidor.obtenerAplicacionServidor(id);
        
        setGeneral(gen.data[0]);
        setBaseDatos(bas.data);
        setAplicacion(apl.data);

        setLoad(false);
          
      }catch (error) { console.log(error) }
    } 
    fetchData();
  }, [id,load]);
  
    if(valor === null) 
      return <Navigate to='/' />
      
      function General(){
        
        if(load){
          return <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
        }
        else{
          return(
            <>
              <h2 className='font-bold text-lg'>Servidor</h2>
              <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <div className='grid space-x-4 mb-6 md:grid-cols-2'> 
                  <Input campo='ID' editable={false} propiedad={general.servidor_id} />
                  <Input campo='Nombre' editable={false} propiedad={general.servidor} />
                  <Input campo='Estatus' editable={false} propiedad={general.ser_estatus} />
                  <Input campo='Direccion' editable={false} propiedad={general.ser_direccion} />
                  <Input campo='OS' editable={false} propiedad={general.sistema} />
                  <Input campo='Version' editable={false} propiedad={general.sistema_version} />
                  <Input campo='Modelo' editable={false} propiedad={general.modelo} />
                  <Input campo='Marca' editable={false} propiedad={general.marca} />
                  <Input campo='Serial' editable={false} propiedad={general.mod_serial} />
                  <Input campo='Cantidad CPU' editable={false} propiedad={general.mod_cantidad_cpu} />
                  <Input campo='Velocidad CPU' editable={false} propiedad={general.mod_velocidad_cpu} />
                  <Input campo='Memoria' editable={false} propiedad={general.mod_memoria} />
                  <Input campo='Region' editable={false} propiedad={general.region} />
                  <Input campo='Localidad' editable={false} propiedad={general.localidad} />
                </div>
              </form>
            </>
          ) 
        }
      } 

      const columnsBD = [
        {
            name: 'ID',
            selector: row => 
              <Link className='text-blue-700' to={row ? `/basedatos/${row.base_datos_id}` : `/dashboard`} >
                {row.base_datos_id}
              </Link>,
            sortable: true,
            left: true,
            width: '60px'
        },
        {
            name: 'Nombre',
            selector: row => row.base_datos,
            sortable: true,
            left: true,
            grow: 2
        },
        {
            name: 'Estatus',
            selector: row => row.bas_estatus,
            sortable: true,
            left: true,
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: true,
            left: true,
            grow: 1.5
        },
        {
            name: 'Manejador',
            selector: row => row.manejador,
            sortable: true,
            left: true
        },
        {
            name: 'Tipo Ambiente',
            selector: row => row.tipo_ambiente,
            sortable: true,
            left: true,
            grow: 2
        },
        {
          name: 'N° Usuarios',
          selector: row => row.bas_cantidad_usuarios,
          sortable: true,
          left: true,
          grow: 1.5
        }
      ];
  
      function Basedatos (){
        const datos = basedatos;
        return(
          <>
            <h2 className='font-bold text-lg'>Base de datos</h2>
            <form className="flex justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla columnas={columnsBD} datos={datos} />
            </form>
          </>
        )
      }
      
      const columnsApl = [
        {
            name: 'ID',
            selector: row => 
              <Link className='text-blue-700' to={row ? `/aplicaciones/${row.aplicacion_id}` : `/dashboard`} >
                {row.aplicacion_id}
              </Link>,
            sortable: true,
            left: true,
            width: '60px'
        },
        {
          name: 'Acronimo',
          selector: row => row.apl_acronimo,
          sortable: true,
          left: true,
        },
        {
            name: 'Nombre',
            selector: row => row.apl_nombre,
            sortable: true,
            left: true,
            grow: 2
        },
        {
          name: 'Descripcion',
          selector: row => row.apl_descripcion,
          sortable: true,
          left: true,
          grow: 2
        },
        {
            name: 'Estatus',
            selector: row => row.estatus,
            sortable: true,
            left: true,
        },
        {
            name: 'Prioridad',
            selector: row => row.prioridad,
            sortable: true,
            left: true,
            grow: 1.5
        },
        {
            name: 'Alcance',
            selector: row => row.alcance,
            sortable: true,
            left: true
        },
        {
            name: 'Codigo Fuente',
            selector: row => row.apl_codigo_fuente,
            sortable: true,
            left: true,
            grow: 2
        },
        {
          name: 'Version',
          selector: row => row.apl_version,
          sortable: true,
          left: true,
          grow: 1.5
        },
        {
          name: 'Direccion',
          selector: row => 
            <a className='text-blue-700' href={row.apl_direccion} target='_blank' >
              {row.apl_direccion}
            </a>,
          sortable: true,
          left: true,
          grow: 1.5
        },
        {
          name: 'N° Usuarios',
          selector: row => row.apl_cantidad_usuarios,
          sortable: true,
          left: true,
          grow: 1.5
        },
        {
          name: 'Region',
          selector: row => row.region,
          sortable: true,
          left: true,
          grow: 1.5
        },
      ];

      function Aplicacion() {
        const datos = aplicacion;
        return(
          <> 
            <h2 className='font-bold text-lg'>Aplicacion</h2>
            <form className="grid grid-cols-1 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <Tabla columnas={columnsApl} datos={datos} />
            </form>
          </>
        )
      }

    return(
      <Container>
        <Radio label=' ' size='big' opciones={opcionesVista} manejador={handleInputChange} />
        {opcion === 'General' ? <General/> : null}
        {opcion === 'Base de datos' ? <Basedatos/> : null }
        {opcion === 'Aplicacion' ? <Aplicacion/> : null}
      </Container>
    )

};
export default VerServidor;
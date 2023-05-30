
import { useState, useEffect } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { useParams, Link } from 'react-router-dom';
import { Container, Input, Radio, Tabla } from '../../components';
import { rutaServidor } from '../../utils/APIRoutes';
import axios from 'axios';
import authHeader from '../../utils/header';

const opcionesVista = ['General','Base de datos','Aplicacion'];

function VerServidor() {

  // -------- ESTADOS ---------
  const { id } = useParams();
  const [load, setLoad] = useState(true);

  const [opcion, setOpcion] = useState('General');
  const [general, setGeneral] = useState('');
  const [basedatos, setBaseDatos] = useState('');
  const [aplicacion, setAplicacion] = useState('');

  // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
  const setValores = (e) => {
    setOpcion(e.target.value);
  }
  
  useEffect(() => {
    async function fetchData(){
      try {
        const {data} = await axios.get(`${rutaServidor}/${id}`, { headers: authHeader() });
        
        setGeneral(data.general);
        setBaseDatos(data.basedatos);
        setAplicacion(data.aplicaciones);

        setLoad(false);
          
      }catch (error) { console.log(error.response.data.message); }
    } 
    fetchData();
  }, [id]);
      
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
                  <Input campo='Estatus' editable={false} propiedad={general.estatus} />
                  <Input campo='Direccion' editable={false} propiedad={general.ser_direccion} />
                  <Input campo='OS' editable={false} propiedad={general.sistema} />
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
            width: '150px',
            left: true,
        },
        {
            name: 'Estatus',
            selector: row => row.estatus,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
            name: 'Manejador',
            selector: row => row.manejador,
            sortable: true,
            width: '150px',
            left: true
        },
        {
            name: 'Tipo Ambiente',
            selector: row => row.ambiente,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
          name: 'N° Usuarios',
          selector: row => row.base_cantidad_usuarios,
          sortable: true,
          width: '120px',
          left: true,
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
          width: '150px',
          left: true,
        },
        {
            name: 'Nombre',
            selector: row => row.apl_nombre,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
            name: 'Estatus',
            selector: row => row.estatus,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
            name: 'Prioridad',
            selector: row => row.prioridad,
            sortable: true,
            width: '100px',
            left: true,
        },
        {
            name: 'Alcance',
            selector: row => row.alcance,
            sortable: true,
            width: '150px',
            left: true
        },
        {
          name: 'Direccion',
          selector: row => 
            <a className='text-blue-700' href={`https://${row.apl_direccion}`} rel="noreferrer" target='_blank' >
              {row.apl_direccion}
            </a>,
          sortable: true,
          width: '200px',
          left: true,
        },
        {
          name: 'N° Usuarios',
          selector: row => row.apl_cantidad_usuarios,
          sortable: true,
          width: '120px',
          left: true,
        },
        {
          name: 'Region',
          selector: row => row.region,
          sortable: true,
          width: '200px',
          left: true,
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
        <Radio label=' ' size='big' opciones={opcionesVista} manejador={setValores} />
        {opcion === 'General' ? <General/> : null}
        {opcion === 'Base de datos' ? <Basedatos/> : null }
        {opcion === 'Aplicacion' ? <Aplicacion/> : null}
      </Container>
    )

};
export default VerServidor;
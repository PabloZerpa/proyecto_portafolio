
import { useState, useEffect } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { useParams, Link } from 'react-router-dom';
import { Container, Input, Radio, Tabla } from '../../components';
import { rutaBaseDatos } from '../../utils/APIRoutes';
import axios from 'axios';
import authHeader from '../../utils/header';
import { Notificacion } from '../../utils/Notificacion';

const opcionesVista = ['General','Aplicacion','Servidor'];

function VerBD() { 

  // -------- ESTADOS --------- 
  const { id } = useParams();
  const [load, setLoad] = useState(true);

  const [opcion, setOpcion] = useState('General');
  const [general, setGeneral] = useState('');
  const [aplicacion, setAplicacion] = useState('');
  const [servidor, setServidor] = useState('');

  // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
  const setValores = (e) => {
    setOpcion(e.target.value);
  }
  
  useEffect(() => {
    async function fetchData(){
      try {
        const {data} = await axios.get(`${rutaBaseDatos}/${id}`, { headers: authHeader() });

        setGeneral(data.general);
        setAplicacion(data.aplicaciones);
        setServidor(data.servidores);

        setLoad(false);
          
      }catch (error) { Notificacion(error.response.data.message, 'error'); }
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
              <h2 className='font-bold text-lg'>Base de datos</h2>
              <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <div className='grid space-x-4 mb-6 md:grid-cols-2'> 
                  <Input campo='ID' editable={false} propiedad={general.base_datos_id} />
                  <Input campo='Nombre' editable={false} propiedad={general.base_datos} />
                  <Input campo='Estatus' editable={false} propiedad={general.estatus} />
                  <Input campo='Tipo' editable={false} propiedad={general.tipo} />
                  <Input campo='Manejador' editable={false} propiedad={general.manejador} />
                  <Input campo='N° Usuarios' editable={false} propiedad={general.base_cantidad_usuarios} />
                  <Input campo='Ambiente' editable={false} propiedad={general.ambiente} />
                </div>
              </form>
            </>
          ) 
        }
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
          width: '100px',
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
          width: '150px',
          left: true,
        },
        {
          name: 'Region',
          selector: row => row.region,
          sortable: true,
          width: '150px',
          left: true,
        },
      ];

      function Aplicacion() {
        return(
          <> 
            <h2 className='font-bold text-lg'>Aplicacion</h2>
            <form className="grid grid-cols-1 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <Tabla columnas={columnsApl} datos={aplicacion} />
            </form>
          </>
        )
      }

      const columnsSer = [
        {
            name: 'ID',
            selector: row => 
              <Link className='text-blue-700' to={row ? `/servidor/${row.servidor_id}` : `/dashboard`} >
                {row.servidor_id}
              </Link>,
            sortable: true,
            left: true,
            width: '60px'
        },
        {
            name: 'Nombre',
            selector: row => row.servidor,
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
            name: 'OS',
            selector: row => row.sistema,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
            name: 'Modelo',
            selector: row => row.modelo,
            sortable: true,
            width: '150px',
            left: true
        },
        {
            name: 'Marca',
            selector: row => row.marca,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
          name: 'Direccion',
          selector: row => 
            <a className='text-blue-700' href={`https://${row.ser_direccion}`} rel="noreferrer" target='_blank' >
              {row.ser_direccion}
            </a>,
          sortable: true,
          width: '200px',
          left: true,
        },
        {
          name: 'Region',
          selector: row => row.region,
          sortable: true,
          width: '150px',
          left: true,
        },
        {
          name: 'Localidad',
          selector: row => row.localidad,
          sortable: true,
          width: '150px',
          left: true,
        },
      ];

      function Servidor(){
        const datos = servidor.datos;
        return(
          <>
            <h2 className='font-bold text-lg'>Servidor</h2>
            <form className="grid grid-cols-1 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <Tabla columnas={columnsSer} datos={datos} />
            </form>
          </>
        )
      }

    return(
      <Container>
        <Radio label=' ' size='big' opciones={opcionesVista} manejador={setValores} />
        {opcion === 'General' ? <General/> : null}
        {opcion === 'Aplicacion' ? <Aplicacion/> : null}
        {opcion === 'Servidor' ? <Servidor/> : null }
      </Container>
    )

};
export default VerBD;
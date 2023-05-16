
import { useState, useEffect } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { useParams, Link } from 'react-router-dom';
import { Container, Input, Radio, Tabla } from '../../components';
import Base from '../../services/basedatos.service';

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
        const gen = await Base.obtenerGeneralBD(id);
        const apl = await Base.obtenerAplicacionBD(id);
        const ser = await Base.obtenerServidorBD(id); 

        setGeneral(gen.data);
        setAplicacion(apl.data);
        setServidor(ser);

        setLoad(false);
          
      }catch (error) { console.log(error) }
    } 
    fetchData();
  }, [id,load]);
      
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
                  <Input campo='ID' editable={false} propiedad={general[0].base_datos_id} />
                  <Input campo='Nombre' editable={false} propiedad={general[0].base_datos} />
                  <Input campo='Estatus' editable={false} propiedad={general[0].estatus} />
                  <Input campo='Tipo' editable={false} propiedad={general[0].tipo} />
                  <Input campo='Manejador' editable={false} propiedad={general[0].manejador} />
                  <Input campo='Version' editable={false} propiedad={general[0].version_manejador} />
                  <Input campo='N° Usuarios' editable={false} propiedad={general[0].base_cantidad_usuarios} />
                  <Input campo='Ambiente' editable={false} propiedad={general[0].ambiente} />
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
            //grow: 2
        },
        // {
        //   name: 'Descripcion',
        //   selector: row => row.apl_descripcion,
        //   sortable: true,
        //   width: '200px',
        //   left: true,
        //   //grow: 2
        // },
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
            //grow: 1.5
        },
        {
            name: 'Alcance',
            selector: row => row.alcance,
            sortable: true,
            width: '150px',
            left: true
        },
        // {
        //     name: 'Codigo Fuente',
        //     selector: row => row.apl_codigo_fuente,
        //     sortable: true,
        //     width: '60px',
        //     left: true,
        //     //grow: 2
        // },
        // {
        //   name: 'Version',
        //   selector: row => row.apl_version,
        //   sortable: true,
        //   width: '60px',
        //   left: true,
        //   //grow: 1.5
        // },
        {
          name: 'Direccion',
          selector: row => 
            <a className='text-blue-700' href={row.apl_direccion} rel="noreferrer" target='_blank' >
              {row.apl_direccion}
            </a>,
          sortable: true,
          width: '200px',
          left: true,
          //grow: 1.5
        },
        {
          name: 'N° Usuarios',
          selector: row => row.apl_cantidad_usuarios,
          sortable: true,
          width: '150px',
          left: true,
          //grow: 1.5
        },
        {
          name: 'Region',
          selector: row => row.region,
          sortable: true,
          width: '150px',
          left: true,
          //grow: 1.5
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
            <a className='text-blue-700' href={row.ser_direccion} rel="noreferrer" target='_blank' >
              {row.ser_direccion}
            </a>,
          sortable: true,
          width: '200px',
          left: true,
          //grow: 2
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
        const datos = servidor.data.datos;
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
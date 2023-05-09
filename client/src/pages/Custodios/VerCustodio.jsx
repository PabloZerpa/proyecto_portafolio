
import { useState, useEffect } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { useParams, Link } from 'react-router-dom';
import { Container, Input, Radio, Tabla } from '../../components';
import Custodio from '../../services/custodios.service';

const opcionesVista = ['General'];

function VerCustodio() {

  // -------- ESTADOS ---------
  const { id } = useParams();
  const [load, setLoad] = useState(true);

  const [opcion, setOpcion] = useState('General');
  const [general, setGeneral] = useState('');
  //const [aplicacion, setAplicacion] = useState('');

  // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
  const setValores = (e) => {
    setOpcion(e.target.value);
  }
  
  useEffect(() => {
    async function fetchData(){
      try {
        const gen = await Custodio.obtenerGeneral(id);
        //const apl = await Custodio.obtenerAplicacion(id);

        setGeneral(gen.data[0]);
        //setAplicacion(apl.data);

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
              <h2 className='font-bold text-lg'>Servidor</h2>
              <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <div className='grid space-x-4 mb-6 md:grid-cols-2'> 
                  <Input campo='ID' editable={false} propiedad={general.custodio_id} />
                  <Input campo='Nombre' editable={false} propiedad={general.cus_nombre} />
                  <Input campo='Apellido' editable={false} propiedad={general.cus_apellido} />
                  <Input campo='Indicador' editable={false} propiedad={general.cus_indicador} />
                  <Input campo='Cedula' editable={false} propiedad={general.cus_cedula} />
                  <Input campo='Telefono' editable={false} propiedad={general.telefono} />
                  <Input campo='Cargo' editable={false} propiedad={general.cargo} />
                  <Input campo='Gerencia' editable={false} propiedad={general.gerencia} />
                  <Input campo='Region' editable={false} propiedad={general.region} />
                  <Input campo='Localidad' editable={false} propiedad={general.localidad} />
                </div>
              </form>
            </>
          ) 
        }
      } 
      
      // const columnsApl = [
      //   {
      //       name: 'ID',
      //       selector: row => 
      //         <Link className='text-blue-700' to={row ? `/aplicaciones/${row.aplicacion_id}` : `/dashboard`} >
      //           {row.aplicacion_id}
      //         </Link>,
      //       sortable: true,
      //       left: true,
      //       width: '60px'
      //   },
      //   {
      //     name: 'Acronimo',
      //     selector: row => row.apl_acronimo,
      //     sortable: true,
      //     left: true,
      //   },
      //   {
      //       name: 'Nombre',
      //       selector: row => row.apl_nombre,
      //       sortable: true,
      //       left: true,
      //       grow: 2
      //   },
      //   {
      //     name: 'Descripcion',
      //     selector: row => row.apl_descripcion,
      //     sortable: true,
      //     left: true,
      //     grow: 2
      //   },
      //   {
      //       name: 'Estatus',
      //       selector: row => row.estatus,
      //       sortable: true,
      //       left: true,
      //   },
      //   {
      //       name: 'Prioridad',
      //       selector: row => row.prioridad,
      //       sortable: true,
      //       left: true,
      //       grow: 1.5
      //   },
      //   {
      //       name: 'Alcance',
      //       selector: row => row.alcance,
      //       sortable: true,
      //       left: true
      //   },
      //   {
      //       name: 'Codigo Fuente',
      //       selector: row => row.apl_codigo_fuente,
      //       sortable: true,
      //       left: true,
      //       grow: 2
      //   },
      //   {
      //     name: 'Version',
      //     selector: row => row.apl_version,
      //     sortable: true,
      //     left: true,
      //     grow: 1.5
      //   },
      //   {
      //     name: 'Direccion',
      //     selector: row => 
      //       <a className='text-blue-700' href={row.apl_direccion} rel='nonferrer' target='_blank' >
      //         {row.apl_direccion}
      //       </a>,
      //     sortable: true,
      //     left: true,
      //     grow: 1.5
      //   },
      //   {
      //     name: 'N° Usuarios',
      //     selector: row => row.apl_cantidad_usuarios,
      //     sortable: true,
      //     left: true,
      //     grow: 1.5
      //   },
      //   {
      //     name: 'Region',
      //     selector: row => row.region,
      //     sortable: true,
      //     left: true,
      //     grow: 1.5
      //   },
      // ];

      // function Aplicacion() {
      //   console.log(aplicacion);
      //   const datos = aplicacion;
      //   return(
      //     <> 
      //       <h2 className='font-bold text-lg'>Aplicacion</h2>
      //       <form className="grid grid-cols-1 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
      //           <Tabla columnas={columnsApl} datos={datos} />
      //       </form>
      //     </>
      //   )
      // }

    return(
      <Container>
        <Radio label=' ' size='big' opciones={opcionesVista} manejador={setValores} />
        {opcion === 'General' ? <General/> : null}
        {/* {opcion === 'Aplicacion' ? <Aplicacion/> : null} */}
      </Container>
    )

};
export default VerCustodio;
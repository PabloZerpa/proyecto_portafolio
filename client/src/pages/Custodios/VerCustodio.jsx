
import { useState, useEffect } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { useParams, Link } from 'react-router-dom';
import { Container, Input, Radio, Tabla } from '../../components';
import axios from 'axios';
import { rutaCustodio } from '../../utils/APIRoutes';
import authHeader from '../../utils/header';

const opcionesVista = ['General','Aplicacion'];

function VerCustodio() {

  // -------- ESTADOS ---------
  const { id } = useParams();
  const [load, setLoad] = useState(true);

  const [opcion, setOpcion] = useState('General');
  const [general, setGeneral] = useState('');
  const [aplFuncional, setAplFuncional] = useState('');
  const [aplTecnico, setAplTecnico] = useState('');

  // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
  const setValores = (e) => {
    setOpcion(e.target.value);
  }
  
  useEffect(() => {
    async function fetchData(){
      try {
        const {data} = await axios.get(`${rutaCustodio}/${id}`, { headers: authHeader() });
        
        setGeneral(data.general);
        setAplFuncional(data.aplicacionFuncional);
        setAplTecnico(data.aplicacionTecnico);

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
              <h2 className='font-bold text-lg'>Custodio</h2>
              <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <div className='grid space-x-4 mb-6 md:grid-cols-2'> 
                  <Input campo='Nombre' editable={false} propiedad={general.cus_nombre} />
                  <Input campo='Apellido' editable={false} propiedad={general.cus_apellido} />
                  <Input campo='Indicador' editable={false} propiedad={general.cus_indicador} />
                  <Input campo='Cedula' editable={false} propiedad={general.cus_cedula} />
                  <Input campo='Correo' editable={false} propiedad={`${general.cus_indicador}@pdvsa.com`} />
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
            width: '150px',
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
        return(
          <> 
            <h2 className='font-bold text-lg'>Aplicaciones como Custodio Funcional</h2>
            <form className="grid grid-cols-1 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla columnas={columnsApl} datos={aplFuncional} />
            </form>

            <h2 className='font-bold text-lg'>Aplicaciones como Custodio Tecnico</h2>
            <form className="grid grid-cols-1 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla columnas={columnsApl} datos={aplTecnico} />
            </form>
          </>
        )
      }

    return(
      <Container>
        <Radio label=' ' size='big' opciones={opcionesVista} manejador={setValores} />
        {opcion === 'General' ? <General/> : null}
        {opcion === 'Aplicacion' ? <Aplicacion/> : null}
      </Container>
    )

};
export default VerCustodio;
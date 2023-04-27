
import { useState, useEffect } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { useParams, Navigate, Link } from 'react-router-dom';
import { Container, Input, Radio } from '../../components';
import Tabla3 from '../../components/Table3';
import Base from '../../services/basedatos.service';
import DataTable from 'react-data-table-component';

const opcionesVista = ['General','Aplicacion','Servidor'];

function VerBD() {

  const { id } = useParams();
  const [valor, setValor] = useState('');
  const [load, setLoad] = useState(true);

  const [opcion, setOpcion] = useState('General');
  const [general, setGeneral] = useState('');
  const [aplicacion, setAplicacion] = useState('');
  const [servidor, setServidor] = useState('');

  const handleInputChange = (e) => {
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

        console.log(aplicacion);

        setLoad(false);
          
      }catch (error) { console.log(error) }
    } 
    fetchData();
  }, [id,load]);
  
    if(valor === null) 
      return <Navigate to='/' />

      // const columnasBas = ['ID','Nombre','Estatus','Tipo','Manejador','Version','N° Usuarios','Tipo Ambiente'];
      const columnasApl = ['ID','Acronimo','Nombre','Descripcion','Estatus','Prioridad','Critico','Alcance',
      'Codigo','Version','Direccion','N° Usuarios','Region'];
      const columnasSer = ['ID','Nombre','Direccion','Estatus','Sistema Operativo','Version OS','Region','Localidad'];
      const columnasMod = ['Modelo','Marca','Serial','Cantidad CPU','Velocidad','Memoria'];
      
      function General(){
        //const datos = general.data;
        
        if(load){
          return <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
        }
        else{
          return(
            <>
              <h2 className='font-bold text-lg'>Base de datos</h2>
              <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <div className='grid gap-4 mb-6 md:grid-cols-2'>
                  <Input campo='ID' propiedad={general[0].base_datos_id} />
                  <Input campo='Nombre' propiedad={general[0].base_datos} />
                  <Input campo='Estatus' propiedad={general[0].bas_estatus} />
                  <Input campo='Tipo' propiedad={general[0].tipo} />
                  <Input campo='Manejador' propiedad={general[0].manejador} />
                  <Input campo='Version' propiedad={general[0].version_manejador} />
                  <Input campo='N° Usuarios' propiedad={general[0].bas_cantidad_usuarios} />
                  <Input campo='Ambiente' propiedad={general[0].bas_tipo_ambiente} />
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
        return(
          <> 
            <h2 className='font-bold text-lg'>Aplicacion</h2>
            <form className="flex justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <div className='w-[880px]'>
                  <DataTable
                    columns={columnsBD}
                    data={aplicacion}
                    noDataComponent={"SIN RESULTADOS"}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    pointerOnHover
                    dense
                  />
                </div>
              {/* <Tabla3 columnas={columnasApl} datos={aplicacion} /> */}
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
            left: true,
        },
        {
            name: 'Estatus',
            selector: row => row.ser_estatus,
            sortable: true,
            left: true,
        },
        {
            name: 'OS',
            selector: row => row.sistema,
            sortable: true,
            left: true,
        },
        {
            name: 'Modelo',
            selector: row => row.modelo,
            sortable: true,
            left: true
        },
        {
            name: 'Marca',
            selector: row => row.marca,
            sortable: true,
            left: true,
        },
        {
          name: 'Direccion',
          selector: row => 
            <a className='text-blue-700' href={row.ser_direccion} target='_blank' >
              {row.ser_direccion}
            </a>,
          sortable: true,
          left: true,
          grow: 2
        },
        {
          name: 'Region',
          selector: row => row.region,
          sortable: true,
          left: true,
        },
        {
          name: 'Localidad',
          selector: row => row.localidad,
          sortable: true,
          left: true,
        },
      ];

      function Servidor(){
        const datos = servidor.data.datos;
        const modelos = servidor.data.modelos;
        return(
          <>
            <h2 className='font-bold text-lg'>Servidor</h2>
            <form className="flex flex-col justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
                <div className='w-[880px]'>
                  <DataTable
                    columns={columnsSer}
                    data={datos}
                    noDataComponent={"SIN RESULTADOS"}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    pointerOnHover
                    dense
                  />
                </div>
              {/* <Tabla3 columnas={columnasSer} datos={datos} />
              <Tabla3 columnas={columnasMod} datos={modelos} /> */}
            </form>
          </>
        )
      }

    return(
      <Container>
        <Radio label=' ' size='big' opciones={opcionesVista} manejador={handleInputChange} />
        {opcion === 'General' ? <General/> : null}
        {opcion === 'Aplicacion' ? <Aplicacion/> : null}
        {opcion === 'Servidor' ? <Servidor/> : null }
      </Container>
    )

};
export default VerBD;
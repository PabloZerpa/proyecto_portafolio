
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Input, Radio, Tabla, TextArea } from '../../components';
import { rutaAplicacion } from '../../utils/APIRoutes';
import axios from 'axios';
import authHeader from '../../utils/header';

const opcionesVista = ['General','Tecnologia', 'Base de datos',
'Servidor','Custodios','Documentacion','Fallas'];

function VerAplicacion() {

  // -------- ESTADOS ---------
  const { id } = useParams();
  const [load, setLoad] = useState(true);

  const [opcion, setOpcion] = useState('General');
  const [general, setGeneral] = useState('');
  const [tecnologia, setTecnologia] = useState('');
  const [basedatos, setBaseDatos] = useState('');
  const [servidor, setServidor] = useState('');
  const [custodios, setCustodios] = useState('');
  const [documentacion, setDocumentacion] = useState('');
  const [fallas, setFallas] = useState('');

  // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
  const setValores = (e) => {
    setOpcion(e.target.value);
  }
  
  useEffect(() => {
    async function fetchData(){
      try {

        const gen = await axios.get(`${rutaAplicacion}/general/${id}`, { headers: authHeader() });
        const tec = await axios.get(`${rutaAplicacion}/tecnologia/${id}`, { headers: authHeader() });
        const bas = await axios.get(`${rutaAplicacion}/basedatos/${id}`, { headers: authHeader() });
        const ser = await axios.get(`${rutaAplicacion}/servidor/${id}`, { headers: authHeader() });
        const cus = await axios.get(`${rutaAplicacion}/custodio/${id}`, { headers: authHeader() });
        const doc = await axios.get(`${rutaAplicacion}/documentacion/${id}`, { headers: authHeader() });
        const fal = await axios.get(`${rutaAplicacion}/fallas/${id}`, { headers: authHeader() });

        setGeneral(gen.data[0]);
        setTecnologia(tec);
        setBaseDatos(bas);
        setServidor(ser);
        setCustodios(cus);
        setDocumentacion(doc);
        setFallas(fal);

        setLoad(false);
        
      }catch (error) { console.log(error) }
    } 
    fetchData();
  }, [id]);


      function General(){
        return(
          <>
            <h2 className='font-bold text-lg'>Informacion General</h2>
            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
    
              <div className='grid space-x-6 mb-6 md:grid-cols-2'>
                <Input campo='Acronimo' propiedad={general.apl_acronimo} editable={false} />
                <Input campo='Estatus' propiedad={general.estatus} editable={false} />
                <Input campo='Version' propiedad={general.apl_version} editable={false} />
                <Input campo='Direccion' propiedad={general.apl_direccion} editable={false} />
              </div>
    
              <div className='flex flex-col space-x-2 text-sm font-medium text-gray-900 mb-6'>
                <TextArea campo='Nombre' propiedad={general.apl_nombre} editable={false} />
                <TextArea campo='Descripcion' propiedad={general.apl_descripcion} editable={false} />
              </div>
                
              <div className='grid space-x-6 mb-6 md:grid-cols-2'>
                <Input campo='Prioridad' propiedad={general.prioridad} editable={false} />
                <Input campo='Alcance' propiedad={general.alcance} editable={false} />
                <Input campo='Critico' propiedad={general.apl_critico} editable={false} />
                <Input campo='Codigo Fuente' propiedad={general.apl_codigo_fuente} editable={false} />
                <Input campo='N° Usuarios' propiedad={general.apl_cantidad_usuarios} editable={false} />
                <Input campo='Region' propiedad={general.region} editable={false} /> 
                <Input campo='Ultima Actualizacion' propiedad={general.apl_fecha_actualizacion} editable={false} /> 
              </div>
            </form>
          </>
        )
      }

      const columnsMan = [
        {
            name: 'Frecuencia',
            selector: row => row.frecuencia,
            sortable: true,
            width: "240px",
            left: true,
        },
        {
            name: 'Horas Promedio',
            selector: row => row.man_horas_prom,
            sortable: true,
            width: "240px",
            left: true,
        },
        {
            name: 'Horas Anuales',
            selector: row => row.man_horas_anuales,
            sortable: true,
            left: true,
            width: "240px",
        },
      ];

      const columnsLen = [
        {
          name: 'Lenguaje ID',
          selector: row => row.lenguaje_id,
          sortable: true,
          width: "240px",
          left: true,
      },
        {
            name: 'Lenguaje',
            selector: row => row.lenguaje,
            sortable: true,
            width: "240px",
            left: true,
        },
      ];

      function Tecnologia() {
        const datos = tecnologia.data.datos;;
        const plataformas = tecnologia.data.plataformas[0].plataforma;
        const lenguajes = tecnologia.data.lenguajes;

        return(
          <> 
            <h2 className='font-bold text-lg'>Tecnologia</h2>
            <form className="grid grid-cols-2 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >

              <div className='inline-grid grid-cols-1 space-y-4 col-span-2'>
                <Input campo='Plataforma' propiedad={plataformas} editable={false} />
                <Tabla columnas={columnsLen} datos={lenguajes} />
                <Tabla columnas={columnsMan} datos={datos} />
              </div>

            </form>
          </>
        )
      }
      
      const columnsBD = [
        {
            name: 'ID',
            selector: row => 
              <Link className='text-blue-700' to={row ? `/basedatos/${row.base_datos_id}` : `/dashboard`} >
                {row.base_datos_id}
              </Link>,
            sortable: true,
            width: "60px",
            left: true,
        },
        {
            name: 'Nombre',
            selector: row => row.base_datos,
            sortable: true,
            width: "150px",
            left: true,
        },
        {
            name: 'Estatus',
            selector: row => row.estatus,
            sortable: true,
            width: "150px",
            left: true,
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: true,
            width: "150px",
            left: true,
        },
        {
            name: 'Manejador',
            selector: row => row.manejador,
            sortable: true,
            width: "150px",
            left: true
        },
        {
            name: 'Tipo Ambiente',
            selector: row => row.ambiente,
            sortable: true,
            width: "150px",
            left: true,
        },
        {
          name: 'N° Usuarios',
          selector: row => row.base_cantidad_usuarios,
          sortable: true,
          width: "100px",
          left: true,
        },
        {
            name: 'Ultima Actualizacion',
            selector: row => row.base_fecha_actualizacion,
            sortable: true,
            width: "200px",
            left: true,
        },
      ];
  
      function Basedatos (){
        const datos = basedatos.data.datos;
        return(
          <>
            <h2 className='font-bold text-lg'>Base de datos</h2>
            <form className="grid grid-cols-1 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla columnas={columnsBD} datos={datos} />
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
            width: '60px',
            left: true,
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
            selector: row => row.ser_estatus,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
            name: 'Direccion',
            selector: row => row.ser_direccion,
            sortable: true,
            width: '200px',
            left: true,
        },
        {
            name: 'OS',
            selector: row => row.sistema,
            sortable: true,
            width: '150px',
            left: true
        },
        {
          name: 'Modelo',
          selector: row => row.modelo,
          sortable: true,
          width: '150px',
          left: true,
        },
        {
          name: 'Marca',
          selector: row => row.marca,
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
        {
          name: 'Localidad',
          selector: row => row.localidad,
          sortable: true,
          width: '150px',
          left: true,
        },
        {
            name: 'Ultima Actualizacion',
            selector: row => row.ser_fecha_actualizacion,
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


      const columnsCus = [
          {
            name: 'Indicador',
            selector: row => row.cus_indicador,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
            name: 'Nombre',
            selector: row => row.cus_nombre,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
            name: 'Apellido',
            selector: row => row.cus_apellido,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
            name: 'Cedula',
            selector: row => row.cus_cedula,
            sortable: true,
            width: '100px',
            left: true
        },
        {
            name: 'Telefono',
            selector: row => row.telefono,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
          name: 'Cargo',
          selector: row => row.cargo,
          sortable: true,
          width: '150px',
          left: true,
        },
        {
          name: 'Gerencia',
          selector: row => row.gerencia,
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
        {
          name: 'Localidad',
          selector: row => row.localidad,
          sortable: true,
          width: '150px',
          left: true,
      },
      ];
  
      function Custodio() {
        const funcional = custodios.data.funcional;
        const tecnico = custodios.data.tecnico;
        return(
          <>
            <h2 className='font-bold text-lg'>Custodios</h2>
            <form className="grid grid-cols-1 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >

              <div className="w-full flex flex-col justify-center items-center gap-4 mb-8">
                <h3 className='font-bold text-base'>Custodios Funcional</h3>
                  <Tabla columnas={columnsCus} datos={funcional} />
              </div>

              <div className="w-full flex flex-col justify-center items-center gap-4">
                <h3 className='font-bold text-base'>Custodios Tecnico</h3>
                  <Tabla columnas={columnsCus} datos={tecnico} />
              </div>

            </form>
          </>
        )
      }

      const columnsDoc = [
        {
            name: 'Descripcion',
            selector: row => row.doc_descripcion,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
            name: 'Direccion',
            selector: row => 
              <a className='text-blue-700' href={row.doc_direccion} >
                {row.doc_direccion}
              </a>,
            sortable: true,
            width: '200px',
            left: true,
        },
        {
            name: 'Tipo',
            selector: row => row.doc_tipo,
            sortable: true,
            width: '150px',
            left: true,
        },
        {
            name: 'Ultima Actualizacion',
            selector: row => row.doc_fecha_actualizacion,
            sortable: true,
            width: '150px',
            left: true
        },
      ];

      function Documentacion(){
        const datos = documentacion.data.datos;
        return (
          <>
            <h2 className='font-bold text-lg'>Documentacion</h2>
            <form className="grid grid-cols-1 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla columnas={columnsDoc} datos={datos} />
            </form>
          </>
        )
      }

      const columnsFal = [
        {
            name: 'ID',
            selector: row => 
              <Link className='text-blue-700' to={row ? `/aplicaciones/fallas` : `/dashboard`} >
                {row.falla_id}
              </Link>,
            sortable: true,
            width: '100px',
            left: true,
        },
        {
            name: 'Elemento',
            selector: row => row.elemento,
            sortable: true,
            width: '100px',
            left: true,
        },
        {
          name: 'Nombre',
          selector: row => row.fal_nombre,
          sortable: true,
          width: '100px',
          left: true,
        },
        {
            name: 'Impacto',
            selector: row => row.fal_impacto,
            sortable: true,
            width: '100px',
            left: true,
        },
      ];

      function Fallas(){
        let datos = fallas.data.datos;
        return (
          <>
            <h2 className='font-bold text-lg'>Fallas</h2>
            <form className="grid grid-cols-1 justify-center items-center relative w-1/2 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla columnas={columnsFal} datos={datos} />
            </form>
          </>
        )
      }

    return(
      <Container>
        <Radio label=' ' size='small' opciones={opcionesVista} manejador={setValores} />
        {opcion === 'General' ? <General/> : null}
        {opcion === 'Tecnologia' ? <Tecnologia/> : null}
        {opcion === 'Base de datos' ? <Basedatos/> : null }
        {opcion === 'Servidor' ? <Servidor/> : null }
        {opcion === 'Custodios' ? <Custodio/> : null }
        {opcion === 'Documentacion' ? <Documentacion/> : null }
        {opcion === 'Fallas' ? <Fallas/> : null }
      </Container>
    )

};
export default VerAplicacion;
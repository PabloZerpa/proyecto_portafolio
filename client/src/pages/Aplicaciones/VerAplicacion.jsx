
import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Container, Input, Radio, Tabla, TextArea } from '../../components';
import Aplicacion from '../../services/aplicacion.service';

const opcionesVista = ['General','Tecnologia', 'Base de datos',
'Servidor','Responsables','Documentacion','Fallas'];

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
            selector: row => row.man_frecuencia,
            sortable: true,
            left: true,
            grow: 2
        },
        {
            name: 'Horas Promedio',
            selector: row => row.man_horas_prom,
            sortable: true,
            left: true,
        },
        {
            name: 'Horas Anuales',
            selector: row => row.man_horas_anuales,
            sortable: true,
            left: true,
            grow: 1.5
        },
      ];

      const columnsLen = [
        {
          name: 'Lenguaje ID',
          selector: row => row.lenguaje_id,
          sortable: true,
          left: true,
          grow: 2
      },
        {
            name: 'Lenguaje',
            selector: row => row.lenguaje,
            sortable: true,
            left: true,
            grow: 2
        },
        {
            name: 'Framework',
            selector: row => row.framework,
            sortable: true,
            left: true,
        },
      ];

      function Tecnologia() {
        const datos = tecnologia.data.datos;
        console.log(tecnologia.data);
        const plataformas = tecnologia.data.plataformas[0].plataforma;
        const lenguajes = tecnologia.data.lenguajes;

        return(
          <> 
            <h2 className='font-bold text-lg'>Tecnologia</h2>
            <form className="grid grid-cols-2 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >

              <div className='inline-grid grid-cols-1 space-x-4 col-span-2'>
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
        },
        {
            name: 'Ultima Actualizacion',
            selector: row => row.bas_fecha_actualizacion,
            sortable: true,
            left: true,
            grow: 2
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
            name: 'Direccion',
            selector: row => row.ser_direccion,
            sortable: true,
            left: true,
        },
        {
            name: 'OS',
            selector: row => row.sistema,
            sortable: true,
            left: true
        },
        {
          name: 'Modelo',
          selector: row => row.modelo,
          sortable: true,
          left: true,
        },
        {
          name: 'Marca',
          selector: row => row.marca,
          sortable: true,
          left: true,
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
        {
            name: 'Ultima Actualizacion',
            selector: row => row.ser_fecha_actualizacion,
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
            <form className="grid grid-cols-1 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla columnas={columnsSer} datos={datos} />
            </form>
          </>
        )
      }


      const columnsRes = [
        {
            name: 'Nombre',
            selector: row => row.res_nombre,
            sortable: true,
            left: true,
            grow: 2
        },
        {
            name: 'Apellido',
            selector: row => row.res_apellido,
            sortable: true,
            left: true,
        },
        {
            name: 'Indicador',
            selector: row => row.res_indicador,
            sortable: true,
            left: true,
            grow: 1.5
        },
        {
            name: 'Cedula',
            selector: row => row.res_cedula,
            sortable: true,
            left: true
        },
        {
            name: 'Telefono',
            selector: row => row.telefono,
            sortable: true,
            left: true,
            grow: 2
        },
        {
          name: 'Cargo',
          selector: row => row.cargo,
          sortable: true,
          left: true,
          grow: 1.5
        },
        {
          name: 'Gerencia',
          selector: row => row.gerencia,
          sortable: true,
          left: true,
          grow: 1.5
        },
        {
            name: 'Region',
            selector: row => row.region,
            sortable: true,
            left: true,
            grow: 2
        },
        {
          name: 'Localidad',
          selector: row => row.localidad,
          sortable: true,
          left: true,
          grow: 2
      },
      ];
  
      function Responsable() {
        const funcional = responsables.data.funcional;
        const tecnico = responsables.data.tecnico;
        console.log(funcional);
        console.log(tecnico);
        return(
          <>
            <h2 className='font-bold text-lg'>Responsables</h2>
            <form className="grid grid-cols-1 justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >

              <div className="w-full flex flex-col justify-center items-center gap-4 mb-8">
                <h3 className='font-bold text-base'>Responsables Funcional</h3>
                  <Tabla columnas={columnsRes} datos={funcional} />
              </div>

              <div className="w-full flex flex-col justify-center items-center gap-4">
                <h3 className='font-bold text-base'>Responsables Tecnico</h3>
                  <Tabla columnas={columnsRes} datos={tecnico} />
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
            left: true,
        },
        {
            name: 'Direccion',
            selector: row => 
              <a className='text-blue-700' href={row.doc_direccion} >
                {row.doc_direccion}
              </a>,
            sortable: true,
            left: true,
        },
        {
            name: 'Tipo',
            selector: row => row.doc_tipo,
            sortable: true,
            left: true,
        },
        {
            name: 'Ultima Actualizacion',
            selector: row => row.doc_fecha_actualizacion,
            sortable: true,
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
            selector: row => row.falla_id,
            sortable: true,
            left: true,
        },
        {
            name: 'Clase',
            selector: row => row.fal_clase,
            sortable: true,
            left: true,
        },
        {
            name: 'Impacto',
            selector: row => row.fal_impacto,
            sortable: true,
            left: true,
        },
        {
            name: 'Descripcion',
            selector: row => row.fal_descripcion,
            sortable: true,
            left: true
        },
        {
          name: 'Solucion',
          selector: row => row.fal_solucion,
          sortable: true,
          left: true
      },
      ];

      function Fallas(){
        let datos = fallas.data.datos;
        return (
          <>
            <h2 className='font-bold text-lg'>Fallas</h2>
            <form className="grid grid-cols-1 justify-center items-center relative w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla columnas={columnsFal} datos={datos} />
            </form>
          </>
        )
      }

    return(
      <Container>
        <Radio label=' ' size='small' opciones={opcionesVista} manejador={handleInputChange} />
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

import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { BiLoaderAlt } from "react-icons/bi";
import { useParams, Navigate, Link } from 'react-router-dom';
import { Container, Input, Radio } from '../../components';
import Tabla3 from '../../components/Table3';
import Usuarios from '../../services/user.service';

const opcionesVista = ['General','Aplicacion','Servidor'];

/*
  * HACER QUE EL ACRONIMO/NOMBRE SEA UN LINK QUE REDIRECCIONE A LA VISTA DE LA RESPECTIVA APLICACION/BASE DE DATOS
  * HACER UNA OPCION PARA CREAR, BUSCAR Y LISTAR LAS FALLAS SIGUIENDO DE EJEMPLO EL MODULO DE USUARIOS/PERMISOS
*/

function VistaBD() {

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
        const gen = await Usuarios.obtenerGeneralBD(id);
        const apl = await Usuarios.obtenerAplicacionBD(id);
        const ser = await Usuarios.obtenerServidorBD(id);

        setGeneral(gen.data);
        setAplicacion(apl.data);
        setServidor(ser);
        console.log(general); 

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

      function Aplicacion() {
        return(
          <> 
            <h2 className='font-bold text-lg'>Aplicacion</h2>
            <form className="flex justify-center items-center w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
              <Tabla3 columnas={columnasApl} datos={aplicacion} />
            </form>
          </>
        )
      }

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

    return(
      <Container>
        <Radio label=' ' size='big' opciones={opcionesVista} manejador={handleInputChange} />
        {opcion === 'General' ? <General/> : null}
        {opcion === 'Aplicacion' ? <Aplicacion/> : null}
        {opcion === 'Servidor' ? <Servidor/> : null }
      </Container>
    )

};
export default VistaBD;
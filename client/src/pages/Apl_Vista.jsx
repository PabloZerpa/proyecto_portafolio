
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { Form, button, Typography, Divider, Alert } from "antd";
import Usuarios from '../services/user.service';
const { Title } = Typography;


function Vista() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const { paramsId } = useParams();
  
  useEffect(() => {
    console.log(location.state);

    async function fetchData(){
      try {
        const response = await Usuarios.obtenerDato(location.state.id)
        setValor(response.data);
      }catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [paramsId]);

  if(location.state === null) return <Navigate to='/' />

    return (
      <div className='flex w-full h-screen bg-zinc-300 m-0 p-0'>
        
        <form className="w-full gap-4 flex flex-col justify-start items-center pt-44 pl-56" >

          <div className="flex justify-center items-center gap-6 pb-6">

            <button className='w-32 h-8 text-sm bg-blue-500 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-400' size='small' >
              <Link 
              className='no-underline text-white'
                to={`/aplicaciones/actualizacion/${valor.id}`} state={valor}>Actualizar</Link>
            </button>

            <button className='w-32 h-8 text-sm bg-blue-500 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-400' size='small' >Descargar</button>
          </div>

        <h2 className='font-bold'>Informacion Basica</h2>

        <div className='grid grid-cols-2 w-4/5 gap-6 g-3 p-5 bg-zinc-400 drop-shadow-md rounded'>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Acronimo</label>
            <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value={valor.acronimo} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Estatus</label>
            <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value='Estatus' />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Nombre</label>
            <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value={valor.nombre} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Descripcion</label>
            <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value='Descripcion' />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Prioridad</label>
            <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value={valor.prioridad} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Tipo</label>
            <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value='Tipo' />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Mantenido</label>
            <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value={valor.responsable} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Desarrollado</label>
            <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value={valor.responsable} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Departamento</label>
            <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value='Departamento' />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Numero de usuarios</label>
            <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value='N° Usuarios' />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Plataforma</label>
            <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value='Plataforma' />
          </div>

        </div>

          <h2 className='font-bold'>Caracteristicas de la Aplicaciones</h2>

          <div className='grid grid-cols-2 w-4/5 gap-6 g-3 p-5 bg-zinc-400 drop-shadow-md rounded'>

            <div className='flex flex-col gap-2 text-sm'>
              <label className="w-full h-15">Alcance</label>
              <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value='Alcance' />
            </div>

            <div className='flex flex-col gap-2 text-sm'>
              <label className="w-full h-15">Codigo</label>
              <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value='Codigo' />
            </div>

            <div className='flex flex-col gap-2 text-sm'>
              <label className="w-full h-15">Programa</label>
              <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value='Programa' />
            </div>

            <div className='flex flex-col gap-2 text-sm'>
              <label className="w-full h-15">Fecha</label>
              <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value={valor.ultima} />
            </div>

          </div>

          <h2 className='font-bold'>Informacion de Gestion de la Plataforma</h2>
          
            <div className='grid grid-cols-2 w-4/5 gap-6 g-3 p-5 bg-zinc-400 drop-shadow-md rounded'>

              <div className='flex flex-col gap-2 text-sm'>
                <label className="w-full h-15">Region</label>
                <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value={valor.region} />
              </div>
              
              <div className='flex flex-col gap-2 text-sm'>
                <label className="w-full h-15">Servidor</label>
                <input readOnly className='w-80 h-10 p-3 bg-white border-none outline-none rounded' value='Servidor' />
              </div>
              
            </div>

        </form>
      </div>
          
    )
};

export default Vista;
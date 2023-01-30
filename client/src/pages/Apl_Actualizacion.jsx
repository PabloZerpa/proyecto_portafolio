
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Form, Button, Typography, Divider } from "antd";

import Autorizacion from '../services/auth.service';
import Usuarios from '../services/user.service';
import { Input, Select, DatePicker } from "antd";
import { FaCalendar } from 'react-icons/fa';
const { TextArea } = Input;
const { Title } = Typography;

function Actualizacion() {

  const location = useLocation();
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const { paramsId } = useParams();

  const [acronimo, setAcronimo] = useState('');
  const [nombre, setNombre] = useState('');
  const [region, setRegion] = useState('');
  const [responsable, setResponsable] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [ultima, setUltima] = useState('29/2/2024');
  
  useEffect(() => {
    console.log(location.state);

    async function fetchData(){
      try {
        const response = await Usuarios.obtenerDato(location.state.id)
        setValor(response.data);
        setAcronimo(location.state.acronimo);
        setNombre(location.state.nombre);
        setRegion(location.state.region);
        setResponsable(location.state.responsable);
        setPrioridad(location.state.prioridad);
      } 
      catch (error) {
        console.log(error)
      }
    }
    fetchData();

  }, [paramsId]);

  // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
  async function updateData(e) {
    
    e.preventDefault();
    console.log('UPDATE');

    try {
      console.log('TRY DEL UPDATE');
      console.log(acronimo,nombre,region,responsable,prioridad,ultima);
      await Autorizacion.actualizarDatos(acronimo,nombre,region,responsable,prioridad,ultima,location.state.id);
      navigate("/dashboard");
    }catch (error) {
      console.log('ERROR AL ACTUALIZAR APL_ACT');
    }

  }

  if(valor === null) return <Navigate to='/' />

  return (
    <div className='flex w-full h-screen bg-zinc-300 m-0 p-0'>

        <form className="w-full gap-4 flex flex-col justify-start items-center pt-44 pl-56"
          onSubmitCapture={updateData}
        >

        <h2 className='font-bold'>Informacion Basica</h2>

        <div className='grid grid-cols-2 w-4/5 gap-6 g-3 p-5 bg-zinc-400 drop-shadow-md rounded'>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Acronimo</label>
            <input 
              className='w-80 h-8 p-3 bg-white border-none outline-none rounded' 
              placeholder="Acronimo" 
              defaultValue={valor.acronimo}
              onChange={(e) => {setAcronimo(e.target.value)}} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Estatus</label>
            <select 
              name="estatus" 
              placeholder='Estatus'
              defaultValue={valor.estatus}
              className='w-80 h-8 pl-3 text-sm border-none outline-none rounded'>
                <option value="desarrollo">Desarrollo</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Nombre</label>
            <textarea 
              rows={4}
              name='nombre'
              className='w-80 h-12 p-3 text-sm bg-white border-none outline-none rounded' 
              placeholder="Nombre" 
              defaultValue={valor.nombre}
              onChange={(e) => {setNombre(e.target.value)}} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Descripcion</label>
            <textarea
              rows={4} 
              name='descripcion'
              className='w-80 h-12 p-3 text-sm bg-white border-none outline-none rounded' 
              placeholder="Descripcion" 
              defaultValue={valor.descripcion} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Prioridad</label>
            <select 
              name="prioridad" 
              placeholder='Prioridad'
              defaultValue={valor.prioridad}
              onChange={(e) => {setPrioridad(e.target.value)}}
              className='w-80 h-8 pl-3 text-sm border-none outline-none rounded'>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
            </select>
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Tipo</label>
            <select 
              name="tipo" 
              placeholder='Tipo'
              defaultValue={valor.tipo}
              className='w-80 h-8 pl-3 text-sm border-none outline-none rounded'>
                <option value="Tecnico">Tecnico</option>
                <option value="Administrativo">Administrativo</option>
            </select>
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Mantenido</label>
            <input
              name='mantenido'
              onChange={(e) => {setResponsable(e.target.value)}}
              className='w-80 h-8 p-3 text-sm bg-white border-none outline-none rounded' 
              placeholder="Mantenido" 
              defaultValue={valor.responsable} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Desarrolado</label>
            <input
              name='desarrollado'
              className='w-80 h-8 p-3 text-sm bg-white border-none outline-none rounded' 
              placeholder="Desarrolado" 
              defaultValue={valor.responsable} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Departamento</label>
            <input
              name='departamento'
              className='w-80 h-8 p-3 text-sm bg-white border-none outline-none rounded' 
              placeholder="Departamento" 
              defaultValue={valor.clientes} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Numero de Usuarios</label>
            <input
              name='usuarios'
              className='w-80 h-8 p-3 text-sm bg-white border-none outline-none rounded' 
              placeholder="Numero de Usuarios" 
              defaultValue={valor.clientes} />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <label className="w-full h-15">Plataforma</label>
            <input
              name='plataforma'
              className='w-80 h-8 p-3 text-sm bg-white border-none outline-none rounded' 
              placeholder="Plataforma" 
              defaultValue={valor.plataforma} />
          </div>

        </div>

        <h2 className='font-bold'>Caracteristicas de la Aplicaciones</h2>

          <div className='grid grid-cols-2 w-4/5 gap-6 g-3 p-5 bg-zinc-400 drop-shadow-md rounded'>
            
            <div className='flex flex-col gap-2 text-sm'>
              <label className="w-full h-15">Alcance</label>
              <select 
                name="alcance" 
                placeholder='Alcance'
                defaultValue={valor.alcance}
                className='w-80 h-8 pl-3 text-sm border-none outline-none rounded'>
                  <option value="Alto">Alto</option>
                  <option value="Corporativo">Corporativo</option>
              </select>
            </div>

            <div className='flex flex-col gap-2 text-sm'>
              <label className="w-full h-15">Codigo Fuente</label>
              <select 
                name="codigo" 
                placeholder='Codigo'
                defaultValue={valor.codigo}
                className='w-80 h-8 pl-3 text-sm border-none outline-none rounded'>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
              </select>
            </div>

            <div className='flex flex-col gap-2 text-sm'>
              <label className="w-full h-15">Programa fuente</label>
              <select 
                name="programa" 
                placeholder='Programa fuente'
                defaultValue={valor.programa}
                className='w-80 h-8 pl-3 text-sm border-none outline-none rounded'>
                  <option value="Propio">Propio</option>
                  <option value="Terceros">Terceros</option>
              </select>
            </div>

            <div className='flex flex-col gap-2 text-sm'>
              <label className="w-full h-15">Fecha</label>
              <input
                type="date" 
                id="start"
                name='fecha'
                className='w-80 h-8 p-3 text-sm bg-white border-none outline-none rounded' 
                placeholder="Fecha" 
                defaultValue={valor.ultima} />
            </div>

          </div>

          <h2 className='font-bold'>Informacion de Gestion de la Plataforma</h2>

            <div className='grid grid-cols-2 w-4/5 gap-6 g-3 p-5 bg-zinc-400 drop-shadow-md rounded'>

              <div className='flex flex-col gap-2 text-sm'>
                <label className="w-full h-15">Region</label>
                <select 
                  name="region" 
                  placeholder='Region'
                  defaultValue={valor.region}
                  onChange={(e) => {setRegion(e.target.value)}}
                  className='w-80 h-8 pl-3 text-sm border-none outline-none rounded'>
                    <option value="Oriente">Oriente</option>
                    <option value="Centro">Centro</option>
                    <option value="Andes">Andes</option>
                </select>
              </div>

              <div className='flex flex-col gap-2 text-sm'>
                <label className="w-full h-15">Servidores</label>
                <input
                  name='servidores'
                  className='w-80 h-8 p-3 text-sm bg-white border-none outline-none rounded' 
                  placeholder="Servidores" 
                  defaultValue={valor.servidores} />
              </div>
              
            </div>

          <div className="flex justify-center items-center gap-20 py-8">
            <button onClick={() => navigate(-1)} className='w-20 h-8 text-sm bg-red-500 text-white border-none outline-none rounded cursor-pointer hover:bg-red-400' size='small' >Cancelar</button>
            
            <button className='w-20 h-8 text-sm bg-blue-500 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-400' size='small' >Guardar</button>
          </div>

        </form>
          
      </div>
  )
};

export default Actualizacion;
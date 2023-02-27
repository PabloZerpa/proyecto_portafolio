
import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Button, Container, Input } from '../../components';
import Usuarios from '../../services/user.service';

function Vista() {
  
  const { id } = useParams();
  const [valor, setValor] = useState(null);

  const [valorDevuelto, setValorDevuelto] = useState(false);
  const obtencionDeEstado = (parametroDevuelto) => {setValorDevuelto(parametroDevuelto)};
  const [valorDevuelto2, setValorDevuelto2] = useState(false);
  const obtencionDeEstado2 = (parametroDevuelto) => {setValorDevuelto2(parametroDevuelto)};
  
  useEffect(() => {

    async function fetchData(){
      
      try {
        const response = await Usuarios.obtenerDato(id)
        setValor(response.data);
      }catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [id]);

  if(valor === null) 
    return <Navigate to='/' />
    
    return (
      <Container>

          <div className='flex gap-8'>
            <Button color='blue' width={32} >
              <Link className='no-underline text-white' to={`/aplicaciones/actualizacion/${valor.id}`} state={valor}>
                  Actualizar
              </Link>
            </Button>
            <Button color='blue' width={32} >Descargar</Button>
            <Button color='blue' width={32} >Solicitudes</Button>
          </div>

          <h2 className='font-bold'>Informacion Basica</h2>
          
          <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
            <div className='grid gap-6 mb-6 md:grid-cols-2'>
              <Input campo={'Acronimo'} propiedad={valor.acronimo} />
              <Input campo={'Estatus'} propiedad={valor.estatus} />
            </div>

            <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6'>
              <Input campo={'Nombre'} propiedad={valor.nombre} />
              <Input campo={'Descripcion'} propiedad={valor.descripcion} />
            </div>

            <div className='grid gap-6 mb-6 md:grid-cols-2'>
              <Input campo={'Prioridad'} propiedad={valor.prioridad} />
              <Input campo={'Tipo'} propiedad={valor.tipo} />
              <Input campo={'Responsable Funcional'} propiedad={valor.responsablef} detalles={true} peticionEstado={obtencionDeEstado} />
              <Input campo={'Responsable Tecnico'} propiedad={valor.responsablet} />
              
              <div style={valorDevuelto ? {display: 'block'} : {display: 'none'}} className='ml-4 bg-blue-500 w-64' >
                <Input campo={'Nombre'} propiedad={valor.responsablef} />
                <Input campo={'Apellido'} propiedad={valor.responsablef_cor} />
                <Input campo={'Indicador'} propiedad={valor.responsablef_ind} />
                <Input campo={'Telefono'} propiedad={valor.responsablef_tlf} />
              </div>

              <div style={valorDevuelto ? {display: 'block'} : {display: 'none'}} className='ml-4 bg-blue-500 w-64' >
                <Input campo={'Nombre'} propiedad={valor.responsablet} />
                <Input campo={'Apellido'} propiedad={valor.responsablet_cor} />
                <Input campo={'Indicador'} propiedad={valor.responsablet_ind} />
                <Input campo={'Telefono'} propiedad={valor.responsablet_tlf} />
              </div>

              <Input campo={'Negocio'} propiedad={valor.departamento} />
              <Input campo={'Numero de usuarios'} propiedad={valor.cantidad_user} />
              <Input campo={'Plataforma'} propiedad={valor.plataforma} />
            </div>
        </form>

        <h2 className='font-bold'>Caracteristicas de la Aplicaciones</h2>

        <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <Input campo={'Codigo Fuente'} propiedad={valor.codigo_fuente} detalles={true} peticionEstado={obtencionDeEstado2} />
            <Input campo={'Alcance'} propiedad={valor.alcance} />

            <div style={valorDevuelto2 ? {display: 'block'} : {display: 'none'}} className='ml-4 bg-blue-500 w-64' >
              <Input campo={'Lenguaje'} propiedad={valor.lenguaje} />
              <Input campo={'Base de datos'} propiedad={valor.base_datos} />
            </div>

            <Input campo={'Direccion'} propiedad={valor.direccion} />
            <Input campo={'Propiedad'} propiedad={valor.propiedad} />
            <Input campo={'Fecha'} propiedad={valor.ultima} />
          </div>
        </form>

        <h2 className='font-bold'>Informacion de Gestion de la Plataforma</h2>

        <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" >
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <Input campo={'Region'} propiedad={valor.region} />
            <Input campo={'Servidor'} propiedad={valor.servidor} />
            <Input campo={'Frecuencia de Mantenimiento'} propiedad={valor.frecuencia} />
            <Input campo={'Horas Promedio de Mantenimiento'} propiedad={valor.frecuencia_hr} />
          </div>
        </form>

      </Container>
    )
};

export default Vista;
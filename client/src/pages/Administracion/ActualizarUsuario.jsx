
import { useState, useEffect } from "react";
import { Button, Input, Select } from "../../components/";
import { Notificacion } from "../../utils/Notificacion";
import { obtenerUsuario, rutaUsuario } from "../../utils/APIRoutes";
import Opciones from "../../utils/Opciones";
import axios from "axios";
import authHeader from "../../utils/header";


function ActualizarUsuario({setIsOpen, valores, setUpdate}) {
  
  const [datos, setDatos] = useState({
      id: valores.usuario_id,
      nombre: valores.nombre,
      apellido: valores.apellido,
      rol: valores.rol,
      gerencia: valores.gerencia,
      cargo: valores.cargo,
      creador: obtenerUsuario().indicador,
  });
  
  // ---------- ESTADOS PARA LOS VALORES DE LOS SELECTS ----------
  const [roles, setRoles] = useState('');
  const [gerencias, setGerencias] = useState('');
  const [cargos, setCargos] = useState('');

  // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
  async function establecerDatos(){
      setRoles(await Opciones('roles'));
      setGerencias(await Opciones('gerencias'));
      setCargos(await Opciones('cargos'));
  }

  useEffect(() => {
      establecerDatos();
  }, []);


  // =================== FUNCION PARA OBTENER Y GUARDAR VALORES DEL LOS INPUTS ===================
  const setValores = (e) => {
      const valor = e.target.value.toUpperCase();
      setDatos({ ...datos, [e.target.name] : valor });
  }

  // =================== FUNCION PARA ACTUALIZAR DATOS ===================
  async function actualizarDatos(e) {
    e.preventDefault();
    
    try {
      if(obtenerUsuario().rol !== 'user'){

        await axios.patch(`${rutaUsuario}/${datos.id}`, datos, { headers: authHeader() });
        Notificacion('USUARIO MODDIFICADO EXITOSAMENTE', 'success');
        setUpdate(true);
        setIsOpen(false);
      }
    }
    catch (error) { 
      Notificacion(error.response.data.message, 'error');
    }
  }


  return(
    <form className="flex flex-col items-center space-y-2 pb-4" onSubmit={actualizarDatos} >

      <div className="flex flex-col items-center space-y-2 pb-4 bg-zinc-400 rounded">

      <div className="flex flex-col space-y-4 p-2 items-center">{}
          <h2 className='font-bold text-base'>Actualizar Usuario</h2>

            <div className='w-full grid grid-cols-1 md:grid-cols-2 p-4 bg-zinc-400 rounded'>

                <div className='w-full flex flex-col'>
                    <Input campo='Indicador' name='indicador' direccion="col" editable={false} propiedad={valores.indicador} />
                    <Input campo='Nombre' name='nombre' direccion="col" required={true} propiedad={valores.nombre} editable={true} manejador={setValores} />
                    <Select campo='Gerencia' name='gerencia' direccion="col" required={true} byId={false} propiedad={valores.gerencia} opciones={gerencias ? gerencias : ['SELECCIONE']} manejador={setValores} />
                </div>

                <div className='w-full flex flex-col md:ml-2'>
                    <Select campo='Rol' name='rol' direccion="col" required={true} byId={false} propiedad={valores.rol} opciones={roles ? roles : ['SELECCIONE']} manejador={setValores} />
                    <Input campo='Apellido' name='apellido' direccion="col" required={true} propiedad={valores.apellido} editable={true} manejador={setValores} />
                    <Select campo='Cargo' name='cargo' direccion="col" required={true} byId={false} propiedad={valores.cargo} opciones={cargos ? cargos : ['SELECCIONE']} manejador={setValores} />
                </div>
              </div>
      </div>

        <div className="flex space-x-8 lg:space-x-16">
          <Button width={24} manejador={(e) => setIsOpen(false)} >Cerrar</Button>
          <Button tipo="submit" width={24}>Actualizar</Button>
        </div>
              
      </div>
    </form>
  );
}

export default ActualizarUsuario;
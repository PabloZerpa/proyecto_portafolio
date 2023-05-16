
import { useState, useEffect } from "react";
import { Button, Input, Select } from "../../components/";
import Autorizacion from "../../services/auth.service";
import Opciones from "../../utils/Opciones";
import Usuario from "../../services/usuario.service";
import { Notificacion } from "../../utils/Notificacion";


function ActualizarUsuario({setIsOpen, valores, setUpdate}) {
 
    const [datos, setDatos] = useState({
        id: valores.usuario_id,
        nombre: valores.nombre,
        apellido: valores.apellido,
        rol: valores.rol,
        gerencia: valores.gerencia,
        cargo: valores.cargo,
        creador: Autorizacion.obtenerUsuario().indicador,
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
      if(Autorizacion.obtenerUsuario().rol === 'admin'){
        await Usuario.actualizarUsuario(datos);
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
        <form className="flex flex-col items-center space-y-2 pb-4 overflow-y-auto" onSubmit={actualizarDatos} >

            <div className="flex flex-col items-center space-y-2 pb-4 bg-zinc-400 rounded">

                <div className="grid grid-cols-1 md:grid-cols-2 w-[300px] lg:w-[500px] space-x-4 p-4">
                    <Input campo='Indicador' name='indicador' direccion="col" editable={false} propiedad={valores.indicador} />
                    <Select campo='Rol' name='rol' direccion="col" required={true} byId={false} propiedad={valores.rol} opciones={roles ? roles : ['SELECCIONE']} manejador={setValores} />
                    <Input campo='Nombre' name='nombre' direccion="col" required={true} propiedad={valores.nombre} editable={true} manejador={setValores} />
                    <Input campo='Apellido' name='apellido' direccion="col" required={true} propiedad={valores.apellido} editable={true} manejador={setValores} />
                    <Select campo='Gerencia' name='gerencia' direccion="col" required={true} byId={false} propiedad={valores.gerencia} opciones={gerencias ? gerencias : ['SELECCIONE']} manejador={setValores} />
                    <Select campo='Cargo' name='cargo' direccion="col" required={true} byId={false} propiedad={valores.cargo} opciones={cargos ? cargos : ['SELECCIONE']} manejador={setValores} />
                </div> 

                <div className="flex space-x-16">
                    <Button width={32} manejador={(e) => setIsOpen(false)} >Cerrar</Button>
                    <Button tipo="submit" width={32}>Actualizar</Button>
                </div>
                
            </div>
        </form>
    );
}

export default ActualizarUsuario;
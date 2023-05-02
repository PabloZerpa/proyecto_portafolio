
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Container, Input, Select } from "../../components/";
import { FaArrowLeft } from "react-icons/fa";
import { Notificacion } from "../../utils/Notificacion";
import Autorizacion from "../../services/auth.service";
import Usuario from "../../services/usuario.service";
import Opciones from "../../utils/Opciones";
 
function CrearUsuario() {

    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) };

    const [datos, setDatos] = useState({
        indicador: '',
        rol: '',
        password: '',
        nombre: '',
        apellido: '',
        cargo: '',
        gerencia: '',
        creador: Autorizacion.obtenerUsuario().indicador,
    });

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
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    // =================== CREAR USUARIOS ===================
    async function crearUsuario(e){
        e.preventDefault();

        if(Autorizacion.obtenerUsuario().rol === 'admin'){
            try {
                await Usuario.crearUsuario(datos);
                Notificacion('USUARIO REGISTRADO EXITOSAMENTE', 'success');
                setTimeout(() => { navegar("/administracion/permisos/buscar") }, "2000");
            }
            catch (error) { 
                Notificacion(error.response.data.message, 'error');
            }
        }
    }

    return(
        <Container>

            <form className="flex flex-col items-center gap-8 pb-4" onSubmit={crearUsuario}>

                <div className="flex flex-col gap-2">
                    <h2 className='font-bold text-base'>Datos del Nuevo Usuario</h2>
                    <div className="grid grid-cols-2 w-[900px] gap-4 p-4 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                        <Input campo='Indicador' name='indicador' direccion="col" required={true} editable={true} manejador={setValores} />
                        <Select campo='Rol' name='rol' direccion="col" required={true} opciones={roles ? roles : ['SELECCIONE']} manejador={setValores} />
                        <Input campo='Nombre' name='nombre' direccion="col" required={true} editable={true} manejador={setValores} />
                        <Input campo='Apellido' name='apellido' direccion="col" required={true} editable={true} manejador={setValores} />
                        <Input campo='Contraseña' name='password' direccion="col" required={true} editable={true} manejador={setValores} />
                        <Select campo='Gerencia' name='gerencia' direccion="col" required={true} opciones={gerencias ? gerencias : ['SELECCIONE']} manejador={setValores} />
                        <Select campo='Cargo' name='cargo' direccion="col" required={true} opciones={cargos ? cargos : ['SELECCIONE']} manejador={setValores} />
                    </div> 
                </div>

                <div className="flex gap-16">
                    <Button color='blue' width={32} manejador={(e) => navegar(-1)} ><FaArrowLeft />Volver</Button>
                    <Button color='blue' tipo="submit" width={32}>Crear Usuario</Button>
                </div>

            </form>

        </Container>
    );
}

export default CrearUsuario;
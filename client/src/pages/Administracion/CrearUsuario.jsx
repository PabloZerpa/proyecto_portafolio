
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Container, Input, Select } from "../../components/";
import { FaArrowLeft } from "react-icons/fa";
import { Notificacion } from "../../utils/Notificacion";
import Opciones from "../../utils/Opciones";
import { obtenerUsuario, rutaAuth } from "../../utils/APIRoutes";
import axios from "axios";
import authHeader from "../../utils/header";

function CrearUsuario() {

    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) };

    // ---------- ESTADOS ----------
    const [roles, setRoles] = useState('');
    const [gerencias, setGerencias] = useState('');
    const [cargos, setCargos] = useState('');
    const [datos, setDatos] = useState({
        usuario_registro: obtenerUsuario().indicador,
    });


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

        if(e.target.name === 'indicador')
            setDatos({ ...datos, [e.target.name] : e.target.value.toLowerCase() });
        else
            setDatos({ ...datos, [e.target.name] : valor });
    }

    // =================== CREAR USUARIOS ===================
    async function crearUsuario(e){
        e.preventDefault(); 

        if(obtenerUsuario().rol !== 'user'){
            try {
                await axios.post(`${rutaAuth}/registro`, datos, { headers: authHeader() }) 
                .then(response => { return response.data; });

                Notificacion('USUARIO REGISTRADO EXITOSAMENTE', 'success');
                setTimeout(() => { navegar("/administracion/permisos/buscar") }, "500");
            }
            catch (error) { 
                Notificacion(error.response.data.message, 'error');
            }
        }
    }

    return(
        <Container>

            <form className="flex flex-col items-center space-y-8 pb-4" onSubmit={crearUsuario}>

                <div className="flex flex-col space-y-4">
                    <h2 className='font-bold text-base'>Datos del Nuevo Usuario</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-[400px] md:w-[600px] lg:w-[800px] space-x-4 p-4 bg-zinc-400 rounded">
                        <Input campo='Indicador' name='indicador' direccion="col" required={true} editable={true} manejador={setValores} />
                        <Select campo='Rol' name='rol' direccion="col" required={true} opciones={roles ? roles : ['SELECCIONE']} manejador={setValores} />
                        <Input campo='Nombre' name='nombre' direccion="col" required={true} editable={true} manejador={setValores} />
                        <Input campo='Apellido' name='apellido' direccion="col" required={true} editable={true} manejador={setValores} />
                        {/* <Input campo='Contraseña' name='password' direccion="col" required={true} editable={true} manejador={setValores} /> */}
                        <Select campo='Gerencia' name='gerencia' direccion="col" required={true} opciones={gerencias ? gerencias : ['SELECCIONE']} manejador={setValores} />
                        <Select campo='Cargo' name='cargo' direccion="col" required={true} opciones={cargos ? cargos : ['SELECCIONE']} manejador={setValores} />
                    </div> 
                </div>

                <div className="flex space-x-16">
                    <Button width={32} manejador={(e) => navegar(-1)} ><FaArrowLeft />Volver</Button>
                    <Button tipo="submit" width={32}>Crear Usuario</Button>
                </div>

            </form>

        </Container>
    );
}

export default CrearUsuario;
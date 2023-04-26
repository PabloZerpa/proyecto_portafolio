
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Container, Input, Select } from "../../components/";
import { Notificacion } from "../../utils/Notificacion";
import Autorizacion from "../../services/auth.service";
import Usuario from "../../services/usuario.service";
import { FaArrowLeft } from "react-icons/fa";

function CrearUsuario() {

    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }

    const [opcionRoles, setOpcionRoles] = useState('');
    const [opcionGerencias, setOpcionGerencias] = useState('');
    const [opcionCargos, setOpcionCargos] = useState('');

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

    async function getData(ruta, elemento){
        const respuesta = await Usuario.obtenerOpcion(ruta);
        const data = respuesta.data;
        let opciones = ['SELECCIONE'];

        for (let i = 0; i < data.length; i++) {
            const valor = Object.values(data[i]);
            opciones.push(valor[0]);
        }
        elemento(opciones);
    }

    useEffect(() => {
        getData('roles',setOpcionRoles);
        getData('gerencias',setOpcionGerencias);
        getData('cargos',setOpcionCargos);
    }, []);


    const handleInputChange = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }


    async function crearUsuario(e){
        e.preventDefault();
        
        console.log('TRY DEL CREATE USER');
        if(Autorizacion.obtenerUsuario().rol === 'admin'){
            try {
                await Usuario.crearUsuario(datos);
                Notificacion('USUARIO REGISTRADO EXITOSAMENTE', 'success');
                setTimeout(() => { navigate("/administracion/permisos/buscar") }, "2000");
            }
            catch (error) { 
                Notificacion(error.response.data.message, 'error');
            }
        }
    }

    return(
        <Container>

            <form className="flex flex-col items-center gap-8 pb-4" onSubmitCapture={crearUsuario}>

                <div className="flex flex-col gap-2">
                    <h2 className='font-bold text-base'>Datos del Nuevo Usuario</h2>
                    <div className="grid grid-cols-2 w-[900px] gap-4 p-4 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                        <Input campo='Indicador' name='indicador' direccion="col" required={true} editable={true} manejador={handleInputChange} />
                        <Select campo='Rol' name='rol' direccion="col" required={true} opciones={opcionRoles ? opcionRoles : ['SELECCIONE']} manejador={handleInputChange} />
                        <Input campo='Nombre' name='nombre' direccion="col" required={true} editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='apellido' direccion="col" required={true} editable={true} manejador={handleInputChange} />
                        <Input campo='Contraseña' name='password' direccion="col" required={true} editable={true} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='gerencia' direccion="col" required={true} opciones={opcionGerencias ? opcionGerencias : ['SELECCIONE']} manejador={handleInputChange} />
                        <Select campo='Cargo' name='cargo' direccion="col" required={true} opciones={opcionCargos ? opcionCargos : ['SELECCIONE']} manejador={handleInputChange} />
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
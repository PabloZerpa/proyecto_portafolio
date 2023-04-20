
import { useState } from "react";
import { Button, Container, Input, Select } from "../../components/";
import { Notificacion } from "../../utils/Notificacion";
import Autorizacion from "../../services/auth.service";
import Usuario from "../../services/usuario.service";
import { opcionGerencia } from "../../services/campos.service";

function Permisos() {

    const [datos, setDatos] = useState({
        indicador: '',
        rol: '',
        password: '',
        gerencia: '',
        subgerencia: '',
        creador: Autorizacion.obtenerUsuario().indicador,
    });

    const handleInputChange = (e) => {

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    async function crearUsuario(e){
        e.preventDefault();
        
        try {
            console.log('TRY DEL CREATE USER');
            if(Autorizacion.obtenerUsuario().rol === 'admin'){
                  
                await Usuario.crearUsuario(datos);
                Notificacion('USUARIO REGISTRADO EXITOSAMENTE', 'success');
                //navigate("/dashboard");
          }
        }
        catch (error) { 
            Notificacion(error.response.data.message, 'success');
        }
    }

    return(
        <Container>

            <form className="flex flex-col items-center gap-8 pb-4" onSubmitCapture={crearUsuario}>

                <div className="flex flex-col gap-2">
                    <h2 className='font-bold text-base'>Datos del Nuevo Usuario</h2>
                    <div className="grid grid-cols-2 w-[900px] gap-4 p-4 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                        <Input campo='Indicador' name='indicador' direccion="col" editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='cedula' direccion="col" editable={true} manejador={handleInputChange} />
                        <Input campo='Nombre' name='nombre' direccion="col" editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='apellido' direccion="col" editable={true} manejador={handleInputChange} />
                        <Select campo='Rol' name='rol' direccion="col" opciones={['SELECCIONE','admin','superuser','user']} manejador={handleInputChange} />
                        <Input campo='Contraseña' name='password' direccion="col" editable={true} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='gerencia' direccion="col" opciones={opcionGerencia} manejador={handleInputChange} />
                        <Input campo='Cargo' name='cargo' direccion="col" editable={true} manejador={handleInputChange} />
                    </div>
                </div>

                <Button color='blue' width={32}>Crear Usuario</Button>

            </form>

        </Container>
    );
}

export default Permisos;
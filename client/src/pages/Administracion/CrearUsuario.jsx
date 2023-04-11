
import { useState, useEffect } from "react";
import { Button, Container, Input, Notificacion, Select } from "../../components/";
import Checkbox from "../../components/Checkbox";
import Autorizacion from "../../services/auth.service";

function Permisos() {
    const [show, setShow] = useState(false);
    const [opcion, setOpcion] = useState('error');
    const [mensaje, setMensaje] = useState('error');

    useEffect(() => {
        if(show){
            setTimeout(() => { setShow(!show) }, "2000");
        }
    }, [show])

    const [datos, setDatos] = useState({
        indicador: '',
        rol: '',
        gerencia: '',
        subgerencia: '',
        creador: Autorizacion.obtenerUsuario().indicador,
    });

    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

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
      
                console.log('DENTRO DEL TRY CREATE');
                console.log(datos);
                  
                await Autorizacion.crearUsuario(datos);
                setOpcion('exito');
                setMensaje('Usuario registrado exitosamente');
                setShow(true);
                //navigate("/dashboard");
          }
        }
        catch (error) { 
            console.log('ERROR AL ACTUALIZAR APL_ACT'); 
            setMensaje(error.response.data.message);
            setOpcion('error');
            setShow(true);
        }
    }

    return(
        <Container>

            <div style={show ? {display: 'block'} : {display: 'none'}} className='fixed top-24' >
                <Notificacion opcion={opcion} titulo='CREACION DE USUARIO' mensaje={mensaje} />
            </div>

            <form className="flex flex-col items-center gap-8 pb-4" onSubmitCapture={crearUsuario}>

                <div className="flex flex-col gap-2">
                    <h2 className='font-bold text-base'>Datos del Nuevo Usuario</h2>
                    <div className="grid grid-cols-2 w-[900px] gap-4 p-4 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                        <Input campo='Indicador' name='indicador' direccion="col" editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='cedula' direccion="col" editable={true} manejador={handleInputChange} />
                        <Select campo='Rol' name='rol' direccion="col" opciones={['admin','superuser','user']} manejador={handleInputChange} />
                        <Input campo='Contraseña' name='password' direccion="col" editable={true} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='gerencia' direccion="col" opciones={['Admin','Superuser','User']} manejador={handleInputChange} />
                        <Select campo='Subgerencia' name='subgerencia' direccion="col" opciones={['Admin','Superuser','User']} manejador={handleInputChange} />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <h2 className='font-bold text-sm'>Acciones Permitidas</h2>
                    <div className="flex gap-4 p-4 bg-zinc-400 rounded">
                        <Checkbox id='aplicaciones' name='elementos_permitidos' opciones={['Ver','Modificar','Eliminar','Solicitar','Aprobar',]} />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <h2 className='font-bold text-sm'>Elementos Permitidos</h2>
                    <div className="flex gap-4 items-center p-4 bg-zinc-400 rounded">
                        <Checkbox id='aplicaciones' name='elementos_permitidos' opciones={['Aplicaciones','Base de datos','Servidores','Solicitudes','Graficos',]} />
                    </div>
                </div>

                <Button color='blue' width={32}>Crear Usuario</Button>

            </form>

        </Container>
    );
}

export default Permisos;

import { useState } from "react";
import { Button, Container, Input, Select, TextArea } from "../../components";
import Autorizacion from "../../services/auth.service";
import Falla from "../../services/falla.service";
import { Notificacion } from "../../utils/Notificacion";

function RegistrarFalla() {

    const [datos, setDatos] = useState({
        aplicacion: '',
        clase: '',
        impacto: '',
        descripcion: '',
        solucion: '',
        usuario: Autorizacion.obtenerUsuario().indicador,
		actualizador: Autorizacion.obtenerUsuario().indicador,
    });

    const handleInputChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        console.log(datos);
    }

	async function registrarFalla(e){
        e.preventDefault();
        
        try {
            console.log(datos);
        	if(Autorizacion.obtenerUsuario().rol === 'admin'){
            	await Falla.registrarFalla(datos);
                Notificacion('REGISTRO EXITOSO', 'success');
            }
        }
        catch (error) { 
            console.log('ERROR AL ACTUALIZAR APL_ACT');
            Notificacion('ERROR AL REGISTRAR', 'error');
        }
    }

    return (
        <Container>
            <form className="flex flex-col items-center gap-8 pb-4" onSubmit={registrarFalla}>

                <div className="flex flex-col gap-2">
                    <h2 className='font-bold text-base'>Datos de la Falla</h2>
                    <div className="grid grid-cols-2 w-[900px] gap-4 p-4 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                        <Input campo='Aplicacion' name='aplicacion' direccion="col" editable={true} manejador={handleInputChange} />
                        <Input campo='Usuario' name='descartar' direccion="col" editable={true} manejador={handleInputChange} />
                        <Select campo='Clase' name='clase' direccion="col" opciones={['SELECCIONE','CLASE 1','CLASE 2','CLASE 3']} manejador={handleInputChange} />
                        <Select campo='Impacto' name='impacto' opciones={['SELECCIONE','ALTA','MEDIA','BAJA']} manejador={handleInputChange}/>
                        <div className="col-span-2">
                            <TextArea campo='Descripcion' name='descripcion' area={true} direccion="col" editable={true} manejador={handleInputChange} />
                            <TextArea campo='Solucion' name='solucion' area={true} direccion="col" editable={true} manejador={handleInputChange} />
                        </div>
                    </div>
                </div>

                <Button tipo="submit" color='blue' width={32}>Registrar Falla</Button>

            </form>
            
        </Container>
    )
};

export default RegistrarFalla;
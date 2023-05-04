
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Select, TextArea } from "../../../components";
import Autorizacion from "../../../services/auth.service";
import Falla from "../../../services/falla.service";
import { Notificacion } from "../../../utils/Notificacion";
import Opciones from "../../../utils/Opciones";

function RegistrarFalla() {

    const navigate = useNavigate();
    const [acronimos, setAcronimos] = useState('');

    const [datos, setDatos] = useState({
        aplicacion: '',
        clase: '',
        impacto: '',
        descripcion: '',
        solucion: '',
        usuario: Autorizacion.obtenerUsuario().indicador,
		actualizador: Autorizacion.obtenerUsuario().indicador,
    });

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setAcronimos(await Opciones('acronimos'));
    }

    useEffect(() => {
        establecerDatos();
    }, []);



    const handleInputChange = (e) => {

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

	async function registrarFalla(e){
        e.preventDefault();
        
        try {
            console.log(datos);
        	if(Autorizacion.obtenerUsuario().rol === 'admin'){
            	await Falla.registrarFalla(datos);
                Notificacion('REGISTRO EXITOSO', 'success');
                setTimeout(() => { navigate("/aplicaciones/fallas") }, "2000");
            }
        }
        catch (error) { 
            Notificacion('ERROR AL REGISTRAR', 'error');
        }
    }

    return (
        <Container>
            <form className="flex flex-col items-center space-y-8 pb-4" onSubmit={registrarFalla}>

                <div className="flex flex-col space-y-2">
                    <h2 className='font-bold text-base'>Datos de la Falla</h2>

                    <div className="flex flex-col p-4 w-[320px] md:w-[640px] lg:w-[800px] bg-zinc-400 rounded">
                        <Select campo='Aplicacion' name='aplicacion' direccion="col" byId={false} opciones={acronimos ? acronimos : ['SELECCIONE']} manejador={handleInputChange} />
                        <Select campo='Clase' name='clase' direccion="col" byId={false} opciones={['SELECCIONE','CLASE 1','CLASE 2','CLASE 3']} manejador={handleInputChange} />
                        <Select campo='Impacto' name='impacto' byId={false} opciones={['SELECCIONE','ALTA','MEDIA','BAJA']} manejador={handleInputChange}/>
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
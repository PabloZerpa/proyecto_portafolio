
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Select, TextArea } from "../../../components";
import Autorizacion from "../../../services/auth.service";
import Falla from "../../../services/falla.service";
import { Notificacion } from "../../../utils/Notificacion";
import Opciones from "../../../utils/Opciones";
import { FaArrowLeft } from "react-icons/fa";

function RegistrarFalla() {

    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }

    // ---------- ESTADOS ----------
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

    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    // =================== FUNCION PARA REGISTRAR DATOS ===================
	async function registrarFalla(e){
        e.preventDefault();
        
        try {
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
                        <Select campo='Aplicacion' name='aplicacion' required={true} byId={false} opciones={acronimos ? acronimos : ['SELECCIONE']} manejador={setValores} />
                        <Select campo='Clase' name='clase' required={true} byId={false} opciones={['SELECCIONE','CLASE 1','CLASE 2','CLASE 3']} manejador={setValores} />
                        <Select campo='Impacto' name='impacto' required={true} byId={false} opciones={['SELECCIONE','ALTA','MEDIA','BAJA']} manejador={setValores}/>
                        <div className="col-span-2">
                            <TextArea campo='Descripcion' name='descripcion' area={true} required={true} editable={true} manejador={setValores} />
                            <TextArea campo='Solucion' name='solucion' area={true} editable={true} manejador={setValores} />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 md:gap-12">
                    <Button tipo='button' width={32} manejador={(e) => navegar(-1)} ><FaArrowLeft className="mr-2" />Volver</Button>
                    <Button tipo='submit' width={32}>Registrar</Button>
                </div>

            </form>
            
        </Container>
    )
};

export default RegistrarFalla;
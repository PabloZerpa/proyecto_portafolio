
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Select, TextArea } from "../../../components";
import { Notificacion } from "../../../utils/Notificacion";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { obtenerUsuario, rutaAplicacion, rutaUsuario } from "../../../utils/APIRoutes";
import authHeader from "../../../utils/header";

function RegistrarFalla() {

    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }

    // ---------- ESTADOS ----------
    const [acronimos, setAcronimos] = useState('');
    const [datos, setDatos] = useState({
        nombre: '',
        elemento: '',
        impacto: '',
        descripcion: '',
        solucion: '',
        usuario_creador: obtenerUsuario().indicador,
    });

     // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
     async function obtenerAcronimos(elemento) {
        try { 
            const respuesta = await axios.post(`${rutaUsuario}/acronimos`, {elemento}, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL OBTENER ACRONIMOS');
        }
    }

    async function OpcionesAcronimos(valor){
        try {
            const respuesta = await obtenerAcronimos(valor);
            const data = respuesta.data;
            let opciones = ['SELECCIONE'];
        
            for (let i = 0; i < data.length; i++) {
                const valor = Object.values(data[i]);
                opciones.push(valor[0]);
            }
        
            return opciones;
            
        } catch (error) {
            console.error(error);
        }
    }

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        //setAcronimos(await OpcionesAcronimos('acronimos'));
    }

    useEffect(() => {
        establecerDatos();
    }, []);

    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = async (e) => {
        const valor = e.target.value.toUpperCase();
        setDatos({ ...datos, [e.target.name] : valor })

        if(e.target.name === 'elemento'){
            setAcronimos(await OpcionesAcronimos(e.target.value));
        }
    }

    // =================== FUNCION PARA REGISTRAR DATOS ===================
	async function registrarFalla(e){
        e.preventDefault();
        
        try {
            if(obtenerUsuario().rol === 'admin'){
                await axios.post(`${rutaAplicacion}/fallas`, datos, { headers: authHeader() });
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
                        <Select campo='Elemento' name='elemento' required={true} byId={false} opciones={['SELECCIONE','APLICACION','BASE DE DATOS','SERVIDOR']} manejador={setValores} />
                        <Select campo='Nombre' name='nombre' required={true} byId={false} opciones={acronimos ? acronimos : ['SELECCIONE']} manejador={setValores} />
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
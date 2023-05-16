
import { useState } from "react";
import { Button, Select, TextArea } from "../../../components";
import Autorizacion from "../../../services/auth.service";
import Falla from "../../../services/falla.service";
import { Notificacion } from "../../../utils/Notificacion";

function ActualizarFalla({setIsOpen, valores, setUpdate}) {

    // ---------- ESTADOS ----------
    const [datos, setDatos] = useState({
        id: valores.falla_id,
        clase: valores.fal_clase,
        impacto: valores.fal_impacto,
        descripcion: valores.fal_descripcion,
        solucion: valores.fal_solucion,
		actualizador: Autorizacion.obtenerUsuario().indicador,
    });

    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = (e) => {
        const valor = e.target.value.toUpperCase();
        setDatos({ ...datos, [e.target.name] : valor })
    }

    // =================== FUNCION PARA ACTUALIZAR FALLA ===================
	async function actualizarFalla(e){
        e.preventDefault();
        
        try {
            if(Autorizacion.obtenerUsuario().rol === 'admin'){
                await Falla.actualizarFalla(datos); 
                Notificacion('FALLA MODDIFICADA EXITOSAMENTE', 'success');
                setUpdate(true);
                setIsOpen(false);
            }
        }
        catch (error) {
            Notificacion(error.response.data.message, 'error');
        }
    }

    return (
            <form className="flex flex-col items-center space-y-8 pb-4 overflow-y-auto" onSubmit={actualizarFalla}>
                <div className="flex flex-col items-center space-y-2 pb-4 bg-zinc-400 rounded">
                    <div className="flex flex-col p-4 w-[300px] md:w-[400px] lg:w-[500px] bg-zinc-400 rounded">
                        {/* <Select campo='Clase' name='clase' byId={false} propiedad={valores.fal_clase} opciones={['SELECCIONE','CLASE 1','CLASE 2','CLASE 3']} manejador={setValores} /> */}
                        <Select campo='Impacto' name='impacto' byId={false} propiedad={valores.fal_impacto} opciones={['SELECCIONE','ALTA','MEDIA','BAJA']} manejador={setValores}/>
                        <div className="col-span-2">
                            <TextArea campo='Descripcion' name='descripcion' area={true} propiedad={valores.fal_descripcion} editable={true} manejador={setValores} />
                            <TextArea campo='Solucion' name='solucion' area={true} propiedad={valores.fal_solucion} editable={true} manejador={setValores} />
                        </div>
                    </div>

                    <div className="flex space-x-16">
                        <Button width={32} manejador={(e) => setIsOpen(false)} >Cerrar</Button>
                        <Button tipo="submit" width={32}>Actualizar</Button>
                    </div>
                </div>
            </form>
    )
};

export default ActualizarFalla;
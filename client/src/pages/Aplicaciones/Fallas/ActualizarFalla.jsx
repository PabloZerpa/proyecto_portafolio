
import { useState } from "react";
import { Button, Input, Select, TextArea } from "../../../components";
import { Notificacion } from "../../../utils/Notificacion";
import { obtenerUsuario, rutaAplicacion } from "../../../utils/APIRoutes";
import axios from "axios";
import authHeader from "../../../utils/header";
import { FaTimes } from "react-icons/fa";

function ActualizarFalla({setIsOpen, valores, setUpdate}) {

    // ---------- ESTADOS ----------
    const [datos, setDatos] = useState({
        id: valores.falla_id,
        impacto: valores.fal_impacto,
        descripcion: valores.fal_descripcion,
        solucion: valores.fal_solucion,
		actualizador: obtenerUsuario().indicador,
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
            if(obtenerUsuario().rol !== 'user'){
                await axios.patch(`${rutaAplicacion}/fallas/${datos.id}`, datos, { headers: authHeader() });
                
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
            <form className="flex flex-col items-center space-y-4" onSubmit={actualizarFalla}>
                <div className="relative flex flex-col items-center space-y-1 py-2 bg-zinc-400 rounded">
                    <FaTimes className="absolute top-2 right-2 text-xl text-black cursor-pointer" onClick={(e) => setIsOpen(false)} />
                
                    <h1 className='font-bold text-lg'>Actualizacion de Falla</h1>
                    <div className="grid grid-cols-3 md:grid-cols-3 space-x-4 p-4 w-[300px] md:w-[400px] lg:w-[500px] bg-zinc-400 rounded">
                        <Input campo='Falla ID' name='falla_id' byId={false} editable={false} propiedad={valores.falla_id} manejador={setValores} />
                        <Input campo='Acronimo' name='apl_acronimo' byId={false} editable={false} propiedad={valores.apl_acronimo} manejador={setValores} />
                        <Select campo='Impacto' name='impacto' byId={false} propiedad={valores.fal_impacto} opciones={['SELECCIONE','ALTA','MEDIA','BAJA']} manejador={setValores}/>
                    </div>

                    <div className="w-4/5">
                        <TextArea campo='Descripcion' name='descripcion' area={true} propiedad={valores.fal_descripcion} editable={true} manejador={setValores} />
                        <TextArea campo='Solucion' name='solucion' area={true} propiedad={valores.fal_solucion} editable={true} manejador={setValores} />
                    </div>

                    <div className="flex">
                        <Button tipo="submit" width={24}>Actualizar</Button>
                    </div>
                </div>
            </form>
    )
};

export default ActualizarFalla;

import axios from "axios";
import { rutaUsuario } from "./APIRoutes";
import authHeader from "../utils/header";
import { Notificacion } from "./Notificacion";

export async function Opciones(ruta, busqueda=false){

    try {

        const {data} = await axios.get(`${rutaUsuario}${ruta}`, { headers: authHeader() });
        let opciones = ['SELECCIONE'];

        if(busqueda)
            opciones.push('TODAS');
    
        for (let i = 0; i < data.length; i++) {
            const valor = Object.values(data[i]);
            opciones.push(valor[0]);
        }
    
        return opciones;
        
    } catch (error) {
        Notificacion(error.response.data.message, 'error');
    }
} 

export default Opciones;
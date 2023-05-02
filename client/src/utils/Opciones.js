
import Usuario from "../services/usuario.service";

async function Opciones(ruta){

    try {
        const respuesta = await Usuario.obtenerOpcion(ruta);
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

export default Opciones;
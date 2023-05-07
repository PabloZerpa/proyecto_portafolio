
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = process.env.REACT_APP_URL;

class Falla {  

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerFallaPorBusqueda(term) {
        try {
            return axios.post(`${baseUrl}aplicaciones/fallas/busqueda`,{term}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    // =============== REGISTRA LA FALLA ===============
    async registrarFalla(datos) {
        try {
            const respuesta = await axios.post(`${baseUrl}aplicaciones/fallas`, datos, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR USUARIO');
        }
    }

    // =============== ACTUALIZA LA FALLA ===============
    async actualizarFalla(datos) {
        const id = datos.id;
        try {
            const respuesta = await axios.patch(`${baseUrl}aplicaciones/fallas/${id}`, datos, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR USUARIO');
        }
    }


}

export default new Falla();
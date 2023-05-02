
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = "http://localhost:3001/api/";
 
class Falla {  

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerFallaPorBusqueda(term) {
        try {
            console.log('OBTENER_BUSQUEDA');
            console.log(term);
 
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

        const { clase, impacto, descripcion, solucion } = datos;
        const id = datos.edicion;
        console.log('EN CREAR USUARIO')
        try {
            console.log('ANTES DE ACTUALIZAR FALLA')
            const respuesta = await axios.patch(`${baseUrl}aplicaciones/fallas/${id}`, datos, { headers: authHeader() });
            console.log('DESPUES DE CREAR USUARIO')
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR USUARIO');
        }
    }


}

export default new Falla();
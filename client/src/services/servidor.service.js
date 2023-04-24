
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = "http://localhost:3001/api/";
 
class Servidor {  

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async crearDatosServidor(datos) {
        return await axios.post(`${baseUrl}servidores/`, datos, { headers: authHeader() })
        .then(response => {
            return response.data;
        });
    }

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async actualizarDatosServidor(id,datos) {
        try { 
            const respuesta = await axios.patch(`${baseUrl}basedatos/${id}`, datos, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR auth.service');
        }
    }

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerServidorPorBusqueda(term,count,orden) {
        try {
            console.log(term,count,orden);
            return axios.post(`${baseUrl}basedatos/busqueda`, {term,count,orden}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

}

export default new Servidor();
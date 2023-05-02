
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
    async obtenerServidorPorBusqueda(term,estatus,region,sistema,marca,orden) {
        try {
            return axios.post(`${baseUrl}servidores/busqueda`, 
            {term,estatus,region,sistema,marca,orden}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

}

export default new Servidor();
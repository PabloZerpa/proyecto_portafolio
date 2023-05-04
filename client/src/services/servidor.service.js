
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

    // =============== OBTIENE INFORMACION GENERAL DATABASE ===============
    async obtenerGeneralServidor(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}servidores/general/${id}`, { headers: authHeader() });
            return respuesta;
            console.log(respuesta);
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }
    
    // =============== OBTIENE INFORMACION SERVIDOR DATABASE ===============
    async obtenerAplicacionServidor(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}servidores/aplicacion/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }
    // =============== OBTIENE INFORMACION APLICACION DATABASE ===============
    async obtenerBDServidor(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}servidores/basedatos/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }


    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerSer(id) {
        try {
            return axios.get(`${baseUrl}basedatos/${id}`, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
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
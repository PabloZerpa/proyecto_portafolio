
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = process.env.REACT_APP_URL;

class Base {  

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async crearDatosDB(datos, servidores) {
        
        let datosServidor = datos;
        datosServidor.select_servidor = servidores;
        try {  

            const respuesta = await axios.post(`${baseUrl}basedatos/`, datosServidor, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR auth.service');
        }
    }

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async actualizarDatosDB(id,datos) {
        try { 
            const respuesta = await axios.patch(`${baseUrl}basedatos/${id}`, datos, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR auth.service');
        }
    }


    // =============== OBTIENE INFORMACION GENERAL DATABASE ===============
    async obtenerGeneralBD(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}basedatos/general/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }
    
    // =============== OBTIENE INFORMACION SERVIDOR DATABASE ===============
    async obtenerAplicacionBD(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}basedatos/aplicacion/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }
    // =============== OBTIENE INFORMACION APLICACION DATABASE ===============
    async obtenerServidorBD(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}basedatos/servidor/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }


    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerBD(id) {
        try {
            return axios.get(`${baseUrl}basedatos/${id}`, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
        } 
    }

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerBDPorBusqueda(term,estatus,tipo,manejador,ambiente,count,orden) {
        try {
            
            return axios.post(`${baseUrl}basedatos/busqueda`, 
            {term,estatus,tipo,manejador,ambiente,count,orden}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }


}

export default new Base();
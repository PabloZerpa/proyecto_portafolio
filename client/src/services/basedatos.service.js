
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = "http://localhost:3001/api/";

class Base {  

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async crearDatosDB(datos, servidores) {
        
        console.log(datos, servidores);
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
        console.log('AFUERA DE CREAR DATOS SERVICE')
        console.log(datos);
        try { 
            console.log('EN EL TRY DE CREAR DATOS SERVICE')
            const respuesta = await axios.patch(`${baseUrl}basedatos/${id}`, datos, { headers: authHeader() });
            console.log('DESPUES DE CREAR DATOS SERVICE')
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
            //console.log(respuesta);
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }
    // =============== OBTIENE INFORMACION APLICACION DATABASE ===============
    async obtenerServidorBD(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}basedatos/servidor/${id}`, { headers: authHeader() });
            //console.log(respuesta);
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }


    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerBD(id) {
        try {
            console.log('OBTENER_BUSQUEDA');
            console.log(id);
 
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
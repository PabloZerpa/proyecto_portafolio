import axios from 'axios';
import authHeader from './header.service';
const baseUrl = process.env.REACT_APP_URL;
 
class Custodio {  

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async registrarCustodio(datos) {
        return await axios.post(`${baseUrl}custodios/`, datos, { headers: authHeader() })
        .then(response => {
            return response.data;
        });
    }

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async actualizarDatosCustodio(id,datos) {
        try { 
            const respuesta = await axios.patch(`${baseUrl}custodios/${id}`, datos, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR auth.service');
        }
    }

    

    // =============== OBTIENE INFORMACION GENERAL DATABASE ===============
    async obtenerGeneral(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}custodios/general/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }
    
    // =============== OBTIENE INFORMACION Custodio DATABASE ===============
    async obtenerAplicacion(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}custodios/aplicacion/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerCus(id) {
        try {
            return axios.get(`${baseUrl}basedatos/${id}`, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
        } 
    }

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerCustodioPorBusqueda(term,cargo,gerencia,region) {
        try {
            return axios.post(`${baseUrl}custodios/busqueda`, 
            {term,cargo,gerencia,region}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

}

export default new Custodio();
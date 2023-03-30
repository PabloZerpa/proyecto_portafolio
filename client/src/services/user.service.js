
import axios from 'axios';
import authHeader from './header.service';
import Authorization from './auth.service';
const baseUrl = "http://localhost:3001/api/";
// const baseUrl = "https://proyecto-portafolio-server.onrender.com/api/";

class Usuarios {
  
    // =============== OBTIENE TODOS LOS DATOS DE LAS APPS ===============
    async obtenerDatos() { 
        try {
            const respuesta = await axios.get(`${baseUrl}aplicaciones`, { headers: authHeader() });

            console.log('USER SERVICE OBTENER DATOS');
            console.log(respuesta);
            return respuesta;
        } catch (error) {
            // Authorization.logout();
            // window.location.reload();
            console.log('Error al obtener datos'); 
        }
        //return axios.get(`${baseUrl}aplicaciones`, { headers: this.authHeader() });
    }

    // =============== OBTIENE EL DATO DE UNA APP POR SU ID ===============
    async obtenerDato(id) {
        try {
            const respuesta = await axios.get(`${baseUrl}aplicaciones/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener dato'); 
        }
    }  

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerPorBusqueda(term,estatus,region,prioridad,plataforma,order,count) {
        try {
            console.log('Obtener por busqueda');
            return axios.post(`${baseUrl}aplicaciones/term`, {term,estatus,region,prioridad,plataforma,order,count});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    // =============== OBTIENE LOS DATOS POR EL CAMPO A ACTUALIZAR ESPECIFICO ===============
    async obtenerPorCampo(term,campo) { 
        try {
            return axios.post(`${baseUrl}aplicaciones/campo`, {term,campo});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    // =============== OBTIENE LOS DATOS PARA GENERAR LOS GRAFICOS ===============
    async datosGraficos(categoria,orden) {
        console.log(categoria);
        console.log(orden);
        try {
            return axios.post(`${baseUrl}aplicaciones/grafico`, {categoria,orden});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

}

export default new Usuarios();
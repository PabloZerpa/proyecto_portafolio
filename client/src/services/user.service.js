
import axios from 'axios';
import authHeader from './header.service';
import Authorization from './auth.service';
const baseUrl = "http://localhost:3001/api/";
// const baseUrl = "https://proyecto-portafolio-server.onrender.com/api/";

class Usuarios {

    // =============== OBTIENE TODOS LOS DATOS DE LAS APPS ===============
    async obtenerDatosUsuarios() {
        try {
            const respuesta = await axios.get(`${baseUrl}user`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            Authorization.logout();
            window.location.reload();
        }
        //return axios.get(`${baseUrl}user`, { headers: this.authHeader() });
    }

    // =============== OBTIENE EL DATO DE UNA APP POR SU ID ===============
    async obtenerDato(id) {
        try {
            const respuesta = await axios.get(`${baseUrl}user/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerPorTermino(term,estatus,region,prioridad,tipo,order,count) {
        try {
            return axios.post(`${baseUrl}user/term`, {term,estatus,region,prioridad,tipo,order,count});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    // =============== OBTIENE LOS DATOS POR EL CAMPO A ACTUALIZAR ESPECIFICO ===============
    async obtenerPorCampo(term,campo) {
        try {
            return axios.post(`${baseUrl}user/campo`, {term,campo});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    // =============== OBTIENE LOS DATOS PARA GENERAR LOS GRAFICOS ===============
    async datosGraficos(categoria,orden) {
        console.log(categoria);
        console.log(orden);
        try {
            return axios.post(`${baseUrl}user/grafico`, {categoria,orden});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

}

export default new Usuarios();
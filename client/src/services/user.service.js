
import axios from 'axios';
import Authorization from './auth.service';
//const baseUrl = "http://localhost:3001/api/";
const baseUrl = "https://proyecto-portafolio-server.onrender.com/api/";

class Usuarios {

    // =============== OBTIENE EL TOKEN DE LA CABECERA DEL CLIENTE ===============
    authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) return { 'Authorization': user.token };
        else return {};
    }

    // =============== OBTIENE TODOS LOS DATOS DE LAS APPS ===============
    async obtenerDatosUsuarios() {
        try {
            const respuesta = await axios.get(`${baseUrl}user`, { headers: this.authHeader() });
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
            const respuesta = await axios.get(`${baseUrl}user/${id}`, { headers: this.authHeader() });
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
    async datosGraficos(categoria,sub) {
        try {
            return axios.post(`${baseUrl}user/grafico`, {categoria,sub});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

}

export default new Usuarios();
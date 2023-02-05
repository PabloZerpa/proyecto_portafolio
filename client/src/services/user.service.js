
import axios from 'axios';
import Authorization from './auth.service';
const baseUrl = "http://localhost:3001/api/";
// const baseUrl = "https://proyecto-portafolio-server.onrender.com/api/";

class Usuarios {

    authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) return { 'Authorization': user.token };
        else return {};
    }

    async obtenerDatosUsuario() {
        try {
            const respuesta = await axios.get(`${baseUrl}user`, { headers: this.authHeader() });
            return respuesta;
        } catch (error) {
            Authorization.logout();
            window.location.reload();
        }
        //return axios.get(`${baseUrl}user`, { headers: this.authHeader() });
    }

    async obtenerDato(id) {
        try {
            const respuesta = await axios.get(`${baseUrl}user/${id}`, { headers: this.authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    async obtenerPorModificacion() {
        try {
            const respuesta = await axios.get(`${baseUrl}user/ultimosModificados`, { headers: this.authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    async obtenerPorCreacion() {
        try {
            const respuesta = await axios.get(`${baseUrl}user/ultimosAgregados`, { headers: this.authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    async obtenerPorTermino(term, id,region,depart,fecha,prioridad,order) {
        try {
            console.log(term);
            return axios.post(`${baseUrl}user/term`, {term, id,region,depart,fecha,prioridad,order});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

}

export default new Usuarios();
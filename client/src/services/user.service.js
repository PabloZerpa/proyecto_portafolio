
import axios from 'axios';
import Authorization from './auth.service';
const baseUrl = "http://localhost:3001/api/";

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

    obtenerDatosAdmin() {
        return axios.get(`${baseUrl}user`, { headers: this.authHeader() });
    }
}

export default new Usuarios();
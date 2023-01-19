
import axios from 'axios';
//import authHeader from './cabecera.service';
const baseUrl = "http://localhost:3001/api/";

class Usuarios {

    authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) return { 'Authorization': user.token };
        else return {};
    }

    obtenerDatosUsuario() {
        return axios.get(`${baseUrl}user`, { headers: this.authHeader() });
    }

    obtenerDatosAdmin() {
        return axios.get(`${baseUrl}user`, { headers: this.authHeader() });
    }
}

export default new Usuarios();
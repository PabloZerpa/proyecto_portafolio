
import axios from 'axios';
import authHeader from './header.service';

const baseUrl = "http://localhost:3001/api/";

class Usuarios {

    obtenerDatosUsuario() {
        return axios.get(`${baseUrl}user`, { headers: authHeader() });
    }

    obtenerDatosAdmin() {
        return axios.get(`${baseUrl}user`, { headers: authHeader() });
    }
}

export default new Usuarios();
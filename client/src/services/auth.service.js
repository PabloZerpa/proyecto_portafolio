
import axios from 'axios';
//const baseUrl = "http://localhost:3001/api/";
const baseUrl = "https://proyecto-portafolio-server.onrender.com/api/"


class Autorizacion {
    
    authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) return { 'Authorization': user.token };
        else return {};
    }

    // ---------------- LOGIN ------------------
    async login(indicador, password, rol) {
        
        return axios.post(`${baseUrl}login`, {indicador,password,rol})
        .then(response => {
            if (response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data));

            return response.data;
        });
    }

    // ---------------- UPDATE ------------------
    async actualizarDatos(id, datosModificacion) {
        try {
            const respuesta = await axios.put(`${baseUrl}user/${id}`, datosModificacion, { headers: this.authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
        }
    }
    
    // ---------------- CREATE ------------------
    async crearDatos(datosRegistro) {
        try {
            const respuesta = await axios.post(`${baseUrl}user/`, datosRegistro, { headers: this.authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
        }
    }

    // ---------------- LOGOUT ------------------
    async logout() {
        localStorage.removeItem("user");
        window.location.reload();
        try {
            await axios.get('http://localhost:3001/api/logout');
        } catch (error) {console.log(error);}
    }

    // ---------------- OBTENER USUARIO ------------------
    obtenerUsuario() {
        return JSON.parse(localStorage.getItem('user'));
    }

}

export default new Autorizacion();
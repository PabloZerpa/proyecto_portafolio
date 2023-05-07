
import axios from 'axios';
const baseUrl = process.env.REACT_APP_URL;

class Autorizacion {
    
    // ---------------- LOGIN ------------------
    async login(indicador, password) {
        
        return axios.post(`${baseUrl}login`, {indicador,password})
        .then(response => {
            if (response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data));

            return response.data;
        });
    }

    // ---------------- LOGOUT ------------------
    async logout() {
        localStorage.removeItem("user");
        window.location.reload();
        try {
            await axios.get(`${baseUrl}/logout`);
        } catch (error) {console.log(error);}
    }

    // ---------------- OBTENER USUARIO ------------------
    obtenerUsuario() {
        return JSON.parse(localStorage.getItem('user'));
    }

    // =============== OBTIENE LOS DATOS DE LOS USUARIOS ===============
    async obtenerTotal() { 
        try { 
            return axios.get(`${baseUrl}login/total`);
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

}

export default new Autorizacion();

import axios from 'axios';
const baseUrl = "http://localhost:3001/api/";

class AuthService {

    // ---------------- LOGIN ------------------
    async login(indicador, password, rol) {

        if(password.length > 7 && indicador.length !== '' && rol.length !== ''){

            return axios.post(`${baseUrl}login`, {indicador,password,rol})
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
        }
    }

    // ---------------- LOGOUT ------------------
    logout() {
        localStorage.removeItem("user");
    }

    // ---------------- OBTENER USUARIO ------------------
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

}

export default new AuthService();
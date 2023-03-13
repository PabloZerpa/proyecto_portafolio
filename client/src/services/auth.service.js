
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = "http://localhost:3001/api/";
// const baseUrl = "https://proyecto-portafolio-server.onrender.com/api/"

class Autorizacion {

    // ---------------- LOGIN ------------------
    async login(indicador, password, rol) {
        
        return axios.post(`${baseUrl}login`, {indicador,password,rol})
        .then(response => {
            if (response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data));

            return response.data;
        });
    }
    
    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async crearDatos(datos) {
        console.log('AFUERA DE CREAR DATOS SERVICE')
        try {
            console.log('EN EL TRY DE CREAR DATOS SERVICE')

            const respuesta = await axios.post(`${baseUrl}user/`, datos, { headers: authHeader() });

            console.log('DESPUES DE CREAR DATOS SERVICE')
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR auth.service');
        }
    }

    // ---------------- UPDATE DE TODOS LOS DATOS ------------------
    async actualizarDatos(id, datosModificacion) {
        console.log('AFUERA DE ACTUALIZAR DATOS SERVICE')
        try {
            console.log('EN EL TRY DE ACTUALIZAR DATOS SERVICE')
            const respuesta = await axios.put(`${baseUrl}user/${id}`, datosModificacion, { headers: authHeader() });
            console.log('DESPUES DE ACTUALIZAR DATOS SERVICE')
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
        }
    }
    
    // ---------------- UPDATE DE UN CAMPO EN ESPECIFICO ------------------
    async actualizarDato(id, datoModificacion) {
        try {
            const respuesta = await axios.patch(`${baseUrl}user/${id}`, datoModificacion, { headers: authHeader() });
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
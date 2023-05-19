
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = process.env.REACT_APP_URL;
 
class Usuario {  

    // =============== OBTIENE LOS DATOS DE LOS USUARIOS ===============
    async obtenerUsuarios(term) { 
        try { 
            return axios.post(`${baseUrl}usuarios/busqueda`, {term}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    // =============== OBTIENE LA ACTIVIDAD DEL USUARIO ===============
    async obtenerActividad(id) { 
        try { 
            return axios.get(`${baseUrl}usuarios/actividad/${id}`, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    
    async crearUsuario(datos) {
        return await axios.post(`${baseUrl}login/registro`, datos) 
        .then(response => {
            return response.data;
        });
    }

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async actualizarUsuario(datoModificacion) {
        try { 
            const id = datoModificacion.id;
            const respuesta = await axios.patch(`${baseUrl}usuarios/permisos/${id}`, datoModificacion, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
        }
    }

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async eliminarUsuario(id) {
        try { 
            const respuesta = await axios.delete(`${baseUrl}usuarios/eliminar/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
        }
    }

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async obtenerOpcion(nombre) {
        try { 
            const respuesta = await axios.get(`${baseUrl}usuarios/${nombre}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL OBTENER OPCIONES');
        }
    }

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async obtenerLocalidades(region) {
        try { 
            const respuesta = await axios.post(`${baseUrl}usuarios/localidades`, {region}, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL OBTENER LOCALIDADES');
        }
    }

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async obtenerAcronimos(elemento) {
        try { 
            const respuesta = await axios.post(`${baseUrl}usuarios/acronimos`, {elemento}, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL OBTENER ACRONIMOS');
        }
    }

    // ---------------- OBTENER CANTIDAD DE REGISTROS DE LOS ELEMENTOS ------------------
    async obtenerCantidad() {
        try { 
            const respuesta = await axios.get(`${baseUrl}usuarios/cantidad`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL OBTENER ACRONIMOS');
        }
    }

    // ---------------- OBTENER CANTIDAD DE REGISTROS POR REGIONES ------------------
    async obtenerCantidadRegiones(categoria,orden) {
        try { 
            const respuesta = await axios.post(`${baseUrl}usuarios/cantidadRegiones`, {categoria,orden}, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL OBTENER ACRONIMOS');
        }
    }

}

export default new Usuario();
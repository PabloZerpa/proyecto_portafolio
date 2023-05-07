
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
            console.log('ERROR AL OBTENER ROLES');
        }
    }

}

export default new Usuario();
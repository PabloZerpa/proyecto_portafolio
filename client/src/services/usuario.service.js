
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = "http://localhost:3001/api/";
 
class Usuario {  

    // =============== OBTIENE LOS DATOS DE LOS USUARIOS ===============
    async obtenerUsuarios(term,pagina) { 
        try { 
            return axios.post(`${baseUrl}usuarios/busqueda`, {term,pagina}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    
    async crearUsuario(datos) {
        console.log('AQUI');
        return await axios.post(`${baseUrl}login/registro`, datos) 
        .then(response => {
            return response.data;
        });
    }

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async actualizarUsuario(datoModificacion) {
        try { 
            const id = datoModificacion.edicion;
            console.log(id);
            console.log(datoModificacion);
            const respuesta = await axios.patch(`${baseUrl}usuarios/permisos/${id}`, datoModificacion, { headers: authHeader() });
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
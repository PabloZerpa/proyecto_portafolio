
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = "http://localhost:3001/api/";
 
class Usuario {  

    // =============== OBTIENE LOS DATOS DE LOS USUARIOS ===============
    async obtenerUsuarios(term,pagina) { 
        try { console.log('alo');
            return axios.post(`${baseUrl}usuarios/busqueda`, {term,pagina}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    async crearUsuario(datos) {
        try {
            console.log('ANTES DE CREAR USUARIO')
            const respuesta = await axios.post(`${baseUrl}login/registro`, datos, { headers: authHeader() })
            console.log('DESPUES DE CREAR USUARIO')
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR USUARIO');
        }
    }

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async actualizarUsuario(id, datoModificacion) {
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

}

export default new Usuario();
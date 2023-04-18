
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = "http://localhost:3001/api/";

class Autorizacion {

// ******************************** LOGIN **********************************

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
            await axios.get('http://localhost:3001/api/logout');
        } catch (error) {console.log(error);}
    }

    // ---------------- OBTENER USUARIO ------------------
    obtenerUsuario() {
        return JSON.parse(localStorage.getItem('user'));
    }



    
// ******************************** USUARIOS **********************************

    async crearUsuario(datos) {
        try {
            console.log('ANTES DE CREAR USUARIO')
            const respuesta = await axios.post(`${baseUrl}login/registro`, datos)
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



// ******************************** APLICACIONES **********************************

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async crearDatos(datos) {
        console.log('AFUERA DE CREAR DATOS SERVICE')
        console.log(datos);
        try { 
            console.log('EN EL TRY DE CREAR DATOS SERVICE')
            const respuesta = await axios.post(`${baseUrl}aplicaciones/`, datos, { headers: authHeader() });
            console.log('DESPUES DE CREAR DATOS SERVICE')
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR auth.service');
        }
    }
 
    // ---------------- UPDATE DE TODOS LOS DATOS ------------------
    async actualizarDatos(id, datosModificacion) {
        console.log('AFUERA DE ACTUALIZAR DATOS SERVICE');
        console.log(id);
        try { 
            console.log('EN EL TRY DE ACTUALIZAR DATOS SERVICE');
            const respuesta = await axios.put(`${baseUrl}aplicaciones/${id}`, datosModificacion, { headers: authHeader() });
            console.log('DESPUES DE ACTUALIZAR DATOS SERVICE');
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
        }
    }
     
    // ---------------- UPDATE DE UN CAMPO EN ESPECIFICO ------------------
    async actualizarDato(id, datoModificacion) {
        try { 
            const id = datoModificacion.edicion;
            console.log(id);
            console.log(datoModificacion);
            const respuesta = await axios.patch(`${baseUrl}aplicaciones/${id}`, datoModificacion, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
        }
    }


    // ******************************** FALLAS **********************************

    // =============== REGISTRA LA FALLA ===============
    async registrarFalla(datos) {

        //const { aplicacion_id, usuario_id, clase, impacto, descripcion, solucion } = datos;
        try {
            const respuesta = await axios.post(`${baseUrl}aplicaciones/fallas`, datos);
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR USUARIO');
        }
    }

    // =============== ACTUALIZA LA FALLA ===============
    async actualizarFalla(datos) {

        const { clase, impacto, descripcion, solucion } = datos;
        const id = datos.edicion;
        console.log('EN CREAR USUARIO')
        try {
            console.log('ANTES DE ACTUALIZAR FALLA')
            const respuesta = await axios.patch(`${baseUrl}aplicaciones/fallas/${id}`, datos);
            console.log('DESPUES DE CREAR USUARIO')
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR USUARIO');
        }
    }



    // ******************************** BASE DE DATOS **********************************

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async crearDatosDB(datos) {
        console.log('AFUERA DE CREAR DATOS SERVICE')
        console.log(datos);
        try { 
            console.log('EN EL TRY DE CREAR DATOS SERVICE')
            const respuesta = await axios.post(`${baseUrl}basedatos/`, datos, { headers: authHeader() });
            console.log('DESPUES DE CREAR DATOS SERVICE')
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR auth.service');
        }
    }

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async actualizarDatosDB(id,datos) {
        console.log('AFUERA DE CREAR DATOS SERVICE')
        console.log(datos);
        try { 
            console.log('EN EL TRY DE CREAR DATOS SERVICE')
            const respuesta = await axios.patch(`${baseUrl}basedatos/${id}`, datos, { headers: authHeader() });
            console.log('DESPUES DE CREAR DATOS SERVICE')
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR auth.service');
        }
    }


}

export default new Autorizacion();
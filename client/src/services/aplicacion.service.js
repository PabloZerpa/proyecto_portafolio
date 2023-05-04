
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = "http://localhost:3001/api/";

class Aplicacion {

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async crearDatos(datos, lenguajes, bases, servidores) {

        let datosServidor = datos;
        datosServidor.select_lenguaje = lenguajes;
        datosServidor.select_base = bases;
        datosServidor.select_servidor = servidores;

        return await axios.post(`${baseUrl}aplicaciones/`, datosServidor, { headers: authHeader() })
        .then(response => {
            return response.data;
        });
    }

    // ---------------- UPDATE DE TODOS LOS DATOS ------------------
    async actualizarDatos(id, datos, lenguajes, bases, servidores) {
        try { 

            let datosServidor = datos;
            datosServidor.select_lenguaje = lenguajes;
            datosServidor.select_base = bases;
            datosServidor.select_servidor = servidores;
            console.log(datosServidor);
            
            const respuesta = await axios.put(`${baseUrl}aplicaciones/${id}`, datosServidor, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
            
        }
    }
 
    // ---------------- UPDATE DE UN CAMPO EN ESPECIFICO ------------------
    async actualizarDato(id, datoModificacion) {
        try { 
            const id = datoModificacion.edicion;
            const respuesta = await axios.patch(`${baseUrl}aplicaciones/${id}`, datoModificacion, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
            
        }
    }






    // =============== OBTIENE OPCIONES DE LA TABLA "NOMBRE" ===============
    async obtenerOpcion(nombre) {
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/${nombre}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL OBTENER ROLES');
        }
    }

    // =============== OBTIENE TODOS LOS DATOS DE LAS APPS ===============
    async obtenerDatos() { 
        try {   
            const respuesta = await axios.get(`${baseUrl}aplicaciones`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log(error.response.data); 
            //Autorizacion.logout();
        }
    }

    // =============== OBTIENE EL DATO DE UNA APP POR SU ID ===============
    async obtenerCantidadTotal() {
        try {
            const respuesta = await axios.get(`${baseUrl}aplicaciones/total`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener dato'); 
            
        }
    }   

    // =============== OBTIENE EL DATO DE UNA APP POR SU ID ===============
    async obtenerDato(id) {
        try {
            const respuesta = await axios.get(`${baseUrl}aplicaciones/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener dato'); 
            
        }
    }   

    // =============== OBTIENE LOS DATOS POR EL CAMPO A ACTUALIZAR ESPECIFICO ===============
    async obtenerPorCampo(term,campo,pagina) { 
        try {
            return axios.post(`${baseUrl}aplicaciones/campo`, {term,campo,pagina}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
            
        }
    }

    // =============== OBTIENE LOS DATOS PARA GENERAR LOS GRAFICOS ===============
    async datosGraficos(categoria,orden) {
        try {
            return axios.post(`${baseUrl}aplicaciones/grafico`, {categoria,orden}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
            
        }
    }
    
    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerPorBusqueda(term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
        critico,codigo,count,order,pagina) {
        try {
            return axios.post(`${baseUrl}aplicaciones/busqueda`, 
                {term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
                critico,codigo,count,order,pagina}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
            
        }
    }

    // ---------------- REGISTRO DE LA INFO DEL RESPONSABLE ------------------
    async registrarResponsable(datos) {
        return await axios.post(`${baseUrl}aplicaciones/responsable`, datos, { headers: authHeader() })
        .then(response => {
            return response.data;
        });
    }













    // =============== OBTIENE TOTAL LLAMANDO A LAS OTRAS FUNCIONES ===============
    async obtenerTodo(id) { 
        try { 
            const general = await this.obtenerGeneral(id);
            const tecnologia = await this.obtenerTecnologia(id);
            const plataformas = await tecnologia.data.plataformas[0];
            const lenguajes = await tecnologia.data.lenguajes[0];
            const basedatos = await this.obtenerBaseDatos(id);
            const servidor = await this.obtenerServidor(id);
            const modelos = await servidor.data.modelos[0];
            const responsable = await this.obtenerResponsable(id);
            const funcional = await responsable.data.funcional[0];
            const tecnico = await responsable.data.tecnico[0];
            const documentacion = await this.obtenerDocumentacion(id);

            const respuesta = {
                general: general.data[0],
                tecnologia: tecnologia.data.datos[0],
                plataformas: plataformas,
                lenguajes: lenguajes,
                basedatos: basedatos.data.datos[0],
                servidor: servidor.data.datos[0],
                modelos: modelos,
                funcional: funcional,
                tecnico: tecnico,
                documentacion: documentacion.data.datos[0],
            } 

            //console.log(respuesta);
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }
  
    // =============== OBTIENE INFORMACION GENERAL ===============
    async obtenerGeneral(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/general/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }
    

    // =============== OBTIENE INFORMACION TECNOLOGIA ===============
    async obtenerTecnologia(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/tecnologia/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }

    // =============== OBTIENE INFORMACION TECNOLOGIA ===============
    async obtenerBaseDatos(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/basedatos/${id}`, { headers: authHeader() });
            //console.log(respuesta); 
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }

    // =============== OBTIENE INFORMACION SERVIDOR ===============
    async obtenerServidor(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/servidor/${id}`, { headers: authHeader() });
            //console.log(respuesta);
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }

    // =============== OBTIENE INFORMACION RESPONSABLE ===============
    async obtenerResponsable(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/responsable/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }

    // =============== OBTIENE INFORMACION RESPONSABLE ===============
    async obtenerDocumentacion(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/documentacion/${id}`, { headers: authHeader() });
            //console.log(respuesta);
            return respuesta;
        } catch (error) { 
            console.log('Error al obtener datos'); 
        }
    }

    // =============== OBTIENE INFORMACION RESPONSABLE ===============
    async obtenerFallas(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/fallas/${id}`, { headers: authHeader() });
            //console.log(respuesta);
            return respuesta;
        } catch (error) { 
            console.log('Error al obtener datos'); 
        }
    }

}

export default new Aplicacion();
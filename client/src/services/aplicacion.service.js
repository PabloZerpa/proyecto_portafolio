
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = process.env.REACT_APP_URL;

class Aplicacion {

    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async crearDatos(datos, lenguajes, bases, servidores, documentos) {

        let datosServidor = datos;
        datosServidor.select_lenguaje = lenguajes;
        datosServidor.select_base = bases;
        datosServidor.select_servidor = servidores;
        datosServidor.select_documentos = documentos;
        console.log(datosServidor);

        return await axios.post(`${baseUrl}aplicaciones/`, datosServidor, { headers: authHeader() })
        .then(response => {
            return response.data;
        });
    }

    // ---------------- UPDATE DE TODOS LOS DATOS ------------------
    async actualizarDatos(id, datos, lenguajes, bases, servidores, documentos) {
        try { 

            let datosServidor = datos;
            datosServidor.select_lenguaje = lenguajes;
            datosServidor.select_base = bases;
            datosServidor.select_servidor = servidores;
            datosServidor.select_documentos = documentos;
            console.log(datosServidor);
            
            const respuesta = await axios.put(`${baseUrl}aplicaciones/${id}`, datosServidor, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
            
        }
    }

    // ---------------- ELIMINA UNA APLICACION ------------------
    async eliminar(id) {
        try { 
            const respuesta = await axios.delete(`${baseUrl}aplicaciones/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
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
    async obtenerDato(id) {
        try {
            const respuesta = await axios.get(`${baseUrl}aplicaciones/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener dato'); 
            
        }
    }  

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerPorBusqueda(term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
        critico,codigo,count,order,cantidad) {
        try {
            return axios.post(`${baseUrl}aplicaciones/busqueda`, 
                {term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
                critico,codigo,count,order,cantidad}, { headers: authHeader() });
        } catch (error) {
            console.log('Error al obtener dato');
            
        }
    }

    // =============== OBTIENE OPCIONES PARA LOS SELECTS DE LA TABLA SEGUN EL PARAMETRO ===============
    async obtenerOpcion(nombre) {
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/${nombre}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL OBTENER ROLES');
        }
    }

    

    
    // =============== OBTIENE TOTAL LLAMANDO A LAS OTRAS FUNCIONES ===============
    async obtenerTodo(id) { 
        try { 
            const general = await this.obtenerGeneral(id);
            const tecnologia = await this.obtenerTecnologia(id);
            const plataformas = await tecnologia.data.plataformas[0];
            const lenguajes = await tecnologia.data.lenguajes;
            const basedatos = await this.obtenerBaseDatos(id);
            const servidor = await this.obtenerServidor(id);
            const custodio = await this.obtenerCustodios(id);
            const funcional = await custodio.data.funcional[0];
            const tecnico = await custodio.data.tecnico[0];
            const documentacion = await this.obtenerDocumentacion(id);

            const respuesta = {
                general: general.data[0],
                tecnologia: tecnologia.data.datos[0],
                plataformas: plataformas,
                lenguajes: lenguajes,
                basedatos: basedatos.data.datos,
                servidor: servidor.data.datos,
                funcional: funcional,
                tecnico: tecnico,
                documentacion: documentacion.data.datos,
            } 

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
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }

    // =============== OBTIENE INFORMACION SERVIDOR ===============
    async obtenerServidor(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/servidor/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }

    // =============== OBTIENE INFORMACION RESPONSABLE ===============
    async obtenerCustodios(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/custodio/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }

    // =============== OBTIENE INFORMACION RESPONSABLE ===============
    async obtenerDocumentacion(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/documentacion/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) { 
            console.log('Error al obtener datos'); 
        }
    }

    // =============== OBTIENE INFORMACION RESPONSABLE ===============
    async obtenerFallas(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/fallas/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) { 
            console.log('Error al obtener datos'); 
        }
    }

}

export default new Aplicacion();
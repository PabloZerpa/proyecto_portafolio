
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = "http://localhost:3001/api/";
 
class Usuarios {  

    // =============== OBTIENE LOS DATOS DE LOS USUARIOS ===============
    async obtenerUsuarios(term,pagina) { 
        try { console.log('alo');
            return axios.post(`${baseUrl}usuarios/busqueda`, {term,pagina});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }


    // =============== OBTIENE INFORMACION GENERAL ===============
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
            //console.log(respuesta);
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }

    // =============== OBTIENE INFORMACION TECNOLOGIA ===============
    async obtenerTecnologia(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/tecnologia/${id}`, { headers: authHeader() });
            //console.log(respuesta);
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
            console.log(respuesta);
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


    // =============== OBTIENE OPCIONES DE LA TABLA "NOMBRE" ===============
    async obtenerOpciones(nombre) { 
        try { 
            console.log('ALO');
            const respuesta = await axios.get(`${baseUrl}aplicaciones/${nombre}`, { headers: authHeader() });
            console.log(respuesta);
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
        //return axios.get(`${baseUrl}aplicaciones`, { headers: this.authHeader() });
    }

    // =============== OBTIENE TODOS LOS DATOS DE LAS APPS ===============
    async obtenerDatos() { 
        try {   
            const respuesta = await axios.get(`${baseUrl}aplicaciones`, { headers: authHeader() });

            // console.log('USER SERVICE OBTENER DATOS');
            // console.log(respuesta);
            return respuesta;
        } catch (error) {
            // Authorization.logout();
            // window.location.reload();
            console.log('Error al obtener datos'); 
        }
        //return axios.get(`${baseUrl}aplicaciones`, { headers: this.authHeader() });
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
            console.log(`OBTENIENDO DATO: ${id}`)
            const respuesta = await axios.get(`${baseUrl}aplicaciones/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener dato'); 
        }
    }   

    // =============== OBTIENE LOS DATOS POR EL CAMPO A ACTUALIZAR ESPECIFICO ===============
    async obtenerPorCampo(term,campo,pagina) { 
        try {
            return axios.post(`${baseUrl}aplicaciones/campo`, {term,campo,pagina});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }

    // =============== OBTIENE LOS DATOS PARA GENERAR LOS GRAFICOS ===============
    async datosGraficos(categoria,orden) {
        //console.log(categoria);
        //console.log(orden);
        try {
            return axios.post(`${baseUrl}aplicaciones/grafico`, {categoria,orden});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }
    
    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerPorBusqueda(term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
        critico,codigo,count,order,pagina) {
        try {
            //console.log('OBTENER_BUSQUEDA PAGINA: :' + pagina);
            console.log(term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
                critico,codigo,count,order,pagina);

            return axios.post(`${baseUrl}aplicaciones/busqueda`, 
            {term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
                critico,codigo,count,order,pagina});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }










    // =============== OBTIENE INFORMACION GENERAL DATABASE ===============
    async obtenerGeneralBD(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}basedatos/general/${id}`, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }
    // =============== OBTIENE INFORMACION SERVIDOR DATABASE ===============
    async obtenerAplicacionBD(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}basedatos/aplicacion/${id}`, { headers: authHeader() });
            //console.log(respuesta);
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }
    // =============== OBTIENE INFORMACION APLICACION DATABASE ===============
    async obtenerServidorBD(id) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}basedatos/servidor/${id}`, { headers: authHeader() });
            //console.log(respuesta);
            return respuesta;
        } catch (error) {
            console.log('Error al obtener datos'); 
        }
    }


    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerBD(id) {
        try {
            console.log('OBTENER_BUSQUEDA');
            console.log(id);
 
            return axios.get(`${baseUrl}basedatos/${id}`);
        } catch (error) {
            console.log('Error al obtener dato');
        } 
    }

    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerBDPorBusqueda(term,count,orden) {
        try {
            console.log('OBTENER_BUSQUEDA');
            console.log(term,count,orden);
 
            return axios.post(`${baseUrl}basedatos/busqueda`, {term,count,orden});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }






    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerFallaPorBusqueda(term) {
        try {
            console.log('OBTENER_BUSQUEDA');
            console.log(term);
 
            return axios.post(`${baseUrl}aplicaciones/fallas/busqueda`,{term});
        } catch (error) {
            console.log('Error al obtener dato');
        }
    }


}

export default new Usuarios();
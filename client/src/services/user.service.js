
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = "http://localhost:3001/api/";
// const baseUrl = "https://proyecto-portafolio-server.onrender.com/api/";
 
class Usuarios {  
  
    // =============== OBTIENE TODOS LOS DATOS DE LAS APPS ===============

    async obtenerOpciones(nombre) { 
        try { 
            const respuesta = await axios.get(`${baseUrl}aplicaciones/${nombre}`, { headers: authHeader() });
            //console.log(respuesta);
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
 
    // =============== OBTIENE LOS DATOS POR EL TERMINO BUSCADO ===============
    async obtenerPorBusqueda(term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
        basedatos,servidor,critico,codigo,licencia,count,order,pagina) {
        try {
            //console.log('OBTENER_BUSQUEDA PAGINA: :' + pagina);
            console.log(term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
                basedatos,servidor,critico,codigo,licencia,count,order,pagina);

            return axios.post(`${baseUrl}aplicaciones/busqueda`, 
            {term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
                basedatos,servidor,critico,codigo,licencia,count,order,pagina});
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

}

export default new Usuarios();
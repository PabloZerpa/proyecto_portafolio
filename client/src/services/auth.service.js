
import axios from 'axios';
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

    // ---------------- UPDATE ------------------
    async actualizarDatos(
        acronimo,estatus,nombre,descripcion,region,responsable,prioridad,tipo,
        departamento,cantidad,alcance,propiedad,plataforma,codigo,servidor,ultima,id) {
        try {
            console.log(acronimo,nombre,region,responsable,prioridad,ultima);
            return axios.put(`${baseUrl}user/${id}`, {
                acronimo,estatus,nombre,descripcion,region,responsable,prioridad,tipo,
                departamento,cantidad,alcance,propiedad,plataforma,codigo,servidor,ultima
            });
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
        }
    }
    
    // ---------------- CREATE ------------------
    async crearDatos(
        acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
        responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
        cantidad_user,plataforma,codigo_fuente,lenguaje,base_datos,alcance,propiedad,servidor,ultima) {
        try {

            console.log(
                acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
                responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
                cantidad_user,plataforma,codigo_fuente,lenguaje,base_datos,alcance,propiedad,servidor,ultima);
            
            return axios.post(`${baseUrl}user/`, {
                acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
                responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
                cantidad_user,plataforma,codigo_fuente,lenguaje,base_datos,alcance,propiedad,servidor,ultima
            });
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
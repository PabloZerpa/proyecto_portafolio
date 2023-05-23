import axios from "axios";

const baseUrl = process.env.REACT_APP_URL;

export const rutaAuth = `${baseUrl}login/`;
export const rutaAplicacion = `${baseUrl}aplicaciones/`;
export const rutaBaseDatos = `${baseUrl}basedatos/`;
export const rutaServidor = `${baseUrl}servidores/`;
export const rutaCustodio = `${baseUrl}custodios/`;
export const rutaUsuario = `${baseUrl}usuarios/`;

// ---------------- OBTENER USUARIO ------------------
export const obtenerUsuario = () => { return JSON.parse(localStorage.getItem('user')); }

// ---------------- LOGOUT ------------------
export const logout = async () => {
    localStorage.removeItem("user");
    window.location.reload();
    try {
        await axios.get(`${baseUrl}/logout`);
    } catch (error) {console.log(error);}
}
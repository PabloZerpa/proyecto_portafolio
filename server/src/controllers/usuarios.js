
const pool = require('../config');
const { matchedData } = require("express-validator");
const { encriptar } = require('../helpers/encriptar');

// *************** OBTENER USUARIO ***************
const obtenerUsuarios = async (req,res) => {
    try{
        const data = await pool.query(`
            SELECT usuario_id, indicador, rol, gerencia 
            FROM usuarios
            JOIN gerencias ON gerencias.gerencia_id = usuarios.gerencia_id`);
        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }

 // *************** ELIMINAR USUARIO ***************
 const eliminarAplicacion = async (req,res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM usuarios WHERE usuario_id = ?', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.log("ERROR_DELETE_ITEMS");
    }
};
 

 // *************** OBTENER USUARIO POR BUSQUEDA ***************
const obtenerPorBusqueda = async (req,res) => {

    const { term } = req.body;
    const termino = `%${term}%`;

    try{
        const data = await pool.query(`
            SELECT usuario_id, indicador, rol, gerencia, cargo
            FROM usuarios 
                JOIN roles ON roles.rol_id = usuarios.rol_id
                LEFT JOIN gerencias ON gerencias.gerencia_id = usuarios.gerencia_id
                LEFT JOIN cargos ON cargos.cargo_id = usuarios.cargo_id
            WHERE 
                usuario_id LIKE ? OR 
                indicador LIKE ? OR 
                rol LIKE ? OR 
                gerencia LIKE ? OR
                cargo LIKE ? 
            ORDER BY usuario_id ASC;`,
            [termino,termino,termino,termino,termino]
        );
        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }

// *************** CAMBIAR PERMISOS ***************
const cambiarPermisos = async (req,res) => {
    const { id } = req.params;
    const { rol, gerencia, cargo } = req.body;
   
    try {
        const query = await pool.query(`
            UPDATE 
                usuarios 
            SET 
                rol_id = (SELECT rol_id FROM roles WHERE rol = ?),
                gerencia_id = (SELECT gerencia_id FROM gerencias WHERE gerencia = ?),
                cargo_id = (SELECT cargo_id FROM cargos WHERE cargo = ?) 
                
            WHERE 
                usuario_id = ?;`, [rol, gerencia, cargo, id]
        );
        
        res.send('ACTUALIZACION DE ROL EXITOSA');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }

 // *************** LOGEAR USUARIO ***************
const cambiarPassword = async (req,res) => {
  
    const { id } = req.params;
    const { password } = req.body;
    const passwordNuevo = await encriptar(password);
   
    try {
        const query = await pool.query(
            `UPDATE usuarios SET password = ? WHERE usuario_id = ?;`, [passwordNuevo, id]
        );
        res.send('ACTUALIZACION DE CONTRASEÑA EXITOSA');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }


 // *************** OBTENER ROLES ***************
const obtenerRoles = async (req,res) => {
    try{
        const data = await pool.query(`SELECT rol FROM roles`);
        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }

  // *************** OBTENER GERENCIAS ***************
const obtenerGerencias = async (req,res) => {
    try{
        const data = await pool.query(`SELECT gerencia FROM gerencias`);
        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }

  // *************** OBTENER CARGOS ***************
    const obtenerCargos = async (req,res) => {
        try{
            const data = await pool.query(`SELECT cargo FROM cargos`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerResponsables = async (req,res) => {
        try{
            const data = await pool.query(`SELECT res_indicador FROM responsables`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerLenguajesTabla = async (req,res) => {
        try{
            const data = await pool.query(`SELECT lenguaje_id,lenguaje FROM lenguajes`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerFrameworksTabla = async (req,res) => {
        try{
            const data = await pool.query(`SELECT framework_id,framework FROM frameworks`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerLenguajes = async (req,res) => {
        try{
            const data = await pool.query(`SELECT lenguaje FROM lenguajes`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerPlataformas = async (req,res) => {
        try{
            const data = await pool.query(`SELECT plataforma FROM plataformas`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerBasesDatos = async (req,res) => {
        try{
            const data = await pool.query(`SELECT base_datos FROM bases_datos`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerServidores = async (req,res) => {
        try{
            const data = await pool.query(`SELECT servidor FROM servidores`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerEstatus = async (req,res) => {
        try{
            const data = await pool.query(`SELECT estatus FROM estatus`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerAlcance = async (req,res) => {
        try{
            const data = await pool.query(`SELECT alcance FROM alcances`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerMantenimientos = async (req,res) => {
        try{
            const data = await pool.query(`SELECT man_frecuencia FROM mantenimientos`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerRegiones = async (req,res) => {
        try{
            const data = await pool.query(`SELECT region FROM regiones`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerTipos = async (req,res) => {
        try{
            const data = await pool.query(`SELECT tipo FROM tipos_bases`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerMane = async (req,res) => {
        try{
            const data = await pool.query(`SELECT manejador FROM manejadores`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerAmbientes = async (req,res) => {
        try{
            const data = await pool.query(`SELECT tipo_ambiente FROM tipos_ambientes`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerSistemas = async (req,res) => {
        try{
            const data = await pool.query(`SELECT sistema FROM sistemas_operativos`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerMarcas = async (req,res) => {
        try{
            const data = await pool.query(`SELECT marca FROM marcas`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }
    // *************** OBTENER CARGOS ***************
    const obtenerAcronimos = async (req,res) => {
        try{
            const data = await pool.query(`SELECT apl_acronimo FROM aplicaciones`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }


module.exports = { obtenerUsuarios, cambiarPermisos, cambiarPassword, obtenerPorBusqueda, obtenerRoles, 
    obtenerGerencias, obtenerCargos, obtenerResponsables, obtenerLenguajes, obtenerPlataformas, obtenerBasesDatos,
    obtenerServidores, obtenerEstatus, obtenerAlcance, obtenerMantenimientos, obtenerRegiones, obtenerTipos,
    obtenerMane, obtenerAmbientes,obtenerMarcas,obtenerSistemas, eliminarAplicacion, obtenerLenguajesTabla, 
    obtenerFrameworksTabla, obtenerAcronimos };
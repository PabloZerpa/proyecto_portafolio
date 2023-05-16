
const pool = require('../config');
const { matchedData } = require("express-validator");
const { encriptar } = require('../helpers/encriptar');

// *************** OBTENER USUARIO ***************
const obtenerUsuarios = async (req,res) => {
    try{
        const data = await pool.query(`
            SELECT usuario_id, indicador, rol, gerencia 
            FROM usuarios
            JOIN gerencias ON gerencias.gerencia_id = usuarios.gerencia_id;`);
        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }

 // *************** ELIMINAR USUARIO ***************
 const eliminarUsuario = async (req,res) => {
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
    let data = '';

    try{
        if(term===' '){
            data = await pool.query(`
                SELECT usuario_id, indicador, rol, gerencia, cargo, nombre, apellido
                FROM usuarios 
                    JOIN roles ON roles.rol_id = usuarios.rol_id
                    LEFT JOIN gerencias ON gerencias.gerencia_id = usuarios.gerencia_id
                    LEFT JOIN cargos ON cargos.cargo_id = usuarios.cargo_id
                ORDER BY usuario_id ASC;`
            );
        }
        else{
            data = await pool.query(`
                SELECT usuario_id, indicador, rol, gerencia, cargo, nombre, apellido
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
        }

        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }

// *************** CAMBIAR PERMISOS ***************
const cambiarPermisos = async (req,res) => {
    const { id } = req.params;
    const { nombre, apellido, rol, gerencia, cargo } = req.body;
   
    try {
        const query = await pool.query(`
            UPDATE 
                usuarios 
            SET 
                nombre = ?,
                apellido = ?,
                rol_id = (SELECT rol_id FROM roles WHERE rol = ?),
                gerencia_id = (SELECT gerencia_id FROM gerencias WHERE gerencia = ?),
                cargo_id = (SELECT cargo_id FROM cargos WHERE cargo = ?) 
            WHERE 
                usuario_id = ?;`, [nombre, apellido, rol, gerencia, cargo, id]
        );
        
        res.send('ACTUALIZACION DE ROL EXITOSA');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }

 // *************** LOGEAR USUARIO ***************
const cambiarPassword = async (req,res) => {
    
    const { indicador, passwordNuevo } = req.body;
    const passwordEncript = await encriptar(passwordNuevo);
   
    try {
        const rows = await pool.query(`SELECT usuario_id FROM usuarios WHERE indicador = ?;`, [indicador]);
        const usuario_id = rows[0][0].usuario_id;

        const query = await pool.query(
            `UPDATE usuarios 
            SET password = ?, exp_password = now()
            WHERE usuario_id = ?;`, [passwordEncript, usuario_id]
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
    const obtenerCustodios = async (req,res) => {
        try{
            const data = await pool.query(`SELECT cus_indicador FROM custodios`);
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
    const obtenerFrecuencias = async (req,res) => {
        try{
            const data = await pool.query(`SELECT frecuencia FROM frecuencias`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CARGOS ***************
    const obtenerTipoDoc = async (req,res) => {
        try{
            const data = await pool.query(`SELECT tipo FROM tipos_documentos;`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER REGIONES ***************
    const obtenerRegiones = async (req,res) => {
        try{
            const [rows, fields] = await pool.query('SELECT region FROM regiones');
            res.send(rows);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER LOCALIDADES ***************
    const obtenerLocalidades = async (req,res) => {
        const { region } = req.body;

        const query = await pool.query(`SELECT region_id FROM regiones WHERE region = ?;`,[region]);
        const region_id = query[0][0].region_id;

        try{
            const data = await pool.query(`SELECT localidad FROM localidades WHERE localidades.region_id = ?;`,[region_id]);
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
            const data = await pool.query(`SELECT ambiente FROM ambientes`);
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
        const { elemento } = req.body;
        let campo = null, tabla = null;

        if(elemento === 'APLICACION'){
            campo = 'apl_acronimo';
            tabla = 'aplicaciones';
        }
        else if(elemento === 'BASE DE DATOS'){
            campo = 'base_datos';
            tabla = 'bases_datos';
        }
        else if(elemento === 'SERVIDOR'){
            campo = 'servidor';
            tabla = 'servidores';
        }
        
        try{
            const data = await pool.query(`SELECT ${campo} FROM ${tabla}`);
            res.send(data[0]);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CANTIDAD ***************
    const obtenerCantidad = async (req,res) => {
        try{
            const aplicaciones = await pool.query(`SELECT COUNT(*) as cantidad FROM aplicaciones`);
            const bases_datos = await pool.query(`SELECT COUNT(*) as cantidad FROM bases_datos`);
            const servidores = await pool.query(`SELECT COUNT(*) as cantidad FROM servidores`);

            const respuesta = {
                aplicaciones: aplicaciones[0][0].cantidad,
                bases_datos: bases_datos[0][0].cantidad,
                servidores: servidores[0][0].cantidad,
            }

            res.send(respuesta);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

    // *************** OBTENER CANTIDAD POR REGIONES ***************
    const obtenerCantidadRegiones = async (req,res) => {
        const { categoria,orden } = req.body;

        try{
            let cantidad = {};
            let clave = {};

            if(categoria === 'region'){
                const [rows] = await pool.query(`SELECT COUNT(*) as cantidad FROM regiones`);
                const regiones = rows[0].cantidad;
    
                for (let i = 1; i <= regiones; i++) {
                    const [rows] = await pool.query(`SELECT COUNT(*) as cantidad FROM aplicaciones WHERE apl_region = ?;`, [i]);
                    cantidad[`region${i}`] = rows[0].cantidad;
                }
            }
            else if(categoria ===  'prioridad'){
                const [rows] = await pool.query(`SELECT COUNT(*) as cantidad FROM prioridades`);
                const prioridades = rows[0].cantidad;
    
                for (let i = 1; i <= prioridades; i++) {
                    const [rows] = await pool.query(`SELECT COUNT(*) as cantidad FROM aplicaciones WHERE apl_prioridad = ?;`, [i]);
                    cantidad[`prioridad${i}`] = rows[0].cantidad;
                }
            }
            else if(categoria ===  'estatus'){
                const [rows] = await pool.query(`SELECT COUNT(*) as cantidad FROM estatus`);
                const estatus = rows[0].cantidad;
    
                for (let i = 1; i <= estatus; i++) {
                    const [rows] = await pool.query(`SELECT COUNT(*) as cantidad FROM aplicaciones WHERE apl_estatus = ?;`, [i]);
                    cantidad[`estatus${i}`] = rows[0].cantidad;
                }
            }
            else if(categoria ===  'plataforma'){
                const [rows] = await pool.query(`SELECT COUNT(*) as cantidad FROM plataformas`);
                const plataformas = rows[0].cantidad;
    
                for (let i = 1; i <= plataformas; i++) {
                    const [rows] = await pool.query(`SELECT COUNT(*) as cantidad FROM aplicacion_plataforma WHERE plataforma_id = ?;`, [i]);
                    cantidad[`plataforma${i}`] = rows[0].cantidad;
                }
            }
            else if(categoria ===  'modificacion'){
                for (let i = 1; i <= 12; i++) {
                    const mes = `0${i}`;
                    const [rows] = await pool.query(
                        `SELECT COUNT(*) as cantidad FROM aplicaciones WHERE DATE_FORMAT(apl_fecha_actualizacion,'%m') = ?;`,
                        [mes]);
                    cantidad[`modificacion${i}`] = rows[0].cantidad;
                }
            }

            const respuesta = {
                cantidad: cantidad,
                clave: categoria,
            }

            res.send(respuesta);
        }
        catch (error) {
            return res.status(401).json({ message: 'ERROR' });
        }
    }

module.exports = { obtenerUsuarios, cambiarPermisos, cambiarPassword, obtenerPorBusqueda, obtenerRoles, 
    obtenerGerencias, obtenerCargos, obtenerCustodios, obtenerLenguajes, obtenerPlataformas, obtenerBasesDatos,
    obtenerServidores, obtenerEstatus, obtenerAlcance, obtenerFrecuencias, obtenerRegiones, obtenerTipos,
    obtenerMane, obtenerAmbientes,obtenerMarcas,obtenerSistemas, eliminarUsuario, obtenerLenguajesTabla, 
    obtenerFrameworksTabla, obtenerAcronimos, obtenerLocalidades,obtenerCantidad, obtenerCantidadRegiones,obtenerTipoDoc };
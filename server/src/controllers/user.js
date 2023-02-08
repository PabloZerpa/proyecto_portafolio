
const pool = require('../config');
const { matchedData } = require('express-validator');

// *************** OBTENER TODOS LOS DATOS ***************
const getItems = async (req,res) => {
    try {
        const data = await pool.query(`SELECT * FROM apps LIMIT 6`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *************** OBTENER TODOS LOS DATOS POR FECHA DE MODIFICACION ***************
const getByUpdateDate = async (req,res) => {
    try {
        const data = await pool.query(`SELECT * FROM aplicaciones ORDER BY ultima DESC`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *************** OBTENER TODOS LOS DATOS POR FECHA DE CREACION ***************
const getByCreateDate = async (req,res) => {
    try {
        const data = await pool.query(`SELECT * FROM aplicaciones ORDER BY created_at ASC`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *************** OBTENER TODOS LOS DATOS POR FECHA DE CREACION ***************
const getByTerm = async (req,res) => {
    try { 
        const { term,estatus,region,prioridad,order,count } = req.body;
        const termino = '%' + term + '%';
        let data;

        console.log(term,estatus,region,prioridad,order,count);

        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
            
        if(estatus){
            data = await pool.query(
                `SELECT * FROM apps WHERE 
                (id LIKE ? OR 
                nombre LIKE ? OR 
                acronimo LIKE ? OR 
                prioridad LIKE ? OR  
                region LIKE ? OR  
                responsablef LIKE ? OR 
                responsablet LIKE ? ) AND 
                estatus = ?`, 
            [termino,termino,termino,termino,termino,termino,termino,estatus]);
        }
        if(region){
            data = await pool.query(
                `SELECT * FROM apps WHERE 
                    (id LIKE ? OR 
                    nombre LIKE ? OR 
                    acronimo LIKE ? OR 
                    estatus LIKE ? OR 
                    prioridad LIKE ? OR  
                    responsablef LIKE ? OR 
                    responsablet LIKE ? ) AND 
                    region = ?`, 
                [termino,termino,termino,termino,termino,termino,termino,region]);
        }
        else if(prioridad){
            data = await pool.query(
                `SELECT * FROM apps WHERE 
                    (id LIKE ? OR 
                    nombre LIKE ? OR 
                    acronimo LIKE ? OR 
                    estatus LIKE ? OR 
                    responsablef LIKE ? OR 
                    responsablet LIKE ? OR 
                    region LIKE ? ) AND 
                    prioridad = ?`,
                [termino,termino,termino,termino,termino,termino,termino,prioridad]);
        }
        else{
            data = await pool.query(
                `SELECT * FROM apps WHERE 
                    (id LIKE ? OR 
                    nombre LIKE ? OR 
                    acronimo LIKE ? OR 
                    estatus LIKE ? OR 
                    prioridad LIKE ? OR 
                    responsablef LIKE ? OR 
                    responsablet LIKE ? OR 
                    region LIKE ?) ORDER BY id ${order} LIMIT ?`, 
                [termino,termino,termino,termino,termino,termino,termino,termino,count]);
        }

        if (data.affectedRows === 0)
            return res.status(404).json({ message: "Sin coincidencias" });

        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *************** OBTENER DATOS POR ID ***************
const getItem = async (req,res) => {
    try {
        //const body = matchedData(req);
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM apps WHERE id = ?', [id]);
        console.log(rows[0]);
        res.send(rows[0]);
    } catch (error) {
        console.log("ERROR_CREATE_ITEMS");
    }
};

// *************** CREAR USUARIO ***************
const createItems = async (req,res) => {
    try {
        //const body = matchedData(req);
        const {
            acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
            responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
            cantidad_user,plataforma,codigo_fuente,lenguaje,base_datos,alcance,propiedad,servidor,ultima
        } = req.body;

        const query = await pool.query('SELECT * FROM apps WHERE acronimo = ? OR nombre = ?', [acronimo,nombre]);
        const app = query[0][0];
        
        // ********** VERIFICA QUE LA APLICACION NO EXISTA **********
        if(app){
            console.log('ERROR, APLICACION YA EXISTE');
            return res.status(401).json({ message: 'ERROR, APLICACION YA EXISTE' });
        }
        else{
            const [rows] = await pool.query(
                `INSERT INTO apps 
                    (acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
                    responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
                    cantidad_user,plataforma,codigo_fuente,lenguaje,base_datos,alcance,propiedad,servidor,ultima) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
                [
                    acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
                    responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
                    cantidad_user,plataforma,codigo_fuente,lenguaje,base_datos,alcance,propiedad,servidor,ultima
                ]
            );

            res.send('Creacion completa');
        }

    } catch (error) {
        console.log("ERROR_CREATE_ITEMS");
    }
    
};

// *************** ACTUALIZAR USUARIO ***************
const updateItems = async (req,res) => {
    try {
        const { id } = req.params;
        const {
            acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
            responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
            cantidad_user,plataforma,codigo_fuente,lenguaje,base_datos,alcance,propiedad,servidor,ultima
        } = req.body;

        const [result] = await pool.query(
            `UPDATE 
                apps 
            SET 
                acronimo = ?,nombre = ?,descripcion = ?,estatus = ?,region = ?,responsablef = ?,responsablef_ind = ?,
                responsablef_tlf = ?,responsablef_cor = ?,responsablet = ?,responsablet_ind = ?,responsablet_tlf = ?,
                responsablet_cor = ?,prioridad = ?,tipo = ?,departamento = ?,cantidad_user = ?,plataforma = ?,
                codigo_fuente = ?,lenguaje = ?,base_datos = ?,alcance = ?,propiedad = ?,servidor = ?,ultima = ?
            WHERE 
                id = ?`,
            [
                acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
                responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
                cantidad_user,plataforma,codigo_fuente,lenguaje,base_datos,alcance,propiedad,servidor,ultima,id
            ]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Name not found" });

        const [rows] = await pool.query("SELECT * FROM apps WHERE id = ?", [id]);

        res.json(rows[0]);

    } catch (error) {
        console.log("ERROR_UPDATE_ITEMS");
        console.error(error);
    }
};
 
// *************** ELIMINAR USUARIO ***************
const deleteItems = async (req,res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM apps WHERE id = ?', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.log("ERROR_DELETE_ITEMS");
    }
};


module.exports = { 
    getItems, 
    getItem, 
    createItems, 
    updateItems, 
    deleteItems, 
    getByUpdateDate, 
    getByCreateDate,
    getByTerm };
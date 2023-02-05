
const pool = require('../config');
const { matchedData } = require('express-validator');

// *************** OBTENER TODOS LOS DATOS ***************
const getItems = async (req,res) => {
    try {
        const data = await pool.query(`SELECT * FROM apps`);
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
        const { term, estatus,region,depart,fecha,prioridad,order } = req.body;
        const termino = '%' + term + '%';
        let data;

        console.log(term,region,prioridad);

        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });

            
        if(region){
            if(prioridad){
                data = await pool.query(
                    `SELECT * FROM apps WHERE 
                        (id LIKE ? OR 
                        nombre LIKE ? OR 
                        acronimo LIKE ? OR
                        responsablef LIKE ? OR 
                        responsablet LIKE ? ) AND 
                        prioridad = ? AND region = ?`, 
                    [termino,termino,termino,termino,termino,prioridad,region]);
            }
            else{
                data = await pool.query(
                    `SELECT * FROM apps WHERE 
                        (id LIKE ? OR 
                        nombre LIKE ? OR 
                        acronimo LIKE ? OR 
                        prioridad LIKE ? OR 
                        responsablef LIKE ? OR 
                        responsablet LIKE ? ) AND 
                        region = ?`, 
                    [termino,termino,termino,termino,termino,termino,region]);
            }
        }
        else if(prioridad){
            data = await pool.query(
                `SELECT * FROM apps WHERE 
                    (id LIKE ? OR 
                    nombre LIKE ? OR 
                    acronimo LIKE ? OR 
                    responsablef LIKE ? OR 
                    responsablet LIKE ? OR 
                    region LIKE ? ) AND 
                    prioridad = ?`,
                [termino,termino,termino,termino,termino,termino,prioridad]);
        }
        else{
            data = await pool.query(
                `SELECT * FROM apps WHERE 
                    (id LIKE ? OR 
                    nombre LIKE ? OR 
                    acronimo LIKE ? OR 
                    prioridad LIKE ? OR 
                    responsablef LIKE ? OR 
                    responsablet LIKE ? OR 
                    region LIKE ?) ORDER BY id ASC`, 
                [termino,termino,termino,termino,termino,termino,termino]);
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
        const body = matchedData(req);
        const {acronimo,nombre,region,responsable,prioridad,ultima} = body;
        //const [rows] = await pool.query('INSERT INTO aplicaciones (indicador, password, rol) VALUES (?,?,?)', [indicador,password,rol]);
        const [rows2] = await pool.query(
            'INSERT INTO aplicaciones (acronimo,nombre,region,responsable,prioridad,ultima) VALUES (?,?,?,?,?,?)', 
            [acronimo,nombre,region,responsable,prioridad,ultima]
        );

        res.send('Creacion completa');

    } catch (error) {
        console.log("ERROR_CREATE_ITEMS");
    }
    
};

// *************** ACTUALIZAR USUARIO ***************
const updateItems = async (req,res) => {
    try {
        const { id } = req.params;
        const {acronimo,nombre,region,responsable,prioridad,ultima} = req.body;
        console.log(acronimo,nombre,region,responsable,prioridad,ultima);

        const [result] = await pool.query(
            `UPDATE 
                aplicaciones 
            SET 
                acronimo = ?,
                nombre = ?,
                region = ?,
                responsable = ?,
                prioridad = ?,
                ultima = ?
            WHERE 
                id = ?`,
            [acronimo,nombre,region,responsable,prioridad,ultima,id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Name not found" });

        const [rows] = await pool.query("SELECT * FROM aplicaciones WHERE id = ?", [id]);

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
        const [result] = await pool.query('DELETE FROM aplicaciones WHERE id = ?', [id]);
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
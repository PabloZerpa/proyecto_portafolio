
const pool = require('../config');
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../middlewares/handleErrors');

// *************** OBTENER TODOS LOS DATOS ***************
const getItems = async (req,res) => {
    try {
        const data = await pool.query(`SELECT * FROM usuarios`);
        res.send(data[0]);
    } catch (error) {
        handleHttpError(res,"ERROR_GET_ITEMS");
    }
};

// *************** OBTENER DATOS POR ID ***************
const getItem = async (req,res) => {
    try {
        const body = matchedData(req);
        const {id} = body;
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params]);
        res.send({ id: rows.insertId });
    } catch (error) {
        handleHttpError(res,"ERROR_CREATE_ITEMS");
    }
};

// *************** CREAR USUARIO ***************
const createItems = async (req,res) => {
    try {
        const body = matchedData(req);
        const {indicador, password, rol} = body;
        const [rows] = await pool.query('INSERT INTO usuarios (indicador, password, rol) VALUES (?,?,?)', [indicador,password,rol]);
        res.send({
            id: rows.insertId,
            indicador,
            password,
            rol,
        });
    } catch (error) {
        handleHttpError(res,"ERROR_CREATE_ITEMS");
    }
    
};

// *************** ACTUALIZAR USUARIO ***************
const updateItems = async (req,res) => {
    try {
        const body = matchedData(req);
        const {indicador, password, rol} = body;
        const [rows] = await pool.query('UPDATE usuarios SET indicador = IFNULL(?), password = IFNULL(?), rol = IFNULL(?) WHERE id = ? ', [indicador, password, rol]);
        res.send({
            id: rows.insertId,
            indicador,
            password,
            rol
        });
    } catch (error) {
        handleHttpError(res,"ERROR_UPDATE_ITEMS");
    }
};
 
// *************** ELIMINAR USUARIO ***************
const deleteItems = async (req,res) => {
    try {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        handleHttpError(res,"ERROR_DELETE_ITEMS");
    }
};


module.exports = { getItems, getItem, createItems, updateItems, deleteItems };
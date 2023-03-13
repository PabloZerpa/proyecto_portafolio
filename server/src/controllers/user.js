
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

// *************** OBTENER TODOS LOS DATOS POR FECHA DE CREACION ***************
const getByTerm = async (req,res) => {
    try {  
        const { term,estatus,region,prioridad,tipo,order,count } = req.body;
        const termino = '%' + term + '%';
        let data;

        console.log(term,estatus,region,prioridad,tipo,order,count);
 
        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
            
        if(estatus){
            data = await pool.query(
                `SELECT * FROM apps WHERE 
                (id LIKE ? OR 
                nombre LIKE ? OR 
                acronimo LIKE ? OR 
                prioridad LIKE ? OR  
                tipo LIKE ? OR
                region LIKE ? OR  
                responsablef LIKE ? OR 
                responsablet LIKE ? ) AND 
                estatus = ? ORDER BY id ${order} LIMIT ?`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,estatus,parseInt(count)]);
        }
        if(region){
            data = await pool.query(
                `SELECT * FROM apps WHERE 
                    (id LIKE ? OR 
                    nombre LIKE ? OR 
                    acronimo LIKE ? OR 
                    estatus LIKE ? OR 
                    tipo LIKE ? OR
                    prioridad LIKE ? OR  
                    responsablef LIKE ? OR 
                    responsablet LIKE ? ) AND 
                    region = ? ORDER BY id ${order} LIMIT ?`, 
                [termino,termino,termino,termino,termino,termino,termino,termino,region,parseInt(count)]);
        }
        else if(prioridad){
            data = await pool.query(
                `SELECT * FROM apps WHERE 
                    (id LIKE ? OR 
                    nombre LIKE ? OR 
                    acronimo LIKE ? OR 
                    estatus LIKE ? OR 
                    tipo LIKE ? OR
                    responsablef LIKE ? OR 
                    responsablet LIKE ? OR 
                    region LIKE ? ) AND 
                    prioridad = ? ORDER BY id ${order} LIMIT ?`,
                [termino,termino,termino,termino,termino,termino,termino,termino,prioridad,parseInt(count)]);
        }
        else if(tipo){
            data = await pool.query(
                `SELECT * FROM apps WHERE 
                    (id LIKE ? OR 
                    nombre LIKE ? OR 
                    acronimo LIKE ? OR 
                    estatus LIKE ? OR 
                    prioridad LIKE ? OR
                    responsablef LIKE ? OR 
                    responsablet LIKE ? OR 
                    region LIKE ? ) AND 
                    tipo = ? ORDER BY id ${order} LIMIT ?`,
                [termino,termino,termino,termino,termino,termino,termino,termino,tipo,parseInt(count)]);
        }
        else{
            data = await pool.query(
                `SELECT * FROM apps WHERE 
                    (id LIKE ? OR 
                    nombre LIKE ? OR 
                    acronimo LIKE ? OR 
                    estatus LIKE ? OR 
                    prioridad LIKE ? OR 
                    tipo LIKE ? OR
                    responsablef LIKE ? OR 
                    responsablet LIKE ? OR 
                    region LIKE ?) ORDER BY id ${order} LIMIT ?`, 
                [termino,termino,termino,termino,termino,termino,termino,termino,termino,parseInt(count)]);
        }

        if (data.affectedRows === 0)
            return res.status(404).json({ message: "Sin coincidencias" });

        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *************** OBTENER TODOS LOS DATOS POR FECHA DE CREACION ***************
const getByCampo = async (req,res) => {
    try { 
        const { term, campo } = req.body;
        const termino = '%' + term + '%';

        console.log(term,campo);
 
        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });

        const data = await pool.query(
            `SELECT id,acronimo,nombre,${campo} FROM apps WHERE
                ${campo} LIKE ? 
                ORDER BY id ASC LIMIT 10`, 
                [termino]
        );

        if (data.affectedRows === 0)
            return res.status(404).json({ message: "Sin coincidencias" });

        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *************** OBTENER TODOS LOS DATOS POR FECHA DE CREACION ***************
const getByGrafico = async (req,res) => {
    try { 
        const opcionRegion = ['CARABOBO NORTE', 'CENTRO', 'CENTRO SUR', 'CORPORATIVO','ORIENTE NORTE', 
        'ORIENTE SUR', 'OCCIDENTE','ANDES',''];
        const { categoria, orden } = req.body;
        let regiones = '';
        //let cantidad = {orienteNorte: ''};
        let cantidad = [];

        console.log(categoria,orden);
 
        if (categoria === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
         
        const query = await pool.query( `SELECT ${categoria} FROM apps`);
        regiones = query[0]; 
        console.log(regiones);
        console.log(regiones.length);

        //          (POSICION_ARREGLO/CANTIDAD_TOTAL)*100
        // console.log(regiones[5].region);
        // const data = await pool.query( `SELECT ${categoria} FROM apps WHERE region = ?`, [regiones[5].region]);
        // console.log(data[0]);
        // console.log(data[0].length);
        // cantidad.orienteNorte = data[0].length
        // //cantidad.push(data[0].length)
        // console.log(cantidad);

        for(let i=0; i < opcionRegion.length; i++){
            console.log(opcionRegion[i]);

            const data = await pool.query( `SELECT ${categoria} FROM apps WHERE region = ?`, [opcionRegion[i]]);

            console.log(data[0]);
            console.log(data[0].length);
            cantidad.push(data[0].length)
            console.log(cantidad); 
        }

        // if (data.affectedRows === 0)
        //     return res.status(404).json({ message: "Sin coincidencias" });

        // res.json(data[0]);
        
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

        console.log(acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
            responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
            cantidad_user,plataforma,codigo_fuente,lenguaje,base_datos,alcance,propiedad,servidor,ultima)

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
        console.log('EN EN UPDATE DEL SERVER');
        const { id } = req.params;
        const {
            acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,
            responsablet,responsablet_ind,responsablet_tlf,prioridad,tipo,departamento,
            cantidad_user,plataforma,codigo_fuente,lenguaje,base_datos,alcance,propiedad,servidor,ultima
        } = req.body;

        console.log(acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,
            responsablet,responsablet_ind,responsablet_tlf,prioridad,tipo,departamento,
            cantidad_user,plataforma,codigo_fuente,lenguaje,base_datos,alcance,propiedad,servidor,ultima); 

        const [result] = await pool.query(
            `UPDATE apps  SET 
                acronimo = ?,nombre = ?,descripcion = ?,estatus = ?,region = ?,responsablef = ?,responsablef_ind = ?,
                responsablef_tlf = ?,responsablet = ?,responsablet_ind = ?,responsablet_tlf = ?,
                prioridad = ?,tipo = ?,departamento = ?,cantidad_user = ?,plataforma = ?,
                codigo_fuente = ?,lenguaje = ?,base_datos = ?,alcance = ?,propiedad = ?,servidor = ?,ultima = ?
            WHERE 
                id = ?`,
            [
                acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,
                responsablet,responsablet_ind,responsablet_tlf,prioridad,tipo,departamento,
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

// *************** ACTUALIZAR POR CAMPO ESPECIFICO ***************
const updateByCampo = async (req,res) => {
    try {
        const { id } = req.params;
        const { campo, valor } = req.body;

        console.log(campo,valor); 

        const [result] = await pool.query(
            `UPDATE 
                apps 
            SET 
                ${campo} = ?
            WHERE 
                id = ?`,
            [valor,id]
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
    getByTerm,
    getByCampo,
    getByGrafico,
    updateByCampo };

const pool = require('../config');

const buscar = async (tabla, campo_nombre, campo_id, valor_busqueda) => {
    try{
        console.log('estoy en buscar');
        const query = `SELECT ${campo_id} FROM ${tabla} WHERE ${campo_nombre} = ?`;
        const select = await pool.query(`SELECT ${campo_id} FROM ${tabla} WHERE ${campo_nombre} = ?`, [valor_busqueda]);
        const resultado = select[0][0].aplicacion_id;
        console.log(resultado);

        return resultado;
    }
    catch(e){
        return console.log('ERROR BUSQUEDA');
    }
};

const insertar = async (tabla, campo1, campo2, valor_busqueda, valor1) => {
    try{
        console.log('estoy en insertar');
        const valor2 = buscar('plataformas', 'plataforma', 'plataforma_id', valor_busqueda);

        const query = `INSERT INTO ${tabla} (${campo1},${campo2}) VALUES (?,?)`;
        const datos_pla = await pool.query(`INSERT INTO ${tabla} (${campo1},${campo2}) VALUES (?,?)`, [valor1,valor2] );
        console.log('INSERTADO');

        return console.log('INSERTADO');
    }
    catch(e){
        return console.log('ERROR INSERTADO');
    }
};

module.exports = { buscar, insertar };
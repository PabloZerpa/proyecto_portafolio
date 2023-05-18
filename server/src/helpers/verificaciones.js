
const pool = require('../config');


const insertarAplicacion = async (acronimo,nombre,descripcion,estatus,prioridad,critico,alcance,
    codigo_fuente,version,direccion,cantidad_usuarios,region,usuario_registro) => {

    await pool.query(
        `INSERT INTO aplicaciones (
            apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,
            apl_critico,apl_alcance,apl_codigo_fuente,apl_version,apl_direccion,
            apl_cantidad_usuarios,apl_region,apl_usuario_registro,apl_usuario_actualizo
        )
        VALUE 
            (?,?,?,?,?,?,?,?,?,?,?,?,
            (SELECT usuario_id FROM usuarios WHERE indicador = ?),
            (SELECT usuario_id FROM usuarios WHERE indicador = ?)
        ); `, 
        [
            acronimo,nombre,descripcion,estatus,prioridad,critico,alcance,
            codigo_fuente,version,direccion,cantidad_usuarios,region,
            usuario_registro,usuario_registro
        ]

    );
    
    // guarda el id de la aplicacion para el registro de las tablas relacionadas
    const selectApl = await pool.query(`SELECT * FROM aplicaciones ORDER BY aplicacion_id DESC LIMIT 1`);
    const aplicacion_id = selectApl[0][0].aplicacion_id;
    return aplicacion_id;
}

const insertarPlataforma = async (id, plataforma) => {
    await pool.query(
        `INSERT INTO aplicacion_plataforma (aplicacion_id,plataforma_id) VALUES (?,?)`, 
        [id,plataforma]
    );
}

const insertarLenguaje = async (id, select_lenguaje) => {
    
    for (const element of select_lenguaje) {

        await pool.query(
            `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`,
        [id,element.lenguaje_id]); 
    }
	
}

const insertarServidor = async (id,select_servidor) => {

    for (const element of select_servidor) {

        await pool.query(
            `INSERT INTO aplicacion_servidor (aplicacion_id,servidor_id) VALUES (?,?)`,
        [id,element.servidor_id]);
    }

}

const insertarBase = async (id,select_base) => {

    for (const element of select_base) {

        await pool.query(
            `INSERT INTO aplicacion_basedatos (aplicacion_id,base_datos_id) VALUES (?,?)`,
        [id,element.base_datos_id]);
    }

}

const insertarCustodio = async (tipo,id,select_custodio) => {

    let custodio_id = null;

    if(select_custodio){
        const buscarCustodio = await pool.query(`SELECT custodio_id FROM custodios WHERE cus_indicador = ?`, [select_custodio]);
        custodio_id = buscarCustodio[0][0].custodio_id
    }

    // crea los datos del tipo de custodio
    if(tipo === 'funcional'){
        await pool.query(
            `INSERT INTO custodios_funcionales (aplicacion_id,custodio_id) VALUES (?,?)`,[id,custodio_id]);
    }
    else if(tipo === 'tecnico'){
        await pool.query(
            `INSERT INTO custodios_tecnicos (aplicacion_id,custodio_id) VALUES (?,?)`,[id,custodio_id]);
    }

    return custodio_id;
}

const insertarMantenimiento = async (id,frecuencia,horas_prom,horas_anuales) => {
    await pool.query(
        `INSERT INTO mantenimientos 
        (aplicacion_id,man_frecuencia,man_horas_prom,man_horas_anuales)
        VALUES (?,?,?,?)`,
        [id,frecuencia,horas_prom,horas_anuales]
    );
}

const insertarDocumentacion = async (id,select_documentos) => {

    for (const element of select_documentos) {
        await pool.query(
            `INSERT INTO documentaciones (aplicacion_id,doc_descripcion,doc_direccion,doc_tipo)
            VALUES (?,?,?,
                (SELECT tipo_id FROM tipos_documentos WHERE tipo = ?)
            );`,
        [id,element.doc_descripcion,element.doc_direccion,element.doc_tipo]);
    }
}

// const insertarDocumentacion = async (id,descripcion,direccion,tipo) => {
//     // registra una nueva documentacion
//     const datos_doc = await pool.query(
//         `INSERT INTO documentaciones (aplicacion_id,doc_descripcion,doc_direccion,doc_tipo)
//         VALUES (?,?,?,?)`,
//         [id,descripcion,direccion,tipo,]
//     );
// }



module.exports = { insertarAplicacion, insertarPlataforma, 
    insertarLenguaje, insertarServidor, 
    insertarBase, insertarMantenimiento,insertarDocumentacion, insertarCustodio };
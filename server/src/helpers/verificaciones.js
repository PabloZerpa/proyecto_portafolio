
const pool = require('../config');


const insertarAplicacion = async (acronimo,nombre,descripcion,estatus,prioridad,critico,alcance,
    codigo_fuente,version,direccion,cantidad_usuarios,region,usuario_registro) => {

    console.log(acronimo,nombre,descripcion,estatus,prioridad,critico,alcance,
        codigo_fuente,version,direccion,cantidad_usuarios,region,usuario_registro);

    const datos_apl = await pool.query(
        `INSERT INTO aplicaciones (apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,
            apl_critico,apl_alcance,apl_codigo_fuente,apl_version,apl_direccion,
            apl_cantidad_usuarios,apl_region,apl_usuario_registro,apl_usuario_actualizo)
        VALUE 
            (?,?,?,?,?,?,?,?,?,?,?,?,
            (SELECT usuario_id FROM usuarios WHERE indicador = ?),
            (SELECT usuario_id FROM usuarios WHERE indicador = ?)
            );`, 
        [
            acronimo,nombre,descripcion,estatus,prioridad,critico,alcance,
            codigo_fuente,version,direccion,cantidad_usuarios,region,
            usuario_registro,usuario_registro
        ]
    );

    // guarda el id de la aplicacion para el registro de las tablas relacionadas
    const selectApl = await pool.query(`SELECT * FROM aplicaciones ORDER BY aplicacion_id DESC LIMIT 1`);
    const aplicacion_id = selectApl[0][0].aplicacion_id;
    console.log('APLICACION REGISTRADA: ' + aplicacion_id);
    return aplicacion_id;
}

const insertarPlataforma = async (id, plataforma) => {
    const datos_pla = await pool.query(
        `INSERT INTO aplicacion_plataforma (aplicacion_id,plataforma_id) VALUES (?,?)`, 
        [id,plataforma]
    );
    console.log('PLATAFORMA REGISTRADA: ' + plataforma);

	// const buscarPlataforma = await pool.query(`SELECT plataforma_id FROM plataformas WHERE plataforma = ?`, [plataforma]);
    // if(buscarPlataforma[0][0]){
    //     const plataforma_id = buscarPlataforma[0][0].plataforma_id;
    //     const datos_pla = await pool.query(
    //         `INSERT INTO aplicacion_plataforma (aplicacion_id,plataforma_id) VALUES (?,?)`, 
    //         [id,plataforma_id]
    //      );
    //      console.log('PLATAFORMA REGISTRADO: ' + plataforma_id);
    // }  
}
  
const insertarLenguaje = async (id, lenguaje1,lenguaje2,lenguaje3,version1,version2,version3) => {

    console.log(id, lenguaje1,lenguaje2,lenguaje3,version1,version2,version3);

    if(lenguaje1){
        const datos_len = await pool.query(
            `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
            [id,lenguaje1]
        );

        if(version1){
            const datos_ver = await pool.query(
                `INSERT INTO versiones_lenguajes (lenguaje_id,version_lenguaje) VALUES (?,?)`, 
                [lenguaje1,version1]
            );
            console.log('VERSION 1 REGISTRADA: ' + version1);
        }
        console.log('LENGUAJE REGISTRADO: ' + lenguaje1);
    }
    if(lenguaje2){
        const datos_len = await pool.query(
            `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
            [id,lenguaje2]
        );

        if(version2){
            const datos_ver = await pool.query(
                `INSERT INTO versiones_lenguajes (lenguaje_id,version_lenguaje) VALUES (?,?)`, 
                [lenguaje2,version2]
            );
            console.log('VERSION 1 REGISTRADA: ' + version2);
        }
        console.log('LENGUAJE REGISTRADO: ' + lenguaje2);
    }
    if(lenguaje3){
        const datos_len = await pool.query(
            `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
            [id,lenguaje3]
        );

        if(version3){
            const datos_ver = await pool.query(
                `INSERT INTO versiones_lenguajes (lenguaje_id,version_lenguaje) VALUES (?,?)`, 
                [lenguaje3,version3]
            );
            console.log('VERSION 1 REGISTRADA: ' + version3);
        }
        console.log('LENGUAJE REGISTRADO: ' + lenguaje3);
    }

    // if(lenguaje1){
    //     const buscarLenguaje = await pool.query(`SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?`, [lenguaje]);
    //     if(buscarLenguaje[0][0]){
    //         const lenguaje_id = buscarLenguaje[0][0].lenguaje_id;
    //         const datos_len = await pool.query(
    //             `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
    //             [id,lenguaje_id]
    //         );

    //         if(version1){
    //             const datos_ver = await pool.query(
    //                 `INSERT INTO versiones_lenguajes (lenguaje_id,version_lenguaje) VALUES (?,?)`, 
    //                 [lenguaje_id,version1]
    //             );
    //             console.log('VERSION 1 REGISTRADA: ' + version1);
    //         }
    //         console.log('LENGUAJE REGISTRADO: ' + lenguaje_id);
    //     }
    // }
    // if(lenguaje2){
    //     const buscarLenguaje = await pool.query(`SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?`, [lenguaje2]);
    //     if(buscarLenguaje[0][0]){
    //         const lenguaje_id = buscarLenguaje[0][0].lenguaje_id;
    //         const datos_len = await pool.query(
    //             `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
    //             [id,lenguaje_id]
    //         );

    //         if(version2){
    //             const datos_ver = await pool.query(
    //                 `INSERT INTO versiones_lenguajes (lenguaje_id,version_lenguaje) VALUES (?,?)`, 
    //                 [lenguaje_id,version2]
    //             );
    //             console.log('VERSION 2 REGISTRADA: ' + version2);
    //         }
    //         console.log('LENGUAJE REGISTRADO: ' + lenguaje_id);
    //     }
    // }
    // if(lenguaje3){
    //     const buscarLenguaje = await pool.query(`SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?`, [lenguaje3]);
    //     if(buscarLenguaje[0][0]){
    //         const lenguaje_id = buscarLenguaje[0][0].lenguaje_id;
    //         const datos_len = await pool.query(
    //             `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
    //             [id,lenguaje_id]
    //         );

    //         if(version3){
    //             const datos_ver = await pool.query(
    //                 `INSERT INTO versiones_lenguajes (lenguaje_id,version_lenguaje) VALUES (?,?)`, 
    //                 [lenguaje_id,version3]
    //             );
    //             console.log('VERSION 3 REGISTRADA: ' + version3);
    //         }
    //         console.log('LENGUAJE REGISTRADO: ' + lenguaje_id);
    //     }
    // }
	
}
    
const insertarFramework = async (id, framework1,framework2,framework3) => {

    if(framework1){
        const datos_fra = await pool.query(
            `INSERT INTO aplicacion_framework (aplicacion_id,framework_id) VALUES (?,?)`, 
            [id,framework1]
        );
        console.log('FRAMEWORK REGISTRADO: ' + framework1);  
    }
    if(framework2){
        const datos_fra = await pool.query(
            `INSERT INTO aplicacion_framework (aplicacion_id,framework_id) VALUES (?,?)`, 
            [id,framework2]
        );
        console.log('FRAMEWORK REGISTRADO: ' + framework2);  
    }
    if(framework2){
        const datos_fra = await pool.query(
            `INSERT INTO aplicacion_framework (aplicacion_id,framework_id) VALUES (?,?)`, 
            [id,framework2]
        );
        console.log('FRAMEWORK REGISTRADO: ' + framework2);  
    }


    // if(framework){
    //     const buscarFramework = await pool.query(`SELECT framework_id FROM frameworks WHERE framework = ?`, [framework]);
    //     if(buscarFramework[0][0]){
    //         const framework_id = buscarFramework[0][0].framework_id;
    //         const datos_fra = await pool.query(
    //             `INSERT INTO aplicacion_framework (aplicacion_id,framework_id) VALUES (?,?)`, 
    //             [id,framework_id]
    //         );
    //         console.log('FRAMEWORK REGISTRADO: ' + framework_id);
    //     }	  
    // }
    // if(framework2){
    //     const buscarFramework = await pool.query(`SELECT framework_id FROM frameworks WHERE framework = ?`, [framework2]);
    //     if(buscarFramework[0][0]){
    //         const framework_id = buscarFramework[0][0].framework_id;
    //         const datos_fra = await pool.query(
    //             `INSERT INTO aplicacion_framework (aplicacion_id,framework_id) VALUES (?,?)`, 
    //             [id,framework_id]
    //         );
    //         console.log('FRAMEWORK REGISTRADO: ' + framework_id);
    //     }	  
    // }
    // if(framework3){
    //     const buscarFramework = await pool.query(`SELECT framework_id FROM frameworks WHERE framework = ?`, [framework3]);
    //     if(buscarFramework[0][0]){
    //         const framework_id = buscarFramework[0][0].framework_id;
    //         const datos_fra = await pool.query(
    //             `INSERT INTO aplicacion_framework (aplicacion_id,framework_id) VALUES (?,?)`, 
    //             [id,framework_id]
    //         );
    //         console.log('FRAMEWORK REGISTRADO: ' + framework_id);
    //     }	  
    // }
}




const insertarServidor = async (id,select_servidor) => {
    
    console.log(select_servidor);
    let servidor_id = null;

    const buscarServidor = await pool.query(`SELECT servidor_id FROM servidores WHERE servidor = ?`, [select_servidor]);
    if(buscarServidor[0][0])
        servidor_id = buscarServidor[0][0].servidor_id;
    else
        return res.status(401).json({ message: 'ERROR, SERVIDOR NO ENCONTRADO' });

    console.log(servidor_id)
    // crea la relacion aplicacion-servidores
    const app_servidor = await pool.query(
        `INSERT INTO aplicacion_servidor (aplicacion_id,servidor_id) VALUES (?,?)`, 
        [id,servidor_id]
    );
    console.log('SERVIDOR GENERAL REGISTRADO: ' + servidor_id);

}

const insertarBase = async (id,select_base) => {
        
    let base_datos_id = null;

    const buscarBaseDatos = await pool.query(`SELECT * FROM bases_datos WHERE base_datos = ?`, [select_base]);
    if(buscarBaseDatos[0][0])
        base_datos_id = buscarBaseDatos[0][0].base_datos_id;
    else
        return res.status(401).json({ message: 'ERROR, BASE DE DATOS NO ENCONTRADA' });

    console.log(base_datos_id);
    // crea la relacion aplicacion-base_de_datos
    const datos_bas = await pool.query(
        `INSERT INTO aplicacion_basedatos (aplicacion_id,base_datos_id) VALUES (?,?)`, 
        [id,base_datos_id]
    );
    console.log('BASE DE DATOS REGISTRADA');

}

const insertarResponsable = async (tipo,id,select_responsable,nombre,apellido,indicador,cedula,
    cargo,telefono,gerencia,region,localidad) => {
    
    console.log(tipo,id,select_responsable,nombre,apellido,indicador,cedula,
        cargo,telefono,gerencia,region,localidad);

    let responsable_id = null;

    if(select_responsable){
        const buscarResponsable = await pool.query(`SELECT responsable_id FROM responsables WHERE res_indicador = ?`, [select_responsable]);
        responsable_id = buscarResponsable[0][0].responsable_id
        console.log('CONDICION TRUE DEL SELECT RESPONSABLE: ' + responsable_id);
    }
    else{
        console.log('EN EL !SELECT RESPONSABLE');
        const buscarResponsable = await pool.query(`SELECT responsable_id FROM responsables WHERE res_indicador = ?`, [indicador]);

        if(buscarResponsable[0][0] === undefined){
            console.log('EN EL BUSCAR RESPONSABLE');

            console.log(nombre,apellido,indicador,cedula,cargo,gerencia,region,localidad);

            // crea los datos del responsable
            const datos_responsable = await pool.query(
                `INSERT INTO responsables 
                    (res_nombre,res_apellido,res_indicador,res_cedula,res_cargo_id,res_gerencia_id,res_region_id,res_localidad_id) 
                VALUES 
                    (?,?,?,?,?,?,?,
                    (SELECT localidad_id FROM localidades WHERE localidad_id = ? AND localidades.region_id = ?));`,
                [nombre,apellido,indicador,cedula,cargo,gerencia,region,localidad,region]
            );
        
            console.log('EN EL BUSCAR RESPONSABLE');
            const buscarResponsable = await pool.query(`SELECT responsable_id FROM responsables WHERE res_indicador = ?`, [indicador]);
            responsable_id = buscarResponsable[0][0].responsable_id;
        
            // crea los datos del telefono
            const datos_telefono = await pool.query(
                `INSERT INTO telefonos (responsable_id,telefono) VALUES (?,?)`, 
                [responsable_id,telefono]
            );
            console.log('TELEFONO REGISTRADO');
        }
        else{
            responsable_id = buscarResponsable[0][0].responsable_id;
        }
    }

    // crea los datos del tipo de responsable
    if(tipo === 'funcional'){
        const datos_tipo_responsable = await pool.query(
            `INSERT INTO responsables_funcionales (aplicacion_id,responsable_id) VALUES (?,?)`,[id,responsable_id]
        );
        console.log('FUNCIONAL REGISTRADO');
    }
    else if(tipo === 'tecnico'){
        const datos_tipo_responsable = await pool.query(
            `INSERT INTO responsables_tecnicos (aplicacion_id,responsable_id) VALUES (?,?)`,[id,responsable_id]
        );
        console.log('TECNICO REGISTRADO');
    }

    console.log('RESPONSABLE REGISTRADO: ' + responsable_id);

    return responsable_id;
}

const insertarMantenimiento = async (id,frecuencia,horas_prom,horas_anuales) => {
    // registra un nuevo mantenimiento
    const datos_man = await pool.query(
        `INSERT INTO mantenimientos 
        (aplicacion_id,man_frecuencia,man_horas_prom,man_horas_anuales)
        VALUES (?,?,?,?)`,
        [id,frecuencia,horas_prom,horas_anuales]
    );
    console.log('MANTENIMIENTO REGISTRADO');
}

const insertarDocumentacion = async (id,descripcion,direccion,tipo) => {
    // registra una nueva documentacion
    const datos_doc = await pool.query(
        `INSERT INTO documentaciones (aplicacion_id,doc_descripcion,doc_direccion,doc_tipo)
        VALUES (?,?,?,?)`,
        [id,descripcion,direccion,tipo,]
    );
    
    console.log('DOCUMENTACION REGISTRADO');
}



module.exports = { insertarAplicacion, insertarPlataforma, 
    insertarLenguaje, insertarFramework, insertarServidor, 
    insertarBase, insertarMantenimiento,insertarDocumentacion, insertarResponsable };
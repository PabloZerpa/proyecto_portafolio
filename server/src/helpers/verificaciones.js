
const pool = require('../config');


const verificarPlataforma = async (id, plataforma) => {
	const buscarPlataforma = await pool.query(`SELECT plataforma_id FROM plataformas WHERE plataforma = ?`, [plataforma]);
            
    if(buscarPlataforma[0][0]){
        const plataforma_id = buscarPlataforma[0][0].plataforma_id;
        const datos_pla = await pool.query(
            `INSERT INTO aplicacion_plataforma (aplicacion_id,plataforma_id) VALUES (?,?)`, 
            [id,plataforma_id]
         );
         console.log('PLATAFORMA REGISTRADO: ' + plataforma_id);
    }  
}
  
const verificarLenguaje = async (id, lenguaje,lenguaje2,lenguaje3) => {
    
    if(lenguaje){
        const buscarLenguaje = await pool.query(`SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?`, [lenguaje]);
        if(buscarLenguaje[0][0]){
            const lenguaje_id = buscarLenguaje[0][0].lenguaje_id;
            const datos_len = await pool.query(
                `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
                [id,lenguaje_id]
            );
            console.log('LENGUAJE REGISTRADO: ' + lenguaje_id);
        }
    }

    if(lenguaje2){
        const buscarLenguaje = await pool.query(`SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?`, [lenguaje2]);
        if(buscarLenguaje[0][0]){
            const lenguaje_id = buscarLenguaje[0][0].lenguaje_id;
            const datos_len = await pool.query(
                `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
                [id,lenguaje_id]
            );
            console.log('LENGUAJE REGISTRADO: ' + lenguaje_id);
        }
    }

    if(lenguaje3){
        const buscarLenguaje = await pool.query(`SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?`, [lenguaje3]);
        if(buscarLenguaje[0][0]){
            const lenguaje_id = buscarLenguaje[0][0].lenguaje_id;
            const datos_len = await pool.query(
                `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
                [id,lenguaje_id]
            );
            console.log('LENGUAJE REGISTRADO: ' + lenguaje_id);
        }
    }
	
}
    
const verificarFramework = async (id, framework,framework2,framework3) => {

    if(framework){
        const buscarFramework = await pool.query(`SELECT framework_id FROM frameworks WHERE framework = ?`, [framework]);
        if(buscarFramework[0][0]){
            const framework_id = buscarFramework[0][0].framework_id;
            const datos_fra = await pool.query(
                `INSERT INTO aplicacion_framework (aplicacion_id,framework_id) VALUES (?,?)`, 
                [id,framework_id]
            );
            console.log('FRAMEWORK REGISTRADO: ' + framework_id);
        }	  
    }

    if(framework2){
        const buscarFramework = await pool.query(`SELECT framework_id FROM frameworks WHERE framework = ?`, [framework2]);
        if(buscarFramework[0][0]){
            const framework_id = buscarFramework[0][0].framework_id;
            const datos_fra = await pool.query(
                `INSERT INTO aplicacion_framework (aplicacion_id,framework_id) VALUES (?,?)`, 
                [id,framework_id]
            );
            console.log('FRAMEWORK REGISTRADO: ' + framework_id);
        }	  
    }

    if(framework3){
        const buscarFramework = await pool.query(`SELECT framework_id FROM frameworks WHERE framework = ?`, [framework3]);
        if(buscarFramework[0][0]){
            const framework_id = buscarFramework[0][0].framework_id;
            const datos_fra = await pool.query(
                `INSERT INTO aplicacion_framework (aplicacion_id,framework_id) VALUES (?,?)`, 
                [id,framework_id]
            );
            console.log('FRAMEWORK REGISTRADO: ' + framework_id);
        }	  
    }
}

const verificarServidor = async (id,select_servidor,servidor,estatus,direccion,sistema,sistema_version,marca,modelo,serial,
    cantidad_cpu, velocidad_cpu, memoria, region, localidad) => {
    
    let servidor_id = null;

    if(!select_servidor){

        const buscarServidor = await pool.query(`SELECT servidor_id FROM servidores WHERE servidor = ?`, [servidor]);
        console.log(buscarServidor[0][0])

        if(buscarServidor[0][0] === undefined){
    
            // crea los datos del sistema operativo del servidor
            let sistema_id = null;
            const buscarOS = await pool.query(`SELECT sistema_id FROM sistemas_operativos WHERE sistema = ?`, [sistema]);
    
            if(buscarOS[0][0] === undefined){
    
                const datos_sistema = await pool.query(
                    `INSERT INTO sistemas_operativos (sistema,sistema_version) VALUES (?,?)`, 
                    [sistema,sistema_version]
                );
    
                const selectSis = await pool.query(`SELECT * FROM sistemas_operativos ORDER BY sistema_id DESC LIMIT 1`);
                sistema_id = selectSis[0][0].sistema_id;
                console.log('SISTEMA OPERATIVO REGISTRADO: ' + sistema_id);
            }
            else{
                sistema_id = buscarOS[0][0].sistema_id;
            }
            console.log('SISTEMA REGISTRADO: ' + sistema_id);
    
            // crea los datos de la marca del servidor
            let modelo_id = null;
            const buscarModelo = await pool.query(`SELECT modelo_id FROM modelos WHERE modelo = ?`, [modelo]);
            if(buscarModelo[0][0] === undefined){
                const datos_modelo = await pool.query(
                    `INSERT INTO modelos (modelo,mod_marca,mod_serial,mod_cantidad_cpu,mod_velocidad_cpu,mod_memoria) VALUES (?,?,?,?,?,?)`, 
                    [modelo,marca,serial,cantidad_cpu,velocidad_cpu,memoria]
                );
                const selectMod = await pool.query(`SELECT * FROM modelos ORDER BY modelo_id DESC LIMIT 1`);
                modelo_id = selectMod[0][0].modelo_id;
            }
            else{
                modelo_id = buscarModelo[0][0].modelo_id;
            }
            console.log('MODELO REGISTRADA: ' + modelo_id);
    
            // crea los datos del servidor
            const datos_servidor = await pool.query(
                `INSERT INTO servidores 
                    (servidor,ser_estatus,ser_direccion,ser_sistema,ser_modelo,ser_region_id,ser_localidad_id) 
                VALUES 
                    (?,?,?,?,?,
                        (SELECT region_id FROM regiones WHERE region = ?),
                        (SELECT localidad_id FROM localidades WHERE localidad = ?));`,
                [servidor,estatus,direccion,sistema_id,modelo_id,region,localidad]
            );
            console.log('SERVIDOR REGISTRADO');
    
            const buscarServidor = await pool.query(`SELECT servidor_id FROM servidores WHERE servidor = ?`, [servidor]);
            servidor_id = buscarServidor[0][0].servidor_id;
        }
        else{
            console.log(buscarServidor[0][0]);
            servidor_id = buscarServidor[0][0].servidor_id;
        }
    }
    else{
        const buscarServidor = await pool.query(`SELECT servidor_id FROM servidores WHERE servidor = ?`, [select_servidor]);
        servidor_id = buscarServidor[0][0].servidor_id;
    }

    
    console.log(servidor_id)
    // crea la relacion aplicacion-servidores
    const app_servidor = await pool.query(
        `INSERT INTO aplicacion_servidor (aplicacion_id,servidor_id) VALUES (?,?)`, 
        [id,servidor_id]
    );
    console.log('SERVIDOR GENERAL REGISTRADO: ' + servidor_id);

}

const verificarBase = async (id,select_base,base_datos,manejador,version,tipo,estatus,
    tipo_ambiente,cantidad_usuarios,servidor) => {
        
    let base_datos_id = null;

    if(!select_base){
        
        const buscarBaseDatos = await pool.query(`SELECT base_datos_id FROM bases_datos WHERE base_datos = ?`, [base_datos]);
        if(buscarBaseDatos[0][0] === undefined){

            
            // crea los datos del manejador de la bd
            let manejador_id;
            const buscarManejador = await pool.query(`SELECT manejador_id FROM manejadores WHERE manejador = ?`, [manejador]);
            if(buscarManejador[0][0] === undefined){
                const datos_manejador = await pool.query(
                    `INSERT INTO manejadores (manejador) VALUES (?)`, 
                    [manejador]
                );
            }
            else{
                manejador_id = buscarManejador[0][0].manejador_id;
            }
            const selectMan = await pool.query(`SELECT * FROM manejadores ORDER BY manejador_id DESC LIMIT 1`);
            manejador_id = selectMan[0][0].manejador_id;
            console.log('MANEJADOR REGISTRADO: ' + manejador_id);


            let version_id;
            const buscarVersion = await pool.query(`
                SELECT version_manejador_id FROM versiones_manejadores WHERE version_manejador = ?`, [version]);
            if(buscarVersion[0][0] === undefined){
                const datos_version = await pool.query(
                    `INSERT INTO versiones_manejadores (version_manejador,manejador_id) VALUES (?,?);`, 
                    [version,manejador_id]
                );
            }
            else{
                version_id = buscarVersion[0][0].version_manejador_id;
            }
            const selectVer = await pool.query(`SELECT * FROM manejadores ORDER BY manejador_id DESC LIMIT 1`);
            version_id = selectVer[0][0].version_manejador_id;
            console.log('VERSION MANEJADOR REGISTRADO: ' + version_id);

            
            // crea los datos del tipo de bd
            let tipo_base_id;
            const buscarTipo = await pool.query(`SELECT tipo_base_id FROM tipos_bases WHERE tipo_base = ?`, [tipo]);
            if(buscarTipo[0][0] === undefined){
                const datos_tipoBases = await pool.query(
                    `INSERT INTO tipos_bases (tipo) VALUES (?)`, 
                    [tipo]
                );
            }
            else{
                tipo_base_id = buscarTipo[0][0].tipo_base_id;
            }
            const selectTipo = await pool.query(`SELECT * FROM tipos_bases ORDER BY tipo_base_id DESC LIMIT 1`);
            tipo_base_id = selectTipo[0][0].tipo_base_id;
            console.log('TIPO DE BD REGISTRADO: ' + tipo_base_id);

            
            // crea los datos de la base de datos
            const datos_basedatos = await pool.query(
                `INSERT INTO bases_datos (base_datos,bas_estatus,bas_tipo,bas_manejador,
                    bas_tipo_ambiente,bas_cantidad_usuarios) 
                VALUES (?,?,?,?,?,?);`, 
                [base_datos,estatus,tipo_base_id,manejador_id,tipo_ambiente,cantidad_usuarios]
            );

            const buscarBaseDatos = await pool.query(`SELECT * FROM bases_datos WHERE base_datos = ?`, [base_datos]);
            base_datos_id = buscarBaseDatos[0][0].base_datos_id;
        }
        else{
            base_datos_id = buscarBaseDatos[0][0].base_datos_id;
        }
    }
    else{
        const buscarBaseDatos = await pool.query(`SELECT * FROM bases_datos WHERE base_datos = ?`, [select_base]);
        base_datos_id = buscarBaseDatos[0][0].base_datos_id;
    }
    console.log('BASE DE DATOS GENERAL REGISTRADO: ' + base_datos_id);

    const basedatos_servidor = await pool.query(
        `INSERT INTO basedatos_servidor (base_datos_id,servidor_id) VALUES (?,
            (SELECT servidor_id FROM servidores WHERE servidor = ?));`, 
        [base_datos_id,servidor]
    );
    
    // crea la relacion aplicacion-base_de_datos
    const datos_bas = await pool.query(
        `INSERT INTO aplicacion_basedatos (aplicacion_id,base_datos_id) VALUES (?,?)`, 
        [id,base_datos_id]
    );
    console.log('BASE DE DATOS REGISTRADA');
    
    return base_datos_id; 
}

const verificarResponsable = async (tipo,id,nombre,apellido,indicador,cedula,
    cargo,telefono,gerencia,region,localidad) => {

    let responsable_id = null;
    const buscarResponsable = await pool.query(`SELECT responsable_id FROM responsables WHERE res_indicador = ?`, [indicador]);
            
    if(buscarResponsable[0][0] === undefined){
                
        // crea los datos del responsable
        const datos_responsable = await pool.query(
            `INSERT INTO responsables (res_nombre,res_apellido,res_indicador,res_cedula,res_cargo,res_gerencia_id,res_region_id,res_localidad_id) 
            VALUES (?,?,?,?,?,
                (SELECT gerencia_id FROM gerencias WHERE gerencia = ?),
                (SELECT region_id FROM regiones WHERE region = ?),
                (SELECT localidad_id FROM localidades WHERE localidad = ?))`,
            [nombre,apellido,indicador,cedula,cargo,gerencia,region,localidad]
        );
    
        const buscarResponsable = await pool.query(`SELECT responsable_id FROM responsables WHERE res_indicador = ?`, [indicador]);
        responsable_id = buscarResponsable[0][0].responsable_id;
    
        // crea los datos del telefono
        const datos_telefono = await pool.query(
            `INSERT INTO telefonos (responsable_id,telefono) VALUES (?,?)`, 
            [responsable_id,telefono]
        );
        console.log('TELEFONO REGISTRADO');
    
        // crea los datos del tipo de responsable
        if(tipo === 'funcional'){
            const datos_tipo_responsable = await pool.query(
            `INSERT INTO responsables_funcionales (aplicacion_id,responsable_id) 
            VALUES (?,?)`,
            [id,responsable_id]
            );
        }
        else{
            const datos_tipo_responsable = await pool.query(
            `INSERT INTO responsables_tecnicos (aplicacion_id,responsable_id) 
            VALUES (?,?)`,
            [id,responsable_id]
            );
        }
    }
    else{
        responsable_id = buscarResponsable[0][0].responsable_id;
    }
    console.log('RESPONSABLE REGISTRADO: ' + responsable_id);

    return responsable_id;
}

const verificarMantenimiento = async (id,frecuencia,horas_prom,horas_anuales) => {
    // registra un nuevo mantenimiento
    const datos_man = await pool.query(
        `INSERT INTO mantenimientos 
        (aplicacion_id,man_frecuencia,man_horas_prom,man_horas_anuales)
        VALUES (?,?,?,?)`,
        [id,frecuencia,horas_prom,horas_anuales]
    );
    
    const selectMan = await pool.query(`SELECT * FROM mantenimientos ORDER BY mantenimiento_id DESC LIMIT 1`);
    const mantenimiento_id = selectMan[0][0].mantenimiento_id;
    console.log('MANTENIMIENTO REGISTRADO: ' + mantenimiento_id);
}

const verificarDocumentacion = async (id,descripcion,direccion,tipo) => {
    // registra una nueva documentacion
    const datos_doc = await pool.query(
        `INSERT INTO documentaciones (aplicacion_id,doc_descripcion,doc_direccion,doc_tipo)
        VALUES (?,?,?,?)`,
        [id,descripcion,direccion,tipo,]
    );

    const selectDoc = await pool.query(`SELECT * FROM documentaciones ORDER BY documentacion_id DESC LIMIT 1`);
    const documentacion_id = selectDoc[0][0].documentacion_id;
    console.log('DOCUMENTACION REGISTRADO: ' + documentacion_id);
}

const verificarAplicacion = async (acronimo,nombre,descripcion,estatus,prioridad,critico,alcance,
    codigo_fuente,version,direccion,cantidad_usuarios,region,fecha_registro) => {

    console.log('ALO1');
    console.log(acronimo,nombre,descripcion,estatus,prioridad,critico,alcance,
        codigo_fuente,version,direccion,cantidad_usuarios,region,fecha_registro);

    const datos_apl = await pool.query(
        `INSERT INTO aplicaciones (apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,
            apl_critico,apl_alcance,apl_codigo_fuente,apl_version,apl_direccion,
            apl_cantidad_usuarios,apl_region,apl_fecha_registro)
        VALUE 
            (?,?,?,?,?,?,?,?,?,?,?,(SELECT region_id FROM regiones WHERE region = ?),?);`, 
        [
            acronimo,nombre,descripcion,estatus,prioridad,critico,alcance,
            codigo_fuente,version,direccion,cantidad_usuarios,region,fecha_registro
        ]
    );

    // guarda el id de la aplicacion para el registro de las tablas relacionadas
    const selectApl = await pool.query(`SELECT * FROM aplicaciones ORDER BY aplicacion_id DESC LIMIT 1`);
    const aplicacion_id = selectApl[0][0].aplicacion_id;
    console.log('APLICACION REGISTRADA: ' + aplicacion_id);
    return aplicacion_id;
}

module.exports = { verificarAplicacion, verificarPlataforma, 
    verificarLenguaje, verificarFramework, verificarServidor, 
    verificarBase, verificarMantenimiento,verificarDocumentacion, verificarResponsable };
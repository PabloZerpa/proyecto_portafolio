
const pool = require('../config');

const verificarCliente = async (cliente) => {
    // revisa si el cliente ingresado ya existe
    let cliente_id = null;
    const buscarCliente = await pool.query(`SELECT cliente_id FROM clientes WHERE cliente = ?`, [cliente]);
    
    // sino existe, lo crea y guarda su id para pasarselo a la tabla aplicaciones
    if(buscarCliente[0][0] === undefined){
        console.log('HOLA');
        const datos_cli = await pool.query(
            `INSERT INTO clientes (cliente) VALUES (?)`, 
            [cliente]
        );
        const selectCli = await pool.query(`SELECT * FROM clientes ORDER BY cliente_id DESC LIMIT 1`, [cliente]);
            cliente_id = selectCli[0][0].cliente_id;
        }
    // si existe, guarda su id para pasarselo a la tabla aplicaciones
    else{
        cliente_id = buscarCliente[0][0].cliente_id;
    }
    console.log('CLIENTE REGISTRADO: ' + cliente_id);
    return cliente_id;
};

const verificarRegion = async (apl_region) => {
	let region_id = null;

    const buscarRegion = await pool.query(`SELECT region_id FROM regiones WHERE region = ?`, [apl_region]);
    if(buscarRegion[0][0]){
       region_id = buscarRegion[0][0].region_id;
    }
    console.log('REGION REGISTRADA: ' + region_id);
	return region_id;
}

const verificarPlataforma = async (aplicacion_id, plataforma) => {
	const buscarPlataforma = await pool.query(`SELECT plataforma_id FROM plataformas WHERE plataforma = ?`, [plataforma]);
            
    if(buscarPlataforma[0][0]){
        const plataforma_id = buscarPlataforma[0][0].plataforma_id;
        const datos_pla = await pool.query(
        `INSERT INTO aplicacion_plataforma (aplicacion_id,plataforma_id) VALUES (?,?)`, 
            [aplicacion_id,plataforma_id]
         );
         console.log('PLATAFORMA REGISTRADO: ' + plataforma_id);
    }  
}
  
const verificarLenguaje = async (aplicacion_id, lenguaje) => {
	const buscarLenguaje = await pool.query(`SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?`, [lenguaje]);
    
    if(buscarLenguaje[0][0]){
        const lenguaje_id = buscarLenguaje[0][0].lenguaje_id;
        const datos_len = await pool.query(
            `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
            [aplicacion_id,lenguaje_id]
        );
        console.log('LENGUAJE REGISTRADO: ' + lenguaje_id);
    }
	
}
    
const verificarFramework = async (aplicacion_id, framework) => {
    const buscarFramework = await pool.query(`SELECT framework_id FROM frameworks WHERE framework = ?`, [framework]);
    
    if(buscarFramework[0][0]){
        const framework_id = buscarFramework[0][0].framework_id;
        const datos_fra = await pool.query(
            `INSERT INTO aplicacion_framework (aplicacion_id,framework_id) VALUES (?,?)`, 
            [aplicacion_id,framework_id]
        );
        console.log('FRAMEWORK REGISTRADO: ' + framework_id);
    }	  
}

const verificarServidor = async (servidor,ser_sistema,ser_sistema_version,ser_marca,ser_modelo,ser_serial,
    ser_cantidad_cpu, ser_velocidad_cpu, ser_memoria, ser_region, ser_localidad) => {

        let servidor_id = null;
        const buscarServidor = await pool.query(`SELECT servidor_id FROM servidores WHERE servidor = ?`, [servidor]);
        
        if(buscarServidor[0][0] === undefined){

            // crea los datos del sistema operativo del servidor
            const datos_sistema = await pool.query(
                `INSERT INTO sistemas_operativos (sistema,sis_version) VALUES (?,?)`, 
                [ser_sistema,ser_sistema_version]
            );
            const selectSis = await pool.query(`SELECT * FROM sistemas_operativos ORDER BY sistema_id DESC LIMIT 1`);
            const sistema = selectSis[0][0].sistema_id;
            console.log('SISTEMA OPERATIVO REGISTRADO: ' + sistema);
            
            // crea los datos de la marca del servidor
            const datos_marca = await pool.query(
                `INSERT INTO marcas (marca,mar_modelo,mar_serial,mar_cantidad_cpu,mar_velocidad_cpu,mar_memoria) VALUES (?,?,?,?,?,?)`, 
                [ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria]
            );
            const selectMar = await pool.query(`SELECT * FROM marcas ORDER BY marca_id DESC LIMIT 1`);
            const marca = selectMar[0][0].marca_id;
            console.log('MARCA REGISTRADA: ' + marca);

            let ser_region_id = null;
            const buscarRegion = await pool.query(`SELECT region_id FROM regiones WHERE region = ?`, [ser_region]);
            if(buscarRegion[0][0]){
                ser_region_id = buscarRegion[0][0].region_id;
            }

            let ser_localidad_id = null;
            const buscarLocalidad = await pool.query(`SELECT localidad_id FROM localidades WHERE localidad = ?`, [ser_localidad]);
            if(buscarLocalidad[0][0]){
                ser_localidad_id = buscarLocalidad[0][0].localidad_id;
            }
            
            // crea los datos del servidor
            const datos_servidor = await pool.query(
                `INSERT INTO servidores (servidor,ser_estatus,ser_direccion,ser_sistema,ser_marca,region_id,localidad_id) 
                VALUES (?,?,?,?,?,?,?)`, 
                [servidor,ser_estatus,ser_sistema_version,sistema,marca,ser_region_id,ser_localidad_id]
            );

            const buscarServidor = await pool.query(`SELECT servidor_id FROM servidores WHERE servidor = ?`, [servidor]);
            servidor_id = buscarServidor[0][0].servidor_id;
        }
        else{
            servidor_id = buscarServidor[0][0].servidor_id;
        }
        console.log('SERVIDOR GENERAL REGISTRADO: ' + servidor_id);

    return servidor_id;
}

const verificarBase = async (aplicacion_id,base_datos,base_manejador,base_tipo,base_estatus,
    base_tipo_ambiente,base_cantidad_usuarios,servidor_id) => {
        let base_datos_id = null;
        const buscarBaseDatos = await pool.query(`SELECT base_datos_id FROM bases_datos WHERE base_datos = ?`, [base_datos]);
        console.log(buscarBaseDatos[0][0]);

        if(buscarBaseDatos[0][0] === undefined){
            
            // crea los datos del manejador de la bd
            const datos_manejador = await pool.query(
                `INSERT INTO manejadores (manejador) VALUES (?)`, 
                [base_manejador]
            );
            const selectMan = await pool.query(`SELECT * FROM manejadores ORDER BY manejador_id DESC LIMIT 1`);
            const manejador = selectMan[0][0].manejador_id;
            console.log('MANEJADOR REGISTRADO: ' + manejador);
            
            // crea los datos del tipo de bd
            const datos_tipoBases = await pool.query(
                `INSERT INTO tipos_bases (tipo) VALUES (?)`, 
                [base_tipo]
            );
            const selectTipo = await pool.query(`SELECT * FROM tipos_bases ORDER BY tipo_base_id DESC LIMIT 1`);
            const tipo_base = selectTipo[0][0].tipo_base_id;
            console.log('TIPO DE BD REGISTRADO: ' + tipo_base);
            
            // crea los datos de la base de datos
            const datos_basedatos = await pool.query(
                `INSERT INTO bases_datos (base_datos,bas_estatus,bas_tipo,bas_manejador,
                    bas_tipo_ambiente,bas_cantidad_usuarios,servidor_id) VALUES (?,?,?,?,?,?,?)`, 
                [base_datos,base_estatus,tipo_base,manejador,base_tipo_ambiente,base_cantidad_usuarios,servidor_id]
            );
            
            const buscarBaseDatos = await pool.query(`SELECT * FROM bases_datos WHERE base_datos = ?`, [base_datos]);
            base_datos_id = buscarBaseDatos[0][0].base_datos_id;
        }
        else{
            base_datos_id = buscarBaseDatos[0][0].base_datos_id;
        }
        console.log('BASE DE DATOS GENERAL REGISTRADO: ' + base_datos_id);

        // crea la relacion aplicacion-base_de_datos
        const datos_bas = await pool.query(
            `INSERT INTO aplicacion_basedatos (aplicacion_id,base_datos_id) VALUES (?,?)`, 
            [aplicacion_id,base_datos_id]
        );
        console.log('BASE DE DATOS REGISTRADA');
    
        return base_datos_id;
        
}

const verificarMantenimiento = async (aplicacion_id,man_frecuencia,man_horas_prom,man_horas_anuales) => {
    // registra un nuevo mantenimiento
    const datos_man = await pool.query(
        `INSERT INTO mantenimientos 
        (aplicacion_id,man_frecuencia,man_horas_prom,man_horas_anuales)
        VALUES (?,?,?,?)`,
        [aplicacion_id,man_frecuencia,man_horas_prom,man_horas_anuales]
    );
    
    const selectMan = await pool.query(`SELECT * FROM mantenimientos ORDER BY mantenimiento_id DESC LIMIT 1`);
    const mantenimiento_id = selectMan[0][0].mantenimiento_id;
    console.log('MANTENIMIENTO REGISTRADO: ' + mantenimiento_id);}

    const verificarDocumentacion = async (aplicacion_id,doc_descripcion,doc_direccion,doc_tipo) => {
    // registra una nueva documentacion
    const datos_doc = await pool.query(
        `INSERT INTO documentaciones (aplicacion_id,doc_descripcion,doc_direccion,doc_tipo)
        VALUES (?,?,?,?)`,
        [aplicacion_id,doc_descripcion,doc_direccion,doc_tipo,]
    );
    
    const selectDoc = await pool.query(`SELECT * FROM documentaciones ORDER BY documentacion_id DESC LIMIT 1`);
    const documentacion_id = selectDoc[0][0].documentacion_id;
    console.log('DOCUMENTACION REGISTRADO: ' + documentacion_id);
}

const verificarAplicacion = async (apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,critico,apl_alcance,
    codigo,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,
    region_id,cliente_id) => {
        
    // registra una nueva aplicacion
    const datos_apl = await pool.query(
        `INSERT INTO aplicaciones 
            (apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,apl_region_id,
            apl_cliente_id) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);`, 
        [
            apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,critico,apl_alcance,
            codigo,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,region_id,cliente_id
        ]
    );

    // guarda el id de la aplicacion para el registro de las tablas relacionadas
    const selectApl = await pool.query(`SELECT * FROM aplicaciones ORDER BY aplicacion_id DESC LIMIT 1`);
    const aplicacion_id = selectApl[0][0].aplicacion_id;
    console.log('APLICACION REGISTRADA: ' + aplicacion_id);
    return aplicacion_id;
}

module.exports = { verificarAplicacion, verificarCliente, verificarPlataforma, verificarLenguaje, verificarFramework, 
    verificarRegion, verificarServidor, verificarBase, verificarMantenimiento, verificarDocumentacion };
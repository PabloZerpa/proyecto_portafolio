
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

const verificarRegion = async (region) => {
	let region_id = null;

    const buscarRegion = await pool.query(`SELECT region_id FROM regiones WHERE region = ?`, [region]);
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

const verificarServidor = async (aplicacion_id,servidor,estatus,direccion,sistema,sistema_version,marca,modelo,serial,
    cantidad_cpu, velocidad_cpu, memoria, region, localidad) => {

        console.log(servidor,estatus,direccion,sistema,sistema_version,marca,modelo,serial,
            cantidad_cpu, velocidad_cpu, memoria, region, localidad);

        let servidor_id = null;
        const buscarServidor = await pool.query(`SELECT servidor_id FROM servidores WHERE servidor = ?`, [servidor]);

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
            let marca_id = null;
            const buscarMarca = await pool.query(`SELECT marca_id FROM marcas WHERE marca = ?`, [marca]);
            if(buscarMarca[0][0] === undefined){
                const datos_marca = await pool.query(
                    `INSERT INTO marcas (marca,mar_modelo,mar_serial,mar_cantidad_cpu,mar_velocidad_cpu,mar_memoria) VALUES (?,?,?,?,?,?)`, 
                    [marca,modelo,serial,cantidad_cpu,velocidad_cpu,memoria]
                );
                const selectMar = await pool.query(`SELECT * FROM marcas ORDER BY marca_id DESC LIMIT 1`);
                marca_id = selectMar[0][0].marca_id;
            }
            else{
                marca_id = buscarMarca[0][0].marca_id;
            }
            console.log('MARCA REGISTRADA: ' + marca_id);

            // crea los datos del servidor
            const datos_servidor = await pool.query(
                `INSERT INTO servidores 
                    (servidor,ser_estatus,ser_direccion,ser_sistema,ser_marca,ser_region_id,ser_localidad_id) 
                VALUES 
                    (?,?,?,?,?,(SELECT region_id FROM regiones WHERE region = ?),?);`,
                [servidor,estatus,direccion,sistema_id,marca_id,region,2]
            );
            console.log('SERVIDOR REGISTRADO');
            // const datos_servidor = await pool.query(
            //     `INSERT INTO servidores (servidor,ser_estatus,ser_direccion,ser_sistema,ser_marca,ser_region_id,ser_localidad_id) 
            //     VALUES (?,?,?,?,?,?,?)`, 
            //     [servidor,estatus,direccion,sistema,marca,ser_region_id,1]
            // );

            const buscarServidor = await pool.query(`SELECT servidor_id FROM servidores WHERE servidor = ?`, [servidor]);
            servidor_id = buscarServidor[0][0].servidor_id;
            
            // crea la relacion aplicacion-servidores
            const app_servidor = await pool.query(
                `INSERT INTO aplicacion_servidor (aplicacion_id,servidor_id) VALUES (?,?)`, 
                [aplicacion_id,servidor_id]
            );
            console.log('SERVIDOR-APLICACION REGISTRADO: ' + aplicacion_id);
        }
        else{
            servidor_id = buscarServidor[0][0].servidor_id;
        }
        console.log('SERVIDOR GENERAL REGISTRADO: ' + servidor_id);

}

const verificarBase = async (aplicacion_id,base_datos,manejador,tipo,estatus,
    tipo_ambiente,cantidad_usuarios,servidor) => {

        let base_datos_id = null;
        const buscarBaseDatos = await pool.query(`SELECT base_datos_id FROM bases_datos WHERE base_datos = ?`, [base_datos]);

        if(buscarBaseDatos[0][0] === undefined){
            
            // crea los datos del manejador de la bd
            let manejador_id;
            const datos_manejador = await pool.query(
                `INSERT INTO manejadores (manejador) VALUES (?)`, 
                [manejador]
            );
            const selectMan = await pool.query(`SELECT * FROM manejadores ORDER BY manejador_id DESC LIMIT 1`);
            manejador_id = selectMan[0][0].manejador_id;
            console.log('MANEJADOR REGISTRADO: ' + manejador_id);
            
            // crea los datos del tipo de bd
            let tipo_base_id;
            const datos_tipoBases = await pool.query(
                `INSERT INTO tipos_bases (tipo) VALUES (?)`, 
                [tipo]
            );
            const selectTipo = await pool.query(`SELECT * FROM tipos_bases ORDER BY tipo_base_id DESC LIMIT 1`);
            tipo_base_id = selectTipo[0][0].tipo_base_id;
            console.log('TIPO DE BD REGISTRADO: ' + tipo_base_id);
            
            // crea los datos de la base de datos
            const datos_basedatos = await pool.query(
                `INSERT INTO bases_datos (base_datos,bas_estatus,bas_tipo,bas_manejador,
                    bas_tipo_ambiente,bas_cantidad_usuarios,bas_servidor_id) 
                VALUES (?,?,?,?,?,?,
                    (SELECT servidor_id FROM servidores WHERE servidor = ?) );`, 
                [base_datos,estatus,tipo_base_id,manejador_id,tipo_ambiente,cantidad_usuarios,servidor]
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

const verificarResponsable = async (tipo_responsables,aplicacion_id,nombre,apellido,indicador,cedula,
        cargo,telefono,gerencia,subgerencia,region, localidad) => {

        let responsable_id = null;
        const buscarResponsable = await pool.query(`SELECT responsable_id FROM responsables WHERE res_indicador = ?`, [indicador]);
        
        if(buscarResponsable[0][0] === undefined){
            
            let gerencia_id = null;
            const buscarGerencia = await pool.query(`SELECT gerencia_id FROM gerencias WHERE gerencia_id = ?`, [gerencia]);
            if(buscarGerencia[0][0]){
                gerencia_id = buscarGerencia[0][0].gerencia_id;
            }
            console.log('GERENCIA: ' + gerencia_id);
            
            let res_region_id = null;
            const buscarRegion = await pool.query(`SELECT region_id FROM regiones WHERE region = ?`, [region]);
            if(buscarRegion[0][0]){
                res_region_id = buscarRegion[0][0].region_id;
            }

            let res_localidad_id = null;
            const buscarLocalidad = await pool.query(`SELECT localidad_id FROM localidades WHERE localidad = ?`, [localidad]);
            if(buscarLocalidad[0][0]){
                res_localidad_id = buscarLocalidad[0][0].localidad_id;
            }
            
            // crea los datos del responsable
            const datos_responsable = await pool.query(
                `INSERT INTO responsables (res_nombre,res_apellido,res_indicador,res_cedula,res_cargo,res_gerencia_id,res_region_id,res_localidad_id) 
                VALUES (?,?,?,?,?,?,?,?)`,
                [nombre,apellido,indicador,cedula,cargo,gerencia_id,res_region_id,1]
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
            if(tipo_responsables === 'funcional'){
                const datos_tipo_responsable = await pool.query(
                    `INSERT INTO responsables_funcionales (aplicacion_id,responsable_id) 
                    VALUES (?,?)`,
                    [aplicacion_id,responsable_id]
                );
            }
            else{
                const datos_tipo_responsable = await pool.query(
                    `INSERT INTO responsables_tecnicos (aplicacion_id,responsable_id) 
                    VALUES (?,?)`,
                    [aplicacion_id,responsable_id]
                );
            }
        }
        else{
            responsable_id = buscarResponsable[0][0].responsable_id;
        }
        console.log('RESPONSABLE REGISTRADO: ' + responsable_id);

    return responsable_id;
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
    console.log('MANTENIMIENTO REGISTRADO: ' + mantenimiento_id);
}

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
    codigo,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,apl_region,apl_cliente) => {

        console.log('ALO1');
    const datos_apl = await pool.query(
        `INSERT INTO aplicaciones (apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,apl_region_id,apl_cliente)
        VALUE 
            (?,?,?,?,?,?,?,?,?,?,?,?,(SELECT region_id FROM regiones WHERE region = ?),?);`, 
        [
            apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,critico,apl_alcance,
            codigo,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,apl_region,apl_cliente
        ]
    );
        console.log('ALO2');
    // registra una nueva aplicacion
    // const datos_apl = await pool.query(
    //     `INSERT INTO aplicaciones 
    //         (apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
    //         apl_codigo_fuente,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,apl_region_id,
    //         apl_cliente)
    //     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);`, 
    //     [
    //         apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,critico,apl_alcance,
    //         codigo,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,region_id,apl_cliente
    //     ]
    // );

    // guarda el id de la aplicacion para el registro de las tablas relacionadas
    const selectApl = await pool.query(`SELECT * FROM aplicaciones ORDER BY aplicacion_id DESC LIMIT 1`);
    const aplicacion_id = selectApl[0][0].aplicacion_id;
    console.log('APLICACION REGISTRADA: ' + aplicacion_id);
    return aplicacion_id;
}

module.exports = { verificarAplicacion, verificarCliente, verificarPlataforma, 
    verificarLenguaje, verificarFramework,verificarRegion, verificarServidor, 
    verificarBase, verificarMantenimiento,verificarDocumentacion, verificarResponsable };
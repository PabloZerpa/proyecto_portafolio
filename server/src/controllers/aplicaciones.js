
const pool = require('../config');
const { matchedData } = require('express-validator');
const { insertar } = require('../helpers/plataforma');

const plataforma = `
JOIN aplicacion_plataforma
ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
JOIN plataformas
ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id`;

const lenguaje = `inner join aplicacion_lenguaje
on aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
inner join lenguajes
on aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id`;

const framework = `inner join aplicacion_framework
on aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
inner join frameworks
on aplicacion_framework.framework_id = frameworks.framework_id`;

const base_datos = `inner join aplicacion_basedatos
on aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
inner join bases_datos
on aplicacion_basedatos.base_datos_id = bases_datos.base_datos_id
inner join manejadores
on bases_datos.base_datos_id = manejadores.manejador_id
inner join tipos_bases
on bases_datos.base_datos_id = tipo_base_id`;

const servidor = `join servidores
on bases_datos.servidor_id = servidores.servidor_id
inner join sistemas_operativos
on sistemas_operativos.sistema_id = servidores.servidor_id
inner join marcas
on marcas.marca_id = servidores.servidor_id`;

const clientes = `inner join clientes
on aplicaciones.aplicacion_id = clientes.cliente_id`;

const regiones = `inner join regiones
on aplicaciones.aplicacion_id = regiones.region_id
inner join localidades
on regiones.region_id = localidades.localidad_id`;

const mantenimientos = `inner join mantenimientos
on mantenimientos.aplicacion_id = aplicaciones.aplicacion_id`;

const documentaciones = `inner join documentaciones
on documentaciones.aplicacion_id = aplicaciones.aplicacion_id`;

// *********************************** OBTENER TODOS LOS DATOS ***********************************
const obtenerDatos = async (req,res) => {
    try {
        const query = `
            SELECT 
                aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,
                apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
                apl_codigo_fuente,apl_licencia,apl_direccion,apl_cantidad_usuarios,
                plataforma,lenguaje, framework, 
                base_datos,bas_estatus,bas_cantidad_usuarios, tipo, manejador,bas_tipo_ambiente,
                servidor, ser_estatus,ser_direccion, sistema,
                sis_version, marca,mar_modelo,mar_serial,mar_cantidad_cpu,mar_velocidad_cpu,mar_memoria,
                cliente,region, localidad,
                man_frecuencia,man_horas_prom,man_horas_anuales, 
                doc_descripcion,doc_tipo, doc_direccion
            FROM aplicaciones 
                ${plataforma}
                ${lenguaje}
                ${framework}
                ${base_datos}
                ${servidor}
                ${clientes}
                ${regiones}
                ${mantenimientos}
                ${documentaciones}
            ORDER BY aplicaciones.aplicacion_id ASC
        `;

        const data = await pool.query(query);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER LOS DATOS POR TERMINO DE BUSQUEDA ***********************************
const obtenerPorBusqueda = async (req,res) => {
    try {  
        const { term,estatus,region,prioridad,plataforma,order,count } = req.body;
        const termino = '%' + term + '%';
        let data;

        console.log(termino,estatus,region,prioridad,plataforma,order,count);

        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
        
        if(estatus){
            data = await pool.query(`
            SELECT
                aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,
                apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
                apl_codigo_fuente,apl_licencia,apl_direccion,apl_cantidad_usuarios,
                plataforma,lenguaje, framework, 
                base_datos,bas_estatus,bas_cantidad_usuarios, tipo, manejador,bas_tipo_ambiente,
                servidor, ser_estatus,ser_direccion, sistema,
                sis_version, marca,mar_modelo,mar_serial,mar_cantidad_cpu,mar_velocidad_cpu,mar_memoria,
                cliente,region,localidad,
                man_frecuencia,man_horas_prom,man_horas_anuales, 
                doc_descripcion,doc_tipo, doc_direccion
            FROM aplicaciones 
                JOIN aplicacion_plataforma
                ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                JOIN plataformas
                ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
                inner join aplicacion_lenguaje
                on aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                inner join lenguajes
                on aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
                inner join aplicacion_framework
                on aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
                inner join frameworks
                on aplicacion_framework.framework_id = frameworks.framework_id
                inner join aplicacion_basedatos
                on aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                inner join bases_datos
                on aplicacion_basedatos.base_datos_id = bases_datos.base_datos_id
                inner join manejadores
                on bases_datos.base_datos_id = manejadores.manejador_id
                inner join tipos_bases
                on bases_datos.base_datos_id = tipo_base_id
                join servidores
                on bases_datos.servidor_id = servidores.servidor_id
                inner join sistemas_operativos
                on sistemas_operativos.sistema_id = servidores.servidor_id
                inner join marcas
                on marcas.marca_id = servidores.servidor_id
                inner join clientes
                on aplicaciones.aplicacion_id = clientes.cliente_id
                inner join regiones
                on aplicaciones.aplicacion_id = regiones.region_id
                inner join localidades
                on regiones.region_id = localidades.localidad_id
                inner join mantenimientos
                on mantenimientos.aplicacion_id = aplicaciones.aplicacion_id
                inner join documentaciones
                on documentaciones.aplicacion_id = aplicaciones.aplicacion_id
            WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                apl_acronimo LIKE ? OR 
                apl_nombre LIKE ? OR
                apl_prioridad LIKE ? OR
                lenguaje LIKE ? OR 
                framework LIKE ? OR 
                base_datos LIKE ? OR 
                servidor LIKE ? OR 
                plataforma LIKE ?)
                AND apl_estatus LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,termino,estatus,parseInt(count)]);
        }
        else if(prioridad){
            data = await pool.query(
                `SELECT
                    aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,
                    apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
                    apl_codigo_fuente,apl_licencia,apl_direccion,apl_cantidad_usuarios,
                    plataforma,lenguaje, framework, 
                    base_datos,bas_estatus,bas_cantidad_usuarios, tipo, manejador,bas_tipo_ambiente,
                    servidor, ser_estatus,ser_direccion, sistema,
                    sis_version, marca,mar_modelo,mar_serial,mar_cantidad_cpu,mar_velocidad_cpu,mar_memoria,
                    cliente,region,localidad,
                    man_frecuencia,man_horas_prom,man_horas_anuales, 
                    doc_descripcion,doc_tipo, doc_direccion
                FROM aplicaciones 
                    JOIN aplicacion_plataforma
                    ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                    JOIN plataformas
                    ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
                    inner join aplicacion_lenguaje
                    on aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                    inner join lenguajes
                    on aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
                    inner join aplicacion_framework
                    on aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
                    inner join frameworks
                    on aplicacion_framework.framework_id = frameworks.framework_id
                    inner join aplicacion_basedatos
                    on aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                    inner join bases_datos
                    on aplicacion_basedatos.base_datos_id = bases_datos.base_datos_id
                    inner join manejadores
                    on bases_datos.base_datos_id = manejadores.manejador_id
                    inner join tipos_bases
                    on bases_datos.base_datos_id = tipo_base_id
                    join servidores
                    on bases_datos.servidor_id = servidores.servidor_id
                    inner join sistemas_operativos
                    on sistemas_operativos.sistema_id = servidores.servidor_id
                    inner join marcas
                    on marcas.marca_id = servidores.servidor_id
                    inner join clientes
                    on aplicaciones.aplicacion_id = clientes.cliente_id
                    inner join regiones
                    on aplicaciones.aplicacion_id = regiones.region_id
                    inner join localidades
                    on regiones.region_id = localidades.localidad_id
                    inner join mantenimientos
                    on mantenimientos.aplicacion_id = aplicaciones.aplicacion_id
                    inner join documentaciones
                    on documentaciones.aplicacion_id = aplicaciones.aplicacion_id
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR 
                    apl_estatus LIKE ? OR 
                    lenguaje LIKE ? OR 
                    framework LIKE ? OR 
                    base_datos LIKE ? OR 
                    servidor LIKE ? OR 
                    plataforma LIKE ?)
                    AND apl_prioridad LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ?`,
                [termino,termino,termino,termino,termino,termino,termino,termino,termino,prioridad,parseInt(count)]);
        }
        else if(plataforma){
            data = await pool.query(
                `SELECT
                    aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,
                    apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
                    apl_codigo_fuente,apl_licencia,apl_direccion,apl_cantidad_usuarios,
                    plataforma,lenguaje, framework, 
                    base_datos,bas_estatus,bas_cantidad_usuarios, tipo, manejador,bas_tipo_ambiente,
                    servidor, ser_estatus,ser_direccion, sistema,
                    sis_version, marca,mar_modelo,mar_serial,mar_cantidad_cpu,mar_velocidad_cpu,mar_memoria,
                    cliente,region,localidad,
                    man_frecuencia,man_horas_prom,man_horas_anuales, 
                    doc_descripcion,doc_tipo, doc_direccion
                FROM aplicaciones 
                    JOIN aplicacion_plataforma
                    ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                    JOIN plataformas
                    ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
                    inner join aplicacion_lenguaje
                    on aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                    inner join lenguajes
                    on aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
                    inner join aplicacion_framework
                    on aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
                    inner join frameworks
                    on aplicacion_framework.framework_id = frameworks.framework_id
                    inner join aplicacion_basedatos
                    on aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                    inner join bases_datos
                    on aplicacion_basedatos.base_datos_id = bases_datos.base_datos_id
                    inner join manejadores
                    on bases_datos.base_datos_id = manejadores.manejador_id
                    inner join tipos_bases
                    on bases_datos.base_datos_id = tipo_base_id
                    join servidores
                    on bases_datos.servidor_id = servidores.servidor_id
                    inner join sistemas_operativos
                    on sistemas_operativos.sistema_id = servidores.servidor_id
                    inner join marcas
                    on marcas.marca_id = servidores.servidor_id
                    inner join clientes
                    on aplicaciones.aplicacion_id = clientes.cliente_id
                    inner join regiones
                    on aplicaciones.aplicacion_id = regiones.region_id
                    inner join localidades
                    on regiones.region_id = localidades.localidad_id
                    inner join mantenimientos
                    on mantenimientos.aplicacion_id = aplicaciones.aplicacion_id
                    inner join documentaciones
                    on documentaciones.aplicacion_id = aplicaciones.aplicacion_id
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR 
                    apl_prioridad LIKE ? OR 
                    apl_estatus LIKE ? OR 
                    lenguaje LIKE ? OR 
                    framework LIKE ? OR 
                    base_datos LIKE ? OR 
                    servidor LIKE ? )
                    AND plataforma LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ?`,
                [termino,termino,termino,termino,termino,termino,termino,termino,termino,plataforma,parseInt(count)]);
        }
        else{
            data = await pool.query(
                `SELECT
                    aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,
                    apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
                    apl_codigo_fuente,apl_licencia,apl_direccion,apl_cantidad_usuarios,
                    plataforma,lenguaje, framework, 
                    base_datos,bas_estatus,bas_cantidad_usuarios, tipo, manejador,bas_tipo_ambiente,
                    servidor, ser_estatus,ser_direccion, sistema,
                    sis_version, marca,mar_modelo,mar_serial,mar_cantidad_cpu,mar_velocidad_cpu,mar_memoria,
                    cliente,region,localidad,
                    man_frecuencia,man_horas_prom,man_horas_anuales, 
                    doc_descripcion,doc_tipo, doc_direccion
                FROM aplicaciones 
                    JOIN aplicacion_plataforma
                    ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                    JOIN plataformas
                    ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
                    inner join aplicacion_lenguaje
                    on aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                    inner join lenguajes
                    on aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
                    inner join aplicacion_framework
                    on aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
                    inner join frameworks
                    on aplicacion_framework.framework_id = frameworks.framework_id
                    inner join aplicacion_basedatos
                    on aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                    inner join bases_datos
                    on aplicacion_basedatos.base_datos_id = bases_datos.base_datos_id
                    inner join manejadores
                    on bases_datos.base_datos_id = manejadores.manejador_id
                    inner join tipos_bases
                    on bases_datos.base_datos_id = tipo_base_id
                    join servidores
                    on bases_datos.servidor_id = servidores.servidor_id
                    inner join sistemas_operativos
                    on sistemas_operativos.sistema_id = servidores.servidor_id
                    inner join marcas
                    on marcas.marca_id = servidores.servidor_id
                    inner join clientes
                    on aplicaciones.aplicacion_id = clientes.cliente_id
                    inner join regiones
                    on aplicaciones.aplicacion_id = regiones.region_id
                    inner join localidades
                    on regiones.region_id = localidades.localidad_id
                    inner join mantenimientos
                    on mantenimientos.aplicacion_id = aplicaciones.aplicacion_id
                    inner join documentaciones
                    on documentaciones.aplicacion_id = aplicaciones.aplicacion_id
                WHERE 
                    (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_nombre LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_estatus LIKE ? OR 
                    apl_prioridad LIKE ? OR 
                    lenguaje LIKE ? OR 
                    framework LIKE ? OR 
                    base_datos LIKE ? OR 
                    servidor LIKE ? OR 
                    plataforma LIKE ? ) ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ?`, 
                [termino,termino,termino,termino,termino,termino,termino,termino,termino,termino,parseInt(count)]);
        }

        if (data.affectedRows === 0)
            return res.status(404).json({ message: "Sin coincidencias" });

        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER LOS DATOS POR CAMPO ESPECIFICO ***********************************
const obtenerPorCampo = async (req,res) => {
    try { 
        const { term, campo } = req.body;
        const termino = '%' + term + '%';

        console.log(termino,campo);

        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });

        const data = await pool.query(
            `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
            FROM aplicaciones 
            
            WHERE ${campo} LIKE ? OR
            aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ?`, 
            [termino,termino,termino,termino]
        );

        if (data.affectedRows === 0)
            return res.status(404).json({ message: "Sin coincidencias" });

        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER DATOS PARA GENERAR GRAFICOS ***********************************
const obtenerPorGraficos = async (req,res) => {
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

// *********************************** OBTENER DATOS POR ID ***********************************
const obtenerDato = async (req,res) => {
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

// *********************************** CREAR REGISTRO ***********************************
const crearAplicacion = async (req,res) => {
    try {
        const {
            apl_acronimo,apl_nombre,apl_descripcion,apl_region,
            apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_licencia,apl_direccion,apl_cantidad_usuarios,
            plataforma,lenguaje, framework, 
            base_datos,base_estatus,base_cantidad_usuarios, base_tipo, base_manejador,base_tipo_ambiente,
            servidor, ser_estatus,ser_direccion, ser_sistema,ser_region,ser_localidad,
            ser_sistemas_version,ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            cliente, man_frecuencia,man_horas_prom,man_horas_anuales, 
            doc_descripcion,doc_tipo, doc_direccion, apl_fecha_registro
        } = req.body;

        console.log(apl_acronimo,apl_nombre,apl_descripcion,apl_region,
            apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_licencia,apl_direccion,apl_cantidad_usuarios,
            plataforma,lenguaje, framework, 
            base_datos,base_estatus,base_cantidad_usuarios, base_tipo, base_manejador,base_tipo_ambiente,
            servidor, ser_estatus,ser_direccion, ser_sistema,ser_region,ser_localidad,
            ser_sistemas_version,ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            cliente, man_frecuencia,man_horas_prom,man_horas_anuales, 
            doc_descripcion,doc_tipo, doc_direccion, apl_fecha_registro);

        const query = await pool.query(
            `SELECT * FROM aplicaciones WHERE apl_acronimo = ? OR apl_nombre = ?`, 
            [apl_acronimo,apl_nombre]);
        const app = query[0][0];

        // ****************************** VERIFICA QUE LA APLICACION NO EXISTA ******************************
        if(app){
            console.log('ERROR, APLICACION YA EXISTE');
            return res.status(401).json({ message: 'ERROR, APLICACION YA EXISTE' });
        }
        else{
            // ****************************** TABLA CLIENTES ****************************** 
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

            // ****************************** TABLA REGIONES ****************************** 
            let region_id = null;

            const buscarRegion = await pool.query(`SELECT region_id FROM regiones WHERE region = ?`, [apl_region]);
            if(buscarRegion[0][0]){
                region_id = buscarRegion[0][0].region_id;
            }
            console.log('REGION REGISTRADA: ' + region_id);

            // ****************************** TABLA APLICACIONES ******************************
            // registra una nueva aplicacion
            let codigo, critico;

            
            {apl_codigo_fuente === 'SI' ? codigo = 1 : codigo = 0}
            {apl_critico === 'SI' ? critico = 1 : critico = 0}

            const datos_apl = await pool.query(
                `INSERT INTO aplicaciones 
                    (apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
                    apl_codigo_fuente,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,
                    region_id,cliente_id,apl_fecha_registro) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
                [
                    apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,critico,apl_alcance,
                    codigo,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,
                    region_id,cliente_id,apl_fecha_registro
                ]
            );
            
            // guarda el id de la aplicacion para el registro de las tablas relacionadas
            const selectApl = await pool.query(`SELECT * FROM aplicaciones ORDER BY aplicacion_id DESC LIMIT 1`);
            const aplicacion_id = selectApl[0][0].aplicacion_id;
            console.log('APLICACION REGISTRADA: ' + aplicacion_id);


            // ****************************** TABLA PLATAFORMA ******************************
            const buscarPlataforma = await pool.query(`SELECT plataforma_id FROM plataformas WHERE plataforma = ?`, [plataforma]);
            
            if(buscarPlataforma[0][0]){
                const plataforma_id = buscarPlataforma[0][0].plataforma_id;
                const datos_pla = await pool.query(
                    `INSERT INTO aplicacion_plataforma (aplicacion_id,plataforma_id) VALUES (?,?)`, 
                    [aplicacion_id,plataforma_id]
                );
                console.log('PLATAFORMA REGISTRADO: ' + plataforma_id);
            }


            // ****************************** TABLA LENGUAJES ****************************** 
            const buscarLenguaje = await pool.query(`SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?`, [lenguaje]);

            if(buscarLenguaje[0][0]){
                const lenguaje_id = buscarLenguaje[0][0].lenguaje_id;
                const datos_len = await pool.query(
                    `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
                    [aplicacion_id,lenguaje_id]
                );
                console.log('LENGUAJE REGISTRADO: ' + lenguaje_id);
            }


            // ****************************** TABLA FRAMEWORK ****************************** 
            const buscarFramework = await pool.query(`SELECT framework_id FROM frameworks WHERE framework = ?`, [framework]);

            if(buscarFramework[0][0]){
                const framework_id = buscarFramework[0][0].framework_id;
                const datos_fra = await pool.query(
                    `INSERT INTO aplicacion_framework (aplicacion_id,framework_id) VALUES (?,?)`, 
                    [aplicacion_id,framework_id]
                );
                console.log('FRAMEWORK REGISTRADO: ' + framework_id);
            }

            // ****************************** TABLA SERVIDORES ****************************** 
            let servidor_id = null;
            const buscarServidor = await pool.query(`SELECT servidor_id FROM servidores WHERE servidor = ?`, [servidor]);
            
            if(buscarServidor[0][0] === undefined){

                // crea los datos del sistema operativo del servidor
                const datos_sistema = await pool.query(
                    `INSERT INTO sistemas_operativos (sistema,sis_version) VALUES (?,?)`, 
                    [ser_sistema,ser_sistemas_version]
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
                    [servidor,ser_estatus,ser_direccion,sistema,marca,ser_region_id,ser_localidad_id]
                );

                const buscarServidor = await pool.query(`SELECT servidor_id FROM servidores WHERE servidor = ?`, [servidor]);
                servidor_id = buscarServidor[0][0].servidor_id;
            }
            else{
                servidor_id = buscarServidor[0][0].servidor_id;
            }
            console.log('SERVIDOR GENERAL REGISTRADO: ' + servidor_id);

            // crea la relacion aplicacion-servidor
            const datos_ser = await pool.query(
                `INSERT INTO aplicacion_servidor (aplicacion_id,servidor_id) VALUES (?,?)`, 
                [aplicacion_id,servidor_id]
            );
            console.log('SERVIDOR REGISTRADO');


            // ****************************** TABLA BASE DE DATOS ******************************
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


            // ****************************** TABLA MANTENIMIENTOS ******************************
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

            // ****************************** TABLA DOCUMENTACION ******************************
            // registra una nueva documentacion
            const datos_doc = await pool.query(
                `INSERT INTO documentaciones (aplicacion_id,doc_descripcion,doc_direccion,doc_tipo)
                VALUES (?,?,?,?)`,
                [aplicacion_id,doc_descripcion,doc_direccion,doc_tipo,]
            );
            
            const selectDoc = await pool.query(`SELECT * FROM documentaciones ORDER BY documentacion_id DESC LIMIT 1`);
            const documentacion_id = selectDoc[0][0].documentacion_id;
            console.log('DOCUMENTACION REGISTRADO: ' + documentacion_id);

            console.log('CREACION EXITOSA');

        }
        

    } catch (error) {
        console.log("ERROR_CREATE_ITEMS");
    }
    
};

// *********************************** ACTUALIZAR REGISTRO ***********************************
const actualizarAplicacion = async (req,res) => {
    try {
        console.log('EN EN UPDATE DEL SERVER');
        console.log(req.params);
        const { id } = req.params;
        const {
            cliente,cli_cantidad_usuarios,
            apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_version,
            apl_critico,apl_licencia,apl_direccion,apl_codigo_fuente,apl_alcance,apl_fecha_registro,
            plataforma,lenguaje,len_version,framework,fra_version,
            servidor,ser_estatus,ser_direccion,ser_sistema,ser_sistema_version,
            ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            base_datos,base_estatus,base_direccion,base_manejador,
            base_tipo,base_tipo_ambiente,base_cantidad,base_servidor,
            doc_descripcion,doc_direccion,doc_tipo,
            man_frecuencia,man_horas_prom,man_horas_anuales
        } = req.body;

        console.log(cliente,cli_cantidad_usuarios,
            apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_version,
            apl_critico,apl_licencia,apl_direccion,apl_codigo_fuente,apl_alcance,apl_fecha_registro,
            plataforma,lenguaje,len_version,framework,fra_version,
            servidor,ser_estatus,ser_direccion,ser_sistema,ser_sistema_version,
            ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            base_datos,base_estatus,base_direccion,base_manejador,
            base_tipo,base_tipo_ambiente,base_cantidad,base_servidor,
            doc_descripcion,doc_direccion,doc_tipo,
            man_frecuencia,man_horas_prom,man_horas_anuales); 

        
        // ENCONTRAR EL ID DEL CLIENTE A PARTIR DE SU NOMBRE
        const buscarCliente = await pool.query(`SELECT cliente_id FROM clientes WHERE cliente = ?`, [cliente]);
        const cliente_id = buscarCliente[0][0].cliente_id;

        // ENCONTRAR EL ID DEL LENGUAJE ACTUAL
        const lenguajeActual = await pool.query(`SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?`, [lenguaje]);
        const lenguajeActual_id = buscarLenguaje[0][0].lenguaje_id;

        // ENCONTRAR EL ID DEL NUEVO LENGUAJE
        const lenguajeNuevo = await pool.query(`SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?`, [lenguaje]);
        const lenguajeNuevo_id = buscarLenguaje[0][0].lenguaje_id;

        const len = await pool.query(
            `UPDATE aplicacion_lenguaje SET aplicacion_id = ?, lenguaje_id = ? WHERE `, 
            [aplicacion_id,lenguajeNuevo_id]
        );

        const datos_len = await pool.query(
            `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`, 
            [aplicacion_id,lenguajeNuevo_id]
        );

        // ACTUALIZAR EL ID DEL CLIENTE EN APLICACIONES
        const [result] = await pool.query(
            `UPDATE aplicaciones  SET 
                apl_acronimo = ?,apl_nombre = ?,apl_descripcion = ?,apl_estatus = ?,apl_prioridad = ?,apl_critico = ?,
                apl_licencia = ?,apl_codigo_fuente = ?,apl_alcance = ?,cliente_id = ?,apl_fecha_registro = ?
            WHERE 
                aplicacion_id = ?`,
            [
                apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,
                apl_licencia,apl_codigo_fuente,apl_alcance,cliente_id,,apl_fecha_registro,id
            ]
        );
        console.log('ACTUALIZACION EXITOSA');
            
        //const [rows] = await pool.query("SELECT * FROM apps WHERE id = ?", [id]);
        //res.json(rows[0]);
        res.json('UPDATE EXITOSO');

    } catch (error) {
        console.log("ERROR_UPDATE_ITEMS");
        console.error(error);
    }
};

// *********************************** ACTUALIZAR POR CAMPO ESPECIFICO ***********************************
const actualizarCampo = async (req,res) => {
    try {
        const { id } = req.params;
        const { campo, valor } = req.body;

        console.log('Campo: ' + campo); 
        console.log('Valor: ' + valor);  
        console.log('ID: ' + id);  

        const [result] = await pool.query(
            `UPDATE 
                aplicaciones 
            SET 
                ${campo} = ?
            WHERE 
                aplicacion_id = ?`, 
            [valor,id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Name not found" });
            
        const [rows] = await pool.query("SELECT * FROM aplicaciones WHERE aplicacion_id = ?", [id]);
        res.json(rows[0]);

    } catch (error) {
        console.log("ERROR_UPDATE_ITEMS");
        console.error(error);
    }
};

// *********************************** ELIMINAR REGISTRO ***********************************
const eliminarAplicacion = async (req,res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM apps WHERE id = ?', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.log("ERROR_DELETE_ITEMS");
    }
};


module.exports = { 
    obtenerDatos, 
    obtenerDato, 
    crearAplicacion, 
    actualizarAplicacion, 
    eliminarAplicacion,
    obtenerPorBusqueda,
    obtenerPorCampo,
    obtenerPorGraficos,
    actualizarCampo };
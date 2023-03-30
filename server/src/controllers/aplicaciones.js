
const pool = require('../config');
const { matchedData } = require('express-validator');
const { verificarAplicacion, verificarCliente, verificarPlataforma, verificarLenguaje, verificarFramework, 
verificarRegion, verificarServidor, verificarBase, verificarMantenimiento, verificarDocumentacion } = require('../helpers/verificaciones')

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
on bases_datos.bas_servidor_id = servidores.servidor_id
inner join sistemas_operativos
on sistemas_operativos.sistema_id = servidores.servidor_id
inner join marcas
on marcas.marca_id = servidores.servidor_id`;

const responsables = `inner join responsables_funcionales
on aplicaciones.aplicacion_id = responsables_funcionales.aplicacion_id
inner join responsables
on responsables.responsable_id = responsables_funcionales.responsable_id
inner join telefonos
on responsables.responsable_id = telefonos.telefono_id
inner join gerencias
on responsables.res_gerencia_id = gerencias.gerencia_id`;

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

const select = `
SELECT 
    aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,
    apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
    apl_codigo_fuente,apl_licencia,apl_direccion,apl_cantidad_usuarios,
    res_nombre, res_apellido, res_indicador, res_cedula, res_cargo, telefono, gerencia, subgerencia,
    plataforma,lenguaje, framework, 
    base_datos,bas_estatus,bas_cantidad_usuarios, tipo, manejador,bas_tipo_ambiente,
    servidor, ser_estatus,ser_direccion, sistema,
    sistema_version, marca,mar_modelo,mar_serial,mar_cantidad_cpu,mar_velocidad_cpu,mar_memoria,
    cliente,region, localidad,
    man_frecuencia,man_horas_prom,man_horas_anuales, 
    doc_descripcion,doc_tipo, doc_direccion
FROM aplicaciones 
    ${plataforma}
    ${lenguaje}
    ${framework}
    ${base_datos}
    ${servidor}
    ${responsables}
    ${clientes}
    ${regiones}
    ${mantenimientos}
    ${documentaciones}
`;

// *********************************** OBTENER TODOS LOS DATOS ***********************************
const obtenerDatos = async (req,res) => {
    try {
        const query = `${select}ORDER BY aplicaciones.aplicacion_id ASC`;

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
            ${select}
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
                `${select}
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
                `${select}
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
                `${select}
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
            aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ?`, 
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
            doc_descripcion,doc_tipo, doc_direccion, apl_fecha_registro,

            funcional_nombre,funcional_apellido,funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
            funcional_gerencia,funcional_subgerencia,funcional_region,funcional_localidad,
            tecnico_nombre,tecnico_apellido,tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
            tecnico_gerencia,tecnico_subgerencia,tecnico_region,tecnico_localidad,
        } = req.body;

        let codigo, critico;
        {apl_codigo_fuente === 'SI' ? codigo = 1 : codigo = 0}
        {apl_critico === 'SI' ? critico = 1 : critico = 0}

        console.log(apl_acronimo,apl_nombre,apl_descripcion,apl_region,
            apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_licencia,apl_direccion,apl_cantidad_usuarios,
            plataforma,lenguaje, framework, 
            base_datos,base_estatus,base_cantidad_usuarios, base_tipo, base_manejador,base_tipo_ambiente,
            servidor, ser_estatus,ser_direccion, ser_sistema,ser_region,ser_localidad,
            ser_sistemas_version,ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            cliente, man_frecuencia,man_horas_prom,man_horas_anuales, 
            doc_descripcion,doc_tipo, doc_direccion, apl_fecha_registro,
            
            funcional_nombre,funcional_apellido,funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
            funcional_gerencia,funcional_subgerencia,funcional_region,funcional_localidad,

            tecnico_nombre,tecnico_apellido,tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
            tecnico_gerencia,tecnico_subgerencia,tecnico_region,tecnico_localidad,);

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
            const cliente_id = await verificarCliente(cliente);
            const region_id = await verificarRegion(apl_region);
            const aplicacion_id = await verificarAplicacion(
                apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,critico,apl_alcance,
                codigo,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,region_id,cliente_id
            );

            await verificarPlataforma(aplicacion_id, plataforma);          
            await verificarLenguaje(aplicacion_id, lenguaje);          
            await verificarFramework(aplicacion_id, framework);
            const servidor_id = await verificarServidor(servidor,ser_sistema,ser_sistemas_version,ser_marca,ser_modelo,ser_serial,
                ser_cantidad_cpu, ser_velocidad_cpu, ser_memoria, ser_region, ser_localidad
            );
            await verificarBase(aplicacion_id,base_datos,base_manejador,base_tipo,base_estatus,
                base_tipo_ambiente,base_cantidad_usuarios,servidor_id);

            await verificarMantenimiento(aplicacion_id,man_frecuencia,man_horas_prom,man_horas_anuales);          
            await verificarDocumentacion(aplicacion_id,doc_descripcion,doc_direccion,doc_tipo);

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
        const [result] = await pool.query('DELETE FROM aplicaciones WHERE aplicacion_id = ?', [id]);
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

const pool = require('../config');

const { verificarAplicacion, verificarPlataforma, 
        verificarLenguaje, verificarFramework, verificarServidor, 
        verificarBase, verificarMantenimiento, verificarDocumentacion, verificarResponsable } = require('../helpers/verificaciones');
const { selectSimple } = require('../helpers/consultas');


const query = `SELECT 
    aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_version,
    apl_alcance,apl_estatus,apl_prioridad,apl_direccion,region,apl_cliente,
    apl_codigo_fuente,apl_critico,apl_licencia,
    res_nombre, res_apellido,res_indicador,
    plataforma,lenguaje,base_datos,servidor,man_frecuencia
FROM aplicaciones
    inner join regiones
    on aplicaciones.apl_region_id = regiones.region_id
    JOIN aplicacion_plataforma
    ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
    JOIN plataformas
    ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
    inner join aplicacion_lenguaje
    on aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
    inner join lenguajes
    on aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
    inner join mantenimientos 
    on aplicaciones.aplicacion_id = mantenimientos.aplicacion_id

    inner join aplicacion_basedatos
    on aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
    inner join bases_datos
    on aplicacion_basedatos.base_datos_id = bases_datos.base_datos_id

    inner join aplicacion_servidor
    on aplicaciones.aplicacion_id = aplicacion_servidor.aplicacion_id
    inner join servidores
    on aplicacion_servidor.servidor_id = servidores.servidor_id

    inner join responsables_funcionales
    on aplicaciones.aplicacion_id = responsables_funcionales.aplicacion_id
    inner join responsables
    on responsables.responsable_id = responsables_funcionales.responsable_id
`;

// *********************************** LISTA DE LENGUAJES PARA SELECTS ***********************************
const obtenerLenguajes = async (req,res) => {
    try {
        const data = await pool.query(`SELECT lenguaje FROM lenguajes`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** LISTA DE FRAMEWORK PARA SELECTS ***********************************
const obtenerFrameworks = async (req,res) => {
    try {
        const data = await pool.query(`SELECT framework FROM frameworks`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** LISTA DE BASE DE DATOS PARA SELECTS ***********************************
const obtenerBaseDatos = async (req,res) => {
    try {
        const data = await pool.query(`SELECT base_datos FROM bases_datos`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** LISTA DE SERVIDORES PARA SELECTS ***********************************
const obtenerServidores = async (req,res) => {
    try {
        const data = await pool.query(`SELECT servidor FROM servidores`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** LISTA DE RESPONSABLES PARA SELECTS ***********************************
const obtenerResponsables = async (req,res) => {
    try {
        const data = await pool.query(`SELECT res_indicador FROM responsables`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};








// *********************************** LISTA DE RESPONSABLES PARA SELECTS ***********************************
const servidores = async (req,res) => {
    try {
        const data = await pool.query(`
            SELECT 
                servidor,ser_direccion,ser_estatus,sistema,sistema_version,marca,mar_modelo,mar_serial,
                mar_memoria mar_velocidad_cpu,mar_cantidad_cpu, mar_memoria, region, localidad
            FROM aplicaciones
                JOIN aplicacion_servidor ON aplicaciones.aplicacion_id = aplicacion_servidor.aplicacion_id
                JOIN servidores ON aplicacion_servidor.servidor_id = servidores.servidor_id
                JOIN sistemas_operativos ON sistemas_operativos.sistema_id = servidores.ser_sistema
                JOIN marcas ON marcas.marca_id = servidores.ser_marca
                JOIN regiones ON servidores.ser_region_id = regiones.region_id
                JOIN localidades ON servidores.ser_localidad_id = localidades.localidad_id
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [aplicacion_id]);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};












// *********************************** OBTENER CANTIDAD TOTAL ***********************************
const obtenerCantidadTotal = async (req,res) => {
    try {
        const data = await pool.query(`
            SELECT 
                COUNT(*)
            FROM aplicaciones
                JOIN aplicacion_plataforma
                ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                JOIN plataformas
                ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
                inner join aplicacion_lenguaje
                on aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                inner join lenguajes
                on aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
                inner join aplicacion_basedatos
                on aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                inner join bases_datos
                on aplicacion_basedatos.base_datos_id = bases_datos.base_datos_id
                join servidores
                on aplicaciones.aplicacion_id = servidores.servidor_id
                inner join regiones
                on aplicaciones.aplicacion_id = regiones.region_id
                inner join responsables_funcionales
                on aplicaciones.aplicacion_id = responsables_funcionales.aplicacion_id
                inner join responsables
                on responsables.responsable_id = responsables_funcionales.responsable_id
            `);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER TODOS LOS DATOS ***********************************
const obtenerDatos = async (req,res) => {
    try {
        const data = await pool.query(selectSimple);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER DATOS POR ID ***********************************
const obtenerDato = async (req,res) => {
    try {
        //const body = matchedData(req);
        console.log('ALO');
        const { id } = req.params;
        const app = await pool.query(`
            SELECT 
                apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,
                apl_critico,apl_alcance,apl_codigo_fuente,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,
                region,apl_cliente,apl_fecha_registro,telefono,gerencia,subgerencia,region,localidad,
                plataforma,lenguaje, framework, 
                base_datos,bas_estatus,bas_tipo_ambiente,bas_cantidad_usuarios,tipo,manejador,
                servidor,ser_estatus,ser_direccion,region,localidad,
                marca,mar_modelo,mar_serial,mar_cantidad_cpu,mar_velocidad_cpu,mar_memoria,sistema,sistema_version,
                man_frecuencia,man_horas_prom, man_horas_anuales, 
                doc_descripcion,doc_tipo, doc_direccion
            FROM aplicaciones
                JOIN regiones ON regiones.region_id = aplicaciones.aplicacion_id
                inner join localidades on regiones.region_id = localidades.localidad_id
                JOIN aplicacion_plataforma ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                JOIN plataformas ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
                inner join aplicacion_lenguaje on aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                inner join lenguajes on aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
                inner join aplicacion_framework on aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
                inner join frameworks on aplicacion_framework.framework_id = frameworks.framework_id
                inner join aplicacion_basedatos on aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                inner join bases_datos on aplicacion_basedatos.base_datos_id = bases_datos.base_datos_id
                inner join manejadores on bases_datos.base_datos_id = manejadores.manejador_id
                inner join tipos_bases on bases_datos.base_datos_id = tipo_base_id
                join servidores on bases_datos.bas_servidor_id = servidores.servidor_id
                inner join sistemas_operativos on sistemas_operativos.sistema_id = servidores.servidor_id
                inner join marcas on marcas.marca_id = servidores.servidor_id
                inner join responsables_funcionales on aplicaciones.aplicacion_id = responsables_funcionales.aplicacion_id
				inner join responsables on responsables.responsable_id = responsables_funcionales.responsable_id
                inner join telefonos on responsables.responsable_id = telefonos.telefono_id
				inner join gerencias on responsables.res_gerencia_id = gerencias.gerencia_id
                inner join mantenimientos on mantenimientos.aplicacion_id = aplicaciones.aplicacion_id
                inner join documentaciones on documentaciones.aplicacion_id = aplicaciones.aplicacion_id
            WHERE aplicaciones.aplicacion_id = ?`, [id]);

        // const responsable = await pool.query(`
        //     SELECT 
        //         res_nombre,res_apellido,res_indicador,res_cedula,res_cargo,telefono,gerencia,subgerencia,region,localidad
        //     FROM responsables
        //         JOIN regiones ON regiones.region_id = responsables.responsable_id
        //         JOIN localidades ON localidades.localidad_id = responsables.responsable_id
        //         JOIN gerencias ON gerencias.gerencia_id = responsables.responsable_id
        //         JOIN telefonos ON telefonos.telefono_id = responsables.responsable_id
        //     WHERE responsables.responsable_id = ?`, [id]);

        res.send(app[0][0]);
    } catch (error) {
        console.log("ERROR_CREATE_ITEMS");
    }
};

// *********************************** OBTENER LOS DATOS POR TERMINO DE BUSQUEDA ***********************************
const obtenerBusqueda = async (req,res) => {
    try {
        const { term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
            basedatos,servidor,critico,codigo,licencia,count,order,pagina } = req.body;
        const termino = '%' + term + '%';
        const offset = (pagina-1)*10;
        let data;

        console.log(term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
            basedatos,servidor,critico,codigo,licencia,count,order,pagina,offset);

        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
        
        if(region){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_estatus LIKE ? OR
                    apl_alcance LIKE ? OR
                    lenguaje LIKE ? OR
                    base_datos LIKE ? OR 
                    servidor LIKE ? OR 
                    plataforma LIKE ?)
                    AND region LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,termino,termino,termino,region,parseInt(count),offset]);
        }
        else if(alcance){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_estatus LIKE ? OR
                    region LIKE ? OR
                    lenguaje LIKE ? OR
                    base_datos LIKE ? OR 
                    servidor LIKE ? OR 
                    plataforma LIKE ?)
                    AND apl_alcance LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,termino,termino,termino,alcance,parseInt(count),offset]);
        }
        else if(mantenimiento){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_estatus LIKE ? OR
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    apl_licencia LIKE ? OR 
                    region LIKE ? OR
                    lenguaje LIKE ? OR
                    base_datos LIKE ? OR 
                    servidor LIKE ? OR 
                    plataforma LIKE ?)
                    AND man_frecuencia LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,termino,termino,termino,mantenimiento,parseInt(count),offset]);
        }
        else if(critico){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_estatus LIKE ? OR
                    apl_alcance LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    apl_licencia LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR
                    lenguaje LIKE ? OR
                    base_datos LIKE ? OR 
                    servidor LIKE ? OR 
                    plataforma LIKE ?)
                    AND apl_critico LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,termino,termino,termino,critico,parseInt(count),offset]);
        }
        else if(codigo){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_estatus LIKE ? OR
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_licencia LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR
                    lenguaje LIKE ? OR
                    base_datos LIKE ? OR 
                    servidor LIKE ? OR 
                    plataforma LIKE ?)
                    AND apl_codigo_fuente LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,termino,termino,termino,codigo,parseInt(count),offset]);
        }
        else if(licencia){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_estatus LIKE ? OR
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR
                    lenguaje LIKE ? OR
                    base_datos LIKE ? OR 
                    servidor LIKE ? OR 
                    plataforma LIKE ?)
                    AND apl_licencia LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,termino,termino,termino,licencia,parseInt(count),offset]);
        }
        else if(estatus){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    apl_licencia LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR
                    lenguaje LIKE ? OR
                    base_datos LIKE ? OR 
                    servidor LIKE ? OR 
                    plataforma LIKE ?)
                    AND apl_estatus LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,termino,termino,termino,estatus,parseInt(count),offset]);
        }
        else if(prioridad){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR 
                    apl_estatus LIKE ? OR 
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    apl_licencia LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR
                    lenguaje LIKE ? OR
                    base_datos LIKE ? OR 
                    servidor LIKE ? OR 
                    plataforma LIKE ?)
                    AND apl_prioridad LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?`,
                [termino,termino,termino,termino,termino,termino,termino,termino,termino,
                termino,termino,termino,termino,termino,prioridad,parseInt(count),offset]);
        }
        else if(plataforma){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR 
                    apl_prioridad LIKE ? OR 
                    apl_estatus LIKE ? OR 
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    apl_licencia LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR 
                    lenguaje LIKE ? OR 
                    base_datos LIKE ? OR 
                    servidor LIKE ? )
                    AND plataforma LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?`,
                [termino,termino,termino,termino,termino,termino,termino,termino,termino,
                termino,termino,termino,termino,termino,plataforma,parseInt(count),offset]);
        }
        else{
            data = await pool.query(
                `${query}
                WHERE 
                    (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_nombre LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_estatus LIKE ? OR 
                    apl_prioridad LIKE ? OR 
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    apl_licencia LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR 
                    lenguaje LIKE ? OR 
                    base_datos LIKE ? OR 
                    servidor LIKE ? OR 
                    plataforma LIKE ? ) ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?`, 
                [termino,termino,termino,termino,termino,termino,termino,termino,termino,
                termino,termino,termino,termino,termino,termino,parseInt(count),offset]);
        }

        // console.log(data[0][0]);
        if (data[0][0] === undefined){
            data = 'NULL'
            return res.json([]);
        }

        // if (data.affectedRows === 0)
        //     return res.status(404).json({ message: "Sin coincidencias" });

        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER LOS DATOS POR CAMPO ESPECIFICO ***********************************
const obtenerCampo = async (req,res) => {
    try { 
        const { term, campo, pagina } = req.body;
        const termino = '%' + term + '%';
        const offset = (pagina-1)*3;
        let data = null;

        console.log(term,termino,campo,pagina,offset);

        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
            
        if(campo === 'Plataforma'){
            data = await pool.query(
                `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
                FROM aplicaciones 
                JOIN aplicacion_plataforma ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                JOIN plataformas ON plataformas.plataforma_id = aplicacion_plataforma.plataforma_id
                WHERE ${campo} LIKE ? OR
                aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ? 
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 10 OFFSET ?;`, 
                [termino,termino,termino,termino,offset]
            );
        }
        else if(campo === 'Lenguaje'){
            data = await pool.query(
                `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
                FROM aplicaciones 
                JOIN aplicacion_lenguaje ON aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                JOIN lenguajes ON lenguajes.lenguaje_id = aplicacion_lenguaje.lenguaje_id
                WHERE ${campo} LIKE ? OR
                aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ? 
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 10 OFFSET ?;`, 
                [termino,termino,termino,termino,offset]
            );
        }
        else if(campo === 'Framework'){
            data = await pool.query(
                `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
                FROM aplicaciones 
                JOIN aplicacion_framework ON aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
                JOIN frameworks ON frameworks.framework_id = aplicacion_framework.framework_id
                WHERE ${campo} LIKE ? OR
                aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ? 
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 10 OFFSET ?;`, 
                [termino,termino,termino,termino,offset]
            );
        }
        else if(campo === 'Region'){
            data = await pool.query(
                `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
                FROM aplicaciones 
                JOIN regiones ON aplicaciones.aplicacion_id = regiones.region_id
                WHERE ${campo} LIKE ? OR
                aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ? 
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 10 OFFSET ?;`, 
                [termino,termino,termino,termino,offset]
            );
        }
        else{
            data = await pool.query(
                `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
                FROM aplicaciones 
                WHERE ${campo} LIKE ? OR
                aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ? LIMIT 3 OFFSET ?;`, 
                [termino,termino,termino,termino,offset]
            );
        }

        if (data.affectedRows === 0)
            return res.status(404).json({ message: "Sin coincidencias" });

        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};





// *********************************** CREAR REGISTRO ***********************************
const crearAplicacion = async (req,res) => {
    try {
        const {
            apl_acronimo,apl_nombre,apl_descripcion,apl_region,apl_cliente,
            apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_licencia,apl_direccion,apl_cantidad_usuarios,
            plataforma,lenguaje, framework, select_base, select_servidor,
            base_datos,base_estatus,base_cantidad_usuarios, base_tipo, base_manejador,base_tipo_ambiente,
            servidor, ser_estatus,ser_direccion, ser_sistema,ser_region,ser_localidad,base_servidor,
            ser_sistemas_version,ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            man_frecuencia,man_horas_prom,man_horas_anuales, 
            doc_descripcion,doc_tipo, doc_direccion, apl_fecha_registro,

            funcional_nombre,funcional_apellido,funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
            funcional_gerencia,funcional_subgerencia,funcional_region,funcional_localidad,
            tecnico_nombre,tecnico_apellido,tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
            tecnico_gerencia,tecnico_subgerencia,tecnico_region,tecnico_localidad,
        } = req.body;

        console.log(
            apl_acronimo,apl_nombre,apl_descripcion,apl_region,apl_cliente,
            apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_licencia,apl_direccion,apl_cantidad_usuarios,
            plataforma,lenguaje, framework, select_base, select_servidor,
            base_datos,base_estatus,base_cantidad_usuarios, base_tipo, base_manejador,base_tipo_ambiente,
            servidor, ser_estatus,ser_direccion, ser_sistema,ser_region,ser_localidad,base_servidor,
            ser_sistemas_version,ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            man_frecuencia,man_horas_prom,man_horas_anuales, 
            doc_descripcion,doc_tipo, doc_direccion, apl_fecha_registro,

            funcional_nombre,funcional_apellido,funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
            funcional_gerencia,funcional_subgerencia,funcional_region,funcional_localidad,
            tecnico_nombre,tecnico_apellido,tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
            tecnico_gerencia,tecnico_subgerencia,tecnico_region,tecnico_localidad,
        );

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
            const aplicacion_id = await verificarAplicacion(
                apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
                apl_codigo_fuente,apl_licencia,apl_version,apl_direccion,apl_cantidad_usuarios,apl_region,apl_cliente,
                apl_fecha_registro
            );

            await verificarPlataforma(aplicacion_id, plataforma);          
            await verificarLenguaje(aplicacion_id, lenguaje);          
            await verificarFramework(aplicacion_id, framework);

            await verificarServidor(aplicacion_id,select_servidor,servidor,ser_estatus,ser_direccion,ser_sistema,ser_sistemas_version,ser_marca,ser_modelo,ser_serial,
                ser_cantidad_cpu, ser_velocidad_cpu, ser_memoria, ser_region, ser_localidad);
            await verificarBase(aplicacion_id,select_base,base_datos,base_manejador,base_tipo,base_estatus,
                base_tipo_ambiente,base_cantidad_usuarios,base_servidor);

            await verificarResponsable('funcional',aplicacion_id,funcional_nombre,funcional_apellido,
                funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
                funcional_gerencia,funcional_subgerencia,funcional_region,funcional_localidad);    
            await verificarResponsable('tecnico',aplicacion_id,tecnico_nombre,tecnico_apellido,
                tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
                tecnico_gerencia,tecnico_subgerencia,tecnico_region,tecnico_localidad); 

            await verificarMantenimiento(aplicacion_id,man_frecuencia,man_horas_prom,man_horas_anuales);          
            await verificarDocumentacion(aplicacion_id,doc_descripcion,doc_direccion,doc_tipo);

            console.log('CREACION EXITOSA');
            res.send('CREACION EXITOSA');
        }
    } catch (error) {
        console.log("ERROR_CREATE_ITEMS");
    }
};

// *********************************** ACTUALIZAR REGISTRO ***********************************
const actualizarAplicacion = async (req,res) => {
    try {
        console.log('EN EN UPDATE DEL SERVER');
        const { id } = req.params;
        const {
            apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_version,apl_cliente,
            apl_cantidad_usuarios,apl_critico,apl_licencia,apl_direccion,apl_codigo_fuente,apl_alcance,
            apl_fecha_registro,plataforma,lenguaje,framework,fra_version,
            servidor,ser_estatus,ser_direccion,ser_sistema,ser_sistema_version,
            ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            base_datos,base_estatus,base_direccion,base_manejador,
            base_tipo,base_tipo_ambiente,base_cantidad,base_servidor,
            doc_descripcion,doc_direccion,doc_tipo,
            man_frecuencia,man_horas_prom,man_horas_anuales
        } = req.body;

        console.log(apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_version,apl_cliente,
            apl_cantidad_usuarios,apl_critico,apl_licencia,apl_direccion,apl_codigo_fuente,apl_alcance,
            apl_fecha_registro,plataforma,lenguaje,framework,fra_version,
            servidor,ser_estatus,ser_direccion,ser_sistema,ser_sistema_version,
            ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            base_datos,base_estatus,base_direccion,base_manejador,
            base_tipo,base_tipo_ambiente,base_cantidad,base_servidor,
            doc_descripcion,doc_direccion,doc_tipo,
            man_frecuencia,man_horas_prom,man_horas_anuales);

        // ACTUALIZAR EL ID DEL CLIENTE EN APLICACIONES
        // const [result] = await pool.query(
        //     `UPDATE aplicaciones  SET 
        //         apl_acronimo = ?,apl_nombre = ?,apl_descripcion = ?,apl_estatus = ?,apl_prioridad = ?,apl_critico = ?,
        //         apl_licencia = ?,apl_codigo_fuente = ?,apl_alcance = ?,cliente_id = ?,apl_fecha_registro = ?
        //     WHERE 
        //         aplicacion_id = ?`,
        //     [
        //         apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,
        //         apl_licencia,apl_codigo_fuente,apl_alcance,cliente_id,,apl_fecha_registro,id
        //     ]
        // );
        // console.log('ACTUALIZACION EXITOSA');
            
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
        let data = null;

        console.log('Campo: ' + campo); 
        console.log('Valor: ' + valor);  
        console.log('ID: ' + id);  

        if (campo === 'Plataforma') {
            data = await pool.query(
                `UPDATE aplicaciones
                JOIN aplicacion_plataforma
                ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                SET 
                    aplicacion_plataforma.plataforma_id = 
                    (SELECT plataforma_id FROM plataformas WHERE plataforma = ?)
                WHERE aplicaciones.aplicacion_id = ?;`, 
                [valor,id]
            );
        } 
        else if (campo === 'Lenguaje') {
            data = await pool.query(
                `UPDATE aplicaciones
                JOIN aplicacion_lenguaje
                ON aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                SET 
                    aplicacion_lenguaje.lenguaje_id = 
                    (SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?)
                WHERE aplicaciones.aplicacion_id = ?;`, 
                [valor,id]
            );
        } 
        else if (campo === 'Framework') {
            data = await pool.query(
                `UPDATE aplicaciones
                JOIN aplicacion_framework
                ON aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
                SET 
                    aplicacion_framework.framework_id = 
                    (SELECT framework_id FROM frameworks WHERE framework = ?)
                WHERE aplicaciones.aplicacion_id = ?;`, 
                [valor,id]
            );
        } 
        else if (campo === 'Region') {
            data = await pool.query(
                `UPDATE aplicaciones
                JOIN regiones
                ON aplicaciones.aplicacion_id = regiones.region_id
                SET 
                    apl_region_id = (SELECT region_id FROM regiones WHERE region = ?)
                WHERE aplicaciones.aplicacion_id = ?;`, 
                [valor,id]
            );
        } 
        else {
            data = await pool.query(
                `UPDATE aplicaciones 
                SET 
                    ${campo} = ?
                WHERE aplicacion_id = ?`, 
                [valor,id]
            );
        }

        if (data[0].affectedRows === 0)
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




module.exports = { 
    obtenerDatos, 
    obtenerDato, 
    crearAplicacion, 
    actualizarAplicacion, 
    eliminarAplicacion,
    obtenerBusqueda,
    obtenerCampo,
    obtenerPorGraficos,
    actualizarCampo,
    obtenerLenguajes,
    obtenerFrameworks,
    obtenerBaseDatos,
    obtenerServidores,
    obtenerCantidadTotal,
 };
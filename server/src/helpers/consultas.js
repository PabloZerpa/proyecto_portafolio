
const plataforma = `
    JOIN aplicacion_plataforma
    ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
    JOIN plataformas
    ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id`;

const lenguaje = `
    inner join aplicacion_lenguaje
    on aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
    inner join lenguajes
    on aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id`;

const framework = `
    inner join aplicacion_framework
    on aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
    inner join frameworks
    on aplicacion_framework.framework_id = frameworks.framework_id`;

const base_datos = `
    inner join aplicacion_basedatos
    on aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
    inner join bases_datos
    on aplicacion_basedatos.base_datos_id = bases_datos.base_datos_id
    inner join manejadores
    on bases_datos.base_datos_id = manejadores.manejador_id
    inner join tipos_bases
    on bases_datos.base_datos_id = tipo_base_id`;

const servidor = `
    join servidores
    on bases_datos.bas_servidor_id = servidores.servidor_id
    inner join sistemas_operativos
    on sistemas_operativos.sistema_id = servidores.servidor_id
    inner join marcas
    on marcas.marca_id = servidores.servidor_id`;

const responsables = `
    inner join responsables_funcionales
    on aplicaciones.aplicacion_id = responsables_funcionales.aplicacion_id
    inner join responsables
    on responsables.responsable_id = responsables_funcionales.responsable_id
    inner join telefonos
    on responsables.responsable_id = telefonos.telefono_id
    inner join gerencias
    on responsables.res_gerencia_id = gerencias.gerencia_id`;

const regiones = `
    inner join regiones
    on aplicaciones.aplicacion_id = regiones.region_id
    inner join localidades
    on regiones.region_id = localidades.localidad_id`;

const mantenimientos = `
    inner join mantenimientos
    on mantenimientos.aplicacion_id = aplicaciones.aplicacion_id`;

const documentaciones = `
    inner join documentaciones
    on documentaciones.aplicacion_id = aplicaciones.aplicacion_id`;
 
const selectSimple = `
    SELECT 
        aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_version,
        apl_estatus,apl_prioridad,apl_direccion,region,apl_cliente,
        res_nombre, res_apellido,res_indicador,
        plataforma,lenguaje,base_datos,servidor
    FROM aplicaciones 
        ${regiones}
        ${responsables}
        ${plataforma}
        ${lenguaje}
        ${base_datos}
        ${servidor}
    ORDER BY aplicaciones.aplicacion_id ASC
`;

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
        ${regiones}
        ${responsables}
        ${plataforma}
        ${lenguaje}
        ${framework}
        ${base_datos}
        ${servidor}
        ${mantenimientos}
        ${documentaciones}
    ORDER BY aplicaciones.aplicacion_id ASC
`;


module.exports = { select, selectSimple, servidor, base_datos, lenguaje, plataforma,
    framework, documentaciones, mantenimientos, regiones, responsables };
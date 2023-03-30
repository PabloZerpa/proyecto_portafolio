
export const campos = {
    apl_acronimo: '',
    apl_estatus: '',
    apl_nombre: '',
    apl_descripcion: '',
    apl_prioridad: '',
    apl_version: '',
    apl_critico: '',
    apl_alcance: '',
    apl_codigo_fuente: '',
    apl_licencia: '',
    apl_direccion: '',
    apl_region: '',
    apl_localidad: '',
    apl_fecha_registro: '',
    
    res_funcional_nombre: '',
    res_funcional_apellido: '',
    res_funcional_indicador: '',
    res_funcional_telefono: '',
    res_funcional_cedula: '',
    res_funcional_gerencia: '',
    res_funcional_subgerencia: '',
    res_funcional_cargo: '',
    res_funcional_region: '',
    res_funcional_localidad: '',
    
    res_tecnico_nombre: '',
    res_tecnico_apellido: '',
    res_tecnico_indicador: '',
    res_tecnico_telefono: '',
    res_tecnico_cedula: '',
    res_tecnico_gerencia: '',
    res_tecnico_subgerencia: '',
    res_tecnico_cargo: '',
    res_tecnico_region: '',
    res_tecnico_localidad: '',

    plataforma: '',
    lenguaje: '',
    len_version: '',
    framework: '',
    fra_version: '',

    base_datos: '',
    bas_estatus: '',
    bas_tipo: '',
    bas_manejador: '',
    bas_manejador_version: '',
    bas_tipo_ambiente: '',
    bas_servidor: '',
    bas_cantidad: '',
    
    servidor: '',
    ser_estatus: '',
    ser_direccion: '',
    ser_sistema: '',
    ser_sistema_version: '',
    ser_marca: '',
    ser_modelo: '',
    ser_serial: '',
    ser_cantidad_cpu: '',
    ser_velocidad_cpu: '',
    ser_memoria: '',
    ser_region: '',
    ser_localidad: '',

    cliente: '',
    
    doc_descripcion: '',
    doc_direccion: '',
    doc_tipo: '',

    man_frecuencia: '',
    man_horas_prom: '',
    man_horas_anuales: '',
    
    fal_numero: '',
    fal_clase: '',
    fal_descripcion: '',
    fal_solucion: '',
    fal_impacto: '',

    sol_numero: '',
    sol_estatus: '',
    sol_tipo: '',
    sol_elemento: '',
    sol_descripcion: '',
    sol_aprobador: '',
    sol_solicitante: '',

    usu_indicador: '',
    usu_password: '',
    usu_rol: '',
    usu_gerencia: '',
    usu_subgerencia: ''
}

export const opcionEstatus = ['TODAS', 'DESARROLLO', 'MANTENIMIENTO', 'DESINCORPORADA', 'ESTABILIZACION',
    'SIN USO', 'VISAULIZACION', 'PRUEBA'];

export const opcionRegion = ['TODAS', 'CENTRO', 'CENTRO SUR', 'CENTRO OCCIDENTE','ORIENTE NORTE', 
'ORIENTE SUR', 'OCCIDENTE','FAJA','METROPOLITANA',];

export const opcionLocalidad = ['TODAS', '1', '2', '3','4', '5'];

export const opcionCount = [10,20,30,40,50];

export const opcionPlataforma = ['TODAS', 'WEB', 'ESCRITORIO', 'MOVIL', 'CLIENTE-SERVIDOR', 'STAND ALONE', 'MINI', 'MAINFRAME'];

export const opcionAlcance = ['TODAS', 'LOCAL', 'REGIONAL', 'CORPORATIVO'];

export const opcionMantenimiento = ['TODAS', 'DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL',
    'BIMENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL', 'NO APLICA'];


export const columnasUser = ['Ver','ID','Acronimo','Nombre','Descripcion','Version','Estatus','Prioridad','Critica','Alcance','Codigo Fuente','Licencia','Direccion','N° Usuarios',
'Nombre','Apellido','Indicador','Cedula','Cargo','Telefono','Gerencia','Subgerencia',
'Plataforma','Lenguaje','Framework','Base de datos','BD Estatus','DB Cantidad','BD Tipo','Manejador','Ambiente','Servidor','Estatus','Direccion','OS','OS_Version','Marca',
'Modelo','Serial','Cantidad CPU','Velocidad CPU','Memoria','Cliente','Region','Localidad','Mantenimiento','Horas Prom','Horas Año','Documentacion','Tipo Docu','Direccion'];

export const columnasAdmin = ['Ver','Editar','ID','Acronimo','Nombre','Descripcion','Version','Estatus','Prioridad','Critica','Alcance','Codigo Fuente','Licencia','Direccion','N° Usuarios',
'Nombre','Apellido','Indicador','Cedula','Cargo','Telefono','Gerencia','Subgerencia',
'Plataforma','Lenguaje','Framework','Base de datos','BD Estatus','DB Cantidad','BD Tipo','Manejador','Ambiente','Servidor','Estatus','Direccion','OS','OS_Version','Marca',
'Modelo','Serial','Cantidad CPU','Velocidad CPU','Memoria','Cliente','Region','Localidad','Mantenimiento','Horas Prom','Horas Año','Documentacion','Tipo Docu','Direccion'];

/*
select aplicaciones.apl_id,aplicaciones.acronimo,aplicaciones.nombre,aplicaciones.estatus,
		aplicaciones.prioridad,aplicaciones.critico,aplicaciones.alcance,aplicaciones.direccion,
		plataformas.plataforma, lenguajes.lenguaje, frameworks.framework, bases_datos.nombre, 
        bases_datos.estatus, tipos_bases.tipo, manejadores.manejador, servidores.nombre, servidores.estatus, 
        servidores.direccion, sistemas_operativos.sistema, marcas.modelo, ubicaciones.ubicacion_id, clientes.nombre, 
        clientes.cantidad_usuarios, mantenimientos.frecuencia, mantenimientos.horas_prom, mantenimientos.horas_anuales, 
        documentaciones.descripcion, documentaciones.tipo, documentaciones.direccion from aplicaciones 
        
inner join apl_plataforma
on aplicaciones.apl_id = apl_plataforma.apl_id
inner join plataformas
on apl_plataforma.plataforma_id = plataformas.plataforma_id

inner join apl_lenguaje
on aplicaciones.apl_id = apl_lenguaje.apl_id
inner join lenguajes
on apl_lenguaje.lenguaje_id = lenguajes.lenguaje_id

inner join apl_framework
on aplicaciones.apl_id = apl_framework.apl_id
inner join frameworks
on apl_framework.framework_id = frameworks.framework_id

inner join clientes
on aplicaciones.apl_id = clientes.cliente_id

inner join mantenimientos
on mantenimientos.apl_id = aplicaciones.apl_id

inner join documentaciones
on documentaciones.apl_id = aplicaciones.apl_id

inner join apl_basedatos
on aplicaciones.apl_id = apl_basedatos.apl_id
inner join bases_datos
on apl_basedatos.bas_id = bases_datos.bas_id
inner join manejadores
on bases_datos.bas_id = manejadores.manejador_id
inner join tipos_bases
on bases_datos.bas_id = tipo_base_id

inner join servidores
on bases_datos.ser_id = servidores.ser_id
inner join sistemas_operativos
on sistemas_operativos.sistema_id = servidores.ser_id
inner join marcas
on marcas.marca_id = servidores.ser_id

inner join ubicaciones
on ubicaciones.ubicacion_id = servidores.ser_id

order by aplicaciones.apl_id asc;


==============================================================================================================


select aplicaciones.apl_id,aplicaciones.acronimo,aplicaciones.nombre,aplicaciones.estatus,aplicaciones.descripcion,
		aplicaciones.prioridad,aplicaciones.version,aplicaciones.alcance,aplicaciones.direccion, ubicaciones.ubicacion_id, 
        clientes.nombre, clientes.cantidad_usuarios from aplicaciones
inner join clientes
on aplicaciones.apl_id = clientes.cliente_id
inner join ubicaciones
on ubicaciones.ubicacion_id = aplicaciones.apl_id

order by aplicaciones.apl_id asc;



==============================================================================================================





select aplicaciones.apl_id,aplicaciones.codigo_fuente,aplicaciones.licencia,
		plataformas.plataforma, lenguajes.lenguaje, frameworks.framework, bases_datos.nombre, 
        bases_datos.estatus, tipos_bases.tipo, manejadores.manejador, servidores.nombre, servidores.estatus, 
        servidores.direccion, sistemas_operativos.sistema, sistemas_operativos.version, marcas.marca,marcas.modelo,marcas.serial,marcas.memoria,
        ubicaciones.ubicacion_id, mantenimientos.frecuencia, mantenimientos.horas_prom, mantenimientos.horas_anuales from aplicaciones
        
inner join apl_plataforma
on aplicaciones.apl_id = apl_plataforma.apl_id
inner join plataformas
on apl_plataforma.plataforma_id = plataformas.plataforma_id

inner join apl_lenguaje
on aplicaciones.apl_id = apl_lenguaje.apl_id
inner join lenguajes
on apl_lenguaje.lenguaje_id = lenguajes.lenguaje_id

inner join apl_framework
on aplicaciones.apl_id = apl_framework.apl_id
inner join frameworks
on apl_framework.framework_id = frameworks.framework_id

inner join mantenimientos
on mantenimientos.apl_id = aplicaciones.apl_id

inner join apl_basedatos
on aplicaciones.apl_id = apl_basedatos.apl_id
inner join bases_datos
on apl_basedatos.bas_id = bases_datos.bas_id
inner join manejadores
on bases_datos.bas_id = manejadores.manejador_id
inner join tipos_bases
on bases_datos.bas_id = tipo_base_id

inner join servidores
on bases_datos.ser_id = servidores.ser_id
inner join sistemas_operativos
on sistemas_operativos.sistema_id = servidores.ser_id
inner join marcas
on marcas.marca_id = servidores.ser_id

inner join ubicaciones
on ubicaciones.ubicacion_id = servidores.ser_id

order by aplicaciones.apl_id asc;
*/
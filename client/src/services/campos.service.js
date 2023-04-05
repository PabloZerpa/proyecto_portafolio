
// ====================== CAMPOS ======================
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
    apl_fecha_registro: '',
    
    res_nombre: '',
    res_apellido: '',
    res_indicador: '',
    res_telefono: '',
    res_cedula: '',
    res_gerencia: '',
    res_subgerencia: '',
    res_cargo: '',
    res_region: '',
    res_localidad: '',

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


// ====================== OPCIONES ======================
export const opcionEstatus = ['TODAS', 'DESARROLLO', 'MANTENIMIENTO', 'DESINCORPORADA', 'ESTABILIZACION',
    'SIN USO', 'VISAULIZACION', 'PRUEBA'];

export const opcionRegion = ['TODAS', 'CENTRO', 'CENTRO SUR', 'CENTRO OCCIDENTE','ORIENTE NORTE', 
'ORIENTE SUR', 'OCCIDENTE','FAJA','METROPOLITANA',];

export const opcionLocalidad = ['TODAS'];
export const localidadCentro = ['APURE', 'CALABOZO', 'GUACARA', 'MARACAY','SAN FELIPE', 'VALENCIA'];
export const localidadCentroSur = ['SAN CARLOS', 'MINAS DE RIECITO', 'VALLE DE LA PASCUA'];
export const localidadCentroOccidente = [ 'MIRANDA', 'PUERTO AYACUCHO', 'VARGAS'];
export const localidadOrienteNorte = ['ANACO', 'SAN ORQUE', 'BARCELONA', 'CARUPANO','CUMANA', 'NUEVA ESPARTA'];
export const localidadOrienteSur = ['MATURIN', 'MORICHAL', 'QUIRIQUIRE', 'TEMBLADOR'];
export const localidadOccidente = ['ALTAGRACIA', 'BARINAS', 'BARQUISIMETO', 'CIUDAD OJEDA','INTERNACIONAL', 'MARACAIBO', 'MERIDA'];
export const localidadFaja = ['AYACUCHO', 'SAN TOME', 'CARABOBO', 'PUERTO ORDAZ'];
export const localidadMetropolitana = ['CARACAS', 'CHARALLAVE', 'GUARICO', 'INTERNACIONAL','LOS TEQUES'];

export const opcionGerencia = ['INFORMATICA', 'AUTOMATIZACION', 'TELECOMUNICACIONES'];
export const opcionSubgerencia = ['I+D', 'SERVIDORES', 'RRHH'];

export const opcionCount = [10,20,30,40,50];

export const opcionPlataforma = ['TODAS', 'WEB', 'ESCRITORIO', 'MOVIL', 'CLIENTE-SERVIDOR', 'STAND ALONE', 'MINI', 'MAINFRAME'];

export const opcionAlcance = ['TODAS', 'LOCAL', 'REGIONAL', 'CORPORATIVO'];

export const opcionMantenimiento = ['TODAS', 'DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL',
    'BIMENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL', 'NO APLICA'];




// ====================== COLUMNAS PARA LA TABLA  ======================
export const columnasUserSimple = ['Ver','ID','Acronimo','Nombre','Version','Estatus','Prioridad','Direccion',
    'Region','Cliente','Nombre','Apellido','Indicador','Plataforma','Lenguaje','Base de datos','Servidor'];
    
export const columnasAdminSimple = ['Ver','Editar','ID','Acronimo','Nombre','Version','Estatus','Prioridad','Direccion',
    'Region','Cliente','Nombre','Apellido','Indicador','Plataforma','Lenguaje','Base de datos','Servidor'];


export const columnasUser = ['Ver','ID','Acronimo','Nombre','Descripcion','Version','Estatus','Prioridad','Critica','Alcance','Codigo Fuente','Licencia','Direccion','N° Usuarios',
'Nombre','Apellido','Indicador','Cedula','Cargo','Telefono','Gerencia','Subgerencia',
'Plataforma','Lenguaje','Framework','Base de datos','BD Estatus','DB Cantidad','BD Tipo','Manejador','Ambiente','Servidor','Estatus','Direccion','OS','OS_Version','Marca',
'Modelo','Serial','Cantidad CPU','Velocidad CPU','Memoria','Cliente','Region','Localidad','Mantenimiento','Horas Prom','Horas Año','Documentacion','Tipo Docu','Direccion'];

export const columnasAdmin = ['Ver','Editar','ID','Acronimo','Nombre','Descripcion','Version','Estatus','Prioridad','Critica','Alcance','Codigo Fuente','Licencia','Direccion','N° Usuarios',
'Nombre','Apellido','Indicador','Cedula','Cargo','Telefono','Gerencia','Subgerencia',
'Plataforma','Lenguaje','Framework','Base de datos','BD Estatus','DB Cantidad','BD Tipo','Manejador','Ambiente','Servidor','Estatus','Direccion','OS','OS_Version','Marca',
'Modelo','Serial','Cantidad CPU','Velocidad CPU','Memoria','Cliente','Region','Localidad','Mantenimiento','Horas Prom','Horas Año','Documentacion','Tipo Docu','Direccion'];



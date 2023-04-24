
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
    apl_direccion: '',
    apl_region: '',
    apl_fecha_registro: '',
    
    res_nombre: '',
    res_apellido: '',
    res_indicador: '',
    res_telefono: '',
    res_cedula: '',
    res_gerencia: '',
    res_cargo: '',
    res_region: '',
    res_localidad: '',

    plataforma: '',
    lenguaje: '',
    lenguaje2: '',
    lenguaje3: '',
    len_version: '',
    framework: '',
    framework2: '',
    framework3: '',

    select_base: '',
    base_datos: '',
    bas_estatus: '',
    bas_tipo: '',
    bas_manejador: '',
    bas_manejador_version: '',
    bas_tipo_ambiente: '',
    bas_servidor: '',
    bas_cantidad: '',
    
    select_servidor: '',
    servidor: '',
    ser_estatus: '',
    ser_direccion: '',
    ser_sistema: '',
    ser_sistema_version: '',
    ser_modelo: '',
    ser_marca: '',
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

}


// ====================== OPCIONES ======================

export const opcionRol = ['SELECCIONE','admin','superuser', 'user'];

export const opcionEstatus = ['SELECCIONE','TODAS','DESARROLLO', 'MANTENIMIENTO', 'DESINCORPORADA', 'ESTABILIZACION',
    'SIN USO', 'VISUALIZACION', 'PRUEBA'];

export const selectEstatus = ['SELECCIONE','DESARROLLO', 'MANTENIMIENTO', 'DESINCORPORADA', 'ESTABILIZACION',
    'SIN USO', 'VISUALIZACION', 'PRUEBA'];

export const opcionPrioridad = ['ALTA', 'MEDIA', 'BAJA'];

export const opcionRegion = ['SELECCIONE','TODAS','CENTRO', 'CENTRO SUR', 'CENTRO OCCIDENTE','ORIENTE NORTE', 
'ORIENTE SUR', 'OCCIDENTE','FAJA','METROPOLITANA',];

export const selectRegion = ['SELECCIONE','ORIENTE SUR', 'ORIENTE NORTE','CENTRO', 'CENTRO SUR', 
'CENTRO OCCIDENTE', 'OCCIDENTE','FAJA','METROPOLITANA',];

export const opcionLocalidad = ['SELECCIONE'];
export const localidadCentro = 
['SELECCIONE','ACARIGUA', 'APURE', 'BORBURATA', 'CAGUA','CALABOZO', 'CHIVACOA',
'EL PALITO','GUACARA', 'LA QUIZANDA', 'LA VICTORIA', 'MARACAY','MARIARA', 'MINAS DE RIECITO',
'MORON','NAGUANAGUA', 'PALO NEGRO', 'POR DETERMINAR', 'PTO CABELLO','SAN CARLOS', 'SAN FELIPE',
'SAN JUAN DE LOS MORROS','SAN MATEO', 'SAN RAFAEL DE ONOTO', 'TINACO', 'TINAQUILLO','TOCUYITO', 'TODAS', 'TUACAS',
'VALENCIA', 'VALLE DE LA PASCUA', 'VILLA DE CURA','YAGUA'];

export const localidadCentroSur = ['SELECCIONE','BARINAS'];

export const localidadCentroOccidente = ['SELECCIONE','MIRANDA', 'PUERTO AYACUCHO', 'VARGAS'];

export const localidadOrienteNorte = ['SELECCIONE','ANACO', 'SAN ORQUE', 'BARCELONA', 'CARUPANO','CUMANA', 'NUEVA ESPARTA'];

export const localidadOrienteSur = ['SELECCIONE','MATURIN', 'MORICHAL', 'QUIRIQUIRE', 'TEMBLADOR'];

export const localidadOccidente = ['SELECCIONE','ALTAGRACIA', 'BARINAS', 'BARQUISIMETO', 'CIUDAD OJEDA','INTERNACIONAL', 
'MARACAIBO', 'MERIDA'];

export const localidadFaja = 
['SELECCIONE','AYACUCHO','PETRORITUPANO','OBC','PETROPIAR', 'SAN TOME', 'CARABOBO','MORICHAL', 'PUERTO ORDAZ','SINOVENSA',
'JUNIN CABRUTICA','PETROCEDEÑO', 'STM'];

export const localidadMetropolitana = 
['CANTINAS','CARACAS', 'CARENERO','CHARALLAVE','GUARICO', 'GUATIRE', 'HIGUEROTE', 'INTERNACIONAL','LOS TEQUES','MAIQUETIA',
'MIRANDA', 'PUERTO AYACUCHO','TODAS','VARGAS'];

export const opcionGerencia = ['SELECCIONE','AIT', 'SERVIDORES', 'TELECOMUNICACIONES'];

export const opcionCargo = ['SELECCIONE','ANALISTA', 'ESPECIALISTA', 'GERENTE'];

export const opcionCount = ['SELECCIONE',10,20,30,40,50];

export const opcionPlataforma = ['SELECCIONE','TODAS', 'WEB', 'ESCRITORIO', 'MOVIL', 'CLIENTE-SERVIDOR', 'STAND ALONE', 'MINI', 'MAINFRAME'];
export const selectPlataforma = ['SELECCIONE','WEB', 'ESCRITORIO', 'MOVIL', 'CLIENTE-SERVIDOR', 'STAND ALONE', 'MINI', 'MAINFRAME'];

export const opcionAlcance = ['SELECCIONE','TODAS', 'LOCAL', 'REGIONAL', 'CORPORATIVO'];
export const selectAlcance = ['SELECCIONE','LOCAL', 'REGIONAL', 'CORPORATIVO'];

export const opcionSiNo = ['SI', 'NO'];

export const opcionMantenimiento = ['SELECCIONE','TODAS','DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL',
    'BIMENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL', 'NO APLICA'];
export const selectMantenimiento = ['SELECCIONE','DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL',
    'BIMENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL', 'NO APLICA'];

export const opcionManejadores = ['SELECCIONE','TODAS','MYSQL', 'POSTGRESS', 'MARIADB','ORACLE','MONGODB'];

export const opcionTipoBD = ['SELECCIONE','TODAS','RELACIONAL', 'NO RELACIONAL', 'DISTRIBUIDA','OBJETO'];

export const selectTipoAmbiente = ['SELECCIONE','TODAS','CALIDAD', 'CONTINGENCIA', 'DESARROLLO', 'DESINCORPORADO', 
'MANTENIMIENTO', 'PRODUCCION', 'POR DETERMINAR'];

export const opcionLenguaje = ['SELECCIONE','PHP', 'JAVASCRIPT', 'JAVA', 'C++', 'C#','VISUAL BASIC',
    'TYPESCRIPT','PYTHON','GO','RUST'];

export const frameworkPhp = ['SELECCIONE','LARAVEL', 'CODEIGNITER', 'SIMPHONY'];
export const frameworkJS = ['SELECCIONE','REACT', 'VUE', 'ANGULAR','BOOTSTRAP','MATERIAL DESIGN'];
export const frameworkJAVA = ['SELECCIONE','SPRING'];
export const frameworkCPP = ['SELECCIONE','QT'];
export const frameworkCS = ['SELECCIONE','BLAZE'];
export const frameworkPY = ['SELECCIONE','TENSERFLOW','NUMPHY','FLASK'];

export const opcionBasedatos = ['SELECCIONE','PRIMERA DATABASE', 'SEGUNDA DATABASE', 'TERCERA DATABASE'];

export const opcionServidor = ['SELECCIONE','SERVIDOR 1', 'SERVIDOR 2', 'SERVIDOR 3'];



// ====================== COLUMNAS PARA LA TABLA  ======================
export const columnasUserSimple = ['Ver','ID','Acronimo','Nombre','Version','Alcance','Estatus','Prioridad','Direccion',
    'Region','Plataforma','Critico','Codigo','Mantenimiento'];
    
export const columnasAdminSimple = ['Ver','Editar','ID','Acronimo','Nombre','Version','Alcance','Estatus','Prioridad','Direccion',
'Region','Plataforma','Critico','Codigo','Mantenimiento'];
 



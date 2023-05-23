

const generarColumna = (titulo,key,width) => {
    return{
        name: titulo,
        selector: row => row[key],
        sortable: true,
        left: true,
        width: width,
    }
}

export const columnasModalBD = [
    generarColumna('ID','base_datos_id',null),
    generarColumna('Nombre','base_datos',null),
    generarColumna('Estatus','bas_estatus',null),
    generarColumna('Tipo','tipo',null),
    generarColumna('Manejador','manejador',null),
    generarColumna('N° de Usuarios','bas_cantidad_usuarios',null),
    generarColumna('Ambiente','tipo_ambiente',null),
];


export const columnasModalServidor = [
    generarColumna('ID','servidor_id',null),
    generarColumna('Nombre','servidor',null),
    generarColumna('Estatus','ser_estatus',null),
    generarColumna('Direccion','ser_direccion',null),
    generarColumna('OS','sistema',null),
    generarColumna('Modelo','modelo',null),
    generarColumna('Marca','marca',null),
    generarColumna('Region','region',null),
    generarColumna('Localidad','localidad',null),
    generarColumna('Ultima Actualizacion','ser_fecha_actualizacion',null),
    generarColumna('Por','indicador',null),
];


export const columnasModalLenguaje = [
    generarColumna('Lenguaje ID','lenguaje_id','150px'),
    generarColumna('Lenguaje','lenguaje','150px'),
];


export const columnasModalCustodio = [
    {
        name: 'ID',
        selector: row => row.custodio_id,
        sortable: true,
        width: '60px',
        left: true,
    },
    {
        name: 'Indicador',
        selector: row => row.cus_indicador,
        sortable: true,
        width: '120px',
        left: true
    },
    {
        name: 'Nombre',
        selector: row => row.cus_nombre,
        sortable: true,
        width: '120px',
        left: true
    },
    {
        name: 'Apellido',
        selector: row => row.cus_apellido,
        sortable: true,
        width: '120px',
        left: true
    },
    {
        name: 'Cedula',
        selector: row => row.cus_cedula,
        sortable: true,
        width: '100px',
        left: true
    },
    {
        name: 'Cargo',
        selector: row => row.cargo,
        sortable: true,
        width: '120px',
        left: true
    },
    {
        name: 'Gerencia',
        selector: row => row.gerencia,
        sortable: true,
        left: true
    },
];
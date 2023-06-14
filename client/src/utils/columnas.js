

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
    generarColumna('ID','base_datos_id','60px'),
    generarColumna('Nombre','base_datos','200px'),
    generarColumna('Estatus','estatus','150px'),
    generarColumna('Tipo','tipo','150px'),
    generarColumna('Manejador','manejador','150px'),
    generarColumna('N° Usuarios','base_cantidad_usuarios','150px'),
    generarColumna('Ambiente','ambiente','150px'),
];


export const columnasModalServidor = [
    generarColumna('ID','servidor_id','60px'),
    generarColumna('Nombre','servidor','200px'),
    generarColumna('Estatus','estatus','150px'),
    generarColumna('Direccion','ser_direccion','200px'),
    generarColumna('OS','sistema','150px'),
    generarColumna('Modelo','modelo','150px'),
    generarColumna('Marca','marca','150px'),
    generarColumna('Region','region','150px'),
    generarColumna('Localidad','localidad','150px'),
    generarColumna('Ultima Actualizacion','ser_fecha_actualizacion','150px'),
    generarColumna('Por','indicador','150px'),
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
import { Link } from "react-router-dom";
import { 
  FaHome, 
  FaRegListAlt, 
  FaServer, 
  FaCode, 
  FaDatabase, 
  FaFileAlt, 
  FaEnvelopeOpenText, 
  FaEdit, 
  FaEye } from "react-icons/fa";

// -------------------- FUNCION PARA GENERAR LAS OPCIONES DE LA BARRA LATERAL --------------------
function opciones(label, key, icon, children, type) {
    return { key, icon, children, label, type };
}

export const opcionesNav = [
    opciones(<Link to="/dashboard" >Inicio</Link>, 'sub1', <FaHome />),
    opciones('Aplicaciones', 'sub2', <FaCode />, [
        opciones(<Link to="/aplicaciones" >Actualizacion</Link>),
        opciones(<Link to="/dashboard" >Software</Link>),
        opciones(<Link to="/dashboard" >Documentos</Link>),
        opciones(<Link to="/dashboard" >Interfaces</Link>),
    ]),
    opciones('Administracion', 'sub3', <FaRegListAlt />, [
        opciones(<Link to="/dashboard" >Opcion</Link>, '3'),
        opciones(<Link to="/dashboard" >Opcion</Link>, '4'),
    ]),
    opciones('Base de datos', 'sub4', <FaDatabase />, [
        opciones(<Link to="/" >Opcion</Link>, '5'),
        opciones(<Link to="/" >Opcion</Link>, '6'),
    ]),
    opciones('Servidores', 'sub5', <FaServer />, [
        opciones(<Link to="/dashboard" >Opcion</Link>, '7'),
        opciones(<Link to="/dashboard" >Opcion</Link>, '8'),
    ]),
    opciones(<Link to="/dashboard" >Documentacion</Link>, 'sub6', <FaFileAlt />),
    opciones(<Link to="/dashboard" >Solicitudes</Link>, 'sub7', <FaEnvelopeOpenText />),
];


// -------------------- FUNCION PARA GENERAR LAS COLUMNAS DE LA BARRA LATERAL --------------------

function estructura(title, dataIndex) {
  return { 
    title: title, 
    dataIndex: dataIndex, 
    key: dataIndex,
  };
}

function operaciones(title, dataIndex, fixed, width){
  return{
    title: title,
    key: dataIndex,
    fixed: fixed,
    width: width,
    render: () => 
      <>
        <Link to="/aplicaciones" style={{margin: '0 10px 0 10px', fontSize: '18px'}} ><FaEye /></Link>
        <Link to="/aplicaciones" style={{margin: '0 10px 0 10px', fontSize: '18px'}} ><FaEdit /></Link>
      </>
  }
}

export const columnas = [

  operaciones('Operaciones', 'operaciones', 'left', 100),
  estructura('ID', 'id'),
  estructura('Acronimo', 'acronimo'),
  estructura('Nombre', 'nombre'),
  estructura('Region', 'region'),
  estructura('Responsable', 'responsable'),
  estructura('Prioridad', 'prioridad'),
  estructura('Ultima Actualizacion', 'ultima'),

];
  
export const datosTabla = [
  {
    key: '1',
    id: 100,
    acronimo: 'Acronimo de la aplicacion',
    nombre: 'Nombre de la aplicacion',
    region: 'Oriente Sur',
    responsable: 'Nombre del responsable',
    prioridad: 'Alta',
    ultima: '5/11/2022',
  },
  {
    key: '2',
    id: 200,
    acronimo: 'Acronimo de la aplicacion',
    nombre: 'Nombre de la aplicacion',
    region: 'Oriente Norte',
    responsable: 'Nombre del responsable',
    prioridad: 'Media',
    ultima: '12/08/2022',
  },
  {
    key: '3',
    id: 300,
    acronimo: 'Acronimo de la aplicacion',
    nombre: 'Nombre de la aplicacion',
    region: 'Centro',
    responsable: 'Nombre del responsable',
    prioridad: 'Baja',
    ultima: '27/03/2021',
  },
  {
    key: '4',
    id: 400,
    acronimo: 'Acronimo de la aplicacion',
    nombre: 'Nombre de la aplicacion',
    region: 'Corporativo',
    responsable: 'Nombre del responsable',
    prioridad: 'Media',
    ultima: '03/10/2020',
  },
  {
    key: '5',
    id: 500,
    acronimo: 'Acronimo de la aplicacion',
    nombre: 'Nombre de la aplicacion',
    region: 'Faja',
    responsable: 'Nombre del responsable',
    prioridad: 'Baja',
    ultima: '16/04/2019',
  },
];
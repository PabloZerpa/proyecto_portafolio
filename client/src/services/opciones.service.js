import { Link } from "react-router-dom";
import { FaHome, FaRegListAlt, FaServer, FaCode, FaDatabase, FaFileAlt, FaEnvelopeOpenText } from "react-icons/fa";

// -------------------- FUNCION PARA GENERAR LAS OPCIONES DE LA BARRA LATERAL --------------------
function opciones(label, key, icon, children, type) {
    return { key, icon, children, label, type };
}

export const barraItems = [
    opciones(<Link className="linkNav" to="/dashboard" >Inicio</Link>, 'sub1', <FaHome />),
    opciones('Aplicaciones', 'sub2', <FaCode />, [
        opciones(<Link className="linkNav" to="/" >Opcion</Link>, '1'),
        opciones(<Link className="linkNav" to="/" >Opcion</Link>, '2'),
    ]),
    opciones('Administracion', 'sub3', <FaRegListAlt />, [
        opciones(<Link className="linkNav" to="/" >Opcion</Link>, '3'),
        opciones(<Link className="linkNav" to="/" >Opcion</Link>, '4'),
    ]),
    opciones('Base de datos', 'sub4', <FaDatabase />, [
        opciones(<Link className="linkNav" to="/" >Opcion</Link>, '5'),
        opciones(<Link className="linkNav" to="/" >Opcion</Link>, '6'),
    ]),
    opciones('Servidores', 'sub5', <FaServer />, [
        opciones(<Link className="linkNav" to="/" >Opcion</Link>, '7'),
        opciones(<Link className="linkNav" to="/" >Opcion</Link>, '8'),
    ]),
    opciones(<Link className="linkNav" to="/dashboard" >Documentacion</Link>, 'sub6', <FaFileAlt />),
    opciones(<Link className="linkNav" to="/dashboard" >Solicitudes</Link>, 'sub7', <FaEnvelopeOpenText />),
];


// -------------------- FUNCION PARA GENERAR LAS COLUMNAS DE LA BARRA LATERAL --------------------
export const columnas = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Acronimo',
    dataIndex: 'acronimo',
    key: 'acronimo',
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
  },
];
  
export const datosTabla = [
  {
    key: '1',
    id: 12264,
    acronimo: 'sapcod',
    nombre: 'SISTEMA AUTOMATIZADO DE PREVENCION Y CONTROL DE DERRAMES',
  },
  {
    key: '2',
    id: 36520,
    acronimo: 'savi',
    nombre: 'SISTEMA AUTOMATIZADO ',
  },
  {
    key: '3',
    id: 21304,
    acronimo: 'sap',
    nombre: 'SISTEMA AUTOMATIZADO ',
  },
];

// -------------------- CONTENIDO INTERNO DROPDOWN --------------------

// export function opcionesHeader (key,icon,label,path) {
//   return {
//     key: key,
//     icon: icon,
//     label: <Link to={path}>{label}</Link>,
//   }
// };

// const datosHeader = [
//   opcionesHeader('0', <FaCog />, 'Configuracion', '/dashboard'),
//   opcionesHeader('1', <FaPowerOff />, 'Cerrar Sesion', '/'),
// ];
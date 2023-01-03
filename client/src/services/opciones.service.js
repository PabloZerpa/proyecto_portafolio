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

export const LinkItems = [
  { name: <Link className="linkNav" to="/dashboard" >Inicio</Link>, icon: FaHome },
  { name: <Link className="linkNav" to="/aplicaciones" >Aplicaciones</Link>, icon: FaCode },
  { name: <Link className="linkNav" to="/administracion" >Administracion</Link>, icon: FaRegListAlt },
  { name: <Link className="linkNav" to="/servidores" >Servidores</Link>, icon: FaServer },
  { name: <Link className="linkNav" to="/basedatos" >Base de datos</Link>, icon: FaDatabase },
  { name: <Link className="linkNav" to="/documentacion" >Documentacion</Link>, icon: FaFileAlt },
  { name: <Link className="linkNav" to="/solicitudes" >Solicitudes</Link>, icon: FaEnvelopeOpenText },
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
    id: 3652,
    acronimo: 'savi',
    nombre: 'SISTEMA AUTOMATIZADO VI',
  },
  {
    key: '3',
    id: 2134,
    acronimo: 'pdvsa',
    nombre: 'SISTEMA AUTOMATIZADO PDVSA',
  },
];
import { Link } from "react-router-dom";
import { 
    FaHome, 
    FaRegListAlt, 
    FaServer, 
    FaCode, 
    FaDatabase, 
    FaFileAlt, 
    FaEnvelopeOpenText,
    } from "react-icons/fa";

// -------------------- FUNCION PARA GENERAR LAS OPCIONES DE LA BARRA LATERAL --------------------
function opciones(label, key, icon, children, type) {
    return { key, icon, children, label, type };
}

export const opcionesNav = [
    opciones(<Link to="/dashboard" >Inicio</Link>, 'sub1', <FaHome />),
    opciones('Aplicaciones', 'sub2', <FaCode />, [
        opciones(<Link to="/aplicaciones" >Actualizacion</Link>),
        opciones(<Link to="/aplicaciones" >Software</Link>),
        opciones(<Link to="/aplicaciones" >Documentos</Link>),
        opciones(<Link to="/aplicaciones" >Interfaces</Link>),
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

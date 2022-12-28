
import React from "react";
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import { FaHome, FaRegListAlt, FaServer, FaCode, FaDatabase, FaFileAlt, FaEnvelopeOpenText } from "react-icons/fa";
import styled from "styled-components";

// -------------------- FUNCION PARA GENERAR LAS OPCIONES DE LA BARRA LATERAL --------------------
function opciones(label, key, icon, children, type) {
    return { key, icon, children, label, type };
}

const items = [
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


function Barra() {
    return (
        <Container>
            <Menu mode="inline" className="menu" items={items} />
        </Container>
    );
}

export default Barra;

const Container = styled.nav`
    margin: 0;
    padding: 0;

    .menu{
        height: 100vh;
        width: 220px;
        position: fixed;
        margin-top: 75px;
        padding-top: 50px;
    }
`;

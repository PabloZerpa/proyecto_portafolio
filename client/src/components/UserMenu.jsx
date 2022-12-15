
import React from "react";
import styled from "styled-components";
import { Menu } from 'antd';
import { FaHome, FaRegListAlt, FaServer, FaCubes } from "react-icons/fa";
import { Link } from "react-router-dom";

function opciones(label, key, icon, children, type) {
  return { key, icon, children, label, type };
}

const items = [
    opciones(<Link className="linkNav" to="/dashboard" >Inicio</Link>, 'sub1', <FaHome />),
    opciones('Aplicaciones', 'sub2', <FaServer />, [
        opciones(<Link className="linkNav" to="/" >Opcion 1</Link>, '1'),
        opciones(<Link className="linkNav" to="/" >Opcion 2</Link>, '2'),
        opciones(<Link className="linkNav" to="/" >Opcion 3</Link>, '3'),
    ]),
    opciones('Administracion', 'sub3', <FaRegListAlt />, [
        opciones(<Link className="linkNav" to="/" >Opcion 4</Link>, '4'),
        opciones(<Link className="linkNav" to="/" >Opcion 5</Link>, '5'),
        opciones(<Link className="linkNav" to="/" >Opcion 6</Link>, '6'),
    ]),
    opciones('Servidores', 'sub4', <FaCubes />, [
        opciones(<Link className="linkNav" to="/" >Opcion 7</Link>, '7'),
        opciones(<Link className="linkNav" to="/" >Opcion 8</Link>, '8'),
        opciones(<Link className="linkNav" to="/" >Opcion 9</Link>, '9'),
    ]),
];


function UserMenu() {

    return (
        
        <Container>
            
            <Menu
                mode="inline"
                style={{
                    height: '100vh',
                    width: '15%',
                    position: 'fixed',
                    marginTop: '75px',
                    paddingTop: 0,
                    borderRight: 0,
                    
                }}
                items={items}
            />

        </Container>
    );
}

export default UserMenu;

const Container = styled.nav`
    margin: 0;
    padding: 0;
`;

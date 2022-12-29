
import React from "react";
import { barraItems } from "../services/opciones.service";
import { Menu } from 'antd';
import styled from "styled-components";

function Barra() {
    return (
        <Container>
            <Menu mode="inline" className="menu" items={barraItems} />
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

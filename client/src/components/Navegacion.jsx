
import React from "react";
import { barraItems } from "../services/opciones.service";
import { Menu } from 'antd';
import styled from "styled-components";

function Navegacion() {
    return (
        <Container>
            <Menu mode="inline" className="menu" items={barraItems} />
        </Container>
    );
}

export default Navegacion;

const Container = styled.nav`
    margin: 0;
    padding: 0;

    .menu{
        height: 100vh;
        width: 220px;
        position: fixed;
        margin-top: 80px;
        padding-top: 50px;
        box-shadow: 1px 10px 10px #696969;
    }
`;

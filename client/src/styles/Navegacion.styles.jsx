import styled from 'styled-components';

export const Nav = styled.nav`
    margin: 0;
    padding: 0;
    position: fixed;
    z-index: 91;

    .menuButton {
        color: black;
        cursor: pointer;
        position: absolute;
        top: 90px;
        left: 32px;
        z-index: 999;
    }

    .menu{
        height: 100vh;
        position: fixed;
        margin-top: 80px;
        padding-top: 50px;
        background: #eeeeee;
        box-shadow: 1px 10px 10px #696969;
    }
`;
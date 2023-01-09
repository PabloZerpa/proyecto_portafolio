
import { useState } from "react";
import { Menu, Button } from 'antd';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Nav } from "../styles/Navegacion.styles";

import { opcionesNav } from "../services/opciones.service";
import Autorizacion from '../services/auth.service';

function Navegacion() {

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => setCollapsed(!collapsed);
    

    if (Autorizacion.obtenerUsuario() === null)
        return <div></div>

    return (
        <Nav>

            <div onClick={toggleCollapsed} className="menuButton">
                {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </div>

            <Menu 
                mode="inline" 
                className="menu" 
                inlineCollapsed={collapsed} 
                style={collapsed ? {width: '80px'} : {width: '190px'} } 
                items={opcionesNav} 
            />

        </Nav>
    );
}

export default Navegacion;


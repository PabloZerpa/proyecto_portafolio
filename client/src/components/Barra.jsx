
import React, { useState } from 'react';
import { Menu, MenuItem, ProSidebarProvider, Sidebar, SubMenu } from 'react-pro-sidebar';
import { FaHome, FaRegListAlt, FaServer, FaCode, FaDatabase, FaFileAlt, FaEnvelopeOpenText } from "react-icons/fa";

function Barra() {
const [collapsed, setCollapsed] = useState(false);
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };

  const styles = {
    sideBar: {
      position: "fixed",
      marginTop: "80px",
      width: '240px',
      height: '100vh',
      backgroundColor: '#fff',
      boxShadow: '1px 10px 10px #636363',
    },
    menu: {
      paddingTop: "40px",
      height: '100vh',
      background: '#fff',
    },
  };

  return(
    <ProSidebarProvider collapsed={collapsed} >
        <Sidebar style={styles.sideBar} >
          {/* <div style={{cursor: "pointer"}} onClick={onClickMenuIcon}>
            <FaBars />
          </div> */}

          <Menu iconShape="square" style={styles.menu} >
            <MenuItem icon={<FaHome />} href="/dashboard">Inicio</MenuItem>
            <SubMenu label='Aplicaciones' icon={<FaCode />}>
              <MenuItem href="/aplicaciones" >Opcion 1</MenuItem>
              <MenuItem href="/aplicaciones" >Opcion 2</MenuItem>
              <MenuItem href="/aplicaciones" >Opcion 3</MenuItem>
            </SubMenu>

            <SubMenu label='Administracion' icon={<FaRegListAlt />}>
              <MenuItem>Opcion 1</MenuItem>
              <MenuItem>Opcion 2</MenuItem>
              <MenuItem>Opcion 3</MenuItem>
            </SubMenu>

            <SubMenu label='Servidores' icon={<FaServer />}>
              <MenuItem>Opcion 1</MenuItem>
              <MenuItem>Opcion 2</MenuItem>
              <MenuItem>Opcion 3</MenuItem>
            </SubMenu>

            <SubMenu label='Base de Datos' icon={<FaDatabase />}>
              <MenuItem>Opcion 1</MenuItem>
              <MenuItem>Opcion 2</MenuItem>
              <MenuItem>Opcion 3</MenuItem>
            </SubMenu>
            
            <MenuItem icon={<FaFileAlt />}>Documentacion</MenuItem>
            <MenuItem icon={<FaEnvelopeOpenText />}>Solicitudes</MenuItem>
          </Menu>
        </Sidebar>
      </ProSidebarProvider>
  )
}

export default Barra;



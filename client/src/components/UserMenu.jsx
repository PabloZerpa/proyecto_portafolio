
import React from "react";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import styled from "styled-components";

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
            key: subKey,
            label: `option${subKey}`,
            };
        }),
        };
    });

function UserMenu() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        
        <Container>
            
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{
                height: '100vh',
                width: '15%',
                position: 'fixed',
                marginTop: '75px',
                paddingTop: 0,
                borderRight: 0,
                }}
                items={items2}
            />
        </Container>
    );
}

export default UserMenu;

const Container = styled.nav`
    margin: 0;
    padding: 0;
`;

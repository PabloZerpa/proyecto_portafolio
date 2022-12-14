
import React from "react";
import { Layout, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from "styled-components";

const { Content } = Layout;

function Main() {

    return (
        <Content
        style={{
            paddingLeft: '15%',
            margin: 0,
            minHeight: 280,
            width: '100%',
            height: '100vh',
            background: "#c2c2c2",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            }}
        >
            <Avatar size={128} style={{ color: '#1980da', background: 'none' }} icon={<LoadingOutlined />} />
            Content
        </Content>

    );
}

export default Main;

const Container = styled.nav`
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

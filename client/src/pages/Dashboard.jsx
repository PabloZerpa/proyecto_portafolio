
import React from "react";
import Header from "../components/Header";
import MenuUsuario from "../components/MenuUsuario";
import Principal from "../components/Principal";
import styled from "styled-components";

function Dashboard() {

  return (
    <Container>

      <Header login={true} user={'Pablo'} />

      <MenuUsuario />
      
      <Principal />
      
    </Container>
  )
};

export default Dashboard;

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
`;
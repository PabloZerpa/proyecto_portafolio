
import React from "react";
import UserMenu from "../components/UserMenu";
import UserContent from "../components/UserContent";
import styled from "styled-components";

function Dashboard() {

  return (
    <Container>

      <UserMenu />
      
      <UserContent />
      
    </Container>
  )
};

export default Dashboard;

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
`;
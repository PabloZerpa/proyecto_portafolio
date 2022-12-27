
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Barra from "../components/Barra";
import Contenido from "../components/Contenido";
import styled from "styled-components";
import AuthService from "../services/auth.service";

function Dashboard() {

  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);

  return (
    <Container>

      <Header user={user} />

      <Barra />
      
      <Contenido />
      
    </Container>
  )
};

export default Dashboard;

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
`;
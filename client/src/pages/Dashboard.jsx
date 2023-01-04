
import styled from "styled-components";
import { Header, Navegacion, Contenido } from "../components";

function Dashboard() {

  return (
      <Container>
        
        <Header login={true} />

        <Navegacion />
        
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
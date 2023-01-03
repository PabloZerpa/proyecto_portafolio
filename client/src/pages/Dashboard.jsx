
import Navegacion from "../components/Navegacion";
import Contenido from "../components/Contenido";
import styled from "styled-components";

function Dashboard() {

  return (
      <Container>
    
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
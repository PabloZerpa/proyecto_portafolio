import { Row, Col } from "antd";
import { GridContainer } from "../styles/Container.styles";

function Grid({ children }) {
  
  return (
    <GridContainer>
      <Row className="rows">
        {children.map((item) => (
          <div key={item.id}>
            <Col className="cols">{item}</Col>
          </div>
        ))}
      </Row>
    </GridContainer>
  );
}

export default Grid;
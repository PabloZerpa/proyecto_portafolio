
import { useState } from "react";
import { Table, Spin } from 'antd';
import { columnas, datosTabla } from "../services/opciones.service";
import Busqueda from "./Busqueda";
import styled from "styled-components";

function Contenido() {

  const [isLoading, setIsLoading] = useState(false);

    return (
      <Container>

        <div className="content center">

          <Busqueda />

          {isLoading ? (
            <Spin size="large" />
          ) : (
            <>
            
              <Table 
                style={{width: '90%'}}
                pagination={false}
                columns={columnas} 
                dataSource={datosTabla} 
              />

            </>
          )}

          <div></div>

        </div>
        
      </Container>

    );
}

export default Contenido;

const Container = styled.nav`
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;

    .content{
      width: 100%;
      height: 100vh;
      padding: 128px 0 0 220px;
      margin: 0;
      background: "#c2c2c2";
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      gap: 90px;
    }
`;
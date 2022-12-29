
import { useState, useEffect } from "react";
import { Layout, Table, Input } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled from "styled-components";
import { columnas, datosTabla } from "../services/opciones.service";
import UserService from "../services/user.service";

const { Content } = Layout;
const { Search } = Input;

function Contenido() {

  const [isLoading, setIsLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {

    UserService.obtenerDatosUsuario()
      .then((response) => {
        setUsuarios(response.data);
        setIsLoading(false);
        console.log(usuarios);
      });

  }, [setUsuarios]);


    return (
      <Container>

        <Content className="content center">

          <Search 
            allowClear
            enterButton
            placeholder="Search" 
            size="large"
            style={{width: '50%'}}
          />
          
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters style={{ color: '#1980da', fontSize: '60px' }} />
              Loading
            </>
          ) : (
            <>
            
              <Table 
                style={{width: '90%'}}
                pagination={false}
                columns={columnas} 
                dataSource={datosTabla} 
              />

              {/*usuarios.map((item) => (
                <div key={item.id}>
                  <h3>{item.id}</h3>
                  <p>{item.indicador}</p>
                  <p>{item.password}</p>
                  <p>{item.rol}</p>
                </div>
              ))*/}

            </>
          )}

          <div></div>

        </Content>
      </Container>

    );
}

export default Contenido;

const Container = styled.nav`
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;

    .center{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .content{
      padding-left: 15%;
      padding-top: 100px;
      margin: 0;
      min-height: 280;
      width: 100%;
      height: 100vh;
      background: "#c2c2c2";
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      gap: 36px;
    }
`;

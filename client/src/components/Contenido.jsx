
import { useState, useEffect } from "react";
import { Layout, Table, Input } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled from "styled-components";
import UserService from "../services/user.service";

const { Content } = Layout;
const { Search } = Input;
const onSearch = (value) => console.log(value);

const columnas = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Acronimo',
      dataIndex: 'acronimo',
      key: 'acronimo',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
  ];

  const datos = [
    {
      key: '1',
      id: 12264,
      acronimo: 'sapcod',
      nombre: 'SISTEMA AUTOMATIZADO DE PREVENCION Y CONTROL DE DERRAMES',
    },
  ];

function Contenido() {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {

    UserService.getUserData()
    .then((response) => {
      console.log(response.data);
      setIsLoading(false);
    },);

  }, [setData]);


    return (
      <Container>

        <Content className="content center">

          <Search 
            allowClear
            enterButton
            className="searchBar"
            placeholder="Search" 
            onSearch={onSearch} 
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
                dataSource={datos} 
              />

              {/*data.map((item) => (
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

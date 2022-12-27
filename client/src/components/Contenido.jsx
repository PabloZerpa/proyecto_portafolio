
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Table, Input } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import styled from "styled-components";
import axios from "axios";

const { Search } = Input;
const onSearch = (value) => console.log(value);
const { Content } = Layout;
const baseURL = "http://localhost:3001/api/user";

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

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();


  /*useEffect(() => {

    const tokenServer = document.cookie.replace('token=', '');
    const token = tokenServer.split(" ")[1];
    console.log(token);

    const obtenerDatos = async () => {
      try {
        const { data } = await axios({url: baseURL,
          method: 'GET',
          headers: { 'Authorization': token },
        });
        console.log(data);
      } catch (error) {console.log(error);}
    };

    obtenerDatos();
  }, [setData]);*/

  useEffect(() => {

    setUser(AuthService.getCurrentUser());

    if (!user) 
      navigate("/login");

    UserService.getUserData()
    .then((response) => {
      console.log(response.data);
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


import { useState, useEffect } from "react";

import { Table, Input, Spin } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { columnas, datosTabla } from "../services/opciones.service";
import styled from "styled-components";

import UserService from "../services/user.service";

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

        <div className="content center">

          <Search allowClear enterButton placeholder="Search" size="large" style={{width: '50%'}} />

          {isLoading ? (
              <Spin indicator={<AiOutlineLoading3Quarters style={{ color: '#1980da', fontSize: '60px' }}spin />} />
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
      flex-direction: column;
      align-items: center;
      gap: 64px;
    }
`;
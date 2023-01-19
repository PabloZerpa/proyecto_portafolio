
import { useState, useEffect } from "react";
import { Table, Spin } from 'antd';
import { columnas } from "../services/tabla.service";
import { Busqueda } from "../components/";
import { Container } from "../styles/Container.styles";
import Usuarios from "../services/user.service";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function fetchData(){
      try {
        const response = await Usuarios.obtenerDatosUsuario()
        setDatos(response.data);
        setIsLoading(false);
      } 
      catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);

  return (
      <Container>
        <div className="dashboard start" >

          <Busqueda />
        
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <Table 
              style={{width: '90%'}}
              size="small"
              pagination={false}
              columns={columnas}
              dataSource={datos}
              
            />
          )}
        
          <div></div>

        </div>
          
      </Container>
  )
};

export default Dashboard;
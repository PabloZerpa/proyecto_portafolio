
import { useState, useEffect } from "react";
import { Table, Spin } from 'antd';
import { columnas, datosTabla } from "../services/opciones.service";
import { Busqueda } from "../components/";
import { Container } from "../styles/Container.styles";
import Usuarios from "../services/user.service";


function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchData(){
      try {
        const response = await Usuarios.obtenerDatosUsuario()
        setUsuarios(response.data);
        setIsLoading(false);
        console.log(usuarios);
      } 
      catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [setUsuarios]);

  return (
      <Container>

        <div className="dashboard start" >
          <Busqueda />
        
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <>
            
              <Table 
                style={{width: '90%'}}
                size="small"
                pagination={false}
                columns={columnas} 
                dataSource={datosTabla} 
              />
              
            </>
          )}
        
          <div></div>

        </div>
          
      </Container>
  )
};

export default Dashboard;
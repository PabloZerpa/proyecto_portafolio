
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Table } from 'antd';
import { Container } from "../styles/Container.styles";
import Usuarios from "../services/user.service";

function Dashboard() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [datosModificacion, setDatosModificacion] = useState([]);
  const [datosCreacion, setDatosCreacion] = useState([]);
  const [selectApp, setSelectApp] = useState('');

  useEffect(() => {
    async function fetchData(){
      try {
        const porModificacion = await Usuarios.obtenerPorModificacion();
        const porCreacion = await Usuarios.obtenerPorCreacion();
        setDatosModificacion(porModificacion.data);
        setDatosCreacion(porCreacion.data);
        setIsLoading(false);
      } 
      catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);


  function estructura(title, dataIndex, fixed, width) {
    if(fixed !== 'left'){
      return { 
        title: title, 
        dataIndex: dataIndex,
        key: dataIndex,
      };
    }
    else{
      return{
        title: title,
        dataIndex: dataIndex,
        key: dataIndex,
        fixed: fixed,
        width: width,
        render: () => 
          <>
            <Link to={selectApp ? `/aplicaciones/${selectApp.id}` : `/dashboard`} style={{marginLeft: '30px', fontSize: '18px'}}
              state={selectApp} >
              <FaEye />
            </Link>
          </>
      }
    }
  }
  
  const columnas = [
    estructura('Operaciones', 'operaciones', 'left', 40),
    estructura('ID', 'id'),
    estructura('Acronimo', 'acronimo'),
    estructura('Nombre', 'nombre'),
    estructura('Region', 'region'),
    estructura('Responsable', 'responsable'),
    estructura('Prioridad', 'prioridad'),
    estructura('Ultima Actualizacion', 'ultima'),
  ];

  return (
    <Container>
        <div className="dashboard start" >

          <Table 
              size="small"
              style={{width: '800px'}}
              loading={isLoading}
              pagination={false}
              columns={columnas}
              dataSource={datosModificacion}
              title={() => <h3>Modificadas Recientemente</h3>}
              onRow={(record, rowIndex) => {
              return{
                  onClickCapture: event => {
                  console.log(record);
                  setSelectApp(record);
                  }
              }
              }}
          />

          <Table 
              size="small"
              style={{width: '800px'}}
              loading={isLoading}
              pagination={false}
              columns={columnas}
              dataSource={datosCreacion}
              title={() => <h3>Agregadas Recientemente</h3>}
              onRow={(record, rowIndex) => {
              return{
                  onClickCapture: event => {
                  console.log(record);
                  setSelectApp(record);
                  }
              }
              }}
          />

          <div></div>

        </div>
        
    </Container>
  )
};

export default Dashboard;
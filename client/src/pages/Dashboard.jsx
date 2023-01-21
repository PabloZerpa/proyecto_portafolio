
import { useState, useEffect } from "react";
import { Table } from 'antd';
//import { columnas, datosTabla } from "../services/tabla.service";
import { Busqueda } from "../components/";
import { Container } from "../styles/Container.styles";
import Usuarios from "../services/user.service";

import { Link } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";


function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [datos, setDatos] = useState([]);
  const [selectApp, setSelectApp] = useState('');

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
            <Link to={selectApp ? `/aplicaciones/${selectApp.id}` : `/dashboard`} style={{margin: '0 10px 0 10px', fontSize: '18px'}}
              state={selectApp} >
              <FaEye />
            </Link>
            <Link to={selectApp ? `/aplicaciones/actualizacion/${selectApp.id}` : `/dashboard`} style={{margin: '0 10px 0 10px', fontSize: '18px'}}
                // onClick={(e) => { console.log(e.target) }}
                state={selectApp} >
              <FaEdit />
            </Link>
          </>
      }
    }
  }
  
  const columnas = [
    estructura('Operaciones', 'operaciones', 'left', 100),
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

          <Busqueda />

          <Table 
              size="small"
              style={{width: '1000px'}}
              loading={isLoading}
              pagination={false}
              columns={columnas}
              dataSource={datos}
              //dataSource={datosTabla}
              onRow={(record, rowIndex) => {
                return{
                  onClick: event => {
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
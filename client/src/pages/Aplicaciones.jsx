
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { Table } from 'antd';
import { Busqueda } from "../components";
import { Container } from "../styles/Container.styles";
import Usuarios from "../services/user.service";

function Aplicaciones() {

    const [isLoading, setIsLoading] = useState(true);
    const [selectApp, setSelectApp] = useState('');
    const [datos, setDatos] = useState([]);

    const [resultado, setResultado] = useState('');
    const obtenerResultado = (respuesta) => {setResultado(respuesta)};
  
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
              <Link to={selectApp ? `/aplicaciones/${selectApp.id}` : `/aplicaciones`} style={{margin: '0 10px 0 10px', fontSize: '18px'}}
                state={selectApp} >
                <FaEye />
              </Link>
              <Link to={selectApp ? `/aplicaciones/actualizacion/${selectApp.id}` : `/aplicaciones`} style={{margin: '0 10px 0 10px', fontSize: '18px'}}
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

        <Busqueda manejarBusqueda={obtenerResultado} />

        <Table 
            size="small"
            style={{width: '1000px'}}
            loading={isLoading}
            pagination={false}
            columns={columnas}
            dataSource={resultado}
            //dataSource={datosTabla}
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

export default Aplicaciones;
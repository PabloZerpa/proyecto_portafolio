
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { Table } from 'antd';
import { Busqueda } from "../components";
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
              <Link to={selectApp ? `/aplicaciones/${selectApp.id}` : `/aplicaciones`} className='my-0 mx-2 text-lg'
                  state={selectApp} >
                <FaEye />
              </Link>
              <Link to={selectApp ? `/aplicaciones/actualizacion/${selectApp.id}` : `/aplicaciones`} className='my-0 mx-2 text-lg'
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
    <div className="flex w-full h-screen bg-zinc-300 m-0 p-0">
      
      <div className="w-full flex flex-col justify-start items-center gap-14 pt-44 pl-56" >

        <Busqueda manejarBusqueda={obtenerResultado} />

        {resultado ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Acronimo
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Nombre
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Region
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Responsable
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Prioridad
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Fecha
                          </th>
                          <th scope="col" className="px-6 py-3">
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {resultado.map((dato, index) => {
                      return (
                        <tr key={dato.id} className="bg-white border-b hover:bg-gray-50">
                          <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{dato.id}</td>
                          <td className="px-6 py-4">{dato.acronimo}</td>
                          <td className="px-6 py-4">{dato.nombre}</td>
                          <td className="px-6 py-4">{dato.region}</td>
                          <td className="px-6 py-4">{dato.responsable}</td>
                          <td className="px-6 py-4">{dato.prioridad}</td>
                          <td className="px-6 py-4">{dato.ultima}</td>
                          <td className="px-6 py-4">
                            <Link to={dato.id ? `/aplicaciones/${dato.id}` : `/dashboard`} className='ml-8 text-lg' 
                            state={dato} >
                              <FaEye className="text-blue-500" />
                            </Link>

                            <Link to={dato.id ? `/aplicaciones/actualizacion/${dato.id}` : `/dashboard`} className='ml-8 text-lg' 
                            state={dato} >
                              <FaEdit className="text-blue-500" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
              </table>
          </div>
        ) : (
           <div></div>
        )}

        {/* <Table 
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
        /> */}

        <div></div>

      </div>
      
    </div>
  )
};

export default Aplicaciones;
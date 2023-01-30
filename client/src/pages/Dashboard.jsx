
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Table } from 'antd';
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

        console.log(porModificacion);
        console.log(porCreacion);

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
          <Link to={selectApp ? `/aplicaciones/${selectApp.id}` : `/dashboard`} className='ml-8 text-lg' 
            state={selectApp} >
            <FaEye />
          </Link>
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
    <div className="flex w-full h-screen bg-zinc-300 m-0 p-0">

      <div className="w-full h-screen m-0 flex flex-col justify-start items-center gap-10 pt-44 pl-56" >

        {/* TABLA */}
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Acronimo
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Region
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Responsable
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Prioridad
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" class="px-6 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {datosCreacion.map((dato, index) => {
                    return (
                      <tr key={dato.id} class="bg-white border-b hover:bg-gray-50">
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{dato.id}</td>
                        <td class="px-6 py-4">{dato.acronimo}</td>
                        <td class="px-6 py-4">{dato.nombre}</td>
                        <td class="px-6 py-4">{dato.region}</td>
                        <td class="px-6 py-4">{dato.responsable}</td>
                        <td class="px-6 py-4">{dato.prioridad}</td>
                        <td class="px-6 py-4">{dato.ultima}</td>
                        <td class="px-6 py-4">
                          <Link to={dato.id ? `/aplicaciones/${dato.id}` : `/dashboard`} className='ml-8 text-lg' 
                          state={dato} >
                            <FaEye className="text-blue-500" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
            </table>
        </div>

        {/* <Table 
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
          }}}
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
          }}}
        /> */}

      </div>
    </div>
  )
};

export default Dashboard;
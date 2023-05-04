

import { useState, useEffect } from "react";
import { Container, Tabla } from "../components";
import { BiLoaderAlt } from "react-icons/bi";
import Aplicacion from "../services/aplicacion.service";
import Linea from "../chart/Linea";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const columns = [
	{
		name: 'Ver',
		button: true,
		cell: row => 
    <Link to={row ? `/aplicaciones/${row.aplicacion_id}` : `/dashboard`} >
      <FaEye className="text-blue-500 text-lg" />
    </Link>,
	},
  {
      name: 'ID',
      selector: row => row.aplicacion_id,
      sortable: true,
      grow: 0,
      left: true,
      width: "60px",
  },
  {
      name: 'Acronimo',
      selector: row => row.apl_acronimo,
      sortable: true,
      grow: 0,
      left: true
  },
  {
      name: 'Nombre',
      selector: row => row.apl_nombre,
      sortable: true,
      grow: 2,
      left: true
  },
  {
      name: 'Estatus',
      selector: row => row.estatus,
      grow: 2,
      left: true
  },
  {
      name: 'Direccion',
      cell: row => (<a className="text-blue-500" href={row.apl_direccion} target="_blank">{row.apl_direccion}</a>),
      grow: 2,
      left: true
  },
  {
      name: 'Ultima Actualizacion',
      selector: row => row.apl_fecha_actualizacion,
      sortable: true,
      grow: 2,
      left: true,
      hide: 'md'
  },
  {
    name: 'Por',
    selector: row => row.indicador,
    sortable: true,
    grow: 1,
    left: true,
    hide: 'md'
},
];


function Dashboard() {
  
  const [datos, setDatos] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {

    async function fetchData(){
      try {
        const data = await Aplicacion.obtenerDatos();
        setLoad(false);
        setDatos(data.data);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);



  return (
    <Container>

        {load ? (
            <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
        ) : (
          <>
            <h3 className='font-bold text-lg'>Modificaciones Recientes</h3>
            
            <div className="w-[540px] md:w-[720px] lg:w-[960px] px-8">
              <Tabla columnas={columns} datos={datos} />
            </div>
            
            <Linea />
          </>
        )
      }

    </Container>
  )
};

export default Dashboard;
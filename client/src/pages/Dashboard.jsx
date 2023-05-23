

import { useState, useEffect } from "react";
import { Card, Container, Tabla } from "../components";
import { BiLoaderAlt } from "react-icons/bi";
import { FaCode, FaDatabase, FaEye, FaServer } from "react-icons/fa";
import { Link } from "react-router-dom";
import authHeader from "../utils/header";
import axios from "axios";
import { rutaAplicacion, rutaUsuario } from "../utils/APIRoutes";

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
      width: "100px",
      left: true
  },
  {
      name: 'Nombre',
      selector: row => row.apl_nombre,
      sortable: true,
      width: "150px",
      left: true
  },
  {
      name: 'Estatus',
      selector: row => row.estatus,
      width: "150px",
      left: true,
  },
  {
      name: 'Direccion',
      cell: row => (<a className="text-blue-500" href={row.apl_direccion} target="_blank" rel="noreferrer">{row.apl_direccion}</a>),
      width: "150px",
      left: true
  }, 
  {
      name: 'Ultima Actualizacion',
      selector: row => row.apl_fecha_actualizacion,
      sortable: true,
      width: "150px",
      left: true,
  },
  {
    name: 'Por',
    selector: row => row.indicador,
    sortable: true,
    width: "100px",
    left: true,
},
];


function Dashboard() {
  
  const [datos, setDatos] = useState([]);
  const [aplicaciones, setAplicaciones] = useState([]);
  const [bases_datos, setBasesDatos] = useState([]);
  const [servidores, setServidores] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function fetchData(){
      try {
        const {data} = await axios.get(rutaAplicacion, { headers: authHeader() });
        setDatos(data);

        const cantidades = await axios.get(`${rutaUsuario}/cantidad`, { headers: authHeader() });
        setAplicaciones(cantidades.data.aplicaciones);
        setBasesDatos(cantidades.data.bases_datos);
        setServidores(cantidades.data.servidores);

        setLoad(false);
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
            <div className="flex flex-col items-center space-y-4 ">
              <h3 className='font-bold text-lg'>Modificaciones Recientes</h3>
              <div className="w-[480px] md:w-[720px] lg:w-[860px] px-2"> 
                <Tabla columnas={columns} datos={datos} />
              </div>
            </div>

            <div className="flex flex-wrap space-x-8 space-y-4">
              <div></div>
              <Card titulo={'Aplicaciones'} icono={<FaCode />} datos={aplicaciones} link='/aplicaciones' />
              <Card titulo={'Bases de Datos'} icono={<FaDatabase />} datos={bases_datos} link='/basedatos' />
              <Card titulo={'Servidores'} icono={<FaServer />} datos={servidores} link='/servidores' />
            </div>

          </>
        )
      }

    </Container>
  )
};

export default Dashboard;
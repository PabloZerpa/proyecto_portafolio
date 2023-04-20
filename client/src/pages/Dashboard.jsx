

import { useState, useEffect } from "react";
import { Tabla, Container } from "../components";
import { BiLoaderAlt } from "react-icons/bi";
import Aplicacion from "../services/aplicacion.service";
import Linea from "../chart/Linea";
import { columnasUserSimple } from "../services/campos.service";

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
            <Tabla columnas={columnasUserSimple} datos={datos} opciones={false} />
            
            <Linea />
          </>
        )
      }

    </Container>
  )
};

export default Dashboard;



// DEBE LLEGAR MAXIMO HASTA DONDE SEA EL TOTAL DE RESULTADOS

//LOS SELECT ANIDADOS DEBEN AFECTARSE SOLO 1 A 1

// VERIFICAR OTRAS OPCIONES DE UPDATE
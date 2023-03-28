
import { useState, useEffect } from "react";
import { Tabla, Container } from "../components";
import { BiLoaderAlt } from "react-icons/bi";
import Usuarios from "../services/user.service";
import Linea from "../chart/Linea";

function Dashboard() {
  
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    async function fetchData(){
      try {
        const data = await Usuarios.obtenerAplicaciones();
        setIsLoading(false);
        setDatos(data.data);
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);

  return (
    <Container>

        {isLoading ? (
            <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
        ) : (
          <>
            <h3 className='font-bold text-lg'>Modificaciones Recientes</h3>
            <Tabla datos={datos} opciones={false} />
            
            <Linea />
          </>
        )
      }

    </Container>
  )
};

export default Dashboard;
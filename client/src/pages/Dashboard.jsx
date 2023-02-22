
import { useState, useEffect } from "react";
import { Tabla, Container } from "../components";
import { BiLoaderAlt } from "react-icons/bi";
import Usuarios from "../services/user.service";
import Linea from "../components/Linea";

function Dashboard() {
  
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function fetchData(){
      try {
        const data = await Usuarios.obtenerDatosUsuarios();
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
            <h3 className='font-bold'>Modificaciones Recientes</h3>
            <Tabla datos={datos} opciones={false} />
            
            <Linea />
          </>
        )
      }

    </Container>
  )
};

export default Dashboard;
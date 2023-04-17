
/*
 EL ORDEN PARA OBTENER LOS DATOS DEL DASHBOARD:
    1) MODIFICAR LA CONSULTA OBTENER DATOS DEL SERVIDOR
    2) SE RECIBE EN OBTENER DATOS DE LA CLASE USUARIO
    3) LOS DATOS SE GUARDAN EN DASHBOARD Y SE PASAN AL COMPONENTE TABLA
    4) EN LA TABLA LOS VALORES DE "CAMPO" DEBEN COINCIDIR CON LOS CAMPOS LA CONSULTA
*/

import { useState, useEffect } from "react";
import { Tabla, Container } from "../components";
import { BiLoaderAlt } from "react-icons/bi";
import Usuarios from "../services/user.service";
import Linea from "../chart/Linea";
import { columnasUserSimple, columnasAdminSimple } from "../services/campos.service";

function Dashboard() {
  
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    async function fetchData(){
      try {
        const data = await Usuarios.obtenerDatos();
        setIsLoading(false);
        setDatos(data.data);

        // console.log('DASHBOARD OBTENER DATOS');
        console.log(datos);
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
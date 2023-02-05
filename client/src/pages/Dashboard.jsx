
import { useState, useEffect } from "react";
import { Tabla } from "../components";
import { BiLoaderAlt } from "react-icons/bi";
import Usuarios from "../services/user.service";

function Dashboard() {
  
  const [datosModificacion, setDatosModificacion] = useState([]);
  const [datosCreacion, setDatosCreacion] = useState([]);
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData(){
      try {
        const porModificacion = await Usuarios.obtenerPorModificacion();
        const porCreacion = await Usuarios.obtenerPorCreacion();
        const allData = await Usuarios.obtenerDatosUsuario();
        setIsLoading(false);

        setDatosModificacion(porModificacion.data);
        setDatosCreacion(porCreacion.data);
        setDatos(allData.data);
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex w-full bg-transparent m-0 p-0">
      <div className="w-full m-0 flex flex-col justify-start items-center gap-10 pt-44 pl-56" >

        {isLoading ? (
            <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
        ) : (
          <>
            <Tabla datos={datosCreacion} opciones={false} />
          
            <Tabla datos={datosModificacion} opciones={false} />
          </>
        )
      }
        
        
      </div>
    </div>
  )
};

export default Dashboard;

import { useState, useEffect } from "react";
import { Busqueda, Tabla } from "../components";
import Usuarios from "../services/user.service";

function Aplicaciones() {

    const [datos, setDatos] = useState([]);
    const [resultado, setResultado] = useState('');
    const obtenerResultado = (respuesta) => {setResultado(respuesta)};
  
    useEffect(() => {
      async function fetchData(){
        try {
          const response = await Usuarios.obtenerDatosUsuario()
          setDatos(response.data);
        } 
        catch (error) {
          console.log(error)
        }
      }
      fetchData();
    }, []);

  return (
    <div className="flex w-full h-screen bg-zinc-300 m-0 p-0">
      <div className="w-full flex flex-col justify-start items-center gap-14 pt-44 pl-56" >

        <Busqueda manejarBusqueda={obtenerResultado} />

        {resultado ? (
          <Tabla datos={resultado} opciones={true} />
        ) : (
          <div></div>
        )}

      </div>
    </div>
  )
};

export default Aplicaciones;
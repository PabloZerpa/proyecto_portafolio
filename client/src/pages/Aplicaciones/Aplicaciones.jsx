
import { useState, useEffect } from "react";
import { Busqueda, Tabla, Container } from "../../components";
import Usuarios from "../../services/user.service";
import Autorizacion from "../../services/auth.service";

function Aplicaciones() {

    const [rol, setRol] = useState('');
    const [datos, setDatos] = useState([]);
    const [resultado, setResultado] = useState('');
    const obtenerResultado = (respuesta) => {setResultado(respuesta)};
  
    useEffect(() => {
      
      setRol(Autorizacion.obtenerUsuario().rol)
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
    <Container>

        <Busqueda manejarBusqueda={obtenerResultado} />

        {resultado ? (
          <Tabla datos={resultado} opciones={(rol==='admin') ? true : false} />
        ) : (
          <div></div>
        )}

    </Container>
  )
};

export default Aplicaciones;
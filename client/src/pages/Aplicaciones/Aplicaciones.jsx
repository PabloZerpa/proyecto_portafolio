
import { useState, useEffect } from "react";
import { Tabla, Container } from "../../components";
import { Busqueda } from "../../container"
import Usuarios from "../../services/user.service";
import Autorizacion from "../../services/auth.service";
import Tabla3 from "../../components/Table3";

function Aplicaciones() {

    const [rol, setRol] = useState('');
    const [datos, setDatos] = useState([]);
    const [resultado, setResultado] = useState('');
    const obtenerResultado = (respuesta) => {setResultado(respuesta)};
  
    useEffect(() => {
      setRol(Autorizacion.obtenerUsuario().rol)
    }, []);

  return (
    <Container>

      <Busqueda manejarBusqueda={obtenerResultado} />

      {resultado ? (
        <Tabla datos={resultado} opciones={(rol==='admin') ? true : false} paginacion={true} />
      ) : (
        <div></div>
      )}

    </Container>
  )
};

export default Aplicaciones;
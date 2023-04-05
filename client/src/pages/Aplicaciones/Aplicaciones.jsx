
import { useState } from "react";
import { Tabla, Container } from "../../components";
import { Busqueda } from "../../container"
import Autorizacion from "../../services/auth.service";

function Aplicaciones() {

  const [pagina, setPagina] = useState(1);
  const [count, setCount] = useState('');
  const [resultado, setResultado] = useState('');

  const obtenerPagina = (respuesta) => {setPagina(respuesta); console.log('PAGINA EN APLICACIONES: ' + pagina)};
  const obtenerCount = (respuesta) => {setCount(respuesta); console.log('COUNT EN APLICACIONES: ' + count)};
  const obtenerResultado = (respuesta) => {setResultado(respuesta)};


  return (
    <Container>

      <Busqueda 
        manejarBusqueda={obtenerResultado}
        manejarCount={obtenerCount}
        pagina={pagina ? pagina : 1}
      />

      {resultado ? (
        <Tabla 
          datos={resultado} 
          opciones={(Autorizacion.obtenerUsuario().rol==='admin') ? true : false} 
          paginacion={true} 
          count={count}
          manejarPagina={obtenerPagina}
        />
      ) : (
        <div></div>
      )}

    </Container>
  )
};

export default Aplicaciones;
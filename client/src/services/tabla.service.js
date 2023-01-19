
import { Link } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";

// -------------------- FUNCION PARA GENERAR LAS COLUMNAS DE LA BARRA LATERAL --------------------
const prueba = {
    key: "1",
    id: 100,
    acronimo: "Acronimo de la aplicacion",
    estatus: "Estatus",
    nombre: "Nombre de la aplicacion",
    descripcion: "Descripcion de la aplicacion",
    prioridad: "Alta",
    tipo: "Tipo de la aplicacion",
    responsable: "Nombre del responsable",
    clientes: "Nombre de los clientes",
    plataforma: "Plataforma",
    region: "Oriente",
    servidores: "Servidor",
    fecha: "5/11/2022"
};

  function estructura(title, dataIndex) {
    return { 
      title: title, 
      dataIndex: dataIndex, 
      key: dataIndex,
    };
  }
  
  
  function operaciones(title, dataIndex, fixed, width){
    return{
      title: title,
      key: dataIndex,
      fixed: fixed,
      width: width,
      render: () => 
        <>
          <Link to="/aplicaciones" style={{margin: '0 10px 0 10px', fontSize: '18px'}} ><FaEye /></Link>
          <Link to={`/aplicaciones/actualizacion/${prueba.id}`} style={{margin: '0 10px 0 10px', fontSize: '18px'}}
              // onClick={(e) => { console.log(e.target) }}
              state={prueba} >
            <FaEdit />
          </Link>
        </>
    }
  }
  
  export const columnas = [
  
    operaciones('Operaciones', 'operaciones', 'left', 100),
    estructura('ID', 'id'),
    estructura('Acronimo', 'acronimo'),
    estructura('Nombre', 'nombre'),
    estructura('Region', 'region'),
    estructura('Responsable', 'responsable'),
    estructura('Prioridad', 'prioridad'),
    estructura('Ultima Actualizacion', 'ultima'),
  
  ];
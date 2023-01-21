
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
  alcance: "Alcance",
  codigo: "Codigo",
  fuente: "Fuente",
  region: "Oriente",
  servidor: "Servidor",
  fecha: "5/11/2022"
};

  function estructura(title, dataIndex, fixed, width) {
    if(fixed !== 'left'){
      return { 
        title: title, 
        dataIndex: dataIndex, 
        key: dataIndex,
      };
    }
    else{
      return{
        title: title,
        key: dataIndex,
        fixed: fixed,
        width: width,
        render: () => 
          <>
            <Link to={`/aplicaciones/app/${prueba.id}`} style={{margin: '0 10px 0 10px', fontSize: '18px'}}
              onClick={(e) => { console.log(e.target) }}
              state={prueba} >
                <FaEye />
            </Link>
            <Link to={`/aplicaciones/actualizacion/${prueba.id}`} style={{margin: '0 10px 0 10px', fontSize: '18px'}}
              onClick={(e) => { console.log(e.target) }}
              state={prueba} >
                <FaEdit />
            </Link>
          </>
      }
    }
  }
  
  export const columnas = [
  
    estructura('Operaciones', 'operaciones', 'left', 100),
    estructura('ID', 'id'),
    estructura('Acronimo', 'acronimo'),
    estructura('Nombre', 'nombre'),
    estructura('Region', 'region'),
    estructura('Responsable', 'responsable'),
    estructura('Prioridad', 'prioridad'),
    estructura('Ultima Actualizacion', 'ultima'),
  
  ];

  export const datosTabla = [
  { 
    id: 100,
    acronimo: "Acronimo de la aplicacion 1",
    nombre: "Nombre de la aplicacion",
    region: "Oriente",
    responsable: "Nombre del responsable",
    prioridad: "Alta",
    ultima: "5/11/2022",
  },
  { 
    id: 200,
    acronimo: "Acronimo de la aplicacion 2",
    nombre: "Nombre de la aplicacion",
    region: "Centro",
    responsable: "Nombre del responsable",
    prioridad: "Media",
    ultima: "5/11/2024",
  },
  { 
    id: 300,
    acronimo: "Acronimo de la aplicacion 3",
    nombre: "Nombre de la aplicacion",
    region: "Andina",
    responsable: "Nombre del responsable",
    prioridad: "Baja",
    ultima: "5/11/2020",
  }
];
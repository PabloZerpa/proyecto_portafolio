
import { Link } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";

// -------------------- FUNCION PARA GENERAR LAS COLUMNAS DE LA BARRA LATERAL --------------------

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
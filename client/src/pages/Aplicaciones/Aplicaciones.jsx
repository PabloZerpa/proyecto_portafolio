
import { useState } from "react";
import { Container } from "../../components";
import { Busqueda } from "../../container"
import Autorizacion from "../../services/auth.service";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const columns = [
  {
		name: 'Acciones',
		button: true,
		cell: row => 
    <div className="flex gap-8">
      <Link to={row ? `/aplicaciones/${row.aplicacion_id}` : `/dashboard`} >
        <FaEye className="text-blue-500 text-lg" />
      </Link>
      
      {Autorizacion.obtenerUsuario.rol === 'user' ? 
        <Link to={row ? `/administracion/actualizacion/${row.aplicacion_id}` : `/dashboard`} >
          <FaEdit className="text-blue-500 text-lg" />
        </Link>
      : 
        null
      }
      
    </div>,
	},
  {
      name: 'ID',
      selector: row => row.aplicacion_id,
      sortable: true,
      left: true,
      width: '60px'
  },
  {
      name: 'Acronimo',
      selector: row => row.apl_acronimo,
      sortable: true,
      left: true
  },
  {
      name: 'Nombre',
      selector: row => row.apl_nombre,
      sortable: true,
      left: true,
      width: '150px'
  },
  {
      name: 'Version',
      selector: row => row.apl_version,
      sortable: true,
      left: true,
      width: '100px'
  },
  {
    name: 'Alcance',
    selector: row => row.alcance,
    sortable: true,
    left: true
},
  {
      name: 'Estatus',
      selector: row => row.estatus,
      sortable: true,
      left: true,
      width: '150px'
  },
  {
      name: 'Prioridad',
      selector: row => row.prioridad,
      sortable: true,
      left: true
  },
  {
      name: 'Direccion',
      selector: row => row.apl_direccion,
      sortable: true,
      left: true
  },
  {
      name: 'Region',
      selector: row => row.region,
      sortable: true,
      left: true
  },
  {
    name: 'Critico',
    selector: row => row.apl_critico,
    sortable: true,
    left: true,
  },
  {
    name: 'Codigo Fuente',
    selector: row => row.apl_codigo_fuente,
    sortable: true,
    left: true,
  },
  {
      name: 'Mantenimiento',
      selector: row => row.man_frecuencia,
      sortable: true,
      left: true
  },
];

const paginacionOpciones = {
  rowsPerPageText: 'Filas por Pagina',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos'
}

function Aplicaciones() {

  const [pagina, setPagina] = useState(1);
  const [count, setCount] = useState('');
  const [resultado, setResultado] = useState('');
  const rol = Autorizacion.obtenerUsuario().rol;

  const obtenerPagina = (respuesta) => {setPagina(respuesta); };
  const obtenerCount = (respuesta) => {setCount(respuesta); };
  const obtenerResultado = (respuesta) => {setResultado(respuesta)};

  return (
    <Container>

      <Busqueda 
        manejarBusqueda={obtenerResultado}
        manejarCount={obtenerCount}
        pagina={pagina ? pagina : 1}
      />

      {resultado ? (
        <div className="w-[1080px]">
          <DataTable
            columns={columns}
            data={resultado}
            pagination
            paginationComponentOptions={paginacionOpciones}
            paginationRowsPerPageOptions={[10,20,30,50,100]}
            noDataComponent={"SIN RESULTADOS"}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover
            pointerOnHover
            dense
          />
        </div>
      ) : (null)}

      {/* {resultado ? (
        <Tabla 
          columnas={rol === 'admin' ? columnasAdminSimple : columnasUserSimple}
          datos={resultado} 
          opciones={(Autorizacion.obtenerUsuario().rol==='admin') ? true : false} 
          paginacion={true} 
          count={count}
          manejarPagina={obtenerPagina}
        />
      ) : (
        <div></div>
      )} */}

    </Container>
  )
};

export default Aplicaciones;
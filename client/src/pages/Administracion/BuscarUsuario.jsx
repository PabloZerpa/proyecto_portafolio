
import { useState, useEffect } from "react";
import { Button, Container } from "../../components/";
import { FaArrowLeft, FaCheckCircle, FaEdit, FaSearch, FaTimesCircle } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import Autorizacion from '../../services/auth.service';
import Usuario from "../../services/usuario.service";
import { Notificacion } from "../../utils/Notificacion";
import { opcionCargo, opcionGerencia, opcionRol } from "../../services/campos.service";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

function BuscarUsuario() {

  const navigate = useNavigate();
  function navegar(ruta) { navigate(ruta) }

  // VARIABLES PARA LA BUSQUEDA
  const [searchTerm, setSearchTerm] = useState("a");
  const [resultados, setResultados] = useState([]);
  const [debounceValue] = useDebounce(searchTerm, 500);

  const [rol, setRol] = useState("");
  const [gerencia, setGerencia] = useState("");
  const [cargo, setCargo] = useState("");
  const [edicion, setEdicion] = useState("");

  const habilitar = (dato) => {
    setEdicion(dato.usuario_id); 
    setRol(dato.rol); 
    setGerencia(dato.gerencia);
    setCargo(dato.cargo);
  }

  // VARIABLES PARA LA PAGINA
  const [pagina, setPagina] = useState(1);
  const obtenerPagina = (respuesta) => {setPagina(respuesta);};

  // FUNCION PARA BUSCAR AL ESCRIBIR EN EL INPUT
  useEffect(() => {

    if (debounceValue)
      onSearch(debounceValue);
    else
      setResultados(null) 
    
  }, [debounceValue, pagina]);

  // FUNCION PARA BUSCAR DATOS EN LA DATABASE
  const onSearch = async (termino) => {
    try {
      const datos = await Usuario.obtenerUsuarios(termino,pagina);
      setResultados(datos.data); 
      console.log(datos.data);
    } catch (error) { 
      console.log('ERROR AL BUSCAR DATOS') 
    }
  }

  // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
  async function updateData(e) {
    e.preventDefault();
    try {
      
      if(Autorizacion.obtenerUsuario().rol === 'admin'){

        const datoModificacion = { edicion, rol, gerencia, cargo };
        await Usuario.actualizarUsuario(datoModificacion); 
        onSearch(debounceValue);
        Notificacion('USUARIO MODDIFICADO EXITOSAMENTE', 'success');
        habilitar('','','','');
      }
    }
    catch (error) { 
      console.log(error);
      Notificacion(error.response.data.message, 'error');
    }
  }

  // SELECT PERSONALIZADO
  const selectCampo = (opciones,elemento) => {
    return (
        <select 
            className={`w-full p-2 bg-gray-50 border border-solid border-blue-500 text-gray-900 text-xs text-center rounded-md`} 
            onChange={(e) => {elemento(e.target.value)}}
        >
            {opciones.map((opcion, index) => {
                if(index === 0)
                    return <option key={index} value={opcion} disabled selected>{opcion}</option>
                else
                    return <option key={index} value={opcion}>{opcion}</option>
            })}
        </select>
    )
  }

  // FUNCION PARA VERIFICAR Y ELEGIR SELECT SEGUN LA OPCION SELECCIONADA
  const verificarCampo = (campo, valor) => {

    if(campo === 'Rol')
      return (selectCampo(opcionRol,setRol));
    else if(campo === 'Gerencia')
      return (selectCampo(opcionGerencia,setGerencia));
    else if(campo === 'Cargo')
      return (selectCampo(opcionCargo,setCargo));
    else
      return (<td key={campo} className="px-2 py-2 flex justify-center items-center">{valor}</td>)
  }

  const deleteUser = async (row) => {
    try {
      console.log(row);
      if(Autorizacion.obtenerUsuario().rol === 'admin'){

        if (window.confirm(`Estas seguro eliminar: ${row.indicador}?`)){
          await Usuario.eliminarUsuario(row.usuario_id); 
          onSearch(debounceValue);
          Notificacion('USUARIO ELIMINADO EXITOSAMENTE', 'success');
        }
      }
    }
    catch (error) { 
      console.log(error);
      Notificacion(error.response.data.message, 'error');
    }
  }

  const columns = [
    {
      name: 'Editar',
      button: true,
      cell: row => 
        <div>
          {edicion === row.usuario_id ?
            (<FaCheckCircle 
              onClick={updateData} 
              className="ml-3 text-green-500 text-lg cursor-pointer"
            />)
              :
            (<FaEdit 
              onClick={(e) => habilitar(row)}
              className="text-blue-500 text-lg" 
            />)
          }
        </div>
    },
    {
        name: 'ID',
        selector: row => row.usuario_id,
        sortable: true,
        left: true,
        width: "60px"
    },
    {
        name: 'Indicador',
        selector: row => row.indicador,
        sortable: true,
        left: true
    },
    {
        name: 'Rol',
        selector: row => 
          <did>
            {edicion === row.usuario_id ? 
              ( verificarCampo('Rol',row.rol) ) 
              : 
              ( row.rol )
            }
          </did>,
        sortable: true,
        left: true
    },
    {
        name: 'Gerencia',
        selector: row =>
          <did>
            {edicion === row.usuario_id ? 
              ( verificarCampo('Gerencia',row.gerencia) ) 
              : 
              ( row.gerencia )
            }
          </did>,
        sortable: true,
        left: true
    },
    {
        name: 'Cargo',
        selector: row =>
          <did>
            {edicion === row.usuario_id ? 
              ( verificarCampo('Cargo',row.cargo) ) 
              : 
              ( row.cargo )
            }
          </did>,
        sortable: true,
        left: true
    },
    {
      name: 'Remover',
      button: true,
      cell: row => 
        <div>
          <FaTimesCircle
              onClick={() => deleteUser(row)} 
              className="ml-3 text-red-500 text-lg cursor-pointer"
          />
        </div>,
      center: true
    },
  ];


  return (
    <Container>
      <h2 className='font-bold text-lg'>Buscar Usuarios</h2>

      <form className='flex justify-center items-center flex-row gap-4 p-4 bg-zinc-400 border-solid rounded'>

        <div className="relative w-96">
          <input 
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block p-2 pr-12 w-96 text-xs text-black bg-white rounded border-none outline-none" 
            placeholder="Buscar" />
          <button 
            type="button" 
            className="absolute top-0 right-0 p-2 h-8 text-xs font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">          
            <FaSearch />
          </button>
        </div>

      </form>

      {resultados ? (
        <div className="w-2/3">
          <DataTable
            columns={columns}
            data={resultados}
            highlightOnHover
            pointerOnHover
            dense
          />
        </div>
      ) : 
      (null)}

      <div className="flex gap-16">
        <Button color='blue' width={32} manejador={(e) => navegar(-1)} ><FaArrowLeft />Volver</Button>
      </div>

    </Container>
  )

};
export default BuscarUsuario;
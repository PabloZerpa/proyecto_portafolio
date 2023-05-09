
import { useState, useEffect } from "react";
import { Button, Container, Tabla } from "../../components/";
import { FaArrowLeft, FaEdit, FaSearch, FaTimesCircle } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import Autorizacion from '../../services/auth.service';
import Usuario from "../../services/usuario.service";
import { Notificacion } from "../../utils/Notificacion";
import { useNavigate } from "react-router-dom";
import ActualizarUsuario from "./ActualizarUsuario"; 
import swal from "sweetalert";

function BuscarUsuario() {

  // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
  const navigate = useNavigate();
  function navegar(ruta) { navigate(ruta) };

  // =================== VARIABLES PARA LA BUSQUEDA ===================
  const [resultados, setResultados] = useState([]);
  const [searchTerm, setSearchTerm] = useState(' ');
  const [debounceValue] = useDebounce(searchTerm, 500);

  // =================== VARIABLES PARA LA EDICION ===================
  const [usuario, setUsuario] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  // =================== FUNCION PARA HABILITAR VENTANA MODAL DE EDICION ===================
  const habilitar = (dato) => {
    setIsOpen(!isOpen);
    setUsuario(dato); 
  }

  // =================== FUNCION PARA BUSCAR DATOS EN LA DATABASE ===================
  const onSearch = async (termino) => {
    try {
      const datos = await Usuario.obtenerUsuarios(termino);
      setResultados(datos.data); 
    } catch (error) { 
      console.log('ERROR AL BUSCAR DATOS') 
    }
  }

  // =================== FUNCION PARA BUSCAR AL ESCRIBIR EN EL INPUT ===================
  useEffect(() => {
    if (debounceValue)
      onSearch(debounceValue);
    else
      setResultados(null) 
  }, [debounceValue, update]);
  
  // =================== FUNCION PARA ELIMINAR USUARIO ===================
  const eliminarUsuario = async (row) => {
    try {
      if(Autorizacion.obtenerUsuario().rol === 'admin'){
        await Usuario.eliminarUsuario(row.usuario_id); 
        onSearch(debounceValue);
        Notificacion('USUARIO ELIMINADO EXITOSAMENTE', 'success');
      }
    }
    catch (error) { 
      Notificacion(error.response.data.message, 'error');
    }
  }

  const columns = [
    {
      name: 'Editar',
      button: true,
      cell: row => 
        <div>
          <FaEdit 
            onClick={(e) => habilitar(row)}
            className="text-blue-500 text-lg" 
          />
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
        selector: row => row.rol,
        sortable: true,
        left: true
    },
    {
        name: 'Gerencia',
        selector: row => row.gerencia,
        sortable: true,
        left: true
    },
    {
        name: 'Cargo',
        selector: row => row.cargo,
        sortable: true,
        left: true
    },
    {
      name: 'Remover',
      button: true,
      cell: row => 
        <div>
          <FaTimesCircle
              onClick={() => {
                swal({
                  text: `¿Esta seguro de Eliminar a ${row.indicador}?`,
                  icon: 'warning',
                  buttons: {
                    cancel: {
                      text: "Cancel",
                      value: false,
                      visible: true,
                      className: "bg-red-600 text-white outline-none border-none hover:bg-red-500",
                    },
                    confirm: {
                      text: "Aceptar",
                      value: true,
                      visible: true,
                      className: "bg-blue-600 text-white outline-none border-none hover:bg-blue-500",
                    }
                  },
                }).then((result) => {
                  if (result)
                    eliminarUsuario(row);
                })
              }} 
              className="ml-3 text-red-500 text-lg cursor-pointer"
          />
        </div>,
      center: true
    },
  ];

  // =================== FUNCION PARA MOSTRAR LOAD EN TABLA DE BUSQUEDA ===================
  const [pending, setPending] = useState(true);
  const loading = () => { 
      const timeout = setTimeout(() => { setPending(false) }, 500);
      return () => clearTimeout(timeout);
  }

  useEffect(() => {
      setPending(true);
      loading();
  }, [resultados]);


  return (
    <Container>

      {/* --------------- VENTANA MODAL PARA ACTUALIZAR DATOS --------------- */}
      {isOpen ? (
          <div className="fixed w-full max-w-2xl max-h-full z-50 overflow-y-auto">
            <ActualizarUsuario 
              setIsOpen={setIsOpen} 
              valores={usuario ? usuario : null}
              setUpdate={setUpdate}
            />
          </div>
                
      ) : (null) }

      <h2 className='font-bold text-lg'>Buscar Usuarios</h2>

      <form className='flex justify-center items-center spacex-4 p-4 bg-zinc-400 border-solid rounded'>

        <div className="relative w-96">
          <input 
            type="search"
            onChange={(e) => {e.target.value === '' ? setSearchTerm(' ') : setSearchTerm(e.target.value)}}
            className="block p-2 pr-12 w-96 text-xs text-black bg-white rounded border-none outline-none" 
            placeholder="Buscar" 
          />

          <button 
            type="button" 
            className="absolute top-0 right-0 p-2 h-8 text-xs font-medium text-white 
              bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">          
            <FaSearch />
          </button>
        </div>

      </form>

      {/* --------------- SI HAY RESULTADOS, MUESTRA LA TABLA --------------- */}
      {resultados ? (
        <div className="w-[360px] md:w-[600px] lg:w-[800px]">
          <Tabla columnas={columns} datos={resultados} pending={pending} />
        </div>
      ) : 
      (null)}

      <div className="flex gap-16">
        <Button width={32} manejador={(e) => navegar(-1)} ><FaArrowLeft />Volver</Button>
      </div>

    </Container>
  )

};
export default BuscarUsuario;
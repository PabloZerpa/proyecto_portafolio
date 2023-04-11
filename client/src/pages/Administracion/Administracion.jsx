
import { useState, useEffect } from "react";
import { Container, Notificacion, Select, Tabla } from "../../components/";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import Usuarios from "../../services/user.service";
import Tabla2 from "../../components/Tabla2";

const campos = ['Seleccione','Acronimo', 'Nombre', 'Estatus', 'Prioridad','Alcance','Codigo_Fuente', 
'Critico','Licencia','Cantidad_Usuarios','Cliente','Region','Plataforma','Lenguaje','Framework'];

function Administracion() {

  // VARIABLES PARA LA BUSQUEDA
  const [searchTerm, setSearchTerm] = useState("");
  const [resultados, setResultados] = useState([]);
  const [debounceValue] = useDebounce(searchTerm, 500);

  // VARIABLES LOS CAMPOS DE LA TABLA Y QUERY
  const [campo, setCampo] = useState(null);
  const [campoTabla, setCampoTabla] = useState(null);

  // VARIABLES PARA LA PAGINA
  const [pagina, setPagina] = useState(1);
  const obtenerPagina = (respuesta) => {setPagina(respuesta); console.log('PAGINA EN ADMINISTRACION: ' + pagina)};

  // FUNCION PARA ASIGNAR DATOS DEL SELECT
  const handleInputChange = (e) => {
    if(e.target.value === 'Plataforma' || e.target.value === 'Framework' || 
        e.target.value === 'Lenguaje' || e.target.value === 'Region')
      setCampo(e.target.value);
    else
      setCampo(`apl_${e.target.value}`);
    
    setCampoTabla(e.target.value);
    onSearch(searchTerm,campo);
  }
  

  // FUNCION PARA BUSCAR AL ESCRIBIR EN EL INPUT
  useEffect(() => {
    if (debounceValue) {
      if(campo || campoTabla)
        onSearch(debounceValue,campo);
    } 
    else { 
      setResultados(null) 
    }
  }, [debounceValue, campo, campoTabla, pagina]);

  // FUNCION PARA BUSCAR DATOS EN LA DATABASE
  const onSearch = async (value,campo) => {
    try {
      const datos = await Usuarios.obtenerPorCampo(value,campo,pagina);
      setResultados(datos.data); 
      console.log(resultados);
    } catch (error) { 
      console.log('ERROR AL BUSCAR DATOS') 
    }
  }


  return (
    <Container>
      <h2 className='font-bold text-lg'>Actualizacion por Campo</h2>

      <form className='flex justify-center items-center flex-row gap-4 p-4 bg-zinc-400 border-solid rounded'>

        <div className="relative w-96">
          <input 
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block p-2 pr-12 w-96 text-xs text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
          <button 
            type="submit" 
            className="absolute top-0 right-0 p-2 h-8 text-xs font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">          
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-gray-900">
          <select 
            name='campos'
            className="w-32 p-2 text-gray-900 bg-gray-50 text-xs border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            onChange={handleInputChange}
          >
            {campos.map((opcion, index) => {
              if(index === 0)
                return <option key={index} disabled selected value={opcion}>{opcion}</option>
              else
                return <option key={index} value={opcion}>{opcion}</option>
            })}
          </select>
        </div>

      </form>

      {resultados ? (
        <Tabla2 
          columnas={['ID','Acronimo','Nombre',campoTabla, 'Editar']} 
          datos={resultados} 
          paginacion={true} 
          campo={campo} 
          devolverPagina={obtenerPagina} />
      ) : (
        <div></div>
      )}

    </Container>
  )

};
export default Administracion;
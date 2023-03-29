
import { useState, useEffect } from "react";
import { Container, Select, Tabla } from "../../components/";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import Usuarios from "../../services/user.service";
import Autorizacion from "../../services/auth.service";
import Tabla2 from "../../components/Tabla2";

const campos = ['Acronimo', 'Nombre', 'Estatus', 'Prioridad','Alcance','Codigo_Fuente', 
'Licencia','Cantidad_Usuarios','Plataforma','Lenguaje','Framework','Cliente','Region'];

function Administracion() {
  
    const [searchTerm, setSearchTerm] = useState("");
    const [resultados, setResultados] = useState([]);
    const [debounceValue] = useDebounce(searchTerm, 500);
    const [campo, setCampo] = useState('acronimo');

    const handleInputChange = (e) => {
        console.log(e.target.value);
        if(e.target.value === 'Plataforma' || e.target.value === 'Framework' || e.target.value === 'Lenguaje')
          setCampo(e.target.value);
        else
          setCampo(`apl_${e.target.value}`);

        onSearch(searchTerm,campo);
    }

    useEffect(() => {
      if (debounceValue) {
        onSearch(debounceValue,campo);
      } 
      else { setResultados(null) }
    }, [debounceValue, campo]);

    const onSearch = async (value,campo) => {
      try {
        const datos = await Usuarios.obtenerPorCampo(value,campo);
        console.log(campo);

        setResultados(datos.data);
        console.log(resultados); 

      } catch (error) { console.log('ERROR AL BUSCAR DATOS') }
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

          <Select name='campos' direccion="row" busqueda={true} opciones={campos} manejador={handleInputChange} />
        </form>

        {resultados ? (
          // <Tabla datos={resultados} opciones={(rol==='admin') ? true : false} />
          <Tabla2 columnas={['ID','Acronimo','Nombre',campo, 'Editar']} datos={resultados} paginacion={true} campo={campo} />
        ) : (
          <div></div>
        )}

      </Container>
    )
};
export default Administracion;
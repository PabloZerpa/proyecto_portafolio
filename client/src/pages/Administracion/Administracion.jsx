
import { useState, useEffect } from "react";
import { Container, Select, Tabla } from "../../components/";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import Usuarios from "../../services/user.service";
import Autorizacion from "../../services/auth.service";
import Tabla2 from "../../components/Tabla2";

const campos = ['acronimo', 'nombre', 'descripcion', 'estatus',
    'prioridad', 'responsable', 'tipo', 'negocio', 'clientes', 
    'plataforma', 'alcance', 'codigo', 'lenguaje', 'licencia'];

function Administracion() {
  
    const [searchTerm, setSearchTerm] = useState("");
    const [resultados, setResultados] = useState([]);
    const [debounceValue] = useDebounce(searchTerm, 500);
    const [campo, setCampo] = useState('acronimo');

    const handleInputChange = (e) => {
        console.log(e.target.value);
        setCampo(e.target.value);
        onSearch(searchTerm,campo);
    }

    useEffect(() => {
      if (debounceValue) {
        onSearch(debounceValue,campo);
      } 
      else { setResultados(null) }
    }, [debounceValue]);

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

        <h2 className='font-bold'>Actualizacion por Campo</h2>

        <form className='flex justify-center items-center flex-row gap-4 p-4 bg-zinc-400 border-solid rounded'>

          <div className="relative w-96">
            <input 
              type="search"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block p-2 pr-12 w-96 text-sm text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
            <button 
              type="submit" 
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">          
              <FaSearch />
            </button>
          </div>

          <Select name='campos' busqueda={true} opciones={campos} manejador={handleInputChange} />
        </form>

        {resultados ? (
          // <Tabla datos={resultados} opciones={(rol==='admin') ? true : false} />
          <Tabla2 columnas={['ID','Acronimo','Nombre',campo, 'Editar']} datos={resultados} campo={campo} />
        ) : (
          <div></div>
        )}

      </Container>
    )
};
export default Administracion;

// import { useState, useEffect } from "react";
// import { Container, Select } from "../../components/";
// import { FaSearch } from "react-icons/fa";
// import { useDebounce } from "use-debounce";
// import Usuarios from "../../services/user.service";
// import Autorizacion from "../../services/auth.service";
// import Tabla2 from "../../components/Tabla2";

// const campos = ['Elija campo','acronimo', 'nombre', 'descripcion', 'estatus',
//     'prioridad', 'responsable', 'tipo', 'negocio', 'clientes', 
//     'plataforma', 'alcance', 'codigo', 'lenguaje', 'licencia'];

// function Administracion() {

//     const [searchTerm, setSearchTerm] = useState("");
//     const [resultados, setResultados] = useState([]);
//     const [debounceValue] = useDebounce(searchTerm, 500);

//     const [campo, setCampo] = useState('acronimo');
//     const obtenerCampo = (respuesta) => { 
//       setCampo(respuesta);
//       onSearch(searchTerm,campo);
//      };

//     useEffect(() => {
//       if (debounceValue) {
//         onSearch(debounceValue,campo);
//       } 
//       else { setResultados(null) }
//     }, [debounceValue]);
  
//     const onSearch = async (value,campo) => {
//       try {
//         const datos = await Usuarios.obtenerPorCampo(value,campo);
//         console.log(campo);
  
//         setResultados(datos.data);
//         console.log(resultados); 

//       } catch (error) { console.log('ERROR AL BUSCAR DATOS') }
//     }

//     return (
//       <Container>

//         <h2 className='font-bold text-lg'>Actualizacion por Campo</h2>

//         <form className='flex justify-center items-center flex-row gap-4 p-4 bg-zinc-400 border-solid rounded'>
          
//           <div className="relative w-96">
//             <input 
//               type="search"
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="block p-2 pr-12 w-96 text-sm text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
//             <button 
//               type="submit" 
//               onClick={(e) => {e.preventDefault(); onSearch(debounceValue,campo)}}
//               className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">          
//               <FaSearch />
//             </button>
//           </div>

//           <Select name='campos' busqueda={true} opciones={campos} manejador={obtenerCampo} />
//         </form>

//         {resultados ? (
//           // <Tabla datos={resultados} opciones={(rol==='admin') ? true : false} />
//           <Tabla2 columnas={['ID','Acronimo','Nombre',campo, 'Editar']} datos={resultados} campo={campo} />
//         ) : (
//           <div></div>
//         )}

//       </Container>
//     )
// };

// export default Administracion;
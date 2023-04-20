
import { useState, useEffect } from "react";
import { Container } from "../../components/";
import { FaCheckCircle, FaEdit, FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import Autorizacion from '../../services/auth.service';
import Usuario from "../../services/usuario.service";
import { Link } from "react-router-dom";
import { opcionGerencia, opcionRol } from "../../services/campos.service";

const columnas = ['Editar','ID','Indicador','Rol','Gerencia'];

function BuscarUsuario() {

  // VARIABLES PARA LA BUSQUEDA
  const [searchTerm, setSearchTerm] = useState("");
  const [resultados, setResultados] = useState([]);
  const [debounceValue] = useDebounce(searchTerm, 500);

  const [rol, setRol] = useState("");
  const [gerencia, setGerencia] = useState("");
  const [edicion, setEdicion] = useState(null);

  const habilitar = (dato) => {
    setEdicion(dato.usuario_id); 
    setRol(dato.rol); 
    setGerencia(dato.gerencia);
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
    } catch (error) { 
      console.log('ERROR AL BUSCAR DATOS') 
    }
  }

  // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
  async function updateData(e) {
    e.preventDefault();
    try {
      
      if(Autorizacion.obtenerUsuario().rol === 'admin'){

        const datoModificacion = { edicion, rol, gerencia };
        await Usuario.actualizarUsuario(4, datoModificacion); 
        habilitar('','','');
      }
    }
    catch (error) { 
      console.log(error);
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
      return (selectCampo(opcionRol,valor,setRol));
    else if(campo === 'Gerencia')
      return (selectCampo(opcionGerencia,valor,setGerencia));
    else
      return (<td key={campo} className="px-2 py-2">{valor}</td>)
  }


  return (
    <Container>
      <h2 className='font-bold text-lg'>Buscar Usuarios</h2>

      <form className='flex justify-center items-center flex-row gap-4 p-4 bg-zinc-400 border-solid rounded'>

        <div className="relative w-96">
          <input 
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block p-2 pr-12 w-96 text-xs text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
          <button 
            type="button" 
            className="absolute top-0 right-0 p-2 h-8 text-xs font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">          
            <FaSearch />
          </button>
        </div>

      </form>

      {resultados ? (
        <table className="w-1/2 table-auto border-separate w-full text-xs text-center text-gray-700 shadow-md">
          <thead className="text-xs text-gray-700 font-bold bg-zinc-200 uppercase">
                          
            <tr className="bg-zinc-200 border-b hover:bg-zinc-300">
              {columnas.map((dato,index) => { 
                  return  <td key={index} scope="col" className="px-1 py-1">{dato}</td> 
              })}    
            </tr>
                          
          </thead>
              
          <tbody>
            {resultados.map((dato, index) => { 
              let valores = Object.values(dato);

              {edicion===dato.usuario_id ? 
                valores.unshift(
                <Link to='' className='text-lg' state={dato} >
                  <FaCheckCircle
                    onClick={updateData}
                    className="ml-3 text-green-500 text-lg cursor-pointer"
                  />
                  </Link>)
                :
                  valores.unshift(
                  <Link to='' className='text-lg' state={dato} >
                    <FaEdit 
                      onClick={(e) => habilitar(dato)}
                      className="ml-3 text-blue-500 text-lg cursor-pointer" 
                    />
                  </Link>)
              }

              return (
                <tr key={index} className="bg-white border-b hover:bg-gray-100">
                  {valores.map((valor, index) => {
                    
                    return (
                      <td>
                        {edicion!==dato.usuario_id ? (
                          <td key={index} className="px-2 py-2">{valor}</td>
                        ) : (
                          verificarCampo(columnas[index],dato,valor)
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

          </tbody>
        </table>
      ) : (
          <div></div>
      )}

    </Container>
  )

};
export default BuscarUsuario;
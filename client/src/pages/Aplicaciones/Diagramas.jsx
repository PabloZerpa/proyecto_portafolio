
import { useState, useEffect } from "react";
import { Container, Button, Select } from "../../components";
import { useDebounce } from "use-debounce";
import { BiLoaderAlt } from "react-icons/bi";
import Barra from "../../chart/Barra";
import Circulo from "../../chart/Circulo";
import Usuarios from "../../services/user.service";
import Radio from "../../components/Radio";

const opcionCategoria = ['Plataforma', 'Region', 'Estatus', 'Prioridad', 'Registro', 'Modificacion'];
const opcionOrden = ['Porcentaje', 'Cantidad', 'Tiempo', 'Interrelacion'];

function Diagramas() {

    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [resultados, setResultados] = useState([]);
    const [debounceValue] = useDebounce(searchTerm, 500);

    // const [categoria, setCategoria] = useState('region');
    // const obtenerCategoria = (respuesta) => { setCategoria(respuesta) };
    // const [orden, setOrden] = useState('porcentaje');
    // const obtenerOrden = (respuesta) => { setOrden(respuesta) };

    const [datos, setDatos] = useState({
        categoria: '',
        orden: '',
    });

    const handleInputChange = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const { categoria, orden } = datos;
        const cat = categoria.toLowerCase();
        const ord = orden.toLowerCase();
        console.log(cat,ord)
        onSearch(cat,ord);
    }

    const onSearch = async (categoria,orden) => {
        console.log(categoria);
        console.log(orden);
      try {
        const datos = await Usuarios.datosGraficos(categoria,orden);
        console.log(Object.keys(datos.data).length);
        console.log(categoria,orden);
  
        setResultados(datos.data);
        console.log(resultados); 
      } catch (error) { console.log('ERROR AL BUSCAR DATOS') }
    }
      
    return (
        <Container>
            
            <h2 className='font-bold text-lg'>Generar graficos</h2>

            <form className='grid gap-2 grid-cols-1 p-4 bg-zinc-400 border-solid rounded'>
                <Radio label='Categoria' name='categoria' opciones={opcionCategoria} manejador={handleInputChange} size='big' />
                <Radio label='Ordernar' name='orden' opciones={opcionOrden} manejador={handleInputChange} size='big' />
                <Button accion={handleSearch}>Generar</Button>
            </form>

            {isLoading ? (
                <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
            ) : (
            <>
              <Barra />
              <Circulo />
            </>
            )}
            
      </Container>
    )
};

export default Diagramas;

import { useState, useEffect } from "react";
import { Container, Button } from "../../components";
import { useDebounce } from "use-debounce";
import { BiLoaderAlt } from "react-icons/bi";
import Barra from "../../chart/Barra";
import Circulo from "../../chart/Circulo";
import Aplicacion from "../../services/aplicacion.service";
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
        onSearch(cat,ord);
    }

    const onSearch = async (categoria,orden) => {
      try {
        const datos = await Aplicacion.datosGraficos(categoria,orden);
        setResultados(datos.data);
        
      } catch (error) { console.log('ERROR AL BUSCAR DATOS') }
    }
      
    return (
        <Container>
            
            <h2 className='font-bold text-lg'>Generar graficos</h2>

            <form className='flex flex-col items-center space-y-4 p-4 bg-zinc-400 border-solid rounded'>
                <Radio label='Categoria' name='categoria' opciones={opcionCategoria} manejador={handleInputChange} size='small' />
                <Radio label='Ordernar' name='orden' opciones={opcionOrden} manejador={handleInputChange} size='small' />
                <Button color='blue' manejador={handleSearch}>Generar</Button>
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
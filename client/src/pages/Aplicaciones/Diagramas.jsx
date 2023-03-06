
import { useState, useEffect } from "react";
import { Barra, Circulo, Container, RadioButton, Button, Select } from "../../components";
import { BiLoaderAlt } from "react-icons/bi";
import { useDebounce } from "use-debounce";
import Usuarios from "../../services/user.service";
import Radio from "../../components/Radio";

const opcionCategoria = ['Tipo', 'Region', 'Estatus', 'Prioridad', 'Registro', 'Modificacion'];
const opcionOrden = ['Porcentaje', 'Cantidad', 'Tiempo', 'Interrelacion'];
/*const opcionEstatus = ['Todas', 'Desarrollo', 'Mantenimiento', 'Desincorporada', 'Estabilizacion',
    'Sin Uso', 'Anulado', 'Visaulizacion', 'Prueba'];
const opcionRegion = ['Todas', 'Centro', 'Centro Norte', 'Centro Sur', 'Oriente',
    'Oriente Norte', 'Oriente Sur', 'Occidente Norte', 'Occidente Sur', 'Carabobo', 
    'Andes', 'Metropolitana','Faja','Exterior','Por Determinar'];
const opcionTipo = ['Todas', 'Web', 'Escritorio', 'Mobil', 'Servidor', 'Mixta'];*/

function Diagramas() {

    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [resultados, setResultados] = useState([]);
    const [debounceValue] = useDebounce(searchTerm, 500);

    const [categoria, setCategoria] = useState('region');
    const obtenerCategoria = (respuesta) => { setCategoria(respuesta) };
    const [orden, setOrden] = useState('porcentaje');
    const obtenerOrden = (respuesta) => { setOrden(respuesta) };

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(categoria,orden);
    }

    const onSearch = async (categoria,orden) => {
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
                <Radio label='Categoria' opciones={opcionCategoria} manejador={obtenerCategoria} size='big' />
                <Radio label='Ordernar' opciones={opcionOrden} manejador={obtenerOrden} size='big' />
                <button onClick={handleSearch}>Generar</button>
                {/* <Button color='blue'>Generar</Button> */}

                {/*<div className='grid grid-cols-3' >
                    <Select campo='Region' name='region' busqueda={true} opciones={opcionRegion} />
                    <Select campo='Estatus' name='estatus' busqueda={true} opciones={opcionEstatus} />
                    <Select campo='Tipo' name='tipo' busqueda={true} opciones={opcionTipo} />
                    <Select campo='Prioridad' name='prioridad' busqueda={true} opciones={['Alta','Media','Baja']} />
                    <Select campo='Periodo' name='periodo' busqueda={true} opciones={['2023','2022','2021','2020','2019','2018']} />
                </div>*/}
            </form>

            {isLoading ? (
                <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
            ) : (
            <>
              <Barra />

              <Circulo />
            </>
                )
            }
            
      </Container>
    )
};

export default Diagramas;
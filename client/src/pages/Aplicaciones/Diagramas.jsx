
import { useState, useEffect } from "react";
import { Container, Button } from "../../components";
import { useDebounce } from "use-debounce";
import { BiLoaderAlt } from "react-icons/bi";
import Barra from "../../chart/Barra";
import Circulo from "../../chart/Circulo";
import Linea from "../../chart/Linea";
import Radio from "../../components/Radio";
import Usuario from "../../services/usuario.service";
import Opciones from "../../utils/Opciones";

const opcionCategoria = ['Region', 'Plataforma', 'Estatus', 'Prioridad', 'Modificacion'];
const opcionMostrar = ['Cantidad', 'Porcentaje', 'Tiempo'];


function Diagramas() {

    const [isLoading, setIsLoading] = useState(false);
    const [resultados, setResultados] = useState('');
    const [claves, setClaves] = useState('');

    const [regiones, setRegiones] = useState('');
    const [estatus, setEstatus] = useState('');
    const [plataformas, setPlataformas] = useState('');
    const [prioridades, setPrioridades] = useState('');
    const [meses, setMeses] = useState('');

    async function establecerDatos(){ 
        setRegiones(await Opciones('regiones')); 
        setEstatus(await Opciones('estatus')); 
        setPlataformas(await Opciones('plataformas')); 
        setPrioridades(['SELECCIONE','BAJA', 'MEDIA', 'ALTA']); 
        setMeses(['SELECCIONE','ENERO', 'FEBERERO', 'MARZO','ABRIL','MAYO', 'JUNIO',
        'JULIO','AGOSTO','SEQPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']); 
    }

    useEffect(() => { establecerDatos(); }, []);

    const [datos, setDatos] = useState({
        categoria: 'region',
        mostrar: 'cantidad',
    });

    const setValores = (e) => {
        const valor = e.target.value.toLowerCase();
        setDatos({ ...datos, [e.target.name] : valor });
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const { categoria, mostrar } = datos;
        console.log(categoria, mostrar);

        setResultados(null);
        onSearch(categoria, mostrar);
    }

    const onSearch = async (categoria,mostrar) => {
      try {
        const {data} = await Usuario.obtenerCantidadRegiones(categoria,mostrar);

        setResultados(data.cantidad);

        if(data.clave === 'region')
            setClaves(regiones);
        else if(data.clave === 'plataforma')
            setClaves(plataformas);
        else if(data.clave === 'estatus')
            setClaves(estatus);
        else if(data.clave === 'prioridad')
            setClaves(prioridades);
        else if(data.clave === 'modificacion')
            setClaves(meses);
        
      } catch (error) { console.log('ERROR AL BUSCAR DATOS') }
    }
      
    return (
        <Container>
            
            <h2 className='font-bold text-lg'>Generar graficos</h2>

            <form className='flex flex-col items-center space-y-4 p-4 bg-zinc-400 border-solid rounded' onSubmit={handleSearch}>
                <Radio label='Categoria' name='categoria' opciones={opcionCategoria} manejador={setValores} size='small' />
                <Radio label='Mostrar' name='mostrar' opciones={opcionMostrar} manejador={setValores} size='small' />
                <Button tipo="submit">Generar</Button>
            </form>

            {isLoading ? (
                <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
            ) : (
            <>
                {resultados && datos.mostrar === 'cantidad' ? 
                    ( <Barra datos={resultados} categoria={datos.categoria} claves={claves} /> ) 
                    : 
                    ( null )
                }
              
                {resultados  && datos.mostrar === 'porcentaje' ? 
                    ( <Circulo datos={resultados} categoria={datos.categoria} claves={claves} /> ) 
                    : 
                    ( null )
                }

                {resultados  && datos.mostrar === 'tiempo' ? 
                    ( <Linea datos={resultados} categoria={datos.categoria} claves={claves} /> ) 
                    : 
                    ( null )
                }
              
            </>
            )}
            
      </Container>
    )
};

export default Diagramas;
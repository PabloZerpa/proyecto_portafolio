
import { useState } from "react";
import { FaSearch, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Container, Select, Button } from "../../components/";
import Tabla3 from "../../components/Table3";

const columnas = ['ID','Tipo','Objetivo','Estatus','Descripcion','Fecha','Ver'];
const resultados = [
    {id:'10',tipo:'CREACION',objetivo:'APLICACION',estatus:'APROBADA',descripcion:'aaaaaaaaaaaaaa',fecha:'11/5/2020',
        editar:
        <Link to={`/administracion/solicitudes/${1}`}>
            <FaEye className="text-base text-blue-500 cursor-pointer ml-4" />
        </Link>},
    {id:'24',tipo:'MODIFICACION',objetivo:'APLICACION',estatus:'REVISION',descripcion:'bbbbbbbbbbbbbbbbbbbbbb',fecha:'6/8/2014',
        editar:
        <Link to={`/administracion/solicitudes/${2}`}>
            <FaEye className="text-base text-blue-500 cursor-pointer ml-4" />
        </Link>},
    {id:'38',tipo:'DESINCORPORACION',objetivo:'BASE DE DATOS',estatus:'RECHAZADA',descripcion:'cccc',fecha:'21/4/2022',
        editar:
        <Link to={`/administracion/solicitudes/${3}`}>
            <FaEye className="text-base text-blue-500 cursor-pointer ml-4" />
        </Link>},
];

function Solicitudes() {

    const [datos, setDatos] = useState({
        acronimo: '',
        estatus: '',
        nombre: '',
        prioridad: '',
    });

    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    return(
        <Container>

            <h2 className='font-bold text-lg'>Lista de Solicitudes</h2>

            <form className="w-3/4 bg-zinc-400 p-4 mb-4 rounded drop-shadow-md" >

                <div className='flex justify-between items-center flex-row gap-2 py-4 bg-zinc-400 border-solid rounded'>
                    <div className="flex gap-4">

                        <div className="relative w-96">
                            <input 
                                type="search"
                                className="block p-2 pr-12 w-96 text-sm text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
                            <button 
                                type="submit" 
                                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">          
                                <FaSearch />
                            </button>
                        </div>

                        <Select
                            name='campos' 
                            direccion="row" 
                            busqueda={true} 
                            opciones={['NUEVA','APROBADA','RECHAZADA','REVISION']} 
                            manejador={handleInputChange} 
                        />
                    </div>
                        
                    <Link to={`/administracion/crearsolicitud`} className='text-lg' >
                        <Button>Crear</Button>
                    </Link>
                </div>
            </form>

            <Tabla3 columnas={columnas} datos={resultados} paginacion={true} />

        </Container>
    );
}

export default Solicitudes;


import { Container } from "../../components/";
import { FaDatabase, FaServer, FaCode, FaHardHat } from "react-icons/fa";
import { Link } from "react-router-dom";

function Registrar() {
 
    return(
        <Container>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <Link to="/administracion/registro/aplicacion" className="flex items-center justify-between w-72 mb-4 mx-4 p-4 text-gray-600 bg-white border-2 border-white rounded-lg cursor-pointer hover:text-blue-500 hover:border-blue-500">            
                    <div className="block">
                        <FaCode className="text-2xl" />
                        <div className="w-full text-lg font-semibold">Registrar Aplicacion</div>
                    </div>
                </Link>

                <Link to="/administracion/registro/basedatos" className="flex items-center justify-between w-72 mb-4 mx-4 p-4 text-gray-600 bg-white border-2 border-white rounded-lg cursor-pointer hover:text-blue-500 hover:border-blue-500">            
                    <div className="block">
                        <FaDatabase className="text-2xl" />
                        <div className="w-full text-lg font-semibold">Registrar Base de datos</div>
                    </div>
                </Link>

                <Link to="/administracion/registro/servidor" className="flex items-center justify-between w-72 mb-4 mx-4 p-4 text-gray-600 bg-white border-2 border-white rounded-lg cursor-pointer hover:text-blue-500 hover:border-blue-500">            
                    <div className="block">
                        <FaServer className="text-2xl" />
                        <div className="w-full text-lg font-semibold">Registrar Servidor</div>
                    </div>
                </Link>

                <Link to="/administracion/registro/custodio" className="flex items-center justify-between w-72 mb-4 mx-4 p-4 text-gray-600 bg-white border-2 border-white rounded-lg cursor-pointer hover:text-blue-500 hover:border-blue-500">            
                    <div className="block">
                        <FaHardHat className="text-2xl" />
                        <div className="w-full text-lg font-semibold">Registrar Custodio</div>
                    </div>
                </Link>
            </ul>
        </Container>
    );
}

export default Registrar;
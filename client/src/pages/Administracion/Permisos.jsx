

import { Container } from "../../components/";
import { FaUserEdit, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";


function Permisos() {

    return(
        <Container>
            <ul className="grid grid-cols-1 md:grid-cols-2 space-y-12 md:space-x-8 md:space-y-0 mt-16">
                <Link to="/administracion/permisos/crear" className="flex items-center justify-between w-72 p-4 text-gray-600 bg-white border-2 border-white rounded-lg cursor-pointer hover:text-blue-500 hover:border-blue-500">            
                    <div className="block">
                        <FaUserPlus className="text-2xl" />
                        <div className="w-full text-lg font-semibold">Crear Usuario</div>
                    </div>
                </Link>

                <Link to="/administracion/permisos/buscar" className="flex items-center justify-between w-72 p-4 text-gray-600 bg-white border-2 border-white rounded-lg cursor-pointer hover:text-blue-500 hover:border-blue-500">            
                    <div className="block">
                        <FaUserEdit className="text-2xl" />
                        <div className="w-full text-lg font-semibold">Editar Usuario</div>
                    </div>
                </Link>
            </ul>
        </Container>
    );
}

export default Permisos;
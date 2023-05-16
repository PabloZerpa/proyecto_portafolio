import { Link } from "react-router-dom";



const Card = ({titulo, icono, datos, link}) => {

    return (
        <div className={`relative w-60 p-4 bg-gray-200 border border-blue-400 rounded-lg shadow`}>
            <h5 className="flex justify-start mb-2 z-10 text-2xl font-bold text-gray-900">
                {titulo}
            </h5>

            <p className="mb-3 text-xl font-bold text-gray-900">
                {`Total: ${datos}`}
            </p>

            <Link to={link} className={`inline-flex items-center px-3 py-2 
            text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800`}>
                Buscar
            </Link>

            <div className="absolute bottom-2 right-4 z-0 text-5xl text-slate-800/20">
                {icono}
            </div>
        </div>
    );
};

export default Card;
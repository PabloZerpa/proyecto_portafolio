
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Paginacion({del=1,al=10,total=100, devolver=null}) {

    const [pagina, setPagina] = useState(1);

    const cambioPagina = () => {
        if(devolver)
            devolver(pagina);
    }

    const siguiente = () => {
        setPagina(pagina+1);
    }

    const anterior = () => {
        if(pagina>1)
            setPagina(pagina-1);
    }

    useEffect(() => {
        cambioPagina();
    }, [pagina])

    return(
        <div className="flex flex-col items-center my-4">
            <span className="text-xs text-gray-800">
                Resultados del
                <span className="font-semibold text-gray-900"> {del}</span> al 
                <span className="font-semibold text-gray-900"> {al}</span>
                {/* <span className="font-semibold text-gray-900"> {total}</span> Resultados */}
            </span> 
            <div className="inline-flex mt-2 xs:mt-0">
                <button 
                    onClick={anterior}
                    className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900">
                    <FaArrowLeft />
                    Anterior
                </button>
                <button 
                    onClick={siguiente}
                    className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-white bg-gray-800 border-l border-gray-700 rounded-r hover:bg-gray-900">
                    Siguiente
                    <FaArrowRight />                
                </button>
            </div>
            
            <p>{pagina}</p>
        </div>
    );
}

export default Paginacion;
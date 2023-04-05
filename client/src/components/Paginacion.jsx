
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Paginacion({paginaAnterior, paginaSiguiente, del=1,al=10,total=100}) {

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
                    onClickCapture={paginaAnterior}
                    className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900">
                    <FaArrowLeft />
                    Anterior
                </button>
                <button 
                    onClickCapture={paginaSiguiente}
                    className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-white bg-gray-800 border-l border-gray-700 rounded-r hover:bg-gray-900">
                    Siguiente
                    <FaArrowRight />                
                </button>
            </div>
        </div>
    );
}

export default Paginacion;
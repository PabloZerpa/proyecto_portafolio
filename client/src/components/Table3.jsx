
import Paginacion from "./Paginacion";

function Tabla3({columnas, datos, paginacion=false}) {

    return (
        <div className="relative mx-8 mb-4 sm:rounded">
            <table className="table-auto border-separate w-full text-xs text-center text-gray-700 shadow-md">
                <thead className="text-xs text-gray-700 font-bold bg-zinc-200 uppercase">
                    
                    <tr className="bg-zinc-200 border-b hover:bg-zinc-300">
                        {columnas.map((columna,index) => { return  <td key={index} scope="col" className="px-2 py-2">{columna}</td> }) }
                    </tr> 
                    
                </thead>
                <tbody>
                    {datos.map((dato, index) => { 
                        console.log(dato);
                        const valor = Object.values(dato);
                        return (
                            <tr key={index} className="bg-white border-b hover:bg-gray-100">
                                {valor.map((valor, index) => {
                                    return ( <td key={index} className="px-2 py-2">{valor}</td> )
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {paginacion ? ( <Paginacion />) : (null)}

        </div>
    );
}

export default Tabla3;

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function Select({campo, name, width='full', opciones, manejador}) {

    const [clase, setClase] = useState(
        `w-${width} p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500`
    )

    const onHandle = (valor) => {
        manejador(valor);
    }
    
    return(
        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900'>
            <label>{campo}</label>
            <select 
                name={name}
                placeholder={campo}
                onChange={(e) => {onHandle(e.target.value)}}
                className={clase}>
                    {opciones.map((opcion) => {
                        return <option value={opcion}>{opcion}</option>
                    })}
            </select>
        </div>
    );
}

export default Select;
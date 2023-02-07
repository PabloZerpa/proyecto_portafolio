
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function Select({campo, name, opciones, manejador}) {

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
                className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500'>
                    {opciones.map((opcion) => {
                        return <option value={opcion}>{opcion}</option>
                    })}
            </select>
        </div>
    );
}

export default Select;
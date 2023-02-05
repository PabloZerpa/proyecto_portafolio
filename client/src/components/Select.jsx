
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function Select({campo, opciones}) {
    
    return(
        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900'>
            <label>{campo}</label>
            <select 
                name={campo}
                placeholder={campo}
                className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500'>
                    {opciones.map((opcion) => {
                        return <option value={opcion}>{opcion}</option>
                    })}
            </select>
        </div>
    );
}

export default Select;
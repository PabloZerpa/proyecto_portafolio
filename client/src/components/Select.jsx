
import { useState } from "react";

function Select({campo, name, busqueda=false, opciones, manejador}) {

    const [clase, setClase] = useState(
        `w-full p-2.5 text-gray-900 bg-gray-50 border-none text-sm rounded-md focus:ring-blue-500 focus:border-blue-500`
    )
    const [clase2, setClase2] = useState(
        `w-32 p-2 text-gray-900 bg-gray-50 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500`
    )

    const onHandle = (valor) => { manejador(valor==='Todas' ? null : valor) }
    
    return(
        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900'>
            <label>{campo}</label>
            <select 
                name={name}
                placeholder={campo}
                onChange={(e) => {onHandle(e.target.value)}}
                className={busqueda ? clase2 : clase}>
                    {opciones.map((opcion) => {
                        return <option value={opcion}>{opcion}</option>
                    })}
            </select>
        </div>
    );
}

export default Select;
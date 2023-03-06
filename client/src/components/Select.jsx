
import { useState } from "react";

function Select({campo, name, propiedad=null, busqueda=false, opciones, manejador}) {

    const [claseSelect, setClaseSelect] = useState(
        `w-full p-2.5 text-gray-900 bg-gray-50 border-none text-sm rounded focus:ring-blue-500 focus:border-blue-500`
    )
    const [claseSelect2, setClaseSelect2] = useState(
        `w-32 p-2 text-gray-900 bg-gray-50 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500`
    )
    const [clase, setClase] = useState(
        `flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6`
    )
    const [clase2, setClase2] = useState(
        `flex flex-col gap-2 text-sm font-medium text-gray-900`
    )

    const onHandle = (e) => { 
        manejador(e);
    }
    
    return(
        <div className={busqueda ? clase2 : clase} >
            <label>{campo}</label>
            <select 
                name={name}
                placeholder={campo}
                defaultValue={propiedad}
                onChange={(e) => {onHandle(e)}}
                className={busqueda ? claseSelect2 : claseSelect} 
            >

                {opciones.map((opcion, index) => {

                    if(opcion == propiedad){
                        return <option selected value={opcion}>{opcion}</option>
                    }
                    else{
                        return <option value={opcion}>{opcion}</option>
                    }
                })}

            </select>
        </div>
    );
}

export default Select;
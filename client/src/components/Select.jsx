
function Select({campo, name, direccion='col', opciones, propiedad=null, busqueda=false, manejador}) {
 
    const clase = `flex flex-${direccion} items-start gap-2 text-xs font-medium text-gray-900 mb-4`;
    const clase2 = `flex flex-${direccion} items-start gap-2 text-xs font-medium text-gray-900`;
    const claseSelect = `w-full p-2 text-gray-900 bg-gray-50 text-xs border-none rounded focus:ring-blue-500 focus:border-blue-500`
    const claseSelect2 = `w-32 p-2 text-gray-900 bg-gray-50 text-xs border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500`
 
    const onHandle = (e) =>  manejador(e); 
     
    return(
        <div className={busqueda ? clase2 : clase} >
            <label>{campo}</label>
            <select 
                name={name}
                placeholder={campo}
                defaultValue={propiedad}
                className={busqueda ? claseSelect2 : claseSelect} 
                onChange={(e) => {onHandle(e)}}
            >
                {opciones.map((opcion, index) => {
                    if(opcion === propiedad)
                        return <option key={index} value={opcion} selected>{opcion}</option>
                    else
                        if(index === 0)
                            return <option key={index} value={opcion} disabled selected>{opcion}</option>
                        else
                            return <option key={index} value={opcion}>{opcion}</option>
                })} 

            </select>
        </div>
    );
}

export default Select;

function Radio({label, name=label, opciones, manejador, size='small'}) {

    const largo = opciones.length;
    const small = `flex items-center justify-center w-18 h-8 p-2 text-gray-500 bg-white border border-gray-100 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`;
    const smallLeft = `flex items-center justify-center w-18 h-8 p-2 text-gray-500 bg-white border border-gray-100 rounded-l cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`;
    const smallRight = `flex items-center justify-center w-18 h-8 p-2 text-gray-500 bg-white border border-gray-100 rounded-r cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`;
    const big = `flex items-center justify-center w-28 h-10 p-2 text-gray-500 bg-white border border-gray-100 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`;
    const bigLeft = `flex items-center justify-center w-28 h-10 p-2 text-gray-500 bg-white border border-gray-100 rounded-l cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`;
    const bigRight = `flex items-center justify-center w-28 h-10 p-2 text-gray-500 bg-white border border-gray-100 rounded-r cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`;
    

    return(
        <div className="flex flex-col items-center justify-center text-sm font-medium">
            <span className="text-xs font-medium text-gray-900">{label}</span>

            <ul className="flex text-sm m-0 p-2 mr-1">

                {opciones.map((opcion, index) => {
                    const labelId = `${label}${index}`;
                    if(index===0){
                        return(
                            <li key={index}>
                                <input 
                                    type="radio" 
                                    id={labelId}
                                    name={name}
                                    value={opcion}
                                    className="hidden peer" 
                                    defaultChecked
                                    onChange={(e) => {manejador(e)}}
                                />
                                <label htmlFor={labelId} className={size==='small' ? smallLeft : bigLeft} >                           
                                    <div className="text-xs font-semibold">{opcion}</div>
                                </label>
                            </li>
                        )
                    }
                    else if(index===(largo-1)){
                        return(
                            <li key={index}>
                                <input 
                                    type="radio" 
                                    id={labelId}
                                    name={name}
                                    value={opcion}
                                    className="hidden peer" 
                                    onChange={(e) => {manejador(e)}}
                                />
                                <label htmlFor={labelId} className={size==='small' ? smallRight : bigRight} >                           
                                    <div className="text-xs font-semibold">{opcion}</div>
                                </label>
                            </li>
                        )
                    }
                    else{
                        return(
                            <li key={index}>
                                <input 
                                    type="radio" 
                                    id={labelId}
                                    name={name}
                                    value={opcion}
                                    className="hidden peer" 
                                    onChange={(e) => {manejador(e)}}
                                />
                                <label htmlFor={labelId} className={size==='small' ? small : big} >                           
                                    <div className="text-xs font-semibold">{opcion}</div>
                                </label>
                            </li>
                        )
                    }
                    
                })}
            </ul>
        </div>
    );
}

export default Radio;


function RadioButton({label, opciones, manejador}) {

    const onHandle = (valor) => { manejador(valor) }

    return(
        <div className="flex flex-col text-sm">
            <h4>{label}</h4>
            <ul className="h-8 flex items-center gap-2 m-0 p-2 mr-4 text-sm font-medium list-none text-gray-900 bg-trasparent border-solid border border-zinc-500 rounded">
                {opciones.map((opcion, index) => {
                    return(
                        <li className="w-full">
                            <div className="flex items-center gap-1">
                                <input
                                    type="radio" 
                                    name={label}
                                    value={opcion==='Todas' ? null : opcion}
                                    onChange={(e) => {onHandle(e.target.value)}} 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" 
                                />
                                <label className="w-full text-sm font-medium text-gray-900">{opcion}</label>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default RadioButton;
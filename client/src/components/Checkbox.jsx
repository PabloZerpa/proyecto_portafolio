
function Checkbox({id, name, opciones, manejador}) {

    const onHandle = (e) => manejador(e);

    return(
        <div className="flex gap-2 list-none">
            {opciones.map((opcion,index) => {
                return(
                    <li className="flex justify-center items-center gap-2 list-none" key={index}>
                        <input 
                            type="checkbox" 
                            id={id}
                            name={name}
                            value={id}
                            onChange={(e) => {onHandle(e)}}
                        />
                        <label for={id}>                           
                            <div className="text-sm font-semibold">{opcion}</div>
                        </label>
                    </li>
                )
                
            })}
        </div>
    );
}

export default Checkbox;
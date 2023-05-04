
function Checkbox({id, name, opciones, manejador}) {

    return(
        <div className="flex space-x-2 list-none">
            {opciones.map((opcion,index) => {
                return(
                    <li className="flex justify-center items-center space-x-2 list-none" key={index}>
                        <input 
                            type="checkbox" 
                            id={id}
                            name={name}
                            value={id}
                            onChange={(e) => {manejador(e)}}
                        />
                        <label htmlFor={id}>                           
                            <div className="text-sm font-semibold">{opcion}</div>
                        </label>
                    </li>
                )
                
            })}
        </div>
    );
}

export default Checkbox;
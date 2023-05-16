

function Input({campo, name, direccion='col', editable=true, propiedad=null, manejador, required=false}) {

    const clase = `flex flex-${direccion} items-start space-y-2 text-xs font-medium text-gray-900 mb-4`;
    const labelClase = `w-full`;
    const inputClase = `w-full p-2 bg-gray-50 border-none text-gray-900
        text-xs rounded focus:ring-blue-500 focus:border-blue-500`

    if(editable===true){
        if(required){
            return (
                <div className={clase}>
                    <label className={labelClase}>{campo}</label>
                    <input
                        type='text'
                        name={name}
                        className={inputClase} 
                        placeholder={campo} 
                        defaultValue={propiedad} 
                        onChange={(e) => {manejador(e)}}
                        required
                    />
                </div>
            );
        }
        else{
            return (
                <div className={clase}>
                    <label className={labelClase}>{campo}</label>
                    <input
                        type='text'
                        name={name}
                        className={inputClase} 
                        placeholder={campo} 
                        defaultValue={propiedad} 
                        onChange={(e) => {manejador(e)}}
                    />
                </div>
            );
        }
    }
    else{
        return (
            <div className={clase}>
                <label className={labelClase}>{campo}</label>
                <input
                    type='text'
                    className={inputClase}  
                    value={propiedad ? propiedad : ''} 
                    readOnly 
                />
            </div>
        );
    }

    
}

export default Input;
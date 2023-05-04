

function TextArea({campo, name, direccion='col', editable=true, propiedad=null, manejador, required=false}) {

    const clase = `flex flex-${direccion} items-start space-x-2 text-xs font-medium text-gray-900 mb-4`;
    const labelClase = `w-20`;
    const inputClase = `w-full p-2 bg-gray-50 border-none text-gray-900 uppercase
        text-xs rounded focus:ring-blue-500 focus:border-blue-500` 

    if(editable===true){
        if(required){
            return (
                <div className={clase}>
                    <label className={labelClase}>{campo}</label>
                    <textarea
                        rows={3}
                        name={name}
                        className={inputClase} 
                        placeholder={campo} 
                        defaultValue={propiedad} 
                        onChange={(e) => {manejador(e)}}
                        onKeyUp={(e) => e.target.value = e.target.value.toUpperCase()}
                        required
                    />
                </div>
            );
        }
        else{
            return (
                <div className={clase}>
                    <label className={labelClase}>{campo}</label>
                    <textarea
                        rows={3}
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
                <textarea
                    rows={3}
                    className={inputClase}  
                    value={propiedad ? propiedad : ''} 
                    readOnly 
                />
            </div>
        );
    }
    


    
}

export default TextArea;
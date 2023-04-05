
import { useState } from "react";

function Input({campo, name, area=false, direccion='col', editable=false, propiedad=null, manejador, size='small', detalles=false, peticionEstado}) {
    
    const clase = `flex flex-${direccion} items-center gap-2 text-xs font-medium text-gray-900 mb-4`;
    const labelClase = `w-20`;
    const inputClase = 'w-full p-2 bg-gray-50 border-none text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500' 
    const [open, setOpen] = useState(false);
    const handleDetalles = () => { setOpen(!open); peticionEstado(open); }

    const onHandle = (e) => manejador(e);

    if(area===false){

        if(editable===true){
            return (
                <div className={clase}>
                    <label className={labelClase}>{campo}</label>
                    <input
                        type='text'
                        name={name}
                        className={inputClase} 
                        placeholder={campo} 
                        defaultValue={propiedad} 
                        onChange={(e) => {onHandle(e)}}
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
                        className={inputClase}  
                        value={propiedad ? propiedad : ''} 
                        readOnly 
                    />
                </div>
            );
        }

    }
    else{

        if(editable===true){
            return (
                <div className={clase}>
                    <label className={labelClase}>{campo}</label>
                    <textarea
                        rows={3}
                        name={name}
                        className={inputClase} 
                        placeholder={campo} 
                        defaultValue={propiedad} 
                        onChange={(e) => {onHandle(e)}}
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
                        className={inputClase}  
                        value={propiedad ? propiedad : ''} 
                        readOnly 
                    />
                </div>
            );
        }

    }
}

export default Input;
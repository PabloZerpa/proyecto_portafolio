
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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
                        value={propiedad} 
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
                        value={propiedad} 
                        readOnly 
                    />
                </div>
            );
        }

    }

    // if(!editable){
    //     if(detalles){
    //         return (
    //             <div className='flex flex-col gap-2 text-sm font-medium text-gray-900'>
    //                 <label className={labelClase}>{campo}</label>
    //                 <input
    //                     className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500' 
    //                     value={propiedad} 
    //                     disabled  
    //                 />
    //                 <span className='text-xs cursor-pointer' onClick={handleDetalles}>
    //                     Detalles <FaChevronDown />
    //                 </span>
    //             </div>
    //         );
    //     }
    //     else{
    //         return (
    //             <div className='flex flex-col gap-2 text-sm font-medium text-gray-900'>
    //                 <label className={labelClase}>{campo}</label>
    //                 <input
    //                     className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500' 
    //                     value={propiedad} 
    //                     readOnly 
    //                 />
    //             </div>
    //         );
    //     }
    // }
    // else{
    //     if(area){
    //         return (
    //             <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6'>
    //                 <label className={labelClase}>{campo}</label>
    //                 <textarea
    //                     name={name}
    //                     rows={3}
    //                     className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500' 
    //                     placeholder={campo} 
    //                     defaultValue={propiedad} 
    //                     onChange={(e) => {onHandle(e)}}
    //                 />
    //             </div>
    //         );
    //     }
    //     else{
    //         return (
    //             <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6'>
    //                 <label className={labelClase}>{campo}</label>
    //                 <input
    //                     name={name}
    //                     className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500' 
    //                     placeholder={campo} 
    //                     defaultValue={propiedad} 
    //                     onChange={(e) => {onHandle(e)}}
    //                 />
    //             </div>
    //         );
    //     }
    // }
}

export default Input;
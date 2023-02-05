
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function Input({campo, propiedad=null, detalles=false, peticionEstado, editable=false, area=false}) {

    const [open, setOpen] = useState(false);
    const handleDetalles = () => {
        setOpen(!open);
        peticionEstado(open);
    }

    if(!editable){
        if(detalles){
            return (
                <div className='flex flex-col gap-2 text-sm font-medium text-gray-900'>
                    <label>{campo}</label>
                    <input 
                        className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500' 
                        value={propiedad} 
                        readOnly  
                    />
                    <span className='text-xs cursor-pointer' onClick={handleDetalles}>
                        Detalles <FaChevronDown />
                    </span>
                </div>
            );
        }
        else{
            return (
                <div className='flex flex-col gap-2 text-sm font-medium text-gray-900'>
                    <label>{campo}</label>
                    <input 
                        className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500' 
                        value={propiedad} 
                        readOnly 
                    />
                </div>
            );
        }
    }
    else{
        if(area){
            return (
                <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6'>
                    <label>{campo}</label>
                    <textarea
                        rows={3}
                        className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500' 
                        placeholder={campo} 
                        defaultValue={propiedad} 
                    />
                </div>
            );
        }
        else{
            return (
                <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6'>
                    <label>{campo}</label>
                    <input
                        className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500' 
                        placeholder={campo} 
                        defaultValue={propiedad} 
                    />
                </div>
            );
        }
    }
}

export default Input;

import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function Input({campo, name, propiedad=null, detalles=false, peticionEstado, editable=false, area=false, manejador}) {

    const [valor, setValor] = useState('');
    const [open, setOpen] = useState(false);
    const handleDetalles = () => { setOpen(!open); peticionEstado(open); }

    const onHandle = (valor) => {
        manejador(valor);
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
                        name={name}
                        rows={3}
                        className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500' 
                        placeholder={campo} 
                        defaultValue={propiedad} 
                        onChange={(e) => {onHandle(e.target.value)}}
                    />
                </div>
            );
        }
        else{
            return (
                <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6'>
                    <label>{campo}</label>
                    <input
                        name={name}
                        className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500' 
                        placeholder={campo} 
                        defaultValue={propiedad} 
                        onChange={(e) => {onHandle(e.target.value)}}
                    />
                </div>
            );
        }
    }
}

export default Input;
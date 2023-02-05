import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";


function BaseDatos() {

    const [password, setPassword] = useState('');
    const [indicador, setIndicador] = useState('');

    const [pop, setPop] = useState(true);
    const handlePop = () => { setPop(!pop) }

    useEffect(() => {
        if(pop){
            setTimeout(() => {
                setPop(!pop);
            }, "2000");
        }
    }, [pop])

    // -------------------- FUNCION PARA PROBAR DIRECTORIO ACTIVO --------------------
    async function handleAD(e) {
        e.preventDefault();

        if(password !== '' && indicador !== ''){
        try {
            const respuesta = await axios.post(`http://localhost:3001/api/user/ad`, {indicador,password});
            console.log(respuesta);
        } 
        catch (error) {
            console.log(error);
        }
        }
    } 

    return(
        <div className="flex w-full h-screen bg-zinc-300 m-0 p-0">
            <div className="w-full flex flex-col justify-start items-center gap-14 pt-44 pl-56" >

                

                <div class="relative flex justify-center flex-wrap">
                    <button
                        className="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" 
                        onClick={handlePop}>
                            Popover
                    </button>

                    <div style={pop ? {display: 'block'} : {display: 'none'}} className="absolute -top-20 w-24 bg-blue-400">
                        Este es el popover
                    </div>
                </div>

                <form onSubmitCapture={handleAD}>
                    <input type="text" placeholder="indicador" onChange={(e) => {setIndicador(e.target.value)}} />
                    <input type="text" placeholder="password" onChange={(e) => {setPassword(e.target.value)}} />
                    <input type="submit" />
                </form>

            </div>
        </div>

    )
};

export default BaseDatos;
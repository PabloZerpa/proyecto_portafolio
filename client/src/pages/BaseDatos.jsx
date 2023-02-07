import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaCheckCircle, FaTimes, FaGripLinesVertical, FaPaperclip, FaMapMarkerAlt, FaImage, FaCode, FaSmile, FaBars, FaCog, FaRegCalendarMinus, FaDownload } from "react-icons/fa";

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

                {/* <form>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-200">
                    <div className="flex items-center justify-between px-3 py-2 border-b">
                        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x">
                            <div className="flex items-center text-base space-x-1 sm:pr-4">
                                <div className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                    <FaPaperclip />
                                    <span className="sr-only">Attach file</span>
                                </div>
                                <div className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                    <FaMapMarkerAlt />
                                    <span className="sr-only">Embed map</span>
                                </div>
                                <div className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                    <FaImage />
                                    <span className="sr-only">Upload image</span>
                                </div>
                                <div className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                    <FaCode />
                                    <span className="sr-only">Format code</span>
                                </div>
                                <div className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                    <FaSmile />
                                    <span className="sr-only">Add emoji</span>
                                </div>
                            </div>

                            <div className="text-gray-500 text-2xl pb-2">|</div>

                            <div className="flex flex-wrap items-center space-x-1 sm:pl-4">
                                <div className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                    <FaBars />
                                    <span className="sr-only">Add list</span>
                                </div>
                                <div className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                    <FaCog />
                                    <span className="sr-only">Settings</span>
                                </div>
                                <div className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                    <FaRegCalendarMinus />
                                    <span className="sr-only">Timeline</span>
                                </div>
                                <div className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                    <FaDownload />
                                    <span className="sr-only">Download</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-b-lg">
                        <label for="editor" className="sr-only">Publish post</label>
                        <textarea id="editor" rows="8" className="block w-full px-0 text-sm text-gray-800 bg-white border-0" placeholder="Write an article..." required></textarea>
                    </div>
                </div>
                <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Publish post
                </button>
                </form> */}


                {/* <div className="relative flex justify-center flex-wrap">
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
                </form> */}

            </div>
        </div>

    )
};

export default BaseDatos;
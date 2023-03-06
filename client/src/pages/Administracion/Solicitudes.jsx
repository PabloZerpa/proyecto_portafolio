
import { useState } from "react";
import { FaCheckCircle, FaTimes, FaGripLinesVertical, FaPaperclip, FaMapMarkerAlt, FaImage, FaCode, FaSmile, FaBars, FaCog, FaRegCalendarMinus, FaDownload } from "react-icons/fa";
import { HiPaperAirplane } from 'react-icons/hi';
import { Container,Input,Select } from "../../components/";
import Radio from "../../components/Radio";

function Solicitudes() {

    const [datos, setDatos] = useState({
        acronimo: '',
        estatus: '',
        nombre: '',
        prioridad: '',
    });

    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    return(
        <Container>

            {/* <form >
                <input type="text" placeholder="Nombre" className="form-control" onChange={handleInputChange} name="nombre"></input>
                <input type="text" placeholder="Acronimo" className="form-control" onChange={handleInputChange} name="acronimo"></input>
                <button type='submit'>Enviar</button>
            </form> */}

            {/* <form>
                <div className="w-96 mb-4 border border-gray-200 rounded bg-gray-200">
                    <div className="flex items-center justify-center p-2 border-b">
                        <div className="flex flex-wrap items-center">
                            <div className="flex items-center text-base space-x-1">
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
                        <label for="editor" className="sr-only">Enviar</label>
                        <textarea id="editor" rows="8" className="block w-full px-0 text-sm text-gray-800 bg-white border-0" placeholder="Write an article..." required></textarea>
                    </div>
                </div>
                <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Enviar <HiPaperAirplane className='text-base' />
                </button>
            </form> */}

        </Container>
    );
}

export default Solicitudes;

import { useState, useEffect } from "react";
import { Button, Container, Input } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { Notificacion } from "../utils/Notificacion";
import Autorizacion from "../services/auth.service";
import { FaArrowLeft, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";


function CambioPassword() {
    
    const [datos, setDatos] = useState({});
    const {state} = useLocation();
    const { indicador, passwordVieja } = state;

    const [showPass1, setShowPass1] = useState(false);
    const handlePass1 = () => {setShowPass1(!showPass1)}

    const [showPass2, setShowPass2] = useState(false);
    const handlePass2 = () => {setShowPass2(!showPass2)}

    const [showPass3, setShowPass3] = useState(false);
    const handlePass3 = () => {setShowPass3(!showPass3)}

     // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
     const navigate = useNavigate();
     function navegar(ruta) { navigate(ruta) };

    // =================== FUNCION PARA OBTENER Y GUARDAR VALORES DEL LOS INPUTS ===================
    const setValores = (e) => {
        setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    // =================== CREAR USUARIOS ===================
    async function cambiarContraseña(e){
        e.preventDefault();

        try {
            if( (datos.passwordNueva === datos.passwordConfirm) && 
            (datos.password === passwordVieja) && 
            (datos.password !== datos.passwordNueva) ){

                const { password, passwordNueva } = datos;

                await Autorizacion.cambiarContraseña(indicador, passwordNueva);
                Notificacion('CONTRASEÑA CAMBIADA EXITOSAMENTE', 'success');
                setTimeout(() => { navegar("/") }, "500");
            }
        }
        catch (error) { 
            Notificacion(error.response.data.message, 'error');
        }
        
    }

    useEffect(() => {
        
    }, []);



    return (
        <div className='relative flex flex-col justify-center items-center w-full h-screen bg-zinc-300'>

                <form
                className='flex justify-center items-center flex-col space-y-6 w-96 mt-20 px-13 py-4 
                bg-zinc-100 font-medium list-none rounded-lg drop-shadow-md' onSubmit={cambiarContraseña}
                >
                    <h2 className='font-bold text-base'>Cambio de Contraseña</h2>

                    <li className="w-72 relative">

                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaLock />
                        </div>

                        <input 
                            type={showPass1 ? 'text' : 'password' } 
                            className="w-full h-10 pl-8 p-2 border-solid border-gray-400 outline-blue-500 rounded" 
                            name="password" 
                            placeholder="Contraseña Vieja" 
                            onChange={(e) => {setValores(e)}}
                            required 
                        />

                        <div 
                            className="text-black absolute inset-y-0 right-5 flex items-center bg-trasparent cursor-pointer "
                            onClick={handlePass1} >
                            { showPass1 ? <FaEye/> : <FaEyeSlash /> }
                        </div>
                    </li>

                    <li className="w-72 relative">

                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaLock />
                    </div>

                    <input 
                        type={showPass2 ? 'text' : 'password' } 
                        className="w-full h-10 pl-8 p-2 border-solid border-gray-400 outline-blue-500 rounded" 
                        name="passwordNueva" 
                        placeholder="Contraseña Nueva" 
                        onChange={(e) => {setValores(e)}}
                        required 
                    />

                    <div 
                        className="text-black absolute inset-y-0 right-5 flex items-center bg-trasparent cursor-pointer "
                        onClick={handlePass2} >
                        { showPass2 ? <FaEye/> : <FaEyeSlash /> }
                    </div>
                </li>

                <li className="w-72 relative">

                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaLock />
                    </div>

                    <input 
                        type={showPass3 ? 'text' : 'password' } 
                        className="w-full h-10 pl-8 p-2 border-solid border-gray-400 outline-blue-500 rounded" 
                        name="passwordConfirm" 
                        placeholder="Confirmar" 
                        onChange={(e) => {setValores(e)}}
                        required 
                    />

                    <div 
                        className="text-black absolute inset-y-0 right-5 flex items-center bg-trasparent cursor-pointer "
                        onClick={handlePass3} >
                        { showPass3 ? <FaEye/> : <FaEyeSlash /> }
                    </div>
                </li>

                    <li className='flex space-x-10'>
                        <Button width={32} manejador={(e) => navegar(-1)} ><FaArrowLeft />Volver</Button>
                        <input className='w-32 h-8 bg-blue-600 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-500' type='submit' value='Cambiar' />
                    </li>

                </form>
        </div>
    )
};

export default CambioPassword;
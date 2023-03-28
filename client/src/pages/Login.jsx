
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaUser, FaLock, FaHardHat, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Notificacion } from '../components/';
import Autorizacion from '../services/auth.service';

function Login() {
  
  const [password, setPassword] = useState('');
  const [indicador, setIndicador] = useState('');
  const [rol, setRol] = useState('');
  const [showPass, setShowPass] = useState(false);
  
  const [show, setShow] = useState(false);
  const [opcion, setOpcion] = useState('error');
  const [mensaje, setMensaje] = useState('error');

  const navigate = useNavigate();
  const handlePass = () => {setShowPass(!showPass)}

  useEffect(() => {
    if(show){
        setTimeout(() => { setShow(!show) }, "2000");
    }
  }, [show])


  // -------------------- FUNCION PARA INICIAR SESION --------------------
  async function handleLogin(e) {
    e.preventDefault();

    if(password.length > 7 && indicador !== ''){
      try {
        await Autorizacion.login(indicador,password);
        setOpcion('exito');
        setMensaje(indicador);
        setShow(true);
        
        setTimeout(() => {
          window.location.reload();
          navigate("/dashboard");
        }, "2000");
      } 
      catch (error) {
        if(error.response)
          setMensaje(error.response.data.message);
        else
          setMensaje('No responde el servidor');
        setOpcion('error');
        setShow(true);
      }
    }
  } 

  return (
    <div className='relative flex flex-col justify-center items-center w-full h-screen bg-zinc-300'>

      <div style={show ? {display: 'block'} : {display: 'none'}} className='absolute top-24' >
        <Notificacion opcion={opcion} mensaje={mensaje} />
      </div>

      <form
        className='flex justify-center items-center flex-col gap-6 w-96 mt-20 px-13 py-4 
        bg-zinc-100 font-medium list-none rounded-lg drop-shadow-md' 
        method="post" onSubmitCapture={handleLogin}
      >

        <FaUserCircle className='text-6xl text-blue-500' />

        <li className='relative w-72'>
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaUser />
          </div>
          <input 
            type="text" 
            name="indicador" 
            placeholder="Indicador"
            className='w-full h-10 pl-8 p-2 border-solid border-gray-400 outline-blue-500 rounded' 
            onChange={(e) => {setIndicador(e.target.value)}}
            required
          />
        </li>

        <li className="w-72 relative">

          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaLock />
          </div>

          <input 
            type={showPass ? 'text' : 'password' } 
            className="w-full h-10 pl-8 p-2 border-solid border-gray-400 outline-blue-500 rounded" 
            name="password" 
            placeholder="Password" 
            onChange={(e) => {setPassword(e.target.value)}}
            required 
          />

          <div 
            className="text-black absolute inset-y-0 right-5 flex items-center bg-trasparent cursor-pointer "
            onClick={handlePass} >
            { showPass ? <FaEye/> : <FaEyeSlash /> }
          </div>
        </li>


        {/* <li className='w-72 relative'>
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaHardHat />
          </div>

          <select 
            name="rol" 
            placeholder='Rol'
            className='w-full h-10 pl-8 p-2 border-solid border-gray-400 outline-blue-500 rounded'
            onChange={(e) => {setRol(e.target.value)}} >
            <option disabled selected>Rol</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </li> */}

        <li>
          <div className='flex gap-2 items-center text-sm font-bold'>
            <input type="checkbox" className='bg-gray-400 rounded' name="recordar" value="Recordar" />
            <span>Recordar</span>
          </div>
        </li>

        <li className='w-72'>
          <input className='w-full h-10 bg-blue-500 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-400' type='submit' value='Login' />
        </li>

      </form>
    </div>
  );
}

export default Login;
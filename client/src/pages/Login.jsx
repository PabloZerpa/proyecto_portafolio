
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Autorizacion from '../services/auth.service';
import Usuario from '../services/usuario.service';
import { Notificacion } from '../utils/Notificacion';
 
function Login() {
  
  const [password, setPassword] = useState('');
  const [indicador, setIndicador] = useState('');
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const handlePass = () => {setShowPass(!showPass)}

  async function iniciarUsuario(){
    try {
      const data = await Autorizacion.obtenerTotal();
      const total = data.data; 

      if(!total[0]){

        const datos = {
          indicador: 'admin',
          rol: 1,
          password: '12345678',
          nombre: 'USUARIO',
          apellido: 'DE INICIO',
          cargo: 1,
          gerencia: 1,
        }
        await Usuario.crearUsuario(datos);

      }
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    iniciarUsuario();
  }, []);

  // -------------------- FUNCION PARA INICIAR SESION --------------------
  async function iniciarSesion(e) {
    e.preventDefault();

    if(password.length > 7 && indicador !== ''){
      try {
        await Autorizacion.login(indicador,password);
        Notificacion('LOGIN EXITOSO', 'success');
        
        setTimeout(() => {
          window.location.reload();
          navigate("/dashboard");
        }, "2000");
      } 
      catch (error) {
        if(error.response)
          Notificacion(error.response.data.message, 'error');
        else
          Notificacion('No responde el servidor', 'error');
      }
    }
    else{
      Notificacion('DATOS INCOMPLETOS', 'warning');
    }
  } 

  return (
    <div className='relative flex flex-col justify-center items-center w-full h-screen bg-zinc-300'>

      <form
        className='flex justify-center items-center flex-col space-y-6 w-96 mt-20 px-13 py-4 
        bg-zinc-100 font-medium list-none rounded-lg drop-shadow-md' onSubmit={iniciarSesion}
      >

        <FaUserCircle className='text-6xl text-blue-500' />

        <li className='relative w-72'>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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

        <li className='w-72'>
          <input className='w-full h-10 bg-blue-500 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-400' type='submit' value='Login' />
        </li>

      </form>
    </div>
  );
}

export default Login;
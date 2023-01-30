
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Select, notification } from 'antd';
import { FaUserCircle, FaUser, FaLock, FaHardHat } from 'react-icons/fa';
import Autorizacion from '../services/auth.service';

function Login() {
  
  const [password, setPassword] = useState('');
  const [indicador, setIndicador] = useState('');
  const [rol, setRol] = useState('');
  const navigate = useNavigate();

  // ---------- FUNCION PARA LIMPIAR LOS STATES ----------
  const clearStates = () => {
    setIndicador('');
    setPassword('');
    setRol('');
  }

  // ---------- FUNCION PARA MOSTRAR STATUS DEL LOGIN ----------
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (tipo, msj, desc) => {
    api[tipo]({
      message: msj,
      description: desc,
      placement: 'top',
      duration: 2,
    });
  };

  // -------------------- FUNCION PARA INICIAR SESION --------------------
  async function handleLogin(e) {
    e.preventDefault();

    console.log(indicador, password, rol);

    if(password.length > 7 && indicador !== '' && rol !== ''){

      try {
        await Autorizacion.login(indicador,password,rol);
        clearStates();
        openNotification('success', 'Login Completado', `Bienvenido ${indicador}`);
        
        setTimeout(() => {
          window.location.reload();
          navigate("/dashboard");
        }, "2000")
      } 
      catch (error) {
        if(error.response)
          openNotification('error', 'Login Fallido', error.response.data.message);
        else
          openNotification('error', 'Login Fallido', 'No responde el servidor');
      }
    }

  }

  return (
    <div className='w-full h-screen bg-zinc-300 flex justify-center items-center'>
      
      {contextHolder}

      <form
        className='flex justify-center items-center flex-col gap-6 w-96 bg-gray-50 
        font-medium list-none mt-15 px-13 py-4 rounded-lg drop-shadow-md' 
        method="post" onSubmitCapture={handleLogin}
      >

        <FaUserCircle className='text-blue-500 text-6xl' />

        <li className='w-72 relative'>
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

        <li className='w-72 relative'>
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaLock />
          </div>
          <input 
            type="password" 
            name="password" 
            placeholder="Password"
            className='w-full h-10 pl-8 p-2 border-solid border-gray-400 outline-blue-500 rounded' 
            onChange={(e) => {setPassword(e.target.value)}}
            required
          />
        </li>

        <li className='w-72 relative'>
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaHardHat />
          </div>
          <select 
          name="rol" 
          placeholder='Rol'
          className='w-full h-10 pl-8 p-2 border-solid border-gray-400 outline-blue-500 rounded'
          onChange={(e) => {setRol(e.target.value)}}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </li>

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

      {/* <Form 
        className='flex justify-center items-center flex-col w-96 bg-gray-50 
        font-medium mt-15 px-13 py-4 rounded-lg drop-shadow-md' 
        onSubmitCapture={handleLogin} >

        <FaUserCircle className='text-blue-500 text-6xl mb-4' />
        
        <Form.Item className='w-72' name="indicador" rules={[{ required: true, message: 'Porfavor ingrese su indicador',},]} >
          <Input 
            size="large" 
            className='w-full'
            prefix={<FaUser />}
            placeholder="Indicador"
            onChange={(e) => {setIndicador(e.target.value)}}
          />
        </Form.Item>

        <Form.Item className='w-72' name="password" rules={[{ required: true, message: 'Porfavor ingrese su contraseña',},]} >
          <Input.Password 
            size="large" 
            className='w-full'
            prefix={<FaLock />}
            placeholder="Contraseña"
            minLength={8} maxLength={20}
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </Form.Item>

        <Form.Item className='w-72' name="rol" rules={[{ required: true, message: 'Porfavor ingrese su Rol', }]}>
          <Select
            size="large"
            className='w-full'
            placeholder="Rol"
            onChange={(e) => {setRol(e)}}
            options={[
              { value: 'user', label: 'User' },
              { value: 'admin', label: 'Admin' }
            ]}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="unchecked" >
          <Checkbox>Recordar</Checkbox>
        </Form.Item>

        <Form.Item className='w-72' >
          <Button className='w-full h-10' type="primary" htmlType="submit" >
            Login
          </Button>
        </Form.Item>

      </Form> */}
    </div>
  );
}

export default Login;
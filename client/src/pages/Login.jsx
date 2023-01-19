
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Select, notification } from 'antd';
import { FaUserCircle, FaUser, FaLock } from 'react-icons/fa';
import { Container } from '../styles/Login.style';
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

    if(password.length > 7 && indicador !== '' && rol !== ''){

      try {
        await Autorizacion.login(indicador,password,rol);
        clearStates();
        openNotification('success', 'Login Completado', `Bienvenido ${indicador}`);
        
        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
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
    <Container>
      {contextHolder}

      <Form className='form' onSubmitCapture={handleLogin} >

        <FaUserCircle style={{ color: '#1980da', fontSize: '64px', marginBottom: '16px' }} />
        
        <Form.Item className='formItem' name="indicador" rules={[{ required: true, message: 'Porfavor ingrese su indicador',},]} >
          <Input 
            size="large" 
            prefix={<FaUser />}
            placeholder="Indicador"
            onChange={(e) => {setIndicador(e.target.value)}}
          />
        </Form.Item>

        <Form.Item className='formItem' name="password" rules={[{ required: true, message: 'Porfavor ingrese su contraseña',},]} >
          <Input.Password 
            size="large" 
            prefix={<FaLock />}
            placeholder="Contraseña"
            minLength={8} maxLength={20}
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </Form.Item>

        <Form.Item className='formItem' name="rol" rules={[{ required: true, message: 'Porfavor ingrese su Rol', }]}>
          <Select
            size="large"
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

        <Form.Item className='formItem' >
          <Button type="primary" htmlType="submit" >
            Login
          </Button>
        </Form.Item>

      </Form>

    </Container>

  );
}

export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Checkbox, Form, Input, Select } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import styled from "styled-components";

function Login() {
  
  const [password, setPassword] = useState('');
  const [indicador, setIndicador] = useState('');
  const [rol, setRol] = useState('');
  const navigate = useNavigate();
  const clearForm = () => document.getElementById("loginForm").reset();

  // -------------------- FUNCION PARA INICIAR SESION --------------------
  async function handleLogin() {
    if(password.length > 7 && indicador.length !== '' && rol.length !== ''){

      localStorage.setItem("user", JSON.stringify({indicador,rol}));
      clearForm();
      navigate("/dashboard");
    }
  }

  return (
    <Container>

      <Form id='loginForm' className='form' method='POST' >

        <FaUserCircle style={{ color: '#1980da', fontSize: '64px', marginBottom: '16px' }} />

        <Form.Item label="Indicador" name="indicador" rules={[{ required: true, message: 'Porfavor ingrese su indicador',},]} >
          <Input 
            size="large" 
            placeholder="Indicador"
            className='input'
            onChange={(e) => {setIndicador(e.target.value)}}
          />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Porfavor ingrese su contraseña',},]} >
          <Input.Password 
            size="large" 
            placeholder="Contraseña"
            className='input'
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </Form.Item>

        <Form.Item name="rol" label="Rol" rules={[{ required: true }]}>
          <Select
            size="large"
            placeholder="Seleccione"
            className='input'
            onChange={(e) => {setRol(e)}}
            style={{ marginLeft: '38px' }}
            options={[
              { value: 'user', label: 'User' },
              { value: 'admin', label: 'Admin' }
            ]}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="unchecked" >
          <Checkbox>Recordar</Checkbox>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit" onClick={handleLogin} >
            Login
          </Button>
        </Form.Item>

      </Form>


    </Container>

  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  height: 720px;
  background: #c2c2c2;
  display: flex;
  justify-content: center;
  align-items: center;

  .form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #ffffff;
    font-weight: 500;
    margin-top: 120px;
    padding: 16px 54px 16px 54px;
    border-radius: 10px;
    box-shadow: 3px 3px 10px #9c9c9c;
    
    .input{
      width: 200px;
    }
  }
  
  button{
    width: 100px;
    height: 40px;
  }
`;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import styled from "styled-components";
import axios from "axios";
import AuthService from '../services/auth.service';

const baseUrl = 'http://localhost:3001/api/login';

function Login() {
  
  const [password, setPassword] = useState('');
  const [indicador, setIndicador] = useState('');
  const [rol, setRol] = useState('');
  const [token, setToken] = useState('');

  const navigate = useNavigate();
  const clearForm = () => document.getElementById("loginForm").reset();

  // -------------------- FUNCION PARA INICIAR SESION --------------------
  async function login() {
    
    /*if(password.length > 7 && indicador.length !== '' && rol.length !== ''){
      try {
        const { data } = await axios.post(baseUrl, {indicador: indicador,password: password,rol: rol,}, )

        document.cookie = `token=${data.token}; max-age=${60*3}; path=/; samesite=strict`;
        console.log(document.cookie);

        clearForm();
        navigate("/dashboard");

      } catch (error) {
        console.log(error);
      }
    }*/

    AuthService.login(indicador,password,rol)
      .then(() => {
          clearForm();
          navigate("/dashboard");
          window.location.reload();
      },);
  }

  return (

    <Container>
      
      <Form id='loginForm' className='form' method = 'POST' >

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
          <Button type="primary" htmlType="submit" onClick={login} >
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
  flex-direction: column;

  .form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 120px;

    .input{
      width: 200px;
    }
  }
  
  button{
    width: 100px;
    height: 40px;
  }
`;
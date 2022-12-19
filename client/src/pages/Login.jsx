import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Button, Checkbox, Form, Input, Avatar, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from "styled-components";
import Axios from "axios";

function Login() {

  const [password, setPassword] = useState('');
  const [indicador, setIndicador] = useState('');
  const [rol, setRol] = useState('');

  const navigate = useNavigate();
  const clearForm = () => document.getElementById("login-form").reset();

  function createPost() {
    if(password.length !== '' && indicador.length !== '' && rol.length !== ''){

      Axios.post('http://localhost:3001/api/auth/login', {
        indicador: indicador,
        password: password,
        rol: rol,
      })
      .then((cred) => {
        console.log(cred.data);
        document.cookie = `token=${cred.data.token}; max-age=${60*3}; path=/; samesite=strict`;
        console.log(document.cookie);
      })
      .then(() => {
        clearForm();
        navigate("/dashboard");
      });

    }
  }

  return (
    <Container>
      
      <Form id='login-form' className='form' >

        <Avatar size={64} style={{ backgroundColor: '#1980da', marginBottom: '16px' }} icon={<UserOutlined />} />

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
            onChange={(e) => {setRol(e.target.value)}}
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
          <Button type="primary" htmlType="submit" onClick={createPost} >
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
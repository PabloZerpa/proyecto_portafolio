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

  function probarToken() {
    const token = document.cookie.replace('token=', '');

    fetch('http://localhost:3001/api/user', {
        method: 'GET',
        headers: { 'auth-token': token },
      }).then(res => res.json()).then((data) => {
        console.log(data);
      })
  }


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
      <Avatar size={64} style={{ backgroundColor: '#1980da' }} icon={<UserOutlined />} />
      
      <Form id='login-form' labelCol={{span: 8,}} wrapperCol={{span: 16,}} >

        <Form.Item label="Indicador" name="indicador" rules={[{ required: true, message: 'Porfavor ingrese su indicador',},]} >
          <Input 
            size="large" 
            placeholder="Indicador"
            onChange={(e) => {setIndicador(e.target.value)}}
          />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Porfavor ingrese su contraseña',},]} >
          <Input.Password 
            size="large" 
            placeholder="Contraseña"
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </Form.Item>

        <Form.Item name="rol" label="Rol" rules={[{ required: true }]}>
          <Select
            defaultValue="user"
            allowClear
            size="large"
            onChange={(e) => {setRol(e.target.value)}}
            options={[
              { value: 'user', label: 'User' },
              { value: 'admin', label: 'Admin' }
            ]}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="unchecked" wrapperCol={{ offset: 8, span: 16,}} >
          <Checkbox>Recordar</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16,}} >
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
  gap: 32px;
`;
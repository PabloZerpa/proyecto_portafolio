
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Center, Flex, FormControl, FormLabel, Button, Select, Checkbox, InputGroup, InputRightElement, Input, Avatar, Box } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
        
import AuthService from '../services/auth.service';

function Login() {
  
  const [password, setPassword] = useState('');
  const [indicador, setIndicador] = useState('');
  const [rol, setRol] = useState('');
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();

  const toastSucces = () =>{
    toast({
        title: 'Login Completado',
        description: "Bienvenido",
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
    })
  }

  const toastFail = () =>{
    toast({
        title: 'Error al Iniciar Sesion',
        description: "No se puedo completar el login",
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
    })
  }


  // -------------------- FUNCION PARA INICIAR SESION --------------------
  async function handleLogin() {
    console.log(indicador,password,rol);
    try {
        await AuthService.login(indicador,password,rol);
        toastSucces();
        navigate("/dashboard");
        window.location.reload();
    } 
    catch (error) {
        toastFail();
        console.error(error);
    }
  }

  return (
    
    <Center bg='#c2c2c2' w='100%' h='800px' >

        <Flex
            w='25%' 
            color='black' 
            direction='column' 
            align='center' 
            justify='center' 
            gap='16px'
        >
            
            <Avatar size='lg' color='#1980da' icon={<FaUserCircle fontSize='6rem' />} />

            <FormControl display='flex' alignItems='center' isRequired >
                <FormLabel>Indicador:</FormLabel>
                <Input 
                    type='text' 
                    placeholder='Indicador'
                    bg='white' 
                    w='200px' 
                    onChange={(e) => {setIndicador(e.target.value)}} />
            </FormControl>

            <FormControl display='flex' alignItems='center' isRequired >
                <FormLabel>Password:</FormLabel>
                <Box>
                    <InputGroup >
                        <Input
                            bg='white'
                            w='200px'
                            type={show ? 'text' : 'password'}
                            placeholder='Password'
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                        <InputRightElement width='3rem' ml='20px' >
                            <Button variant='text' color='black' onClick={handleClick}>
                                {show ? <FaEye /> : <FaEyeSlash />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </FormControl>

            <FormControl display='flex' alignItems='center' isRequired >
                <FormLabel>Rol:-------</FormLabel>
                <Select 
                    placeholder='Seleccione Rol' 
                    bg='white' w='200px' 
                    onChange={(e) => {
                        console.log(e.target.value);
                        setRol(e.target.value);
                        console.log(rol);
                    }}
                >
                    <option value='user'>User</option>
                    <option value='admin'>Admin</option>
                </Select>
            </FormControl>

            <Checkbox >Recordar</Checkbox>

            <Button bg='#1980da' w='100px' h='40px' type='submit' onClick={handleLogin}>
                Login
            </Button>

        </Flex>
        
    </Center>
    
  );
}

export default Login;

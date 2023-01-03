
import { Link } from "react-router-dom";
import { FaUserCircle, FaPowerOff, FaCog, FaChevronDown } from 'react-icons/fa';
import { Flex, Box, Text, Image, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import axios from "axios";
import AuthService from '../services/auth.service';

const baseURL = "http://localhost:3001/api/logout";

// -------------------- FUNCION PARA CERRAR SESION --------------------
async function handleLogout() {

    try {
        AuthService.logout();
        window.location.reload();
        await axios.get(baseURL);
    } 
    catch (error) {
        console.log(error);
    }
}

// -------------------- NAVEGACION --------------------
function Header({ user }) {

  return (
    <Flex  
        w='100%' 
        h='80px' 
        bg='white' 
        position='fixed' 
        align='center' 
        justify='space-between' 
        shadow='1px 1px 10px #636363' >

        <Link  to="/">
            <Image w='120px' ml='32px' alt='logo'
                src='https://logodownload.org/wp-content/uploads/2019/03/pdvsa-logo.png'
            />
        </Link>
        <Text color='black' fontSize='xl' fontWeight='bold' textAlign='center'>
            Repositorio de Infraestructura y Aplicaciones
        </Text>

        {AuthService.obtenerUsuario() == null ? (
            <div></div>
        ) : (
            <Menu>
                <MenuButton 
                    color='black'
                    mr='16px'
                    variant='text'
                    textDecoration='none'
                    as={Button} 
                    leftIcon={<FaUserCircle color='#1980da' fontSize='42px' />}
                >
                    <Box display='flex' alignItems='center' gap='5px' fontSize='14px' >
                        <Box display='flex' flexDir='column' >
                            <Text fontSize='lg' >{user.indicador}</Text>
                            <Text fontSize='sm' color="gray" >{user.rol}</Text>
                        </Box>
                        <FaChevronDown />
                        
                    </Box>
                </MenuButton>

                <MenuList>
                    <MenuItem display='flex' gap='5px' >
                        <FaCog />
                        <Link to="/dashboard" >Configuracion</Link>
                    </MenuItem>
                    
                    <MenuItem display='flex' gap='5px' >
                        <FaPowerOff />
                        <Link onClick={handleLogout} to="/" >Cerrar Sesion</Link>
                    </MenuItem>
                </MenuList>
                
            </Menu>
        )}

    </Flex>
    
  );
} 

export default Header;



import { useState, useEffect } from "react";
import { Spinner, Flex, CheckboxGroup, Checkbox, Stack } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Tfoot, TableCaption } from '@chakra-ui/react'
import Search from "./Search";

import UserService from "../services/user.service";

function Contenido() {

  const [isLoading, setIsLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {

    UserService.obtenerDatosUsuario()
      .then((response) => {
        setUsuarios(response.data);
        setIsLoading(false);
        console.log(usuarios);
      });

  }, [setUsuarios]);


    return (
      <Flex align='center' justify='space-around' direction='column' bg='#c2c2c2' w='100%' h='800px' ml='240px' pt='60px' >

        <Flex align='center' direction='column' gap='20px' >

          <CheckboxGroup colorScheme='blue' defaultValue={['nombre']}>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox value='id'>ID</Checkbox>
              <Checkbox value='acronimo'>Acronimo</Checkbox>
              <Checkbox value='nombre'>Nombre</Checkbox>
            </Stack>
          </CheckboxGroup>

          <Search />
          
        </Flex>

        {isLoading ? (
          <>
              <Spinner thickness='3px' speed='0.5s' color='blue.500' size='xl' />
              Loading
            </>
          ) : (
            <>

              <TableContainer  w='80%' >
                
                <Table variant='simple' color='black' bg='#a0a0a0' borderRadius='10px'>
                  <Thead>
                    <Tr>
                      <Th isNumeric>ID</Th>
                      <Th>Acronimo</Th>
                      <Th>Nombre</Th>
                    </Tr>
                  </Thead>
                  <Tbody>

                    <Tr>
                      <Td isNumeric>12264</Td>
                      <Td>sapcod</Td>
                      <Td>SISTEMA AUTOMATIZADO DE PREVENCION Y CONTROL DE DERRAMES</Td>
                    </Tr>

                    <Tr>
                      <Td isNumeric>21003</Td>
                      <Td>savi</Td>
                      <Td>SISTEMA AUTOMATIZADO DE </Td>
                    </Tr>

                    <Tr>
                      <Td isNumeric>11650</Td>
                      <Td>sap</Td>
                      <Td>SISTEMA AUTOMATIZADO DE </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>

            </>
          )}

          <div></div>
        
      </Flex>

    );
}

export default Contenido;

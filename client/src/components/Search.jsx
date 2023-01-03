
import { useState } from 'react';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import { InputGroup, InputRightElement, Input, Button } from '@chakra-ui/react';

function Search() {

    const [search, setSearch] = useState(false);
    const clearSearch = () => {
        document.getElementById('searchBar').value = '';
        setSearch('');
    };

    return (
        <InputGroup >
        
            <Input
                id='searchBar'
                bg='white'
                w='500px'
                type='search'
                placeholder='Buscar'
                onChange={(e) => {setSearch(e.target.value)}}
            />

            <InputRightElement width='3rem' mr='48px' >
                <Button variant='title' color='black' display={search ? 'block' : 'none'} >
                    <FaTimesCircle onClick={clearSearch} />
                </Button>
            </InputRightElement>

            <InputRightElement width='3rem' >
                <Button variant='solid' bg='#1980da' color='white' >
                    <FaSearch />
                </Button>
            </InputRightElement>

        </InputGroup>
    )
};

export default Search;
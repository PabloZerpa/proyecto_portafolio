

import { FaSearch } from 'react-icons/fa';

function Search() {
  
  return (
    <div className="relative w-96">
        <input 
            type="search" 
            //onChangeCapture={(e) => setSearchTerm(e.target.value)} 
            className="block p-2 w-96 text-sm text-black bg-white rounded-lg border-none outline-none" placeholder="Buscar" 
        />
            
        <button 
            type="submit" 
            //onClick={(e) => {e.preventDefault(); onSearch(debounceValue, estatus, region, depart, fecha, prioridad, order)}}
            className="absolute top-0 right-0 w-14 p-2 text-sm font-medium text-white bg-blue-500 rounded-r-lg border-none outline-none cursor-pointer"
        >
                        
            <FaSearch />
        </button>
    </div>
  );
}
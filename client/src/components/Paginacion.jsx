
function Paginacion() {

    return(
        <div class="flex flex-col items-center my-4">
            <span class="text-xs text-gray-800">
                Mostrando 
            <span class="font-semibold text-gray-900"> 1</span> al <span class="font-semibold text-gray-900">10</span> de <span class="font-semibold text-gray-900">100</span> Resultados</span>
            <div class="inline-flex mt-2 xs:mt-0">
                <button class="flex items-center px-2 py-2 text-xs font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900">
                    <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                    Prev
                </button>
                <button class="flex items-center px-2 py-2 text-xs font-medium text-white bg-gray-800 border-l border-gray-700 rounded-r hover:bg-gray-900">
                    Next
                    <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </div>
    );
}

export default Paginacion;
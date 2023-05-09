
function Button({children, color = 'blue', width=24, height=8, font='sm', tipo='button', manejador=null}) {
    
    if(color==='blue'){
        return(
            <button 
                className={`w-${width} h-${height} flex justify-center items-center space-x-1 
                text-${font} bg-blue-600 text-white border-none outline-none rounded 
                cursor-pointer hover:bg-blue-500`} 
    
                type={tipo} 
                onClick={manejador ? (e) => {manejador(e)} : null}
            >
                {children}
            </button>
        );
    }
    else if(color==='red'){
        return(
            <button 
                className={`w-${width} h-${height} flex justify-center items-center space-x-1 
                text-${font} bg-red-600 text-white border-none outline-none rounded 
                cursor-pointer hover:bg-red-500`} 
    
                type={tipo} 
                onClick={manejador ? (e) => {manejador(e)} : null}
            >
                {children}
            </button>
        );
    }
}

export default Button;
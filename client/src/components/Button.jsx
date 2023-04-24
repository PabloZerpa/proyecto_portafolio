
function Button({children, color='blue', width=24, height=8, font='sm', tipo='submit', manejador=null}) {
    
    const clase =  `w-${width} h-${height} text-${font} bg-${color}-600 
        text-white border-none outline-none rounded cursor-pointer hover:bg-${color}-500`

    return(
        <button className={clase} type={tipo} onClick={(e) => {manejador(e)}}>
            {children}
        </button>
    );
}

export default Button;
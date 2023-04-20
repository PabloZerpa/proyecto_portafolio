
function Button({children, color='blue', width=24, height=8, font='sm', tipo='submit', accion=null}) {
    const clase =  
        `w-${width} h-${height} text-${font} bg-${color}-600 text-white border-none outline-none rounded cursor-pointer hover:bg-${color}-500`
    
    const onHandle = (e) => accion(e);

    return(
        <button className={clase} type={tipo} onClick={(e) => {onHandle(e)}}>
            {children}
        </button>
    );
}

export default Button;
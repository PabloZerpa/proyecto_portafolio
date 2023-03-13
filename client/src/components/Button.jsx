
function Button({children, color='blue', width=24, accion=null}) {
    const clase =  
        `w-${width} h-8 text-sm bg-${color}-600 text-white border-none outline-none rounded cursor-pointer hover:bg-${color}-500`
    
    const onHandle = (e) => accion(e);

    return(
        <button className={clase} type='submit' onClick={(e) => {onHandle(e)}}>
            {children}
        </button>
    );
}

export default Button;
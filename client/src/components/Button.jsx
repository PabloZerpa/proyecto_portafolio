
function Button({children, color, width=24, height=8, font='sm', tipo='button', manejador=null}) {
    
    const clase =  `w-${width} h-${height} flex justify-center items-center space-x-1 text-${font} bg-${color}-600 
        text-white border-none outline-none rounded cursor-pointer hover:bg-${color}-500`

    return(
        <button className={clase} type={tipo} onClick={manejador ? (e) => {manejador(e)} : null}>
            {children}
        </button>
    );
}

export default Button;
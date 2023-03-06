

function Container({children}) {

    return(
        <div className="flex w-full bg-transparent m-0 p-0">
            <div className="w-full m-0 mb-8 flex flex-col justify-start items-center gap-6 pt-44 pl-56" >
                {children} 
            </div>
        </div>
    );
}

export default Container;
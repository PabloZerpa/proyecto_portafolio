
function Container({children}) {

    return(
            <div className="relative flex w-full bg-transparent m-0 p-0">
                <div className="flex flex-col justify-start items-center w-full m-0 mb-8 mt-20 ml-56 pt-24 gap-6" >
                    {children} 
                </div>
        </div>
    );
}

export default Container;
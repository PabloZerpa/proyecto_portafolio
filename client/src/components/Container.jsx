
function Container({children}) {
    return(
        <div className="relative flex w-full bg-transparent m-0 p-0 z-30">
            <div className="flex flex-col justify-start items-center space-y-8 w-full m-0 mb-8 mt-20 ml-0 pt-24 lg:ml-56" > 
                {children} 
            </div> 
        </div>
    );
}

export default Container;

function Container({children}) {
// flex flex-col justify-start items-center space-y-6 w-full m-0 mb-8 mt-20 ml-20 pt-24 lg:ml-56

// flex flex-col justify-start items-center space-y-12 w-full m-0 mb-8 mt-20 ml-0 lg:ml-20 pt-16 lg:ml-56
    return(
        <div className="relative flex w-full bg-transparent m-0 p-0 z-30">
            <div className="flex flex-col justify-start items-center space-y-12 w-full m-0 mb-8 mt-20 ml-0 pt-24 lg:ml-56" > 
                {children} 
            </div> 
        </div>
    );
}

export default Container;
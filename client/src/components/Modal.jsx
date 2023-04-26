import Button from "./Button";



const Modal = ({children, setIsOpen }) => {
    return (
        <div className="fixed w-full max-w-2xl max-h-full z-50">
            <div className="relative bg-white rounded-lg shadow">

                {/* <div className="flex items-start justify-between p-4 border-b rounded-t">
                            
                </div> */}

                <div className="p-6 space-y-6">
                    {children}
                </div>

                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                    <Button color='blue' manejador={(e) => setIsOpen(false)}>Agregar</Button>
                    <Button color='blue' manejador={(e) => setIsOpen(false)}>Cerrar</Button>
                </div>

            </div>
        </div>
    );
  };
  
  export default Modal;
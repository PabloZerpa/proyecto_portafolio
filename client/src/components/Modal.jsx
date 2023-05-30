

const Modal = ({children }) => {
    return (
        <div className="fixed top-24 w-full max-w-2xl max-h-full z-50 overflow-y-auto">
            <div className="relative bg-zinc-600 rounded-lg shadow">

                <div className="p-4 space-y-4">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default Modal;
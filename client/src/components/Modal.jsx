

const Modal = ({children }) => {
    return (
        <div className="fixed top-24 w-full max-w-2xl max-h-full z-50 overflow-y-auto">
            <div className="relative flex flex-col space-y-4 p-4 bg-zinc-600 rounded-lg shadow">
                {children}
            </div>
        </div>
    );
};

export default Modal;
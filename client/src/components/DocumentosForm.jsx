import { useEffect, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import Opciones from "../utils/Opciones";
import { FaTimes } from "react-icons/fa";
import Modal from "./Modal";


function DocumentosForm({devolverSelecciones, setIsOpen}) {

    const [datos, setDatos] = useState({}); 
    const [documentos, setDoc] = useState('');

    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = (e) => {
        const valor = e.target.value.toUpperCase();

        if(e.target.name === 'doc_direccion')
            setDatos({ ...datos, [e.target.name] : e.target.value.toLowerCase() });
        else
            setDatos({ ...datos, [e.target.name] : valor })
    }

    const sendDatos = () => {
        devolverSelecciones(datos);
        setIsOpen(false)
    }

    // =================== FUNCION PARA OBTENER LOS VALORES DE LOS SELECTS ===================
    async function establecerDatos(){
        setDoc(await Opciones('documentos'));
    }

    useEffect(() => {
        establecerDatos();
    }, []);


    return (
        <Modal>
            <form className='relative flex justify-center items-center flex-col bg-zinc-400 p-4 pb-2 border-solid rounded'>
                <FaTimes className="absolute top-1 right-2 text-xl text-black cursor-pointer" 
                onClick={(e) => setIsOpen(false)} />

                <div className='flex flex-col w-full py-1 border-solid'> 
                    <p className='font-bold text-base mb-2'>Documentacion</p>
                    <div className="flex flex-col">
                        <Input campo='Descripcion' name='doc_descripcion' required={true} manejador={setValores} />
                        <Input campo='Direccion' name='doc_direccion' required={true} manejador={setValores} />
                        <Select campo='Tipo de Doc' name='doc_tipo' required={true} byId={false} opciones={documentos ? documentos : ['SELECCIONAR']} manejador={setValores} />
                    </div>

                    <div className="flex items-center justify-center p-0 ">
                        <Button color='blue' manejador={(e) => {sendDatos()}}>Agregar</Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default DocumentosForm;
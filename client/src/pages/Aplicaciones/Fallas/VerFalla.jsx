

import { FaTimes } from "react-icons/fa";
import { Input, TextArea } from "../../../components";

function VerFalla({setIsOpen, valores}) {
 
    return (
        <form className="flex flex-col items-center space-y-4">

            <div className="relative flex flex-col items-center space-y-2 pt-4 bg-zinc-400 rounded">
                <FaTimes className="absolute top-2 right-2 text-xl text-black cursor-pointer" onClick={(e) => setIsOpen(false)} />

                <div className="grid grid-cols-3 md:grid-cols-3 space-x-4 p-4 w-[300px] md:w-[400px] lg:w-[500px] bg-zinc-400 rounded">
                    <Input campo='Falla ID' name='falla_id' editable={false} propiedad={valores.falla_id} />
                    <Input campo='Acronimo' name='acronimo' editable={false} propiedad={valores.apl_acronimo} />
                    <Input campo='Impacto' name='impacto' editable={false} propiedad={valores.fal_impacto} />
                </div>

                <div className="w-4/5">
                    <TextArea campo='Descripcion' name='descripcion' editable={false} propiedad={valores.fal_descripcion} />
                    <TextArea campo='Solucion' name='solucion' editable={false} propiedad={valores.fal_solucion} />
                </div>

            </div>
        </form>
    )
};

export default VerFalla;
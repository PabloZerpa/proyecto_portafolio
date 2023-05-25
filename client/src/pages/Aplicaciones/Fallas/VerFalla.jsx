

import { Button, Input, TextArea } from "../../../components";
 
function VerFalla({setIsOpen, valores}) {

    return (
        <form className="flex flex-col items-center space-y-8 pb-4 overflow-y-auto">
            <div className="flex flex-col items-center space-y-2 pb-4 bg-zinc-400 rounded">
                <div className="flex flex-col p-4 w-[300px] md:w-[400px] lg:w-[500px] bg-zinc-400 rounded">
                    <Input campo='Falla ID' name='falla_id' editable={false} propiedad={valores.falla_id} />
                    <Input campo='Nombre' name='nombre' editable={false} propiedad={valores.apl_nombre} />
                    <Input campo='Impacto' name='impacto' editable={false} propiedad={valores.fal_impacto} />
                    <div className="col-span-2">
                        <TextArea campo='Descripcion' name='descripcion' editable={false} propiedad={valores.fal_descripcion} />
                        <TextArea campo='Solucion' name='solucion' editable={false} propiedad={valores.fal_solucion} />
                    </div>
                </div>

                <div className="flex space-x-16">
                    <Button width={32} manejador={(e) => setIsOpen(false)} >Cerrar</Button>
                </div>
            </div>
        </form>
    )
};

export default VerFalla;
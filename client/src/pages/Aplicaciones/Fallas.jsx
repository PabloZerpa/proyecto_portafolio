import { useState } from "react";
import { Button, Container, Input, Select } from "../../components";

function Fallas() {

    const [datos, setDatos] = useState({
        indicador: '',
        rol: '',
        gerencia: '',
        subgerencia: '',
    });

    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    return (
        <Container>
            <form className="flex flex-col items-center gap-8 pb-4">

                <div className="flex flex-col gap-2">
                    <h2 className='font-bold text-base'>Datos de la Falla</h2>
                    <div className="grid grid-cols-2 w-[900px] gap-4 p-4 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                        <Input campo='Aplicacion' name='aplicacion_id' direccion="col" editable={true} manejador={handleInputChange} />
                        <Input campo='Usuario' name='usuario_id' direccion="col" editable={true} manejador={handleInputChange} />
                        <Input campo='Clase' name='clase' direccion="col" editable={true} manejador={handleInputChange} />
                        <Input campo='Impacto' name='impacto' direccion="col" editable={true} manejador={handleInputChange} />
                        <div className="col-span-2">
                            <Input campo='Descripcion' name='descripcion' area={true} direccion="col" editable={true} manejador={handleInputChange} />
                            <Input campo='Solucion' name='nombre' area={true} direccion="col" editable={true} manejador={handleInputChange} />
                        </div>
                    </div>
                </div>

                <Button color='blue' width={32}>Añadir Usuario</Button>

            </form>
            
        </Container>
    )
};

export default Fallas;
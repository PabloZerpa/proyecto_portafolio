
import { Container, Input, Select, Button } from "../../components/";

function CrearSolicitud() {

    return(
        <Container>
            <h2 className='font-bold text-lg'>Nueva Solicitud</h2>

            <div className="flex flex-col w-3/4 justify-start gap-4 p-2 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                <span className="font-bold text-sm">Datos del solicitante</span>
                <div className="flex gap-4">
                    <Input campo='Nombre' name='nombre' direccion="row" editable={true} />
                    <Input campo='Correo' name='correo' direccion="row" editable={true} />
                </div>
            </div>

            <div className="flex flex-col w-3/4 justify-start gap-4 p-2 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                <span className="font-bold text-sm">Datos de la solicitud</span>
                <div className="flex gap-4">
                    <Select campo='Tipo' name='tipo' direccion="row" editable={true} opciones={['CREACION','MODIFICACION','DESINCORPORACION']} />
                    <Select campo='Estatus' name='estatus' direccion="row" editable={true} opciones={['NUEVA','APROBADA','RECHAZADA','ANULADA','DIFERIDA']} />
                    <Select campo='Elemento' name='elemento' direccion="row" editable={true} opciones={['APLICACION','BASE DE DATOS','SERVIDOR']} />
                </div>

                <Input campo='Descripcion' name='descripcion' area={true} direccion="row" editable={true} />
            </div>

            <div className="flex flex-col w-3/4 justify-start gap-4 p-2 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                <span className="font-bold text-sm">Datos del Aprobador</span>
                <div className="flex gap-4">
                    <Input campo='Nombre' name='nombre' direccion="row" editable={true} />
                    <Select campo='Gerencia' name='gerencia' direccion="row" editable={true} opciones={['NUEVA','APROBADA','RECHAZADA','ANULADA','DIFERIDA']} />
                    <Select campo='SubGerencia' name='subgerencia' direccion="row" editable={true} opciones={['NUEVA','APROBADA','RECHAZADA','ANULADA','DIFERIDA']} />
                </div>
            </div>

            <Button width={32} >Realizar Solicitud</Button>
            
        </Container>
    );
}

export default CrearSolicitud;

import { Container, Input, Select, Button } from "../../components/";

function Solicitud() {

    return(
        <Container>
            <h2 className='font-bold text-lg'>Datos Solicitud</h2>

            <div className="flex flex-col w-3/4 justify-start gap-4 border-2 border-dashed border-blue-500">
                <span className="font-bold text-sm">Datos del solicitante</span>
                <div className="flex gap-4">
                    <Input campo='Nombre' name='nombre' direccion="row" />
                    <Input campo='Correo' name='correo' direccion="row" />
                </div>
            </div>

            <div className="flex flex-col w-3/4 justify-start gap-4 border-2 border-dashed border-blue-500">
                <span className="font-bold text-sm">Datos de la solicitud</span>
                <div className="flex gap-4">
                    <Input campo='N° Solicitud' name='numero' direccion="row" />
                    <Input campo='Fecha de Solicitud' name='numero' direccion="row" />
                    <Input campo='Fecha de Cierre' name='numero' direccion="row" />
                </div>
                <div className="flex gap-4">
                    <Select campo='Tipo' name='tipo' direccion="row" opciones={['CREACION','MODIFICACION','DESINCORPORACION']} />
                    <Select campo='Estatus' name='estatus' direccion="row" opciones={['NUEVA','APROBADA','RECHAZADA','REVISION']} />
                </div>
                <Input campo='Descripcion' name='descripcion' area={true} direccion="row" />
            </div>

            <div className="flex flex-col w-3/4 justify-start gap-4 border-2 border-dashed border-blue-500">
                <span className="font-bold text-sm">Datos del Aprobador</span>
                <div className="flex gap-4">
                    <Input campo='Nombre' name='nombre' direccion="row" />
                    <Input campo='Correo' name='correo' direccion="row" />
                </div>
            </div>

            <div className="flex flex-col w-3/4 justify-start gap-4 border-2 border-dashed border-blue-500">
                <span className="font-bold text-sm">Datos del Elemento</span>
                <div className="flex gap-4">
                    <Select campo='Elemento' name='elemento' direccion="row" opciones={['APLICACION','BASE DE DATOS','SERVIDOR']} />
                    <Input campo='Acronimo' name='acronimo' direccion="row" />
                    <Input campo='Nombre' name='nombre' direccion="row" />
                </div>
                <Input campo='Descripcion' name='descripcion' area={true} direccion="row" />
            </div>

            <div className="flex gap-16 my-4">
                <Button>Guardar</Button>
                <Button color='red'>Anular</Button>
            </div>
            
        </Container>
    );
}

export default Solicitud;
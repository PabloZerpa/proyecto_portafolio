import { Button, Container, Input, Radio, Select } from "../../components/";
import Checkbox from "../../components/Checkbox";
import Autorizacion from "../../services/auth.service";

function Permisos() {

    return(
        <Container>
            <h2 className='font-bold text-lg'>Datos del Nuevo Usuario</h2>
            <div className="flex flex-col w-[900px] justify-start gap-8 p-4 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                <Input campo='Indicador' name='usuario_indicador' direccion="row" editable={true} />
                <Select campo='Rol' name='usuario_rol' direccion="row" opciones={['Admin','Superuser','User']} />
                <Select campo='Gerencia' name='tecnico_gerencia' direccion="row" opciones={['Admin','Superuser','User']} />
                <Select campo='Subgerencia' name='tecnico_subgerencia' direccion="row" opciones={['Admin','Superuser','User']} />

                <Input campo='Creador' name='usuario_creador' direccion="row" propiedad={Autorizacion.obtenerUsuario().indicador} />
            </div>

            <h2 className='font-bold text-lg'>Elementos Permitidos</h2>
            <div className="flex gap-4 items-center p-4 bg-zinc-400 rounded">
                <Checkbox id='aplicaciones' name='elementos_permitidos' opciones={['Aplicaciones','Base de datos','Servidores','Solicitudes','Graficos',]} />
            </div>

            <h2 className='font-bold text-lg'>Acciones Permitidas</h2>
            <div className="flex gap-4 p-4 bg-zinc-400 rounded">
                <Checkbox id='aplicaciones' name='elementos_permitidos' opciones={['Ver','Modificar','Eliminar','Solicitar','Aprobar',]} />
            </div>
            
            <Button color='blue' width={32}>Crear Usuario</Button>

        </Container>
    );
}

export default Permisos;
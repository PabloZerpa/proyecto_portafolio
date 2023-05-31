import { Container, Input } from "../../components/";

function Perfil({tipo='admin'}) {

    return(
        <Container>
            <h2 className='font-bold text-lg'>Informacion Basica</h2>

            <div className="flex flex-col w-3/4 justify-start gap-8 p-4 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                <div className="flex justify-between items-center">
                    <label for="foto" className="text-base font-bold">Foto de Perfil</label>
                    <div className="w-20 h-20 bg-blue-600 rounded-full" id="foto"><img src="" alt="" /></div>
                    <div className="w-24"></div>
                </div>

                <div className="w-3/4">
                    <Input campo='Nombre' name='nombre' direccion="row" />
                    <Input campo='Indicador' name='indicador' direccion="row" />
                    <Input campo='Usuario' name='tipoUsuario' direccion="row" />
                </div> 
            </div>

            <h2 className='font-bold text-lg'>Informacion de Contacto</h2>

            <div className="flex w-3/4 justify-start gap-8 p-4 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                <div className="w-3/4">
                    <Input campo='Correo' name='correo' direccion="row" />
                    <Input campo='Telefono' name='telefono' direccion="row" />
                    <Input campo='Cedula' name='cedula' direccion="row" />
                    <Input campo='Region' name='region' direccion="row" />
                </div>
                <div className="w-3/4">
                    <Input campo='Gerencia' name='gerencia' direccion="row" />
                    <Input campo='SubGerencia' name='gerencia' direccion="row" />
                    <Input campo='Cargo' name='cargo' direccion="row" />
                    <Input campo='Localidad' name='localidad' direccion="row" />
                </div>
            </div>

            <h2 className='font-bold text-lg'>Actividad Reciente</h2>

            <div className="flex flex-col w-3/4 justify-start gap-8 p-4 bg-zinc-400 rounded border-2 border-dashed border-blue-500">
                <div className="w-3/4">
                    <span className="text-base font-bold">Elementos vistos</span>
                    <Input campo='Correo' name='correo' direccion="row" />
                    <Input campo='Telefono' name='telefono' direccion="row" />
                    <Input campo='Rol' name='rol' direccion="row" />
                </div>

                <div style={tipo==='admin' ? {display: 'block'} : {display: 'none'}} className="w-3/4">
                    <span className="text-base font-bold">Elementos modificados</span>
                    <Input campo='Gerencia' name='gerencia' direccion="row" />
                    <Input campo='SubGerencia' name='gerencia' direccion="row" />
                    <Input campo='Region' name='region' direccion="row" />
                </div>

                <div style={tipo==='admin' ? {display: 'block'} : {display: 'none'}} className="w-3/4">
                    <span className="text-base font-bold">Solicitudes realizadas</span>
                    <Input campo='Gerencia' name='gerencia' direccion="row" />
                    <Input campo='SubGerencia' name='gerencia' direccion="row" />
                    <Input campo='Region' name='region' direccion="row" />
                </div>
            </div>

            
        </Container>
    );
}

export default Perfil;
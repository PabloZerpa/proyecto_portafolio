
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Container, Input, Select } from '../../components';
import Autorizacion from '../../services/auth.service';
import { useState } from 'react';

function CrearBD() {

    const navigate = useNavigate();
    const [registrarServidor, setRegistrarServidor] = useState(false);
    const habilitarServidor = () => {
        setRegistrarServidor(!registrarServidor)
        if(!registrarServidor){
            setDatos({ ...datos, select_servidor : null })
            console.log(datos.select_servidor);
        }
    }

    const [datos, setDatos] = useState({
        indicador: '',
        rol: '',
        gerencia: '',
        subgerencia: '',
        creador: Autorizacion.obtenerUsuario().indicador,
    });

    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    return (
        <Container>
            <h1 className='font-bold text-lg'>Registro de Base de datos</h1>

            <form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" >
                
                <h2 className='font-bold text-base mb-6'>Informacion General</h2>

                <Input campo='Nombre' name='bas_nombre' editable={true} area={true} manejador={handleInputChange} />

                <div className="relative grid grid-cols-2 gap-4 mb-0">
                    <Select campo='Estatus' name='bas_estatus' opciones={['HOLA']} manejador={handleInputChange}/>
                    <Input campo='Tipo' name='bas_tipo' editable={true} manejador={handleInputChange} />
                    <Select campo='Manejador' name='bas_manejador' opciones={['SELECCIONE','ALTA','MEDIA','BAJA',]} manejador={handleInputChange} />
                    <Select campo='Version' name='bas_version_manejador' opciones={['SELECCIONE','SI','NO']} manejador={handleInputChange} />
                    <Select campo='N° Usuario' name='bas_cantidad_usuarios' opciones={['HOLA']} manejador={handleInputChange} />
                    <Input campo='Ambiente' name='bas_tipo_ambiente' editable={true} manejador={handleInputChange} />
                </div>

                {/* --------------- APLICACION --------------- */}
                <p className='font-bold text-base my-4'>Aplicacion</p>
                <div className="grid grid-cols-2 gap-4">
                    <Select campo='Seleccione Aplicacion' name='select_aplicacion' opciones={['HOLA']} manejador={handleInputChange}/>
                    <div className='mt-6'>
                        <Button width={32}><Link to={`/administracion/registro`} target="_blank">Registrar Nueva</Link></Button>
                    </div>
                </div>

                {/* --------------- SERVIDOR --------------- */}
                <p className='font-bold text-base my-4'>Servidor</p>
                <div className="grid grid-cols-2 gap-4">
                    <div style={registrarServidor ? {display: 'none'} : {display: 'block'}}>
                        <Select campo='Seleccione Servidor' name='select_servidor' opciones={['SELECCIONE','SI','NO']} manejador={handleInputChange}/>
                    </div>
                    <Checkbox id='registrar_servidor' name='registrar_servidor' opciones={['Registrar nuevo']} manejador={habilitarServidor} />
                </div>

                <div style={registrarServidor ? {display: 'grid'} : {display: 'none'}} className="grid grid-cols-2 gap-4">
                    <Input campo='Nombre' name='servidor' editable={true} manejador={handleInputChange} />
                    <Select campo='Estatus' name='ser_estatus' opciones={['SELECCIONE','SI','NO']} manejador={handleInputChange}/>
                    <Input campo='Direccion' name='ser_direccion' editable={true} manejador={handleInputChange} />
                    <Input campo='Sistema' name='ser_sistema' editable={true} manejador={handleInputChange} />
                    <Input campo='Version Sis' name='ser_sistemas_version' editable={true} manejador={handleInputChange} />
                    <Input campo='Modelo' name='ser_modelo' editable={true} manejador={handleInputChange} />
                    <Input campo='Marca' name='ser_marca' editable={true} manejador={handleInputChange} />
                    <Input campo='Serial' name='ser_serial' editable={true} manejador={handleInputChange} />
                    <Input campo='Cantidad' name='ser_cantidad_cpu' editable={true} manejador={handleInputChange} />
                    <Input campo='Velocidad' name='ser_velocidad_cpu' editable={true} manejador={handleInputChange} />
                    <Input campo='Memoria' name='ser_memoria' editable={true} manejador={handleInputChange} />
                    <Select campo='Region' name='ser_region' opciones={['SELECCIONE','SI','NO']} manejador={handleInputChange} />
                    <Select campo='Localidad' name='ser_localidad' opciones={['SELECCIONE','SI','NO']} manejador={handleInputChange} />
                </div>
                    
                <div className="absolute bottom-4 right-1/3">
                    <Button width={32}>Registrar</Button>
                </div>
                <div className="absolute bottom-4 left-1/3">
                    <Button color='red' width={32} >Cancelar</Button>
                </div>

            </form>
            

        </Container>
    )
};

export default CrearBD;
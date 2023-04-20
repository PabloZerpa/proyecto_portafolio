
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Container, Input, Select } from '../../components';
import Autorizacion from '../../services/auth.service';
import Base from '../../services/basedatos.service';
import { useState } from 'react';
import { Notificacion } from '../../utils/Notificacion';

function RegistrarBD() {

    const navigate = useNavigate();
    const [registrarServidor, setRegistrarServidor] = useState(false);
    const habilitarServidor = () => {
        setRegistrarServidor(!registrarServidor)
        if(!registrarServidor){
            setDatos({ ...datos, select_servidor : null })
        }
    }

    const [datos, setDatos] = useState({
        base_datos: '',
        estatus: '',
        tipo: '',
        manejador: '',
        version_manejador: '',
        tipo_ambiente: '',
        cantidad_usuarios: '',

        select_aplicacion: '',
        select_servidor: '',
        creador: Autorizacion.obtenerUsuario().indicador,
    });

    const handleInputChange = (e) => {

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function createData(e) {
        e.preventDefault();

        try {
          if(Autorizacion.obtenerUsuario().rol === 'admin'){
            
            await Base.crearDatosDB(datos);
            Notificacion('REGISTRO EXITOSO', 'success');
            //navigate("/dashboard");
          }
        }
        catch (error) { 
            console.log('ERROR AL ACTUALIZAR APL_ACT'); 
            Notificacion('ERROR AL REGISTRAR', 'error');
        }
      }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    return (
        <Container>
            <h1 className='font-bold text-lg'>Registro de Base de datos</h1>

            <form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" onSubmit={createData}>
                
                <h2 className='font-bold text-base mb-6'>Informacion General</h2>

                <Input campo='Nombre' name='base_datos' editable={true} area={true} manejador={handleInputChange} />

                <div className="relative grid grid-cols-2 gap-4 mb-0">
                    <Select campo='Estatus' name='estatus' opciones={['SELECCIONE','DESARROLLO','ESTABILIZACION','MANTENIMIENTO']} manejador={handleInputChange}/>
                    <Select campo='Tipo' name='tipo' opciones={['SELECCIONE','RELACIONAL','NO RELACIONAL','DISTRIBUIDA']} manejador={handleInputChange} />
                    <Select campo='Manejador' name='manejador' opciones={['SELECCIONE','MYSQL','POSTGRESS','ORACLE',]} manejador={handleInputChange} />
                    <Input campo='Version' name='version_manejador' editable={true} manejador={handleInputChange} />
                    <Select campo='Ambiente' name='tipo_ambiente' opciones={['SELECCIONE','DESARROLLO','ESTABILIZACION','MANTENIMIENTO']} manejador={handleInputChange} />
                    <Input campo='N° Usuario' name='cantidad_usuarios' editable={true} manejador={handleInputChange} />
                </div>

                {/* --------------- APLICACION --------------- */}
                <p className='font-bold text-base my-4'>Aplicacion</p>
                <div className="grid grid-cols-2 gap-4">
                    <Select campo='Seleccione Aplicacion' name='select_aplicacion' opciones={['SELECCIONE',1,2,3,4,5,6,7,8,9,10]} manejador={handleInputChange}/>
                    <div className='mt-6'>
                        <Button width={32}><Link to={`/administracion/registro`} target="_blank">Registrar Nueva</Link></Button>
                    </div>
                </div>

                {/* --------------- SERVIDOR --------------- */}
                <p className='font-bold text-base my-4'>Servidor</p>
                <div className="grid grid-cols-2 gap-4">
                    <div style={registrarServidor ? {display: 'none'} : {display: 'block'}}>
                        <Select campo='Seleccione Servidor' name='select_servidor' opciones={['SELECCIONE','SERVIDOR 1','SERVIDOR 2','SERVIDOR 3']} manejador={handleInputChange}/>
                    </div>
                    <Checkbox id='registrar_servidor' name='registrar_servidor' opciones={['Registrar nuevo']} manejador={habilitarServidor} />
                </div>

                {/* <div style={registrarServidor ? {display: 'grid'} : {display: 'none'}} className="grid grid-cols-2 gap-4">
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
                </div> */}
                    
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

export default RegistrarBD;
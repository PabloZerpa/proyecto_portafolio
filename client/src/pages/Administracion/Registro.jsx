
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Container, Input, Select } from '../../components';
import { campos, opcionEstatus, opcionRegion, opcionPlataforma, opcionAlcance, opcionMantenimiento } from '../../services/campos.service';
import Autorizacion from '../../services/auth.service';
import Checkbox from '../../components/Checkbox';

function Registro() {

    const navigate = useNavigate();
    const [datos, setDatos] = useState(campos);
    const [registrarBase, setRegistrarBase] = useState(false);
    const [registrarServidor, setRegistrarServidor] = useState(false);

    const habilitarBase = () => {setRegistrarBase(!registrarBase)}
    const habilitarServidor = () => {setRegistrarServidor(!registrarServidor)}

    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    function navegar() { navigate(-1) }
    
    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function createData(e) {
        e.preventDefault();

        try {
          console.log('TRY DEL CREATE');
          if(Autorizacion.obtenerUsuario().rol === 'admin'){

            console.log('DENTRO DEL TRY CREATE');
            console.log(datos);
            
            await Autorizacion.crearDatos(datos);
            //navigate("/dashboard");
          }
        }
        catch (error) { console.log('ERROR AL ACTUALIZAR APL_ACT'); }
      }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    return (
        <Container>

            <h1 className='font-bold text-lg'>Registro de Aplicacion</h1>

            <form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" onSubmitCapture={createData} >
                
                <h2 className='font-bold text-base mb-6'>Informacion General</h2>
                <div className="grid grid-cols-2 gap-4">
                    {/* --------------- INFORMACION BASICA --------------- */}
                    <Input campo='Acronimo' name='apl_acronimo' editable={true} manejador={handleInputChange} />
                    <Select campo='Estatus' name='apl_estatus' opciones={opcionEstatus} manejador={handleInputChange}/>
                </div>

                <Input campo='Nombre' name='apl_nombre' editable={true} area={true} manejador={handleInputChange} />
                <Input campo='Descripcion' name='apl_descripcion' editable={true} area={true} manejador={handleInputChange} />

                <div className="relative grid grid-cols-2 gap-4 mb-0">
                    <Select campo='Prioridad' name='apl_prioridad' opciones={['ALTA','MEDIA','BAJA',]} manejador={handleInputChange} />
                    <Select campo='Critico' name='apl_critico' opciones={['SI','NO']} manejador={handleInputChange} />
                    <Select campo='Alcance' name='apl_alcance' opciones={opcionAlcance} manejador={handleInputChange} />
                    <Input campo='Direccion' name='apl_direccion' editable={true} manejador={handleInputChange} />
                    <Input campo='N° Usuarios' name='apl_cantidad_usuarios' editable={true} manejador={handleInputChange} />
                    <Input campo='Cliente' name='cliente' editable={true} manejador={handleInputChange} />
                    <Select campo='Region' name='apl_region' opciones={opcionRegion} manejador={handleInputChange} />
                    <div className='flex flex-col gap-2 text-xs font-medium text-gray-900 mb-6'>
                        <label>Fecha de Registro</label>
                        <input
                            type='date'
                            name='apl_fecha_registro'
                            className='w-full p-2 bg-gray-50 border-none text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500' 
                            placeholder='Fecha de Registro'
                            onChange={(e) => {handleInputChange(e)}}
                        />
                    </div>
                </div>

                <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
                {/* --------------- RESPONSABLES --------------- */} 
                <div className="grid grid-cols-2 gap-4">
                    <p className='font-bold text-base my-4'>Responsable Funcional</p>
                    <p className='font-bold text-base my-4'>Responsable Tecnico</p>

                    <div className='grid grid-cols-1'>
                        <Input campo='Nombre' name='funcional_nombre' editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='funcional_apellido' editable={true} manejador={handleInputChange} />
                        <Input campo='Indicador' name='funcional_indicador' editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='funcional_cedula' editable={true} />
                        <Input campo='Telefono' name='funcional_telefono' editable={true} manejador={handleInputChange} />
                        <Select campo='Cargo' name='funcional_cargo' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='funcional_gerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Subgerencia' name='funcional_subgerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Region' name='funcional_region' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='funcional_localidad' opciones={opcionRegion} manejador={handleInputChange} />
                    </div>
                    
                    <div className='relative grid grid-cols-1'>
                        <div className='absolute -left-2.5 top-0 w-1 h-full border-2 border-dashed border-gray-500'></div>
                        <Input campo='Nombre' name='tecnico_nombre' editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='tecnico_apellido' editable={true} manejador={handleInputChange} />
                        <Input campo='Indicador' name='tecnico_indicador' editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='tecnico_cedula' editable={true} />
                        <Input campo='Telefono' name='tecnico_telefono' editable={true} manejador={handleInputChange} />
                        <Select campo='Cargo' name='tecnico_cargo' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='tecnico_gerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Subgerencia' name='tecnico_subgerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Region' name='tecnico_region' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='tecnico_localidad' opciones={opcionRegion} manejador={handleInputChange} />
                    </div>
                    
                </div>

                <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
                {/* --------------- TECNOLOGIAS --------------- */}
                <h2 className='font-bold text-base my-4'>Tecnologia</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Input campo='Version' name='apl_version' editable={true} manejador={handleInputChange} />
                    <Select campo='Licencia' name='apl_licencia' opciones={['NINGUNA','FISICA','LOGICA']} manejador={handleInputChange} />
                    <Select campo='Plataforma' name='plataforma' opciones={opcionPlataforma} manejador={handleInputChange} />
                    <Select campo='Codigo Fuente' name='apl_codigo_fuente' opciones={['SI','NO']} manejador={handleInputChange} />
                    <Input campo='Lenguaje' name='lenguaje' editable={true} manejador={handleInputChange} />
                    <Input campo='Framework' name='framework' editable={true} manejador={handleInputChange} />
                </div>
                    
                {/* --------------- BASE DE DATOS --------------- */}
                <p className='font-bold text-base my-4'>Base de datos</p>
                <div className="grid grid-cols-2 gap-4">
                    <Select campo='Seleccione Base de datos' name='select_base' opciones={opcionEstatus} manejador={handleInputChange}/>
                    <Checkbox id='registrar_base' name='registrar_base' opciones={['Registrar nueva']} manejador={habilitarBase} />
                </div>

                <div style={registrarBase ? {display: 'grid'} : {display: 'none'}} className="grid grid-cols-2 gap-4">
                    <Input campo='Nombre' name='base_datos' editable={true} manejador={handleInputChange} />
                    <Select campo='Estatus' name='base_estatus' opciones={opcionEstatus} manejador={handleInputChange}/>
                    <Select campo='Tipo' name='base_tipo' opciones={['Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
                    <Select campo='Manejador' name='base_manejador' opciones={['MYSQL','POSTGRESS','MARIADB']} manejador={handleInputChange} />
                    <Select campo='Tipo Amb' name='base_tipo_ambiente' opciones={['Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
                    <Input campo='N° Usuarios' name='base_cantidad_usuarios' editable={true} manejador={handleInputChange} />
                    <Input campo='Servidor' name='base_servidor' editable={true} manejador={handleInputChange} />
                </div>

                {/* --------------- SERVIDOR --------------- */}
                <p className='font-bold text-base my-4'>Servidor</p>
                <div className="grid grid-cols-2 gap-4">
                    <Select campo='Seleccione Servidor' name='select_servidor' opciones={opcionEstatus} manejador={handleInputChange}/>
                    <Checkbox id='registrar_servidor' name='registrar_servidor' opciones={['Registrar nuevo']} manejador={habilitarServidor} />
                </div>

                <div style={registrarServidor ? {display: 'grid'} : {display: 'none'}} className="grid grid-cols-2 gap-4">
                    <Input campo='Nombre' name='servidor' editable={true} manejador={handleInputChange} />
                    <Select campo='Estatus' name='ser_estatus' opciones={['SI','NO']} manejador={handleInputChange}/>
                    <Input campo='Direccion' name='ser_direccion' editable={true} manejador={handleInputChange} />
                    <Input campo='Sistema' name='ser_sistema' editable={true} manejador={handleInputChange} />
                    <Input campo='Version Sis' name='ser_sistemas_version' editable={true} manejador={handleInputChange} />
                    <Input campo='Marca' name='ser_marca' editable={true} manejador={handleInputChange} />
                    <Input campo='Modelo' name='ser_modelo' editable={true} manejador={handleInputChange} />
                    <Input campo='Serial' name='ser_serial' editable={true} manejador={handleInputChange} />
                    <Input campo='Cantidad' name='ser_cantidad_cpu' editable={true} manejador={handleInputChange} />
                    <Input campo='Velocidad' name='ser_velocidad_cpu' editable={true} manejador={handleInputChange} />
                    <Input campo='Memoria' name='ser_memoria' editable={true} manejador={handleInputChange} />
                    <Select campo='Region' name='ser_region' opciones={opcionRegion} manejador={handleInputChange} />
                    <Select campo='Localidad' name='ser_localidad' opciones={opcionRegion} manejador={handleInputChange} />
                </div>
                
                <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
                {/* --------------- DOCUMENTACION --------------- */}
                <p className='font-bold text-base my-4'>Documentacion</p>
                <div className="grid grid-cols-2 gap-4">
                    <Input campo='Descripcion' name='doc_descripcion' editable={true} manejador={handleInputChange} />
                    <Input campo='Direccion' name='doc_direccion' editable={true} manejador={handleInputChange} />
                    <Input campo='Tipo de Doc' name='doc_tipo' editable={true} manejador={handleInputChange} />
                </div>

                {/* --------------- MANTENIMIENTO --------------- */}
                <p className='font-bold text-base my-4'>Mantenimiento</p>
                <div className="grid grid-cols-2 gap-4">
                    <Select campo='Frecuencia' name='man_frecuencia' opciones={opcionMantenimiento} editable={true} manejador={handleInputChange}/>
                    <Input campo='Horas Pro' name='man_horas_prom' editable={true} manejador={handleInputChange} />
                    <Input campo='Horas Anu' name='man_horas_anuales' editable={true} manejador={handleInputChange} />
                </div>

                    
                <div className="absolute bottom-4 right-1/3">
                    <Button width={32}>Registrar</Button>
                </div>
                <div className="absolute bottom-4 left-1/3">
                    <Button color='red' width={32} accion={navegar} >Cancelar</Button>
                </div>

            </form>

        </Container>
    )
};

export default Registro;
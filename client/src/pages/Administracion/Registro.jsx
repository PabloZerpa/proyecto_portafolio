
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Container, Input, Select } from '../../components';
import Autorizacion from '../../services/auth.service';

const opcionEstatus = ['TODAS', 'DESARROLLO', 'MANTENIMIENTO', 'DESINCORPORADA', 'ESTABILIZACION',
    'SIN USO', 'VISAULIZACION', 'PRUEBA'];
const opcionRegion = ['TODAS', 'CENTRO', 'CENTRO SUR', 'CENTRO OCCIDENTE','ORIENTE NORTE', 
'ORIENTE SUR', 'OCCIDENTE','FAJA','METROPOLITANA',];
const opcionPlataforma = ['TODAS', 'WEB', 'ESCRITORIO', 'MOVIL', 'CLIENTE-SERVIDOR', 'STAND ALONE', 'MINI', 'MAINFRAME'];
const opcionAlcance = ['TODAS', 'LOCAL', 'REGIONAL', 'CORPORATIVO'];
const opcionMantenimiento = ['TODAS', 'DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL',
    'BIMENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL', 'NO APLICA'];

function Registro() {

    const navigate = useNavigate();
    const [datos, setDatos] = useState({
        acronimo: '',
        estatus: '',
        nombre: '',
        descripcion: '',
        prioridad: '',
        region: '',
        localidad: '',
        nombreFuncional: '',
        apellidoFuncional: '',
        indicadorFuncional: '',
        telefonoFuncional: '',
        cedulaFuncional: '',
        regionFuncional: '',
        localidadFuncional: '',
        nombreTecnico: '',
        apellidoTecnico: '',
        indicadorTecnico: '',
        telefonoTecnico: '',
        cedulaTecnico: '',
        regionTecnico: '',
        localidadTecnico: '',
        codigoFuente: '',
        licencia: '',
        direccion: '',
        plataforma: '',
        lenguaje: '',
        framework: '',
        baseDatos: '',
        nombreBase: '',
        estatusBase: '',
        manejadorBase: '',
        direccionBase: '',
        nombreServidor: '',
        estatusServidor: '',
        ubicacionServidor: '',
        direccionServidor: '',
        negocio: '',
        cliente: '',
        cantidad: '',
        ubicacionCliente: '',
        documentacion: '',
        descricionDoc: '',
        tipoDoc: '',
        direccionDoc: '',
        frecuencia: '',
        horasProm: '',
        tipoMan: '',
        horasAnuales: '',
        propiedad: '',
        registro: '',
    });

    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }
    
    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function createData(e) {
        e.preventDefault();

        try {
          console.log('TRY DEL CREATE');
          if(Autorizacion.obtenerUsuario().rol === 'admin'){

            console.log('DENTRO DEL TRY CREATE');
            console.log(datos);
            // const datosRegistro = {
            //     acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
            //     responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
            //     cantidad,plataforma,codigo,lenguaje,baseDatos,alcance,propiedad,servidor,ultima
            // };
            
            // await Autorizacion.crearDatos(datos);
            // navigate("/dashboard");
          }
        }
        catch (error) { console.log('ERROR AL ACTUALIZAR APL_ACT'); }
      }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    return (
        <Container>

            <h1 className='font-bold text-lg'>Registro de Aplicacion</h1>

            <form className="w-3/4 bg-zinc-400 p-4 pb-4 mb-10 rounded drop-shadow-md" onSubmitCapture={createData} >

                {/* --------------- INFORMACION BASICA --------------- */}
                <div className="grid gap-6 mb-0 md:grid-cols-2">
                    <Input campo='Acronimo' name='aplicacion_acronimo' editable={true} manejador={handleInputChange} />
                    <Select campo='Estatus' name='aplicacion_estatus' opciones={opcionEstatus} manejador={handleInputChange}/>
                </div>

                <Input campo='Nombre' name='aplicacion_nombre' editable={true} area={true} manejador={handleInputChange} />
                <Input campo='Descripcion' name='aplicacion_descripcion' editable={true} area={true} manejador={handleInputChange} />

                <div className="relative grid gap-6 mb-0 md:grid-cols-2">
                    <Input campo='Version' name='aplicacion_version' editable={true} manejador={handleInputChange} />
                    <Select campo='Prioridad' name='aplicacion_prioridad' opciones={['ALTA','MEDIA','BAJA',]} manejador={handleInputChange} />
                    <Select campo='Critico' name='aplicacion_critico' opciones={['SI','NO']} manejador={handleInputChange} />
                    <Select campo='Alcance' name='aplicacion_alcance' opciones={opcionAlcance} manejador={handleInputChange} />
                    <Select campo='Licencia' name='aplicacion_licencia' opciones={['NINGUNA','FISICA','LOGICA']} manejador={handleInputChange} />
                    <Input campo='Direccion' name='aplicacion_direccion' editable={true} manejador={handleInputChange} />

                    {/* --------------- RESPONSABLES --------------- */} 
                    <div className='flex flex-col'>
                        <p className='ml-32 font-bold'>Responsable Funcional</p>
                        <Input campo='Nombre' name='funcional_nombre' editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='funcional_apellido' editable={true} manejador={handleInputChange} />
                        <Input campo='Indicador' name='funcional_indicador' editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='funcional_cedula' editable={true} />
                        <Input campo='Telefono' name='funcional_telefono' editable={true} manejador={handleInputChange} />
                        <Select campo='Rol' name='funcional_rol' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='funcional_gerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Subgerencia' name='funcional_subgerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Region' name='funcional_region' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='funcional_localidad' opciones={opcionRegion} manejador={handleInputChange} />
                    </div>

                    <div className='relative flex flex-col'>
                        <div className='absolute -left-4 top-12 w-1 h-72 border-2 border-dashed border-gray-500'></div>
                        <div className='absolute -left-4 top-80 w-1 h-80 border-2 border-dashed border-gray-500'></div>
                        <p className='ml-32 font-bold'>Responsable Tecnico</p>
                        <Input campo='Nombre' name='tecnico_nombre' editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='tecnico_apellido' editable={true} manejador={handleInputChange} />
                        <Input campo='Indicador' name='tecnico_indicador' editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='tecnico_cedula' editable={true} />
                        <Input campo='Telefono' name='tecnico_telefono' editable={true} manejador={handleInputChange} />
                        <Select campo='Rol' name='tecnico_rol' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Gerencia' name='tecnico_gerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Subgerencia' name='tecnico_subgerencia' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Region' name='tecnico_region' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='tecnico_localidad' opciones={opcionRegion} manejador={handleInputChange} />
                    </div>

                    {/* --------------- TECNOLOGIAS --------------- */}

                    <Select campo='Plataforma' name='plataforma' opciones={opcionPlataforma} manejador={handleInputChange} />
                    <Select campo='Codigo Fuente' name='aplicacion_codigo_fuente' opciones={['SI','NO']} manejador={handleInputChange} />
                    <Input campo='Lenguaje' name='lenguaje' editable={true} manejador={handleInputChange} />
                    <Input campo='Version Len' name='lenguaje_version' editable={true} manejador={handleInputChange} />
                    <Input campo='Framework' name='framework' editable={true} manejador={handleInputChange} />
                    <Input campo='Version Fram' name='framework_version' editable={true} manejador={handleInputChange} />

                    {/* <div className='relative'>
                        <div className='absolute left-0 -top-4 w-96 h-1 border-2 border-dashed border-gray-500'></div>
                    </div>
                    <div className='relative'>
                        <div className='absolute right-0 -top-4 w-96 h-1 border-2 border-dashed border-gray-500'></div>
                        <div className='absolute right-96 -top-4 w-24 h-1 border-2 border-dashed border-gray-500'></div>
                    </div> */}
                    
                    {/* --------------- BASE DE DATOS --------------- */}
                    <div className='relative flex flex-col'>
                        <p className='ml-32 font-bold'>Base de datos</p>
                        <Input campo='Nombre' name='base_datos_nombre' editable={true} manejador={handleInputChange} />
                        <Select campo='Estatus' name='base_datos_estatus' opciones={opcionEstatus} manejador={handleInputChange}/>
                        <Select campo='Tipo' name='base_datos_tipo' opciones={['Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
                        <Select campo='Manejador' name='base_datos_manejador' opciones={['MYSQL','POSTGRESS','MARIADB']} manejador={handleInputChange} />
                        <Input campo='Version Man' name='base_datos_manejador_version' editable={true} manejador={handleInputChange} />
                        <Input campo='Sistema' name='base_datos_sistema' editable={true} manejador={handleInputChange} />
                        <Input campo='Version Sis' name='base_datos_sistemas_version' editable={true} manejador={handleInputChange} />
                        <Select campo='Tipo Amb' name='base_datos_tipo_ambiente' opciones={['Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
                        <Input campo='N° Usuarios' name='base_datos_cantidad' editable={true} manejador={handleInputChange} />
                        <Input campo='Direccion' name='base_datos_direccion' editable={true} manejador={handleInputChange} />
                        <Input campo='Servidor' name='base_datos_servidor' editable={true} manejador={handleInputChange} />

                    </div>

                    {/* --------------- SERVIDOR --------------- */}
                    <div className='relative flex flex-col'>
                        <div className='absolute -left-4 top-12 w-1 h-56 border-2 border-dashed border-gray-500'></div>
                        <div className='absolute -left-4 top-44 w-1 h-64 border-2 border-dashed border-gray-500'></div>
                        <p className='ml-32 font-bold'>Servidor</p>
                        <Input campo='Nombre' name='servidor_nombre' editable={true} manejador={handleInputChange} />
                        <Select campo='Estatus' name='servidor_estatus' opciones={['SI','NO']} manejador={handleInputChange}/>
                        <Input campo='Sistema' name='servidor_sistema' editable={true} manejador={handleInputChange} />
                        <Input campo='Version Sis' name='servidor_sistemas_version' editable={true} manejador={handleInputChange} />
                        <Input campo='Direccion' name='servidor_direccion' editable={true} manejador={handleInputChange} />
                        <Input campo='Marca' name='servidor_marca' editable={true} manejador={handleInputChange} />
                        <Input campo='Modelo' name='servidor_modelo' editable={true} manejador={handleInputChange} />
                        <Input campo='Serial' name='servidor_modelo' editable={true} manejador={handleInputChange} />
                        <Input campo='Cantidad' name='servidor_cantidad_cpu' editable={true} manejador={handleInputChange} />
                        <Input campo='Velocidad' name='servidor_velocidad_cpu' editable={true} manejador={handleInputChange} />
                        <Input campo='Memoria' name='servidor_memoria' editable={true} manejador={handleInputChange} />
                        <Select campo='Region' name='servidor_region' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='servidor_localidad' opciones={opcionRegion} manejador={handleInputChange} />
                    </div>

                    {/* --------------- CLIENTE --------------- */}
                    <Input campo='Cliente' name='cliente_nombre' editable={true} manejador={handleInputChange} />
                    <Input campo='N° Usuarios' name='cliente_cantidad' editable={true} manejador={handleInputChange} />
                    <Input campo='Region' name='cliente_region' editable={true} manejador={handleInputChange} />
                    <Input campo='Localidad' name='cliente_localidad' editable={true} manejador={handleInputChange} />

                    {/* --------------- DOCUMENTACION --------------- */}
                    <Input campo='Nombre' name='documentacion_nombre' editable={true} manejador={handleInputChange} />
                    <Input campo='Descripcion' name='documentacion_descrip' editable={true} manejador={handleInputChange} />
                    <Input campo='Direccion' name='documentacion_direccion' editable={true} manejador={handleInputChange} />
                    <Input campo='Tipo de Doc' name='documentacion_tipo' editable={true} manejador={handleInputChange} />

                    {/* --------------- MANTENIMIENTO --------------- */}
                    <Select campo='Frecuencia' name='mantenimiento_frecuencia' opciones={opcionMantenimiento} editable={true} manejador={handleInputChange}/>
                    <Input campo='Horas Pro' name='mantenimiento_horas_prom' editable={true} manejador={handleInputChange} />
                    <Input campo='Horas Anu' name='mantenimiento_horas_anuales' editable={true} manejador={handleInputChange} />
                    <div></div>

                    {/* --------------- UBICACION Y FECHA --------------- */}
                    <div>
                        <div className='absolute top-0 left-0 w-full border-dashed border-gray-500'></div>
                        <Select campo='Region' name='aplicacion_region' opciones={opcionRegion} manejador={handleInputChange} />
                        <div className='flex flex-col gap-2 text-xs font-medium text-gray-900 mb-6'>
                            <label>Fecha de Registro</label>
                            <input
                                type='date'
                                name='registro'
                                className='w-full p-2 bg-gray-50 border-none text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500' 
                                placeholder='Fecha de Registro'
                                onChange={(e) => {handleInputChange(e)}}
                            />
                        </div>
                    </div>
                    <div>
                        <Select campo='Localidad' name='aplicacion_localidad' opciones={['PROPIO','TERCERO','COMPARTIDO']} manejador={handleInputChange} />
                    </div>

                    {/* --------------- FALLAS - SOLICITUDES --------------- */}
                    {/* <Input campo='Ver Fallas' name='numeroFalla' editable={true} manejador={handleInputChange} />
                    <Input campo='Ver Solicitudes' name='numeroSolicitudes' editable={true} manejador={handleInputChange} /> */}

                    <Button color='blue' width={32}>Registrar</Button>
                </div>

            </form>

        </Container>
    )
};

export default Registro;
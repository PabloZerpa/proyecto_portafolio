
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Container, Input, Select } from '../../components/';
import Autorizacion from '../../services/auth.service';

const opcionEstatus = ['TODAS', 'DESARROLLO', 'MANTENIMIENTO', 'DESINCORPORADA', 'ESTABILIZACION',
    'SIN USO', 'VISAULIZACION', 'PRUEBA'];
const opcionRegion = ['TODAS', 'CENTRO', 'CENTRO SUR', 'CENTRO OCCIDENTE','ORIENTE NORTE', 
'ORIENTE SUR', 'OCCIDENTE','FAJA','METROPOLITANA',];
const opcionPlataforma = ['TODAS', 'WEB', 'ESCRITORIO', 'MOVIL', 'CLIENTE-SERVIDOR', 'STAND ALONE', 'MINI', 'MAINFRAME'];
const opcionAlcance = ['TODAS', 'LOCAL', 'REGIONAL', 'CORPORATIVO'];
const opcionMantenimiento = ['TODAS', 'DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL',
    'BIMENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL', 'NO APLICA'];

function Agregar() {

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

            <form className="w-3/4 bg-zinc-400 p-4 pb-16 mb-10 rounded drop-shadow-md" onSubmitCapture={createData} >

                {/* --------------- INFORMACION BASICA --------------- */}
                <div className="grid gap-6 mb-0 md:grid-cols-2">
                    <Input campo='Acronimo' name='acronimo' editable={true} manejador={handleInputChange} />
                    <Select campo='Estatus' name='estatus' opciones={opcionEstatus} manejador={handleInputChange} />
                </div>

                <Input campo='Nombre' name='nombre' editable={true} area={true} manejador={handleInputChange} />
                <Input campo='Descripcion' name='descripcion' editable={true} area={true} manejador={handleInputChange} />

                <div className="relative grid gap-6 mb-0 md:grid-cols-2">
                    <Select campo='Prioridad' name='prioridad' opciones={['ALTA','MEDIA','BAJA',]} manejador={handleInputChange} />
                    <Select campo='Alcance' name='alcance' opciones={opcionAlcance} manejador={handleInputChange} />

                    {/* --------------- RESPONSABLES --------------- */}
                    <div className='flex flex-col'>
                        <p className='ml-32 font-bold'>Responsable Funcional</p>
                        <Input campo='Nombre' name='nombreFuncional' editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='apellidoFuncional' editable={true} manejador={handleInputChange} />
                        <Input campo='Indicador' name='indicadorFuncional' editable={true} manejador={handleInputChange} />
                        <Input campo='Telefono' name='telefonoFuncional' editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='cedulaFuncional' editable={true} />
                        <Select campo='Region' name='regionFuncional' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='localidadFuncional' opciones={opcionRegion} manejador={handleInputChange} />
                    </div>

                    <div className='relative flex flex-col'>
                        <div className='absolute -left-4 top-12 w-1 h-72 border-2 border-dashed border-gray-500'></div>
                        <div className='absolute -left-4 top-80 w-1 h-80 border-2 border-dashed border-gray-500'></div>
                        <p className='ml-32 font-bold'>Responsable Tecnico</p>
                        <Input campo='Nombre' name='nombreTecnico' editable={true} manejador={handleInputChange} />
                        <Input campo='Apellido' name='apellidoTecnico' editable={true} manejador={handleInputChange} />
                        <Input campo='Indicador' name='indicadorTecnico' editable={true} manejador={handleInputChange} />
                        <Input campo='Telefono' name='telefonoTecnico' editable={true} manejador={handleInputChange} />
                        <Input campo='Cedula' name='cedulaTecnico' editable={true} />
                        <Select campo='Region' name='regionTecnico' opciones={opcionRegion} manejador={handleInputChange} />
                        <Select campo='Localidad' name='localidadTecnico' opciones={opcionRegion} manejador={handleInputChange} />
                    </div>

                    {/* --------------- TECNOLOGIAS --------------- */}
                    <div className='relative'>
                        <div className='absolute left-0 -top-4 w-96 h-1 border-2 border-dashed border-gray-500'></div>
                        <Select campo='Codigo Fuente' name='codigoFuente' opciones={['SI','NO']} manejador={handleInputChange} />
                        <Select campo='Licencia' name='licencia' opciones={['NINGUNA','FISICA','LOGICA']} manejador={handleInputChange} />
                        <Input campo='Direccion' name='direccion' editable={true} manejador={handleInputChange} />
                    </div>
                    <div className='relative'>
                        <div className='absolute right-0 -top-4 w-96 h-1 border-2 border-dashed border-gray-500'></div>
                        <div className='absolute right-96 -top-4 w-24 h-1 border-2 border-dashed border-gray-500'></div>
                        <Select campo='Plataforma' name='plataforma' opciones={opcionPlataforma} manejador={handleInputChange} />
                        <Input campo='Lenguaje' name='lenguaje' editable={true} manejador={handleInputChange} />
                        <Input campo='Framework' name='framework' editable={true} manejador={handleInputChange} />
                    </div>
                    
                    <div className='relative flex flex-col'>
                        <p className='ml-32 font-bold'>Base de datos</p>
                        <Select campo='Base de Datos' name='baseDatos' opciones={['SI','NO']} manejador={handleInputChange} />
                        <Input campo='Nombre' name='nombreBase' manejador={handleInputChange} />
                        <Select campo='Estatus' name='estatusBase' opciones={['SI','NO']} manejador={handleInputChange} />
                        <Select campo='Manejador' name='manejadorBase' opciones={['MYSQL','POSTGRESS','MARIADB']} editable={true} />
                        <Input campo='Direccion Base de Datos' name='direccionBase' editable={true} manejador={handleInputChange} />
                    </div>

                    <div className='relative flex flex-col'>
                        <div className='absolute -left-4 top-12 w-1 h-56 border-2 border-dashed border-gray-500'></div>
                        <div className='absolute -left-4 top-44 w-1 h-64 border-2 border-dashed border-gray-500'></div>
                        <p className='ml-32 font-bold'>Servidor</p>
                        <Select campo='Servidor' name='servidor' opciones={['SI','NO']} manejador={handleInputChange} />
                        <Input campo='Nombre Servidor' name='nombreServidor' manejador={handleInputChange} />
                        <Select campo='Estatus' name='estatusServidor' opciones={['SI','NO']} manejador={handleInputChange} />
                        <Input campo='Ubicacion Servidor' name='ubicacionServidor' editable={true} manejador={handleInputChange} />
                        <Input campo='Direccion Servidor' name='direccionServidor' editable={true} manejador={handleInputChange} />
                    </div>

                    {/* --------------- CLIENTE --------------- */}
                    <div>
                        <Input campo='Negocio' name='negocio' editable={true} manejador={handleInputChange} />
                        <Input campo='Cliente' name='cliente' editable={true} manejador={handleInputChange} />
                    </div>
                    <div>
                        <Input campo='N° de Usuarios' name='cantidad' editable={true} manejador={handleInputChange} />
                        <Input campo='Ubicacion Cliente' name='ubicacionCliente' editable={true} manejador={handleInputChange} />
                    </div>

                    {/* --------------- DOCUMENTACION --------------- */}
                    <div>
                        <Input campo='Documentacion' name='documentacion' editable={true} manejador={handleInputChange} />
                        <Input campo='Descripcion Documentacion' name='descripcionDoc' editable={true} manejador={handleInputChange} />
                    </div>
                    <div>
                        <Input campo='Tipo de Documentacion' name='tipoDoc' editable={true} manejador={handleInputChange} />
                        <Input campo='Direccion Documentacion' name='direccionDoc' editable={true} manejador={handleInputChange} />
                    </div>

                    {/* --------------- MANTENIMIENTO --------------- */}
                    <div className='relative'>
                        <div className='absolute left-0 -top-4 w-96 h-1 border-2 border-dashed border-gray-500'></div>
                        <Select campo='Frecuencia Mantenimiento' name='frecuencia' opciones={opcionMantenimiento} editable={true} manejador={handleInputChange} />
                        <Input campo='Horas Promedio' name='horasProm' editable={true} manejador={handleInputChange} />
                    </div>
                    <div className='relative'>
                        <div className='absolute right-0 -top-4 w-96 h-1 border-2 border-dashed border-gray-500'></div>
                        <div className='absolute right-96 -top-4 w-24 h-1 border-2 border-dashed border-gray-500'></div>
                        <Select campo='Tipo de mantenimiento' name='tipoMan' opciones={opcionMantenimiento} editable={true} manejador={handleInputChange} />
                        <Input campo='Horas Anuales' name='horasAnuales' editable={true} manejador={handleInputChange} />
                    </div>

                    {/* --------------- UBICACION Y FECHA --------------- */}
                    <div>
                        <div className='absolute top-0 left-0 w-full border-dashed border-gray-500'></div>
                        <Select campo='Propiedad' name='propiedad' opciones={['PROPIO','TERCERO','COMPARTIDO']} manejador={handleInputChange} />
                        <Select campo='Region' name='region' opciones={opcionRegion} manejador={handleInputChange} />
                    </div>
                    <div>
                        <Select campo='Localidad' name='localidad' opciones={opcionRegion} manejador={handleInputChange} />
                        {/* <Input campo='Fecha de Creacion' name='registro' editable={true} manejador={handleInputChange} /> */}

                        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6'>
                            <label>Fecha de Registro</label>
                            <input
                                type='date'
                                name='registro'
                                className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500' 
                                placeholder='Fecha de Registro'
                                onChange={(e) => {handleInputChange(e)}}
                            />
                        </div>

                    </div>

                    
                    {/* <Button color='blue' width={32} >Agregar</Button> */}
                    <button 
                        type='submit' 
                        className='absolute -bottom-12 right-0 w-32 h-8 mt-6 text-sm bg-blue-600 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-500' >
                        Agregar
                    </button>
                </div>

            </form>

        </Container>
    )
};

export default Agregar;
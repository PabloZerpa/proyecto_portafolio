
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Container, Input, Select } from '../../components/';
import Autorizacion from '../../services/auth.service';

const opcionEstatus = ['TODAS', 'DESARROLLO', 'MANTENIMIENTO', 'DESINCORPORADA', 'ESTABILIZACION',
    'SIN USO', 'VISAULIZACION', 'PRUEBA'];
const opcionRegion = ['TODAS', 'CENTRO', 'CENTRO SUR', 'CENTRO OCCIDENTE','ORIENTE NORTE', 
'ORIENTE SUR', 'OCCIDENTE','FAJA','METROPOLITANA',];
const opcionTipo = ['TODAS', 'WEB', 'ESCRITORIO', 'MOVIL', 'SERVIDOR', 'MIXTA'];
const opcionPlataforma = ['TODAS', 'WEB', 'ESCRITORIO', 'MOVIL', 'CLIENTE-SERVIDOR', 'STAND ALONE', 'MINI', 'MAINFRAME'];
const opcionAlcance = ['TODAS', 'LOCAL', 'REGIONAL', 'CORPORATIVO'];
const opcionMantenimiento = ['TODAS', 'DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL',
    'BIMENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL', 'NO APLICA'];

function Agregar() {

    const navigate = useNavigate();
    const [rol, setRol] = useState('');

    const [acronimo, setAcronimo] = useState('');
    const obtenerAcronimo = (respuesta) => {setAcronimo(respuesta)};
    const [nombre, setNombre] = useState('');
    const obtenerNombre = (respuesta) => {setNombre(respuesta)};
    const [descripcion, setDescripcion] = useState('');
    const obtenerDescripcion = (respuesta) => {setDescripcion(respuesta)};
    const [estatus, setEstatus] = useState('');
    const obtenerEstatus = (respuesta) => {setEstatus(respuesta)};
    const [region, setRegion] = useState('');
    const obtenerRegion = (respuesta) => {setRegion(respuesta)};
    const [responsablef, setResponsableF] = useState('');
    const obtenerResponsablef = (respuesta) => {setResponsableF(respuesta)};
    const [responsablef_ind, setResponsableF_ind] = useState('');
    const obtenerResponsablef_ind = (respuesta) => {setResponsableF_ind(respuesta)};
    const [responsablef_tlf, setResponsableF_tlf] = useState('');
    const obtenerResponsablef_tlf = (respuesta) => {setResponsableF_tlf(respuesta)};
    const [responsablef_cor, setResponsableF_cor] = useState('');
    const obtenerResponsable_cor = (respuesta) => {setResponsableF_cor(respuesta)};
    const [responsablet, setResponsableT] = useState('');
    const obtenerResponsablet = (respuesta) => {setResponsableT(respuesta)};
    const [responsablet_ind, setResponsableT_ind] = useState('');
    const obtenerResponsablet_ind = (respuesta) => {setResponsableT_ind(respuesta)};
    const [responsablet_tlf, setResponsableT_tlf] = useState('');
    const obtenerResponsablet_tlf = (respuesta) => {setResponsableT_tlf(respuesta)};
    const [responsablet_cor, setResponsableT_cor] = useState('');
    const obtenerResponsablet_cor = (respuesta) => {setResponsableT_cor(respuesta)};
    const [prioridad, setPrioridad] = useState('');
    const obtenerPrioridad = (respuesta) => {setPrioridad(respuesta)};
    const [tipo, setTipo] = useState('');
    const obtenerTipo = (respuesta) => {setTipo(respuesta)};
    const [departamento, setDepartamento] = useState('');
    const obtenerDepartamento = (respuesta) => {setDepartamento(respuesta)};
    const [cantidad, setCantidad] = useState('');
    const obtenerCantidad = (respuesta) => {setCantidad(respuesta)};
    const [plataforma, setPlataforma] = useState('');
    const obtenerPlataforma = (respuesta) => {setPlataforma(respuesta)};
    const [codigo, setCodigo] = useState('');
    const obtenerCodigo = (respuesta) => {setCodigo(respuesta)};
    const [lenguaje, setLenguaje] = useState('');
    const obtenerLenguaje = (respuesta) => {setLenguaje(respuesta)};
    const [baseDatos, setBaseDatos] = useState('');
    const obtenerBaseDatos = (respuesta) => {setBaseDatos(respuesta)};
    const [alcance, setAlcance] = useState('');
    const obtenerAlcance = (respuesta) => {setAlcance(respuesta)};
    const [propiedad, setPropiedad] = useState('');
    const obtenerPropiedad = (respuesta) => {setPropiedad(respuesta)};
    const [servidor, setServidor] = useState('');
    const obtenerServidor = (respuesta) => {setServidor(respuesta)};
    const [ultima, setUltima] = useState('29/2/2024');
    const obtenerUltima = (respuesta) => {setUltima(respuesta)};
    const [frecuencia, setFrecuencia] = useState('');
    const obtenerFrecuencia = (respuesta) => {setFrecuencia(respuesta)};
    const [frecuencia_hr, setFrecuenciaH] = useState('');
    const obtenerFrecuenciah = (respuesta) => {setFrecuenciaH(respuesta)};
    
    useEffect(() =>{
        setRol(Autorizacion.obtenerUsuario().rol);
        console.log(rol);
    }, [obtenerAcronimo])
    
    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function createData(e) {
        e.preventDefault();

        try {
          console.log('TRY DEL CREATE');
          if(rol === 'admin'){

            console.log('DENTRO DEL TRY CREATE');
            const datosRegistro = {
                acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
                responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
                cantidad,plataforma,codigo,lenguaje,baseDatos,alcance,propiedad,servidor,ultima
            };
            
            await Autorizacion.crearDatos(datosRegistro);
            navigate("/dashboard");
          }
        }
        catch (error) { console.log('ERROR AL ACTUALIZAR APL_ACT'); }
      }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    return (
        <Container>

            <h2 className='font-bold'>Registro de Aplicacion</h2>

            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmitCapture={createData} >
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <Input campo='Acronimo' name='acronimo' editable={true} manejador={obtenerAcronimo} />
                    <Select campo='Estatus' name='estatus' opciones={opcionEstatus} manejador={obtenerEstatus} />
                </div>

                <Input campo='Nombre' name='nombre' editable={true} area={true} manejador={obtenerNombre} />
                <Input campo='Descripcion' name='descripcion' editable={true} area={true} manejador={obtenerDescripcion} />

                <div className="relative grid gap-6 mb-6 md:grid-cols-2">
                    <Select campo='Prioridad' opciones={['ALTA','MEDIA','BAJA',]} manejador={obtenerPrioridad} />
                    <Select campo='Tipo de Aplicacion' opciones={opcionTipo} manejador={obtenerTipo} />

                    <div className='flex flex-col'>
                        <p className='ml-32'>Responsable Funcional</p>
                        <Input campo='Nombre' name='responsablef' editable={true} manejador={obtenerResponsablef} />
                        <Input campo='Apellido' name='responsablef_cor' editable={true} manejador={obtenerResponsablet_cor} />
                        <Input campo='Indicador' name='responsablef_ind' editable={true} manejador={obtenerResponsablef_ind} />
                        <Input campo='Telefono' name='responsablef_tlf' editable={true} manejador={obtenerResponsablef_tlf} />
                    </div>

                    <div className='relative flex flex-col'>
                        <div className='absolute -left-4 top-4 w-1 h-96 border-2 border-dashed border-gray-500'></div>
                        <p className='ml-32'>Responsable Tecnico</p>
                        <Input campo='Nombre' name='responsablet' editable={true} manejador={obtenerResponsablet} />
                        <Input campo='Apellido' name='responsablet_ind' editable={true} manejador={obtenerResponsablet} />
                        <Input campo='Indicador' name='responsablet_ind' editable={true} manejador={obtenerResponsablet} />
                        <Input campo='Telefono' name='responsablet_ind' editable={true} manejador={obtenerResponsablet} />
                    </div>

                    <Input campo='Negocio' name='departamento' editable={true} manejador={obtenerDepartamento} />
                    <Input campo='N° de Usuarios' name='cantidad_user' editable={true} manejador={obtenerCantidad} />
                    <Select campo='Plataforma' name='plataforma' opciones={opcionPlataforma} manejador={obtenerPlataforma} />
                    <Input campo='Direccion' name='direccion' editable={true} />
                    
                    <Select campo='Codigo Fuente' name='codigo_fuente' opciones={['SI','NO','MIXTO']} manejador={obtenerCodigo} />
                    <Input campo='Lenguaje' name='lenguaje' editable={true} manejador={obtenerLenguaje} />
                    <Select campo='Base de Datos' name='base_datos' opciones={['SI','NO']} manejador={obtenerBaseDatos} />
                    <Select campo='Alcance' name='alcance' opciones={opcionAlcance} manejador={obtenerAlcance} />

                    <div className='absolute top-0 left-0 w-full border-dashed border-gray-500'></div>
                    <Select campo='Propiedad' name='propiedad' opciones={['PROPIO','TERCERO','COMPARTIDO']} manejador={obtenerPropiedad} />
                    <Input campo='Fecha de Creacion' name='ultima' editable={true} manejador={obtenerUltima} />
                    <Select campo='Region' name='region' opciones={opcionRegion} manejador={obtenerRegion} />
                    <Select campo='Servidor' name='servidor' opciones={['SI','NO']} manejador={obtenerServidor} />
                    {/* <Input campo='Servidor' name='servidor' editable={true} manejador={obtenerServidor} /> */}
                    
                </div>
                
                {/* <Button color='blue' width={32} >Agregar</Button> */}
                <button 
                    type='submit' 
                    className='w-32 h-8 text-sm bg-blue-600 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-500'
                >
                    Agregar
                </button>

            </form>

        </Container>
    )
};

export default Agregar;
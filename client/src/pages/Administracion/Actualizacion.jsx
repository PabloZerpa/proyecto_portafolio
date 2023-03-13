import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Button, Container, Input, Select } from '../../components';
import Autorizacion from '../../services/auth.service';
import Usuarios from '../../services/user.service';

const campos1 = ['Acronimo','Estatus','Nombre','Descripcion','Prioridad',
'Tipo','Responsable Funcional','Responsable Tecnico','Departamento',
'Numero de usuarios','Plataforma'];
const campos2 = ['Alcance','Codigo Fuente','Propiedad','Fecha'];
const campos3 = ['Region','Servidor'];

const opcionEstatus = ['TODAS', 'DESARROLLO', 'MANTENIMIENTO', 'DESINCORPORADA', 'ESTABILIZACION',
    'SIN USO', 'VISAULIZACION', 'PRUEBA'];
const opcionRegion = ['TODAS', 'CENTRO', 'CENTRO SUR', 'CENTRO OCCIDENTE','ORIENTE NORTE', 
'ORIENTE SUR', 'OCCIDENTE','FAJA','METROPOLITANA',];
const opcionTipo = ['TODAS', 'WEB', 'ESCRITORIO', 'MOVIL', 'SERVIDOR', 'MIXTA'];
const opcionPlataforma = ['TODAS', 'WEB', 'ESCRITORIO', 'MOVIL', 'CLIENTE-SERVIDOR', 'STAND ALONE', 'MINI', 'MAINFRAME'];
const opcionAlcance = ['TODAS', 'LOCAL', 'REGIONAL', 'CORPORATIVO'];
const opcionMantenimiento = ['TODAS', 'DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL',
    'BIMENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL', 'NO APLICA'];

function Actualizacion() {

    // const [datosApp, setDatosApp] = useState({
    //   acronimo: '', nombre: '', descripcion: '', estatus: '', region: '',
    //   responsablef: '', responsablef_ind: '', responsablef_tlf: '', responsablef_cor: '',
    //   responsablet: '', responsablet_ind: '', responsablet_tlf: '', responsablet_cor: '',
    //   tipo: '', departamento: '', cantidad: '', plataforma: '', codigo: '', lenguaje: '', 
    //   baseDatos: '', alcance: '', propiedad: '', servidor: '', ultima: '', 
    // });
    // const obtenerDatosApp = (respuesta) => {setDatoApp(respuesta)};
    
    const location = useLocation();
    const navigate = useNavigate();
    const [valor, setValor] = useState("");
    const [valorArray, setValorArray] = useState([]);
    const { paramsId } = useParams();
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
    const obtenerResponsablef_cor = (respuesta) => {setResponsableF_cor(respuesta)};
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
  
    useEffect(() => {
      console.log(location.state);
      setRol(Autorizacion.obtenerUsuario().rol);
      async function fetchData(){
        try {
          // const response = await Usuarios.obtenerDato(location.state.id)
          // setValor(response.data);
          // setValorArray(Object.values(response.data));
          
          setAcronimo(location.state.acronimo);
          setEstatus(location.state.estatus);
          setNombre(location.state.nombre);
          setDescripcion(location.state.descripcion);
          setRegion(location.state.region);
          setResponsableF(location.state.responsablef);
          setPrioridad(location.state.prioridad);
          setCodigo(location.state.codigo_fuente);
          setLenguaje(location.state.lenguaje);
          setBaseDatos(location.state.base_datos);
          setPropiedad(location.state.propiedad);
          setPlataforma(location.state.plataforma);
          setServidor(location.state.servidor);
          setAlcance(location.state.alcance);
          setTipo(location.state.tipo);
          setCantidad(location.state.cantidad_user);
          setDepartamento(location.state.departamento);
        } 
        catch (error) {
          console.log(error)
        }
      }
      fetchData();
    }, [paramsId]);
    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function updateData(e) {
  
      e.preventDefault();
      console.log('DENTRO DEL UPDATE DE ACTUALIZACION')
  
      try {
        console.log('TRY DEL UPDATE');
        
        if(rol === 'admin'){
          const datosModificacion = {
            acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
            responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
            cantidad,plataforma,codigo,lenguaje,baseDatos,alcance,propiedad,servidor,ultima
          };
          
          await Autorizacion.actualizarDatos(location.state.id, datosModificacion); 
          navigate("/dashboard");
        }
      }
      catch (error) { console.log('ERROR AL ACTUALIZAR APL_ACT'); }
    }

    function navegar(){
      navigate(-1);
    }
  
    if(Autorizacion.obtenerUsuario().rol !== 'admin') 
      return <Navigate to='/' />

  return (
    <Container>

      <h2 className='font-bold text-lg'>Actualizacion de Aplicacion</h2>

      <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmitCapture={updateData} >

            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <Input campo='Acronimo' name='acronimo' propiedad={acronimo} editable={true} manejador={obtenerAcronimo} />
                <Select campo='Estatus' name='estatus' propiedad={estatus} opciones={opcionEstatus} manejador={obtenerEstatus} />
            </div>
            
            <Input campo='Nombre' name='nombre' propiedad={nombre} editable={true} area={true} manejador={obtenerNombre} />
            <Input campo='Descripcion' name='descripcion' propiedad={descripcion} editable={true} area={true} manejador={obtenerDescripcion} />

            <div className="relative grid gap-6 mb-6 md:grid-cols-2">
              <Select campo='Prioridad'name='prioridad' propiedad={prioridad} opciones={['ALTA','MEDIA','BAJA',]} manejador={obtenerPrioridad} />
              <Select campo='Alcance' name='alcance' propiedad={alcance} opciones={opcionAlcance} manejador={obtenerAlcance} />

              {/* ========== RESPONSABLE FUNCIONAL ========== */}
              <div className='flex flex-col'>
                <p className='ml-32'>Responsable Funcional</p>
                <Input campo='Nombre' name='responsablef' propiedad={responsablef} editable={true} manejador={obtenerResponsablef} />
                <Input campo='Apellido' name='responsablef_cor' propiedad={responsablef_cor} editable={true} manejador={obtenerResponsablef_cor} />
                <Input campo='Indicador' name='responsablef_ind' propiedad={responsablef_ind} editable={true} manejador={obtenerResponsablef_ind} />
                <Input campo='Telefono' name='responsablef_tlf' propiedad={responsablef_tlf} editable={true} manejador={obtenerResponsablef_tlf} />
                <Input campo='Cedula' name='responsablef_ced' propiedad={responsablef_tlf} editable={true} manejador={obtenerResponsablef_tlf} />
                <Input campo='Region' name='responsablef_tlf' propiedad={responsablef_tlf} editable={true} manejador={obtenerResponsablef_tlf} />
                <Input campo='Localidad' name='responsablef_tlf' propiedad={responsablef_tlf} editable={true} manejador={obtenerResponsablef_tlf} />
              </div>

              {/* ========== RESPONSABLE TECNICO ========== */}
              <div className='relative flex flex-col'>
                <div className='absolute -left-4 top-6 w-1 h-96 border-2 border-dashed border-gray-500'></div>
                <div className='absolute -left-4 top-96 w-1 h-64 border-2 border-dashed border-gray-500'></div>
                <p className='ml-32'>Responsable Tecnico</p>
                <Input campo='Nombre' name='responsablet' propiedad={responsablet} editable={true} manejador={obtenerResponsablet} />
                <Input campo='Apellido' name='responsablet_cor' propiedad={responsablet_cor} editable={true} manejador={obtenerResponsablet_cor} />
                <Input campo='Indicador' name='responsablet_ind' propiedad={responsablet_ind} editable={true} manejador={obtenerResponsablet_ind} />
                <Input campo='Telefono' name='responsablet_tlf' propiedad={responsablet_tlf} editable={true} manejador={obtenerResponsablet_tlf} />
                <Input campo='Cedula' name='responsablef_ced' propiedad={responsablef_tlf} editable={true} manejador={obtenerResponsablef_tlf} />
                <Input campo='Region' name='responsablef_tlf' propiedad={responsablef_tlf} editable={true} manejador={obtenerResponsablef_tlf} />
                <Input campo='Localidad' name='responsablef_tlf' propiedad={responsablef_tlf} editable={true} manejador={obtenerResponsablef_tlf} />
              </div>

              {/* ========== CLIENTE ========== */}
              <Input campo='Negocio' name='departamento' propiedad={departamento} editable={true} manejador={obtenerDepartamento} />
              <Input campo='Cliente' name='cliente' propiedad={departamento} editable={true} manejador={obtenerDepartamento} />
              <Input campo='N° de Usuarios' name='cantidad_user' propiedad={cantidad} editable={true} manejador={obtenerCantidad} />
              <Select campo='Ubicacion Cliente' name='ubicacionCliente' propiedad={plataforma} opciones={opcionPlataforma} editable={true} manejador={obtenerPlataforma} />
                
              {/* ========== TECNOLOGIA ========== */}
              <Select campo='Codigo Fuente' name='codigo_fuente' propiedad={codigo} opciones={['SI','NO']} manejador={obtenerCodigo} />
              <Select campo='Plataforma' name='plataforma' propiedad={plataforma} opciones={opcionPlataforma} editable={true} manejador={obtenerPlataforma} />
              <Input campo='Lenguaje' name='lenguaje' propiedad={lenguaje} editable={true} manejador={obtenerLenguaje} />
              <Input campo='Framework' name='framework' propiedad={lenguaje} editable={true} manejador={obtenerLenguaje} />
              <Input campo='Direccion' name='direccion' editable={true} />
              
              {/* ========== BASE DE DATOS ========== */}
              <Select campo='Base de Datos' name='baseDatos' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Input campo='Nombre Base de Datos' name='nombreBase' propiedad={baseDatos} editable={true} manejador={obtenerBaseDatos} />
              <Select campo='Estatus Base de Datos' name='estatusBase' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Select campo='Tipo Base de Datos' name='tipoBase' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Select campo='Manejador Base de Datos' name='manejadorBase' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Input campo='Direccion Base de Datos' name='direccionBase' propiedad={baseDatos} editable={true} manejador={obtenerBaseDatos} />

              {/* ========== SERVIDOR ========== */}
              <Select campo='Servidor' name='servidor' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Input campo='Nombre Servidor' name='nombreServidor' propiedad={baseDatos} editable={true} manejador={obtenerBaseDatos} />
              <Select campo='Estatus Servidor' name='estatusServidor' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Select campo='Ubicacion Servidor' name='ubicacionServidor' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Input campo='Direccion Servidor' name='direccionServidor' propiedad={baseDatos} editable={true} manejador={obtenerBaseDatos} />
              
              {/* ========== DOCUMENTACION ========== */}
              <Select campo='Documentacion' name='documentacion' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Input campo='Descripcion' name='descripcionDoc' propiedad={baseDatos} editable={true} manejador={obtenerBaseDatos} />
              <Select campo='Tipo' name='tipoDoc' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Input campo='Direccion' name='direccionDoc' propiedad={baseDatos} editable={true} manejador={obtenerBaseDatos} />

              {/* ========== MANTENIMIENTO ========== */}
              <Select campo='Frecuencia de Mantenimiento' name='frecuencia' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Select campo='Horas Promedio de Mantenimiento' name='horasProm' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Select campo='Tipo de Mantenimiento' name='tipoMan' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />
              <Select campo='Horas Anuales de Mantenimiento' name='horasAnuales' propiedad={baseDatos} opciones={['SI','NO']} manejador={obtenerBaseDatos} />

              {/* <div className='absolute bottom-52 w-full border-dashed border-gray-500'></div> */}
              <Select campo='Region' name='region' propiedad={region} opciones={opcionRegion} manejador={obtenerRegion} />
              <Select campo='Localidad' name='localidad' propiedad={region} opciones={opcionRegion} manejador={obtenerRegion} />
              <Select campo='Propiedad' name='propiedad' propiedad={propiedad} opciones={['PROPIO','TERCERO','COMBINADO']} manejador={obtenerPropiedad} />
              <Select campo='Propiedad' name='propiedad' propiedad={propiedad} opciones={['PROPIO','TERCERO','COMBINADO']} manejador={obtenerPropiedad} />
            </div>

            <div className="flex justify-center items-center gap-20 py-2">
              <Button color='red' width={32} accion={navegar} >Cancelar</Button>
              <Button color='blue' width={32} >Guardar</Button>
            </div>

        </form>
    </Container>
  )
};

export default Actualizacion;
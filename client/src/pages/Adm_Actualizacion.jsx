
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Autorizacion from '../services/auth.service';
import Usuarios from '../services/user.service';

const campos1 = ['Acronimo','Estatus','Nombre','Descripcion','Prioridad',
'Tipo','Responsable Funcional','Responsable Tecnico','Departamento',
'Numero de usuarios','Plataforma'];
const campos2 = ['Alcance','Codigo Fuente','Propiedad','Fecha'];
const campos3 = ['Region','Servidor'];

function Actualizacion() {

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
        const response = await Usuarios.obtenerDato(location.state.id)
        setValor(response.data);
        setValorArray(Object.values(response.data));
        
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

  if(valor === null) 
    return <Navigate to='/' />

  if(Autorizacion.obtenerUsuario().rol !== 'admin') 
    return <Navigate to='/' />

  return (
    <div className="flex w-full bg-zinc-300 m-0 p-0">
      <div className="w-full flex flex-col justify-start items-center gap-8 pt-44 pl-56" >

      <h2 className='font-bold'>Actualizacion de Aplicacion</h2>

      <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmitCapture={updateData} >

            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <Input campo='Acronimo' name='acronimo' propiedad={valor.acronimo} editable={true} manejador={obtenerAcronimo} />
                <Select campo='Estatus' name='estatus' opciones={['Desarrollo','Activo','Inactivo',]} manejador={obtenerEstatus} />
            </div>

            <Input campo='Nombre' name='nombre' propiedad={valor.nombre} editable={true} area={true} manejador={obtenerNombre} />
            <Input campo='Descripcion' name='descripcion' propiedad={valor.descripcion} editable={true} area={true} manejador={obtenerDescripcion} />

            
            <div className="relative grid gap-6 mb-6 md:grid-cols-2">
                <Select campo='Prioridad'name='prioridad' opciones={['Alta','Media','Baja',]} manejador={obtenerPrioridad} />
                <Select campo='Tipo de Aplicacion'name='tipo' opciones={['Tecnico','Administrativo']} manejador={obtenerTipo} />

                <div className='flex flex-col'>
                    <Input campo='Responsable Funcional' name='responsablef' propiedad={valor.responsablef} editable={true} manejador={obtenerResponsablef} />
                    <Input campo='Indicador' name='responsablef_ind' propiedad={valor.responsablef_ind} editable={true} manejador={obtenerResponsablef_ind} />
                    <Input campo='Telefono' name='responsablef_tlf' propiedad={valor.responsablef_tlf} editable={true} manejador={obtenerResponsablef_tlf} />
                    <Input campo='Correo' name='responsablef_cor' propiedad={valor.responsablef_cor} editable={true} manejador={obtenerResponsablef_cor} />
                </div>

                <div className='relative flex flex-col'>
                    <div className='absolute -left-4 top-4 w-1 h-80 border-2 border-dashed border-gray-500'></div>
                    <Input campo='Responsable Tecnico' name='responsablet' propiedad={valor.responsablet} editable={true} manejador={obtenerResponsablet} />
                    <Input campo='Indicador' name='responsablet_ind' propiedad={valor.responsablet_ind} editable={true} manejador={obtenerResponsablet_ind} />
                    <Input campo='Telefono' name='responsablet_tlf' propiedad={valor.responsablet_tlf} editable={true} manejador={obtenerResponsablet_tlf} />
                    <Input campo='Correo' name='responsablet_cor' propiedad={valor.responsablet_cor} editable={true} manejador={obtenerResponsablet_cor} />
                </div>

                <Input campo='Departamento' name='departamento' propiedad={valor.departamento} editable={true} manejador={obtenerDepartamento} />
                <Input campo='N° de Usuarios' name='cantidad_user' propiedad={valor.cantidad_user} editable={true} manejador={obtenerCantidad} />
                <Input campo='Plataforma' name='plataforma' propiedad={valor.plataforma} editable={true} manejador={obtenerPlataforma} />
                <Input campo='Direccion' name='direccion' propiedad={valor.direccion} editable={true} />
                
                <Select campo='Codigo Fuente' name='codigo_fuente' opciones={['Si','No']} manejador={obtenerCodigo} />
                <Input campo='Lenguaje' name='lenguaje' propiedad={valor.lenguaje} editable={true} manejador={obtenerLenguaje} />
                <Select campo='Base de Datos' name='base_datos' opciones={['Si','No']} manejador={obtenerBaseDatos} />
                <Select campo='Alcance' name='alcance' opciones={['Alto','Corporativo']} manejador={obtenerAlcance} />

                {/* <div className='absolute bottom-52 w-full border-dashed border-gray-500'></div> */}
                <Select campo='Propiedad' name='propiedad' opciones={['Propio','Tercero']} manejador={obtenerPropiedad} />
                <Input campo='Fecha de Creacion' name='ultima' propiedad={valor.ultima} editable={true} manejador={obtenerUltima} />
                <Select campo='Region' name='region' opciones={['Oriente','Centro','Andes']} manejador={obtenerRegion} />
                <Input campo='Servidor' name='servidor' propiedad={valor.servidor} editable={true} manejador={obtenerServidor} />
          </div>

          <div className="flex justify-center items-center gap-20 py-2">
            <Button color='red' onClick={() => navigate('/aplicaciones')} >Cancelar</Button>
            <Button color='blue' >Guardar</Button>
          </div>

        </form>

      </div>
    </div>
  )
};

export default Actualizacion;
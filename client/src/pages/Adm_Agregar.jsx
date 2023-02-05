
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Autorizacion from '../services/auth.service';
import Usuarios from '../services/user.service';


function Agregar() {

    const navigate = useNavigate();

    const [acronimo, setAcronimo] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estatus, setEstatus] = useState('');
    const [region, setRegion] = useState('');

    const [responsablef, setResponsableF] = useState('');
    const [responsablef_ind, setResponsableF_ind] = useState('');
    const [responsablef_tlf, setResponsableF_tlf] = useState('');
    const [responsablef_cor, setResponsableF_cor] = useState('');

    const [responsablet, setResponsableT] = useState('');
    const [responsablet_ind, setResponsableT_ind] = useState('');
    const [responsablet_tlf, setResponsableT_tlf] = useState('');
    const [responsablet_cor, setResponsableT_cor] = useState('');

    const [prioridad, setPrioridad] = useState('');
    const [tipo, setTipo] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [codigo, setCodigo] = useState('');
    const [lenguaje, setLenguaje] = useState('');
    const [baseDatos, setBaseDatos] = useState('');
    const [alcance, setAlcance] = useState('');
    const [propiedad, setPropiedad] = useState('');
    const [servidor, setServidor] = useState('');
    const [ultima, setUltima] = useState('29/2/2024');
    
    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function createData(e) {
        
        e.preventDefault();
        console.log('CREATE');
    
        try {
          console.log('TRY DEL CREATE');
          //console.log(acronimo,nombre,region,responsable,prioridad,ultima);
          await Autorizacion.crearDatos(
            acronimo,nombre,descripcion,estatus,region,responsablef,responsablef_ind,responsablef_tlf,responsablef_cor,
            responsablet,responsablet_ind,responsablet_tlf,responsablet_cor,prioridad,tipo,departamento,
            cantidad,plataforma,codigo,lenguaje,baseDatos,alcance,propiedad,servidor,ultima);
    
          navigate("/dashboard");
        }
        catch (error) { console.log('ERROR AL ACTUALIZAR APL_ACT'); }
      }
    
    return (
        <div className="flex w-full bg-zinc-300 m-0 p-0">
            <div className="w-full flex flex-col justify-start items-center gap-8 pt-44 pl-56" >

            <h2 className='font-bold'>Registro de Aplicacion</h2>

            <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmitCapture={createData} >
                <div className="grid gap-6 mb-6 md:grid-cols-2">

                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900' >
                        <label>Acronimo</label>
                        <input 
                            type="text" 
                            className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Acronimo" 
                            onChange={(e) => {setAcronimo(e.target.value)}}
                            required 
                        />
                    </div>

                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900' >
                        <label>Estatus</label>
                        <select 
                            name="estatus" 
                            placeholder='Estatus'
                            onChange={(e) => {setEstatus(e.target.value)}}
                            className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500'>
                                <option disabled selected>Estatus</option>
                                <option value="desarrollo">Desarrollo</option>
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <label>Nombre</label>
                        <textarea
                            rows={3} 
                            className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Nombre" 
                            onChange={(e) => {setNombre(e.target.value)}}
                            required
                        />
                </div> 

                <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                    <label>Descripcion</label>
                    <textarea
                        rows={3}  
                        className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="Descripcion" 
                        onChange={(e) => {setDescripcion(e.target.value)}}
                        required
                    />
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <label>Prioridad</label>
                        <select 
                            name="prioridad" 
                            placeholder='Prioridad'
                            onChange={(e) => {setPrioridad(e.target.value)}}
                            className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500'>
                                <option disabled selected>Prioridad</option>
                                <option value="Alta">Alta</option>
                                <option value="Media">Media</option>
                                <option value="Baja">Baja</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <label>Tipo de Aplicacion</label>
                        <select 
                            name="tipo" 
                            placeholder='Tipo'
                            onChange={(e) => {setTipo(e.target.value)}}
                            className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500'>
                                <option disabled selected>Tipo</option>
                                <option value="Tecnico">Tecnico</option>
                                <option value="Administrativo">Administrativo</option>
                        </select>
                    </div> 

                    <div className='flex flex-col'>
                        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                            <label>Responsable Funcional</label>
                            <input 
                                type="text" 
                                className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Responsable Funcional" 
                                onChange={(e) => {setResponsableF(e.target.value)}}
                                required 
                            />
                        </div> 

                        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                            <label>Indicador</label>
                            <input 
                                type="text" 
                                className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Indicador" 
                                onChange={(e) => {setResponsableF_ind(e.target.value)}}
                                required 
                            />
                        </div> 
                        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                            <label>Telefono</label>
                            <input 
                                type="tel" 
                                className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Telefono" 
                                onChange={(e) => {setResponsableF_tlf(e.target.value)}}
                                required 
                            />
                        </div> 
                        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                            <label>Correo</label>
                            <input 
                                type="email" 
                                className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Correo" 
                                onChange={(e) => {setResponsableF_cor(e.target.value)}}
                                required 
                            />
                        </div>
                    </div>
                    <div className='relative flex flex-col'>

                        <div className='absolute -left-4 top-4 w-1 h-80 border-2 border-dashed border-gray-500'></div>

                        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                            <label>Responsable Tecnico</label>
                            <input 
                                type="text" 
                                className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Responsable Tecnico" 
                                onChange={(e) => {setResponsableT(e.target.value)}}
                                required 
                            />
                        </div>

                        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                            <label>Indicador</label>
                            <input 
                                type="text" 
                                className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Indicador" 
                                onChange={(e) => {setResponsableT_ind(e.target.value)}}
                                required 
                            />
                        </div> 
                        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                            <label>Telefono</label>
                            <input 
                                type="tel" 
                                className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Telefono" 
                                onChange={(e) => {setResponsableT_tlf(e.target.value)}}
                                required 
                            />
                        </div> 
                        <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                            <label>Correo</label>
                            <input 
                                type="email" 
                                className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Correo" 
                                onChange={(e) => {setResponsableT_cor(e.target.value)}}
                                required 
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <label>Departamento</label>
                        <input 
                            type="text" 
                            className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Departamento" 
                            onChange={(e) => {setDepartamento(e.target.value)}}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <label>N° de Usuarios</label>
                        <input 
                            type="number" 
                            min={1}
                            className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="N° de Usuarios" 
                            onChange={(e) => {setCantidad(e.target.value)}}
                            required 
                        />
                    </div> 
                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <label>Plataforma</label>
                        <input 
                            type="text" 
                            className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Plataforma" 
                            onChange={(e) => {setPlataforma(e.target.value)}}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <label>Direccion</label>
                        <input 
                            type="text" 
                            className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Direccion"
                        />
                    </div>
                    <div className='relative flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >

                        <div className='absolute -top-4 left-2.5 w-full border-dashed border-gray-500'></div>

                        <label>Codigo Fuente</label>
                        <select 
                            name="codigo_fuente" 
                            placeholder='Codigo Fuente'
                            onChange={(e) => {setCodigo(e.target.value)}}
                            className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500'>
                                <option disabled selected>Codigo Fuente</option>
                                <option value="SI">SI</option>
                                <option value="NO">NO</option>
                        </select>
                    </div>
                    <div className='relative flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <div className='absolute -top-4 right-2.5 w-full border-dashed border-gray-500'></div>
                        <label>Lenguaje</label>
                        <input 
                            name="lenguaje" 
                            type="text" 
                            className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Lenguaje"
                            onChange={(e) => {setLenguaje(e.target.value)}} 
                            required 
                        />
                    </div> 
                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <label>Base de Datos</label>
                        <select 
                            name="basedatos" 
                            placeholder='Base de datos'
                            onChange={(e) => {setBaseDatos(e.target.value)}}
                            className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500'>
                                <option disabled selected>Base de datos</option>
                                <option value="SI">SI</option>
                                <option value="NO">NO</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <label>Alcance</label>
                        <select 
                            name="alcance" 
                            placeholder='Alcance'
                            onChange={(e) => {setAlcance(e.target.value)}}
                            className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500'>
                                <option disabled selected>Alcance</option>
                                <option value="Alto">Alto</option>
                                <option value="Corporativo">Corporativo</option>
                        </select>
                    </div>
                    <div className='relative flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <div className='absolute -top-4 left-2.5 w-full border-dashed border-gray-500'></div>
                        <label>Propiedad</label>
                        <select 
                            name="propiedad" 
                            placeholder='Propiedad'
                            onChange={(e) => {setPropiedad(e.target.value)}}
                            className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500'>
                                <option disabled selected>Propiedad</option>
                                <option value="Propio">Propio</option>
                                <option value="Terceros">Terceros</option>
                        </select>
                    </div>
                    <div className='relative flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <div className='absolute -top-4 right-2.5 w-full border-dashed border-gray-500'></div>
                        <label>Fecha de Creacion</label>
                        <input 
                            type="date" 
                            className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Fecha de Creacion"
                            onChange={(e) => {setUltima(e.target.value)}}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <label>Region</label>
                        <select 
                            name="region" 
                            placeholder='Region'
                            onChange={(e) => {setRegion(e.target.value)}}
                            className='w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500'>
                                <option disabled selected>Region</option>
                                <option value="Oriente">Oriente</option>
                                <option value="Centro">Centro</option>
                                <option value="Andes">Andes</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2 text-sm font-medium text-gray-900 mb-6' >
                        <label>Servidor</label>
                        <input 
                            type="text" 
                            className="w-full p-2.5 bg-gray-50 border-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Servidor" 
                            onChange={(e) => {setServidor(e.target.value)}}
                            required
                        />
                    </div>
                    
                </div>
                
                <Button color='blue' >Agregar</Button> 
                {/* <button 
                    type="submit" 
                    className="text-white bg-blue-600 border-none cursor-pointer hover:bg-blue-500 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Agregar
                </button> */}

            </form>

        </div>
    </div>
    )
};

export default Agregar;
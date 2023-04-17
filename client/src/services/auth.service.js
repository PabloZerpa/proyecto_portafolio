
import axios from 'axios';
import authHeader from './header.service';
const baseUrl = "http://localhost:3001/api/";
// const baseUrl = "https://proyecto-portafolio-server.onrender.com/api/"

class Autorizacion {

    // ---------------- UPDATE DE UN CAMPO DE UN USUARIO ------------------
    async actualizarUsuario(id, datoModificacion) {
        try { 
            const id = datoModificacion.edicion;
            console.log(id);
            console.log(datoModificacion);
            const respuesta = await axios.patch(`${baseUrl}usuarios/permisos/${id}`, datoModificacion, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
        }
    }

    // ---------------- LOGIN ------------------
    async login(indicador, password) {
        
        return axios.post(`${baseUrl}login`, {indicador,password})
        .then(response => {
            if (response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data));

            return response.data;
        });
    }
    
    // ---------------- CREATE DE LA INFO DE NUEVA APP ------------------
    async crearDatos(datos) {
        console.log('AFUERA DE CREAR DATOS SERVICE')
        console.log(datos);
        try { 
            console.log('EN EL TRY DE CREAR DATOS SERVICE')
            const respuesta = await axios.post(`${baseUrl}aplicaciones/`, datos, { headers: authHeader() });
            console.log('DESPUES DE CREAR DATOS SERVICE')
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR auth.service');
        }
    }
 
    // ---------------- UPDATE DE TODOS LOS DATOS ------------------
    async actualizarDatos(id, datosModificacion) {
        console.log('AFUERA DE ACTUALIZAR DATOS SERVICE');
        console.log(id);
        try { 
            console.log('EN EL TRY DE ACTUALIZAR DATOS SERVICE');
            const respuesta = await axios.put(`${baseUrl}aplicaciones/${id}`, datosModificacion, { headers: authHeader() });
            console.log('DESPUES DE ACTUALIZAR DATOS SERVICE');
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
        }
    }
     
    // ---------------- UPDATE DE UN CAMPO EN ESPECIFICO ------------------
    async actualizarDato(id, datoModificacion) {
        try { 
            const id = datoModificacion.edicion;
            console.log(id);
            console.log(datoModificacion);
            const respuesta = await axios.patch(`${baseUrl}aplicaciones/${id}`, datoModificacion, { headers: authHeader() });
            return respuesta;
        } catch (error) {
            console.log('ERROR AL ACTUALIZAR auth.service');
        }
    }

    // ---------------- LOGOUT ------------------
    async logout() {
        localStorage.removeItem("user");
        window.location.reload();
        try {
            await axios.get('http://localhost:3001/api/logout');
        } catch (error) {console.log(error);}
    }

    // ---------------- OBTENER USUARIO ------------------
    obtenerUsuario() {
        return JSON.parse(localStorage.getItem('user'));
    }

    async crearUsuario(datos) {

        const { indicador, rol, gerencia } = datos;
        const password = `87654321`;
        const data = {indicador, password, rol, gerencia};
        console.log(data);
        console.log('EN CREAR USUARIO')
        try {
            console.log('ANTES DE CREAR USUARIO')
            const respuesta = await axios.post(`${baseUrl}login/registro`, data)
            console.log('DESPUES DE CREAR USUARIO')
            return respuesta;
        } catch (error) {
            console.log('ERROR AL CREAR USUARIO');
        }
    }

}

export default new Autorizacion();  



// return (
//     <Container>

//       <h2 className='font-bold text-lg'>Actualizacion de Aplicacion</h2>

//       <form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" onSubmitCapture={updateData} >

//       <h2 className='font-bold text-base mb-6'>Informacion General</h2>
//       <div className="grid grid-cols-2 gap-4">
//                     {/* --------------- INFORMACION BASICA --------------- */}
//                     <Input campo='Acronimo' name='apl_acronimo' editable={true} propiedad={general.apl_acronimo} manejador={handleInputChange} />
//                     <Select campo='Estatus' name='apl_estatus' opciones={opcionEstatus} propiedad={general.apl_estatus} manejador={handleInputChange}/>
//                 </div>

//                 <Input campo='Nombre' name='apl_nombre' editable={true} area={true} propiedad={general.apl_nombre} manejador={handleInputChange} />
//                 <Input campo='Descripcion' name='apl_descripcion' editable={true} propiedad={general.apl_descripcion} area={true} manejador={handleInputChange} />

//                 <div className="relative grid grid-cols-2 gap-4 mb-0">
//                     <Input campo='Version' name='apl_version' propiedad={general.apl_version} editable={true} manejador={handleInputChange} />
//                     <Select campo='Prioridad' name='apl_prioridad' propiedad={general.apl_prioridad} opciones={['ALTA','MEDIA','BAJA',]} manejador={handleInputChange} />
//                     <Select campo='Critico' name='apl_critico' propiedad={general.apl_critico} opciones={['SI','NO']} manejador={handleInputChange} />
//                     <Select campo='Alcance' name='apl_alcance' propiedad={general.apl_alcance} opciones={opcionAlcance} manejador={handleInputChange} />
//                     <Input campo='Direccion' name='apl_direccion' propiedad={general.apl_direccion} editable={true} manejador={handleInputChange} />
//                     <Input campo='N° Usuarios' name='apl_cantidad_usuarios' propiedad={general.apl_cantidad_usuarios} editable={true} manejador={handleInputChange} />
//                     <Select campo='Region' name='apl_region' propiedad={general.region} opciones={opcionRegion} manejador={handleInputChange} />
//                     <div className='flex flex-col gap-2 text-xs font-medium text-gray-900 mb-6'>
//                         <label>Fecha de Registro</label>
//                         <input
//                             type='date'
//                             name='apl_fecha_registro'
//                             className='w-full p-2 bg-gray-50 border-none text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500' 
//                             placeholder='Fecha de Registro'
//                             onChange={(e) => {handleInputChange(e)}}
//                         />
//                     </div>
//                 </div>
              
//                 <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
//                 {/* --------------- RESPONSABLES --------------- */} 
//                 <div className="grid grid-cols-2 gap-4">
//                     <p className='font-bold text-base my-4'>funcionalponsable Funcional</p>
//                     <p className='font-bold text-base my-4'>funcionalponsable Tecnico</p>

//                     <div className='grid grid-cols-1'>
//                         <Input campo='Nombre' name='funcional_nombre' propiedad={funcional[0].funcional_nombre} editable={true} manejador={handleInputChange} />
//                         <Input campo='Apellido' name='funcional_apellido' propiedad={funcional[0].funcional_apellido} editable={true} manejador={handleInputChange} />
//                         <Input campo='Indicador' name='funcional_indicador' propiedad={funcional[0].funcional_indicador} editable={true} manejador={handleInputChange} />
//                         <Input campo='Cedula' name='funcional_cedula' propiedad={funcional[0].funcional_cedula} editable={true} manejador={handleInputChange} />
//                         <Input campo='Telefono' name='funcional_telefono' propiedad={funcional[0].telefono} editable={true} manejador={handleInputChange} />
//                         <Select campo='Cargo' name='funcional_cargo' propiedad={funcional[0].funcional_cargo} opciones={opcionRegion} manejador={handleInputChange} />
//                         <Select campo='Gerencia' name='funcional_gerencia' propiedad={funcional[0].gerencia} opciones={opcionGerencia} manejador={handleInputChange} />
//                         <Select campo='Region' name='funcional_region' propiedad={funcional[0].region} opciones={opcionRegion} manejador={handleInputChange} />
//                         <Select campo='Localidad' name='funcional_localidad' propiedad={funcional[0].localidad} opciones={opcion1} manejador={handleInputChange} />
//                     </div>
                    
//                     <div className='relative grid grid-cols-1'>
//                         <div className='absolute -left-2.5 top-0 w-1 h-full border-2 border-dashed border-gray-500'></div>
//                         <Input campo='Nombre' name='tecnico_nombre' propiedad={tecnico[0].tecnico_nombre} editable={true} manejador={handleInputChange} />
//                         <Input campo='Apellido' name='tecnico_apellido' propiedad={tecnico[0].tecnico_apellido} editable={true} manejador={handleInputChange} />
//                         <Input campo='Indicador' name='tecnico_indicador' propiedad={tecnico[0].tecnico_indicador} editable={true} manejador={handleInputChange} />
//                         <Input campo='Cedula' name='tecnico_cedula' propiedad={tecnico[0].tecnico_cedula} editable={true} manejador={handleInputChange} />
//                         <Input campo='Telefono' name='tecnico_telefono' propiedad={tecnico[0].telefono} editable={true} manejador={handleInputChange} />
//                         <Select campo='Cargo' name='tecnico_cargo' propiedad={tecnico[0].tecnico_cargo} opciones={opcionGerencia} manejador={handleInputChange} />
//                         <Select campo='Gerencia' name='tecnico_gerencia' propiedad={tecnico[0].gerencia} opciones={opcionGerencia} manejador={handleInputChange} />
//                         <Select campo='Region' name='tecnico_region' propiedad={tecnico[0].region} opciones={opcionRegion} manejador={handleInputChange} />
//                         <Select campo='Localidad' name='tecnico_localidad' propiedad={tecnico[0].localidad} opciones={opcion2} manejador={handleInputChange} />
//                     </div>
                    
//                 </div>

//                 <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
//                 {/* --------------- TECNOLOGIAS --------------- */}
//                 <h2 className='font-bold text-base my-4'>Tecnologia</h2>
//                 <div className="grid grid-cols-2 gap-4">
//                     <Select campo='Plataforma' name='plataforma' propiedad={plataformas[0].plataforma} opciones={opcionPlataforma} manejador={handleInputChange} />
//                     <Select campo='Codigo Fuente' name='apl_codigo_fuente' propiedad={general.apl_codigo_fuente} opciones={['SI','NO']} manejador={handleInputChange} />
                    
//                     <div>
//                         <Select campo='Lenguaje' name='lenguaje' propiedad={lenguajes[0].lenguaje} editable={true} opciones={opcionLenguaje} manejador={handleInputChange} />
//                         <div style={{display: 'block'}} >
//                             <Select campo='Lenguaje 2' name='lenguaje2' propiedad={lenguajes[1].lenguaje} editable={true} opciones={opcionLenguaje} manejador={handleInputChange} />
//                             <Select campo='Lenguaje 3' name='lenguaje3' propiedad={lenguajes[2].lenguaje} editable={true} opciones={opcionLenguaje} manejador={handleInputChange} />
//                         </div>
//                     </div>

//                     <div>
//                         <Select campo='Framework' name='framework' propiedad={lenguajes[0].framework} editable={true} opciones={opcion4} manejador={handleInputChange} />
//                         <div style={{display: 'block'}} >
//                             <Select campo='Framework 2' name='framework2' propiedad={lenguajes[1].framework} editable={true} opciones={opcion5} manejador={handleInputChange} />
//                             <Select campo='Framework 3' name='framework3' propiedad={lenguajes[2].framework} editable={true} opciones={opcion6} manejador={handleInputChange} />
//                         </div>
//                     </div>
                    
//                     {/* <Input campo='Lenguaje' name='lenguaje' propiedad={valor.lenguaje} editable={true} manejador={handleInputChange} />
//                     <Input campo='Framework' name='framework' propiedad={valor.framework} editable={true} manejador={handleInputChange} /> */}
//                 </div>
                    
//                 {/* --------------- BASE DE DATOS --------------- */}
//                 <p className='font-bold text-base my-4'>Base de datos</p>
//                 <div className="grid grid-cols-2 gap-4">
//                     <Input campo='Nombre' name='base_datos' propiedad={basedatos[0].base_datos} editable={true} manejador={handleInputChange} />
//                     <Select campo='Estatus' name='base_estatus' propiedad={basedatos[0].bas_estatus} opciones={opcionEstatus} manejador={handleInputChange}/>
//                     <Select campo='Tipo' name='base_tipo' propiedad={basedatos[0].tipo} opciones={['Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
//                     <Select campo='Manejador' name='base_manejador' propiedad={basedatos[0].manejador} opciones={['MYSQL','POSTGfuncionalS','MARIADB']} manejador={handleInputChange} />
//                     <Select campo='Tipo Amb' name='base_tipo_ambiente' propiedad={basedatos[0].bas_tipo_ambiente} opciones={['Relacional','NO Relacional','Objetos']} manejador={handleInputChange} />
//                     <Input campo='N° Usuarios' name='base_cantidad_usuarios' propiedad={basedatos[0].bas_cantidad_usuarios} editable={true} manejador={handleInputChange} />
//                     <Input campo='Servidor' name='base_servidor' propiedad={basedatos[0].servidor} editable={true} manejador={handleInputChange} />
//                 </div>

//                 {/* --------------- SERVIDOR --------------- */}
//                 <p className='font-bold text-base my-4'>Servidor</p>
//                 <div className="grid grid-cols-2 gap-4">
//                     <Input campo='Nombre' name='servidor' propiedad={servidor[0].servidor} editable={true} manejador={handleInputChange} />
//                     <Select campo='Estatus' name='ser_estatus' propiedad={servidor[0].ser_estatus} opciones={['SI','NO']} manejador={handleInputChange}/>
//                     <Input campo='Direccion' name='ser_direccion' propiedad={servidor[0].ser_direccion} editable={true} manejador={handleInputChange} />
//                     <Input campo='Sistema' name='ser_sistema' propiedad={servidor[0].sistema} editable={true} manejador={handleInputChange} />
//                     <Input campo='Version Sis' name='ser_sistema_version' propiedad={servidor[0].sistema_version} editable={true} manejador={handleInputChange} />
//                     <Input campo='Modelo' name='ser_modelo' propiedad={modelos[0].modelo} editable={true} manejador={handleInputChange} />
//                     <Input campo='Marca' name='ser_marca' propiedad={modelos[0].mod_marca} editable={true} manejador={handleInputChange} />
//                     <Input campo='Serial' name='ser_serial' propiedad={modelos[0].mod_serial} editable={true} manejador={handleInputChange} />
//                     <Input campo='Cantidad' name='ser_cantidad_cpu' propiedad={modelos[0].mod_cantidad_cpu} editable={true} manejador={handleInputChange} />
//                     <Input campo='Velocidad' name='ser_velocidad_cpu' propiedad={modelos[0].mod_velocidad_cpu} editable={true} manejador={handleInputChange} />
//                     <Input campo='Memoria' name='ser_memoria' propiedad={modelos[0].mod_memoria} editable={true} manejador={handleInputChange} />
//                     <Select campo='Region' name='ser_region' propiedad={servidor[0].region} opciones={opcionRegion} manejador={handleInputChange} />
//                     <Select campo='Localidad' name='ser_localidad' propiedad={servidor[0].localidad} opciones={opcion3} manejador={handleInputChange} />
//                 </div>
                
//                 <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
//                 {/* --------------- DOCUMENTACION --------------- */}
//                 <p className='font-bold text-base my-4'>Documentacion</p>
//                 <div className="grid grid-cols-2 gap-4">
//                     <Input campo='Descripcion' name='doc_descripcion' propiedad={documentacion[0].doc_descripcion} editable={true} manejador={handleInputChange} />
//                     <Input campo='Direccion' name='doc_direccion' propiedad={documentacion[0].doc_direccion} editable={true} manejador={handleInputChange} />
//                     <Input campo='Tipo de Doc' name='doc_tipo' propiedad={documentacion[0].doc_tipo} editable={true} manejador={handleInputChange} />
//                 </div>

//                 {/* --------------- MANTENIMIENTO --------------- */}
//                 <p className='font-bold text-base my-4'>Mantenimiento</p>
//                 <div className="grid grid-cols-2 gap-4">
//                     <Select campo='Frecuencia' name='man_frecuencia' propiedad={tecnologia[0].man_frecuencia} opciones={opcionMantenimiento} editable={true} manejador={handleInputChange}/>
//                     <Input campo='Horas Pro' name='man_horas_prom' propiedad={tecnologia[0].man_horas_prom} editable={true} manejador={handleInputChange} />
//                     <Input campo='Horas Anu' name='man_horas_anuales' propiedad={tecnologia[0].man_horas_anuales} editable={true} manejador={handleInputChange} />
//                 </div>

                    
//                 <div className="absolute bottom-4 right-1/3">
//                     <Button width={32}>Actualizar</Button>
//                 </div>
//                 <div className="absolute bottom-4 left-1/3">
//                     <Button color='red' width={32} accion={navegar} >Cancelar</Button>
//                 </div>

//       </form>
        
//     </Container>
//   )
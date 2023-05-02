
# aplicaciones **(ED)**
- aplicacion_id **(PK)**
- acronimo
- nombre
- descripcion
- estatus
- prioridad
- critico
- alcance
- plataforma **(FK)**
- lenguaje **(FK)**
- framework **(FK)**
- baseDatos **(FK)**
- servidor **(FK)**
- codigo
- licencia
- version
- idioma

# plataformas **(EC)**
- plataforma_id **(PK)**
- plataforma

# aplicacion_lenguaje **(EP)**
- aplicacion_id **(PK)**
- lenguaje_id **(PK)**

# lenguajes **(ED)**
- lenguaje_id **(PK)**
- lenguaje
- version

# aplicacion_framework **(EP)**
- aplicacion_id **(PK)**
- framework_id **(PK)**

# frameworks **(ED)**
- framework_id **(PK)**
- framework
- version

# aplicacion_base **(EP)**
- aplicacion_id **(PK)**
- base_de_datos_id **(PK)**

# base_de_datos **(ED)**
- base_de_datos_id **(PK)**
- nombre
- estatus
- tipo
- manejador
- version
- cantidad
- direccion
- servidor
- fecha

# aplicacion_servidor **(EP)**
- aplicacion_id **(PK)**
- servidor_id **(PK)**

# servidores **(ED)**
- servidor_id **(PK)**
- nombre
- estatus
- direccion
- sistema
- version
- marca
- modelo
- cantidad_cpu
- velocidad_cpu
- memoria
- ubicacion
- fecha

# fallas **(ED)**
- falla_id **(PK)**
- numero
- clase
- descripcion
- solucion
- impacto
- fecha


## RELACIONES

1. Una **aplicacion** posee muchos **lenguajes** (1 a n)
2. Una **aplicacion** posee muchos **framework** (1 a n)
3. Una **aplicacion** posee muchos **base_de_datos** (1 a n)
4. Una **aplicacion** posee muchos **servidores** (1 a n)
5. Una **aplicacion** posee muchos **plataformas** (1 a 1)


<form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" onSubmit={updateData} >

            <h2 className='font-bold text-base mb-6'>Informacion General</h2>
            <div className="grid grid-cols-2 gap-4">
                {/* --------------- INFORMACION BASICA --------------- */}
                <Input campo='Acronimo' name='apl_acronimo' editable={true} propiedad={general.apl_acronimo} manejador={setValores} />
                <Select campo='Estatus' name='apl_estatus' opciones={opcionEstatus} propiedad={general.apl_estatus} manejador={setValores}/>
            </div>

            <Input campo='Nombre' name='apl_nombre' editable={true} area={true} propiedad={general.apl_nombre} manejador={setValores} />
            <Input campo='Descripcion' name='apl_descripcion' editable={true} propiedad={general.apl_descripcion} area={true} manejador={setValores} />

            <div className="relative grid grid-cols-2 gap-4 mb-0">
                <Input campo='Version' name='apl_version' propiedad={general.apl_version} editable={true} manejador={setValores} />
                <Select campo='Prioridad' name='apl_prioridad' propiedad={general.apl_prioridad} opciones={['ALTA','MEDIA','BAJA',]} manejador={setValores} />
                <Select campo='Critico' name='apl_critico' propiedad={general.apl_critico} opciones={['SI','NO']} manejador={setValores} />
                <Select campo='Alcance' name='apl_alcance' propiedad={general.apl_alcance} opciones={opcionAlcance} manejador={setValores} />
                <Input campo='Direccion' name='apl_direccion' propiedad={general.apl_direccion} editable={true} manejador={setValores} />
                <Input campo='N° Usuarios' name='apl_cantidad_usuarios' propiedad={general.apl_cantidad_usuarios} editable={true} manejador={setValores} />
                <Select campo='Region' name='apl_region' propiedad={general.region} opciones={opcionRegion} manejador={setValores} />
                <div className='flex flex-col gap-2 text-xs font-medium text-gray-900 mb-6'>
                    <label>Fecha de Registro</label>
                    <input
                        type='date'
                        name='apl_fecha_registro'
                        className='w-full p-2 bg-gray-50 border-none text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500' 
                        placeholder='Fecha de Registro'
                        onChange={(e) => {setValores(e)}}
                    />
                </div>
            </div>
        
            <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
                {/* --------------- RESPONSABLES --------------- */} 
                <div className="grid grid-cols-2 gap-4">
                    <p className='font-bold text-base my-4'>Responsable Funcional</p>
                    <p className='font-bold text-base my-4'>Responsable Tecnico</p>

                    <div className='grid grid-cols-1'>
                        <Input campo='Nombre' name='funcional_nombre' propiedad={valor.funcional.res_nombre} editable={true} manejador={setValores} />
                        <Input campo='Apellido' name='funcional_apellido' propiedad={valor.funcional.res_apellido} editable={true} manejador={setValores} />
                        <Input campo='Indicador' name='funcional_indicador' propiedad={valor.funcional.res_indicador} editable={true} manejador={setValores} />
                        <Input campo='Cedula' name='funcional_cedula' propiedad={valor.funcional.res_cedula} editable={true} manejador={setValores} />
                        <Input campo='Telefono' name='funcional_telefono' propiedad={valor.funcional.telefono} editable={true} manejador={setValores} />
                        <Select campo='Cargo' name='funcional_cargo' propiedad={valor.funcional.res_cargo} opciones={opcionRegion} manejador={setValores} />
                        <Select campo='Gerencia' name='funcional_gerencia' propiedad={valor.funcional.gerencia} opciones={opcionGerencia} manejador={setValores} />
                        <Select campo='Region' name='funcional_region' propiedad={valor.funcional.region} opciones={opcionRegion} manejador={setValores} />
                        <Select campo='Localidad' name='funcional_localidad' propiedad={valor.funcional.localidad} opciones={opcion1} manejador={setValores} />
                    </div>
                    
                    <div className='relative grid grid-cols-1'>
                        <div className='absolute -left-2.5 top-0 w-1 h-full border-2 border-dashed border-gray-500'></div>
                        <Input campo='Nombre' name='tecnico_nombre' propiedad={valor.tecnico.res_nombre} editable={true} manejador={setValores} />
                        <Input campo='Apellido' name='tecnico_apellido' propiedad={valor.tecnico.res_apellido} editable={true} manejador={setValores} />
                        <Input campo='Indicador' name='tecnico_indicador' propiedad={valor.tecnico.res_indicador} editable={true} manejador={setValores} />
                        <Input campo='Cedula' name='tecnico_cedula' propiedad={valor.tecnico.res_cedula} editable={true} manejador={setValores} />
                        <Input campo='Telefono' name='tecnico_telefono' propiedad={valor.tecnico.telefono} editable={true} manejador={setValores} />
                        <Select campo='Cargo' name='tecnico_cargo' propiedad={valor.tecnico.res_cargo} opciones={opcionGerencia} manejador={setValores} />
                        <Select campo='Gerencia' name='tecnico_gerencia' propiedad={valor.tecnico.gerencia} opciones={opcionGerencia} manejador={setValores} />
                        <Select campo='Region' name='tecnico_region' propiedad={valor.tecnico.region} opciones={opcionRegion} manejador={setValores} />
                        <Select campo='Localidad' name='tecnico_localidad' propiedad={valor.tecnico.localidad} opciones={opcion2} manejador={setValores} />
                    </div>
                    
                </div>

            <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
                {/* --------------- TECNOLOGIAS --------------- */}
                <h2 className='font-bold text-base my-4'>Tecnologia</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Select campo='Plataforma' name='plataforma' propiedad={valor.plataformas.plataforma} opciones={opcionPlataforma} manejador={setValores} />
                    <Select campo='Codigo Fuente' name='apl_codigo_fuente' propiedad={valor.general.apl_codigo_fuente} opciones={['SI','NO']} manejador={setValores} />
                    
                    <div>
                        <Select campo='Lenguaje' name='lenguaje' propiedad={valor.lenguajes.lenguaje} editable={true} opciones={opcionLenguaje} manejador={setValores} />
                        {/* <div style={{display: 'block'}} >
                            <Select campo='Lenguaje 2' name='lenguaje2' propiedad={lenguajes[1].lenguaje} editable={true} opciones={opcionLenguaje} manejador={setValores} />
                            <Select campo='Lenguaje 3' name='lenguaje3' propiedad={lenguajes[2].lenguaje} editable={true} opciones={opcionLenguaje} manejador={setValores} />
                        </div> */}
                    </div>

                    <div>
                        <Select campo='Framework' name='framework' propiedad={valor.lenguajes.framework} editable={true} opciones={opcion4} manejador={setValores} />
                        {/* <div style={{display: 'block'}} >
                            <Select campo='Framework 2' name='framework2' propiedad={lenguajes[1].framework} editable={true} opciones={opcion5} manejador={setValores} />
                            <Select campo='Framework 3' name='framework3' propiedad={lenguajes[2].framework} editable={true} opciones={opcion6} manejador={setValores} />
                        </div> */}
                    </div>
                </div>

            {/* --------------- BASE DE DATOS --------------- */}
            <p className='font-bold text-base my-4'>Base de datos</p>
            <div className="grid grid-cols-2 gap-4">
                <Select campo='Seleccione Base de datos' name='select_base' opciones={opcionBasedatos} manejador={setValores}/>
                <div className='mt-6'>
                    <Button width={32}><Link to={`/basedatos/registro`} target="_blank">Registrar Nueva</Link></Button>
                </div>
            </div>

            {/* --------------- SERVIDOR --------------- */}
            <p className='font-bold text-base my-4'>Servidor</p>
            <div className="grid grid-cols-2 gap-4">
                <Select campo='Seleccione Servidor' name='select_servidor' opciones={opcionServidor} manejador={setValores}/>
                <div className='mt-6'>
                    <Button width={32}><Link to={`/basedatos/registro`} target="_blank">Registrar Nuevo</Link></Button>
                </div>
            </div>

            <div className='w-full h-1 border-2 border-dashed border-gray-500'></div>
            {/* --------------- DOCUMENTACION --------------- */}
            <p className='font-bold text-base my-4'>Documentacion</p>
            <div className="grid grid-cols-2 gap-4">
                <Input campo='Descripcion' name='doc_descripcion' propiedad={valor.documentacion.doc_descripcion} editable={true} manejador={setValores} />
                <Input campo='Direccion' name='doc_direccion' propiedad={valor.documentacion.doc_direccion} editable={true} manejador={setValores} />
                <Input campo='Tipo de Doc' name='doc_tipo' propiedad={valor.documentacion.doc_tipo} editable={true} manejador={setValores} />
            </div>

            {/* --------------- MANTENIMIENTO --------------- */}
            <p className='font-bold text-base my-4'>Mantenimiento</p>
            <div className="grid grid-cols-2 gap-4">
                <Select campo='Frecuencia' name='man_frecuencia' propiedad={valor.tecnologia.man_frecuencia} opciones={opcionMantenimiento} editable={true} manejador={setValores}/>
                <Input campo='Horas Pro' name='man_horas_prom' propiedad={valor.tecnologia.man_horas_prom} editable={true} manejador={setValores} />
                <Input campo='Horas Anu' name='man_horas_anuales' propiedad={valor.tecnologia.man_horas_anuales} editable={true} manejador={setValores} />
            </div>

                      
            <div className="absolute bottom-4 right-1/3">
                <Button width={32}>Actualizar</Button>
            </div>
            <div className="absolute bottom-4 left-1/3">
                <Button color='red' width={32} accion={navegar} >Cancelar</Button>
            </div>

        </form>
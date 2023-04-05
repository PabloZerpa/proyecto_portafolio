

// *********************************** OBTENER DATOS RESPONSABLES ***********************************
const obtenerResponsable = async (req,res) => {
    try {
          const query = `
            SELECT 
                responsables.responsable_id, res_nombre, res_apellido, res_indicador, res_cedula,
                region, localidad, telefono, gerencia, subgerencia
            FROM responsables
                JOIN regiones
                ON responsables.res_region_id = regiones.region_id
                JOIN localidades
                ON responsables.res_localidad_id = localidades.localidad_id
                inner join telefonos
                on responsables.responsable_id = telefonos.telefono_id
                inner join gerencias
                on responsables.res_gerencia_id = gerencias.gerencia_id
                ORDER BY responsables.responsable_id ASC
          `;
  
          const data = await pool.query(query);
          return data;
          } catch (error) {
          return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
      }
}
    
// *********************************** OBTENER DATOS DE BD ***********************************
const obtenerBaseDatos = async (req,res) => {
    try {
        const query = `
        SELECT 
            base_datos,bas_estatus,tipo,manejador,bas_tipo_ambiente,bas_cantidad_usuarios,
            servidor, ser_estatus, ser_direccion, sistema, sistema_version, region, localidad
        FROM bases_datos
            JOIN tipos_bases
            ON bases_datos.base_datos_id = tipos_bases.tipo_base_id
            JOIN manejadores
            ON bases_datos.base_datos_id = manejadores.manejador_id
            JOIN servidores
            ON bases_datos.bas_servidor_id = servidores.servidor_id
            JOIN sistemas_operativos
            ON servidores.servidor_id = sistemas_operativos.sistema_id
            JOIN regiones
            ON servidores.servidor_id = regiones.region_id
            JOIN localidades
            ON servidores.servidor_id = localidades.localidad_id
        ORDER BY bases_datos.base_datos_id ASC;
        `;
  
          const data = await pool.query(query);
          return data;
          } catch (error) {
          return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
      }
}

const nombresBaseDatos = async (req,res) => {
  try {
    const query = `
    SELECT base_datos
    FROM bases_datos
    ORDER BY bases_datos.base_datos_id ASC;
    `;

    const data = await pool.query(query);
    return data;
    
  } catch (error) {
    return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
  }
}
  
// *********************************** OBTENER DATOS DEL SERVIDOR ***********************************
const obtenerServidor = async (req,res) => {
  try {
      const query = `
      SELECT 
        servidores.servidor_id, servidor, ser_estatus, ser_direccion, 
        sistema, sistema_version, marca, mar_modelo, mar_serial, mar_cantidad_cpu, 
        mar_velocidad_cpu, mar_memoria, region, localidad
      FROM servidores
          JOIN sistemas_operativos
          ON servidores.servidor_id = sistemas_operativos.sistema_id
          JOIN marcas
          ON servidores.servidor_id = marcas.marca_id
          JOIN regiones
          ON servidores.servidor_id = regiones.region_id
          JOIN localidades
          ON servidores.servidor_id = localidades.localidad_id
      ORDER BY servidores.servidor_id ASC
      `;
      
      const data = await pool.query(query);
      return data;

      } catch (error) {
      return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
}

const nombresServidores = async (req,res) => {
  try {
    const query = `
      SELECT servidor
      FROM servidores
      ORDER BY servidores.servidor_id ASC;
    `;

    const data = await pool.query(query);
    return data;
    
  } catch (error) {
    return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
  }
}
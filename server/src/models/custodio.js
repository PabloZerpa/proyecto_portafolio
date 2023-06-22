
const pool = require('../config');

const consultaDeBusqueda = `
  SELECT 
      custodios.custodio_id, cus_nombre, cus_apellido ,cus_indicador ,cus_cedula ,
      telefono, cargo, gerencia, region, localidad
  FROM custodios
    LEFT JOIN telefonos ON custodios.custodio_id = telefonos.custodio_id 
    LEFT JOIN gerencias ON custodios.cus_gerencia = gerencias.gerencia_id 
    LEFT JOIN cargos ON custodios.cus_cargo = cargos.cargo_id 
    LEFT JOIN regiones ON regiones.region_id = custodios.cus_region
    LEFT JOIN localidades ON localidades.localidad_id = custodios.cus_localidad`;

// constructor
class Custodio {
  constructor(custodio) {
    this.nombre = custodio.nombre;
    this.apellido = custodio.apellido;
    this.indicador = custodio.indicador;
    this.cedula = custodio.cedula;
    this.telefono = custodio.telefono;
    this.cargo = custodio.cargo;
    this.gerencia = custodio.gerencia;
    this.region = custodio.region;
    this.localidad = custodio.localidad;
    this.usuario_registro = custodio.usuario_registro;
    this.usuario_actualizo = custodio.usuario_registro;
  }
}

Custodio.busqueda = async (datos, result) => {

  const { term, cargo,gerencia,region } = datos;
  const termino = '%' + term + '%';
  let busqueda = null;

  if(cargo){
    busqueda = await pool.query(
        `${consultaDeBusqueda}
        WHERE (custodios.custodio_id LIKE ? 
            OR cus_indicador LIKE ?  
            OR cus_nombre LIKE ?  
            OR cus_apellido LIKE ? ) 
            AND cargo LIKE ? ORDER BY custodios.custodio_id ASC;`, 
    [termino,termino,termino,termino,cargo]);
  }
  else if(region){
    busqueda = await pool.query(
          `${consultaDeBusqueda}
          WHERE (custodios.custodio_id LIKE ? 
              OR cus_indicador LIKE ?  
              OR cus_nombre LIKE ?  
              OR cus_apellido LIKE ? ) 
              AND region LIKE ? ORDER BY custodios.custodio_id ASC;`, 
      [termino,termino,termino,termino,region]);
  }
  else if(gerencia){
    busqueda = await pool.query(
          `${consultaDeBusqueda}
          WHERE (custodios.custodio_id LIKE ? 
              OR cus_indicador LIKE ?  
              OR cus_nombre LIKE ?  
              OR cus_apellido LIKE ? ) 
              AND gerencia LIKE ? ORDER BY custodios.custodio_id ASC;`, 
      [termino,termino,termino,termino,gerencia]);
  }
  else{
      if(term===''){
        busqueda = await pool.query(`
              ${consultaDeBusqueda}
              ORDER BY custodios.custodio_id ASC`);
      }
      else{
        busqueda = await pool.query(`
              ${consultaDeBusqueda}
              WHERE (custodios.custodio_id LIKE ? 
                  OR cus_indicador LIKE ?  
                  OR cus_nombre LIKE ?  
                  OR cus_apellido LIKE ? ) 
              ORDER BY custodios.custodio_id ASC`, 
          [termino,termino,termino,termino]);
      }
  }

  console.log(busqueda);
  
  return busqueda[0];
};

Custodio.existe = async (indicador, result) => {
  const consulta = await pool.query(`SELECT custodio_id FROM custodios WHERE cus_indicador = ?`, [indicador]);
  return consulta[0][0];
};

Custodio.registrar = async (custodio, result) => {
  
  const { nombre,apellido,indicador,cedula,telefono,cargo,gerencia,region,localidad,usuario_registro } = custodio;

  await pool.query(` 
    INSERT INTO custodios
      (cus_nombre,cus_apellido,cus_indicador,cus_cedula,cus_cargo,
      cus_gerencia,cus_region,cus_localidad,cus_usuario_registro,cus_usuario_actualizo)
      VALUES
        (?,?,?,?,?,?,
        (SELECT region_id FROM regiones WHERE region = ?),
        (SELECT localidad_id FROM localidades WHERE localidad = ?),
        (SELECT usuario_id FROM usuarios WHERE indicador = ?),
        (SELECT usuario_id FROM usuarios WHERE indicador = ?));`,
    [nombre,apellido,indicador,cedula,cargo,gerencia,region,localidad,usuario_registro,usuario_registro]
  );
  
  const buscarCustodio = await pool.query(`SELECT custodio_id FROM custodios WHERE cus_indicador = ?`, [indicador]);
  let custodio_id = buscarCustodio[0][0].custodio_id;

  await pool.query(`INSERT INTO telefonos (custodio_id,telefono) VALUES (?,?)`, [custodio_id,telefono]);

  return(`${custodio_id}`);

};

Custodio.actualizar = async (custodio, id, result) => {
  
  const { nombre, apellido, region, localidad, gerencia, cargo, telefono, usuario_actualizo } = custodio;

  await pool.query(`
    UPDATE 
        custodios 
    SET  
        cus_nombre = ?,
        cus_apellido = ?,
        cus_region = (SELECT region_id FROM regiones WHERE region = ?),
        cus_localidad = (SELECT localidad_id FROM localidades WHERE localidad = ?),
        cus_gerencia = (SELECT gerencia_id FROM gerencias WHERE gerencia = ?),
        cus_cargo = (SELECT cargo_id FROM cargos WHERE cargo = ?),
        cus_usuario_actualizo = (SELECT usuario_id FROM usuarios WHERE indicador = ?),
        cus_fecha_actualizacion = now()
    WHERE 
        custodio_id = ?;`, [nombre, apellido, region, localidad, gerencia, cargo, usuario_actualizo, id]
  );

  await pool.query( 
    `UPDATE telefonos SET telefono = ? WHERE custodio_id = ?`, [telefono, id] );

};

Custodio.eliminar = async (id, result) => {
  await pool.query(`DELETE FROM custodios_funcionales WHERE custodio_id = ?;`, [id]);
  await pool.query(`DELETE FROM custodios_tecnicos WHERE custodio_id = ?;`, [id]);
  await pool.query(`DELETE FROM telefonos WHERE custodio_id = ?;`, [id]);
  await pool.query('DELETE FROM custodios WHERE custodio_id = ?', [id]);
};

Custodio.infoGeneral = async (id, result) => {
  const consulta = await pool.query(`
    SELECT 
        custodios.custodio_id, cus_nombre, cus_apellido ,cus_indicador ,cus_cedula ,
        telefono, cargo, gerencia, region, localidad
    FROM custodios
        LEFT JOIN telefonos ON custodios.custodio_id = telefonos.custodio_id 
        LEFT JOIN gerencias ON custodios.cus_gerencia = gerencias.gerencia_id 
        LEFT JOIN cargos ON custodios.cus_cargo = cargos.cargo_id 
        LEFT JOIN regiones ON regiones.region_id = custodios.cus_region
        LEFT JOIN localidades ON localidades.localidad_id = custodios.cus_localidad
    WHERE custodios.custodio_id = ?`, [id]);

    return consulta[0][0];
};

Custodio.appFuncional = async (id, result) => {
  const consulta = await pool.query(`
    SELECT 
      aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,estatus,
      prioridad,apl_critico,alcance,apl_codigo_fuente,
      apl_version,apl_direccion,apl_cantidad_usuarios,region
    FROM aplicaciones
      LEFT JOIN custodios_funcionales ON custodios_funcionales.aplicacion_id = aplicaciones.aplicacion_id
      LEFT JOIN custodios ON custodios_funcionales.custodio_id = custodios.custodio_id
      LEFT JOIN estatus ON aplicaciones.apl_estatus = estatus.estatus_id
      LEFT JOIN prioridades ON aplicaciones.apl_prioridad = prioridades.prioridad_id
      LEFT JOIN alcances ON aplicaciones.apl_alcance = alcances.alcance_id
      LEFT JOIN regiones ON aplicaciones.apl_region = regiones.region_id
    WHERE custodios.custodio_id = ?;`, [id]);

    return consulta[0];
};

Custodio.appTecnico = async (id, result) => {
  const consulta = await pool.query(`
    SELECT 
      aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,estatus,
      prioridad,apl_critico,alcance,apl_codigo_fuente,
      apl_version,apl_direccion,apl_cantidad_usuarios,region
    FROM aplicaciones
      LEFT JOIN custodios_tecnicos ON custodios_tecnicos.aplicacion_id = aplicaciones.aplicacion_id
      LEFT JOIN custodios ON custodios_tecnicos.custodio_id = custodios.custodio_id
      LEFT JOIN estatus ON aplicaciones.apl_estatus = estatus.estatus_id
      LEFT JOIN prioridades ON aplicaciones.apl_prioridad = prioridades.prioridad_id
      LEFT JOIN alcances ON aplicaciones.apl_alcance = alcances.alcance_id
      LEFT JOIN regiones ON aplicaciones.apl_region = regiones.region_id
    WHERE custodios.custodio_id = ?;`, [id]);

    return consulta[0];
};

module.exports = Custodio;
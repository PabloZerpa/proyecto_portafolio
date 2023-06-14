
const pool = require('../config');

class Custodio {
  constructor(custodio) {
    this.cus_nombre = custodio.nombre;
    this.cus_apellido = custodio.apellido;
    this.cus_indicador = custodio.indicador;
    this.cus_cedula = custodio.cedula;
    // this.cus_telefono = custodio.telefono;
    this.cus_cargo = custodio.cargo;
    this.cus_gerencia = custodio.gerencia;
    this.cus_region = custodio.region;
    this.cus_localidad = custodio.localidad;
    this.cus_usuario_registro = custodio.usuario_registro;
    this.cus_usuario_actualizo = custodio.usuario_registro;
  }
 
  // ======================= REGISTRO DE CUSTODIO =======================
  static async registrar(newCustodio,telefono, result) {
    try {
      const custodio_id = await pool.query("INSERT INTO custodios SET ?", newCustodio, (err, res) => {
        return res;
      });

      const id = custodio_id[0].insertId;
      await pool.query( 
        `INSERT INTO telefonos (custodio_id,telefono) VALUES (?,?)`, [id,telefono] );

      return;

    } catch (error) { return res.status(401).json({ message: 'ERROR AL REGISTRAR CUSTODIOS' }); }
  }

  // ======================= REGISTRO DE CUSTODIO =======================
  static async busqueda(newCustodio,telefono, result) {
    try {
      const custodio_id = await pool.query("INSERT INTO custodios SET ?", newCustodio, (err, res) => {
        return res;
      });

      const id = custodio_id[0].insertId;
      await pool.query( 
        `INSERT INTO telefonos (custodio_id,telefono) VALUES (?,?)`, [id,telefono] );

      return;

    } catch (error) { return res.status(401).json({ message: 'ERROR AL REGISTRAR CUSTODIOS' }); }
  }


  // ======================= OBTENER CUSTODIO POR ID =======================
  static async findById(id, result) {

    try {
      await pool.query(`SELECT * FROM custodios WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("found tutorial: ", res[0]);
          result(null, res[0]);
          return;
        }
  
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
      });
      
    } catch (error) { console.log(error); }

  }

  static getAll(nombre, result) {
    let query = "SELECT * FROM tutorials";

    if (nombre) {
      query += ` WHERE nombre LIKE '%${nombre}%'`;
    }

    pool.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("tutorials: ", res);
      result(null, res);
    });
  }

  static getAllindicador(result) {
    pool.query("SELECT * FROM tutorials WHERE indicador=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("tutorials: ", res);
      result(null, res);
    });
  }

  static updateById(id, custodio, result) {
    pool.query(
      "UPDATE tutorials SET nombre = ?, apellido = ?, indicador = ? WHERE id = ?",
      [custodio.nombre, custodio.apellido, custodio.indicador, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated tutorial: ", { id: id, ...custodio });
        result(null, { id: id, ...custodio });
      }
    );
  }

  static remove(id, result) {
    pool.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted tutorial with id: ", id);
      result(null, res);
    });
  }

  static removeAll(result) {
    pool.query("DELETE FROM tutorials", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} tutorials`);
      result(null, res);
    });
  }
}



module.exports = Custodio;
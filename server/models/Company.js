const db = require('../db');

const Company = {
  findAll: async () => {
    const [rows] = await db.query(`
      SELECT co.*, c.name as country_name, d.name as department_name, m.name as municipality_name
      FROM companies co
      JOIN countries c ON co.country_id = c.id
      JOIN departments d ON co.department_id = d.id
      JOIN municipalities m ON co.municipality_id = m.id
    `);
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query(`
      SELECT co.*, c.name as country_name, d.name as department_name, m.name as municipality_name
      FROM companies co
      JOIN countries c ON co.country_id = c.id
      JOIN departments d ON co.department_id = d.id
      JOIN municipalities m ON co.municipality_id = m.id
      WHERE co.id = ?
    `, [id]);
    return rows[0];
  },
  create: async (country_id, department_id, municipality_id, nit, razon_social, nombre_comercial, telefono, correo_electronico) => {
    const [result] = await db.query(
      `INSERT INTO companies 
       (country_id, department_id, municipality_id, nit, razon_social, nombre_comercial, telefono, correo_electronico)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [country_id, department_id, municipality_id, nit, razon_social, nombre_comercial, telefono, correo_electronico]
    );
    return result.insertId;
  },
  update: async (id, country_id, department_id, municipality_id, nit, razon_social, nombre_comercial, telefono, correo_electronico) => {
    await db.query(
      `UPDATE companies 
       SET country_id = ?, department_id = ?, municipality_id = ?, nit = ?, razon_social = ?, 
           nombre_comercial = ?, telefono = ?, correo_electronico = ? 
       WHERE id = ?`,
      [country_id, department_id, municipality_id, nit, razon_social, nombre_comercial, telefono, correo_electronico, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM companies WHERE id = ?', [id]);
  }
};

module.exports = Company;

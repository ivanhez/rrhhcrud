const db = require('../db');

const Department = {
  findAll: async () => {
    const [rows] = await db.query(`
      SELECT d.*, c.name as country_name
      FROM departments d
      JOIN countries c ON d.country_id = c.id
    `);
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM departments WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (name, country_id) => {
    const [result] = await db.query(
      'INSERT INTO departments (name, country_id) VALUES (?, ?)',
      [name, country_id]
    );
    return result.insertId;
  },
  update: async (id, name, country_id) => {
    await db.query(
      'UPDATE departments SET name = ?, country_id = ? WHERE id = ?',
      [name, country_id, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM departments WHERE id = ?', [id]);
  }
};

module.exports = Department;

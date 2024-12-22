const db = require('../db');

const Municipality = {
  findAll: async () => {
    const [rows] = await db.query(`
      SELECT m.*, d.name as department_name
      FROM municipalities m
      JOIN departments d ON m.department_id = d.id
    `);
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM municipalities WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (name, department_id) => {
    const [result] = await db.query(
      'INSERT INTO municipalities (name, department_id) VALUES (?, ?)',
      [name, department_id]
    );
    return result.insertId;
  },
  update: async (id, name, department_id) => {
    await db.query(
      'UPDATE municipalities SET name = ?, department_id = ? WHERE id = ?',
      [name, department_id, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM municipalities WHERE id = ?', [id]);
  }
};

module.exports = Municipality;

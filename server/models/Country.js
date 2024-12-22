const db = require('../db');

const Country = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM countries');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM countries WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (name) => {
    const [result] = await db.query('INSERT INTO countries (name) VALUES (?)', [name]);
    return result.insertId;
  },
  update: async (id, name) => {
    await db.query('UPDATE countries SET name = ? WHERE id = ?', [name, id]);
  },
  delete: async (id) => {
    await db.query('DELETE FROM countries WHERE id = ?', [id]);
  }
};

module.exports = Country;

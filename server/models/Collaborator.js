const db = require('../db');

const Collaborator = {
  findAll: async () => {
    // Se mostrará la información básica del colaborador
    const [rows] = await db.query('SELECT * FROM collaborators');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM collaborators WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (nombre_completo, edad, telefono, correo_electronico) => {
    const [result] = await db.query(
      'INSERT INTO collaborators (nombre_completo, edad, telefono, correo_electronico) VALUES (?, ?, ?, ?)',
      [nombre_completo, edad, telefono, correo_electronico]
    );
    return result.insertId;
  },
  update: async (id, nombre_completo, edad, telefono, correo_electronico) => {
    await db.query(
      `UPDATE collaborators SET nombre_completo = ?, edad = ?, telefono = ?, correo_electronico = ? 
       WHERE id = ?`,
      [nombre_completo, edad, telefono, correo_electronico, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM collaborators WHERE id = ?', [id]);
  },

  // Relacionar colaborador con empresa (N-N)
  addToCompany: async (company_id, collaborator_id) => {
    await db.query(
      'INSERT IGNORE INTO company_collaborator (company_id, collaborator_id) VALUES (?, ?)',
      [company_id, collaborator_id]
    );
  },
  removeFromCompany: async (company_id, collaborator_id) => {
    await db.query(
      'DELETE FROM company_collaborator WHERE company_id = ? AND collaborator_id = ?',
      [company_id, collaborator_id]
    );
  },

  // Obtener las empresas a las que pertenece un colaborador
  findCompaniesByCollaborator: async (collaborator_id) => {
    const [rows] = await db.query(`
      SELECT co.*
      FROM companies co
      JOIN company_collaborator cc ON co.id = cc.company_id
      WHERE cc.collaborator_id = ?
    `, [collaborator_id]);
    return rows;
  }
};

module.exports = Collaborator;

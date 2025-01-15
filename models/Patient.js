const db = require('../config/database');  // Asumsi menggunakan database yang sudah dikonfigurasi

class Patient {
  // Get All Patients
  static async all() {
    try {
      const query = 'SELECT * FROM patients';
      const [rows] = await db.query(query); // menggunakan destructuring
      return rows;
    } catch (error) {
      console.error("Error fetching all patients:", error); // Menampilkan error di konsol
      throw error; // melemparkan error untuk ditangani di controller
    }
  }

  // Create Patient
  static async create(data) {
    try {
      const query = 'INSERT INTO patients (name, phone, address, status, in_date_at, out_date_at) VALUES (?, ?, ?, ?, ?, ?)';
      const { name, phone, address, status, in_date_at, out_date_at } = data;
      const [result] = await db.query(query, [name, phone, address, status, in_date_at, out_date_at]);
      return result;
    } catch (error) {
      console.error("Error creating patient:", error); // Menampilkan error di konsol
      throw error; // melemparkan error untuk ditangani di controller
    }
  }

  // Update Patient
  static async update(id, data) {
    try {
      const query = 'UPDATE patients SET name = ?, phone = ?, address = ?, status = ?, in_date_at = ?, out_date_at = ? WHERE id = ?';
      const { name, phone, address, status, in_date_at, out_date_at } = data;
      const [result] = await db.query(query, [name, phone, address, status, in_date_at, out_date_at, id]);
      return result;
    } catch (error) {
      console.error("Error updating patient:", error); // Menampilkan error di konsol
      throw error; // melemparkan error untuk ditangani di controller
    }
  }

  // Delete Patient
  static async delete(id) {
    try {
      const query = 'DELETE FROM patients WHERE id = ?';
      const [result] = await db.query(query, [id]);
      return result;
    } catch (error) {
      console.error("Error deleting patient:", error); // Menampilkan error di konsol
      throw error; // melemparkan error untuk ditangani di controller
    }
  }

  // Find Patient by ID
  static async find(id) {
    try {
      const query = 'SELECT * FROM patients WHERE id = ?';
      const [rows] = await db.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error finding patient:", error); // Menampilkan error di konsol
      throw error; // melemparkan error untuk ditangani di controller
    }
  }

  // Search Patient by Name
  static async searchByName(name) {
    try {
      const query = 'SELECT * FROM patients WHERE name LIKE ?';
      const [rows] = await db.query(query, [`%${name}%`]);
      return rows;
    } catch (error) {
      console.error("Error searching patients by name:", error); // Menampilkan error di konsol
      throw error; // melemparkan error untuk ditangani di controller
    }
  }

  // Find Patients by Status
  static async findByStatus(status) {
    try {
      const query = 'SELECT * FROM patients WHERE status = ?';
      const [rows] = await db.query(query, [status]);
      return rows;
    } catch (error) {
      console.error("Error finding patients by status:", error); // Menampilkan error di konsol
      throw error; // melemparkan error untuk ditangani di controller
    }
  }
}

module.exports = Patient;

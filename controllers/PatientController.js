const Patient = require("../models/Patient"); // Mengimpor model Patient untuk berinteraksi dengan database

class PatientController {
  // Mendapatkan semua pasien
  async all(req, res) {
    try {
      const patients = await Patient.all(); // Mengambil semua pasien dari database
      if (patients.length > 0) {
        // Jika data ditemukan, mengirimkan response dengan status 200
        res.status(200).json({
          message: "The request succeeded",
          data: patients, // Mengirim data pasien
        });
      } else {
        // Jika data tidak ditemukan, mengirimkan response 404
        res.status(404).json({ message: "Resource not found" });
      }
    } catch (error) {
      console.error("Error getting patients:", error); // Menampilkan error di konsol jika ada masalah
      res.status(500).json({ message: "Internal Server Error" }); // Mengirimkan response error 500
    }
  }

  // Menambahkan pasien baru
  async create(req, res) {
    try {
      const { name, phone, address, status, in_date_at, out_date_at } = req.body;

      // Validasi input
      if (!name || !phone || !address || !status || !in_date_at) {
        return res.status(422).json({
          message: "Unprocessable Entity - All fields (name, phone, address, status, in_date_at) must be filled.",
        });
      }

      const patient = await Patient.create(req.body); // Menyimpan data pasien baru
      res.status(201).json({
        message: "Resource created", // Response sukses dengan status 201
        data: patient, // Mengirimkan data pasien yang baru dibuat
      });
    } catch (error) {
      console.error("Error creating patient:", error); // Menampilkan error jika terjadi kesalahan
      res.status(500).json({ message: "Internal Server Error" }); // Mengirimkan response error 500
    }
  }

  // Mengupdate data pasien
  async update(req, res) {
    try {
      const { id } = req.params; // Mengambil ID pasien dari parameter URL
      const { name, phone, address, status, in_date_at, out_date_at } = req.body;

      // Validasi input
      if (!name || !phone || !address || !status || !in_date_at) {
        return res.status(422).json({
          message: "Unprocessable Entity - All fields (name, phone, address, status, in_date_at) must be filled.",
        });
      }

      const patient = await Patient.update(id, req.body); // Mengupdate data pasien berdasarkan ID
      res.status(200).json({
        message: "The request succeeded", // Response sukses dengan status 200
        data: patient, // Mengirimkan data pasien yang telah diupdate
      });
    } catch (error) {
      console.error("Error updating patient:", error); // Menampilkan error jika terjadi kesalahan
      res.status(500).json({ message: "Internal Server Error" }); // Mengirimkan response error 500
    }
  }

  // Menghapus pasien berdasarkan ID
  async destroy(req, res) {
    try {
      const { id } = req.params; // Mengambil ID pasien dari parameter URL
      const result = await Patient.delete(id); // Menghapus pasien berdasarkan ID
      res.status(204).json({
        message: "No content to send", // Mengirimkan response 204 jika berhasil dihapus
      });
    } catch (error) {
      console.error("Error deleting patient:", error); // Menampilkan error jika terjadi kesalahan
      res.status(500).json({ message: "Internal Server Error" }); // Mengirimkan response error 500
    }
  }

  // Mendapatkan detail pasien berdasarkan ID
  async show(req, res) {
    try {
      const { id } = req.params; // Mengambil ID pasien dari parameter URL
      const patient = await Patient.find(id); // Mencari pasien berdasarkan ID
      if (patient) {
        res.status(200).json({
          message: "The request succeeded", // Response sukses dengan status 200
          data: patient, // Mengirimkan data pasien
        });
      } else {
        res.status(404).json({ message: "Resource not found" }); // Jika pasien tidak ditemukan, response 404
      }
    } catch (error) {
      console.error("Error fetching patient:", error); // Menampilkan error jika terjadi kesalahan
      res.status(500).json({ message: "Internal Server Error" }); // Mengirimkan response error 500
    }
  }

  // Mencari pasien berdasarkan nama
  async search(req, res) {
    try {
      const { name } = req.params; // Mengambil nama pasien dari parameter URL
      const patients = await Patient.searchByName(name); // Mencari pasien berdasarkan nama
      if (patients.length > 0) {
        res.status(200).json({
          message: "The request succeeded", // Response sukses dengan status 200
          data: patients, // Mengirimkan data pasien yang ditemukan
        });
      } else {
        res.status(404).json({ message: "Resource not found" }); // Jika tidak ditemukan, response 404
      }
    } catch (error) {
      console.error("Error searching patients:", error); // Menampilkan error jika terjadi kesalahan
      res.status(500).json({ message: "Internal Server Error" }); // Mengirimkan response error 500
    }
  }

  // Mendapatkan pasien dengan status positif
  async positive(req, res) {
    try {
      const patients = await Patient.findByStatus('positive'); // Mencari pasien dengan status 'positive'
      res.status(200).json({
        message: "The request succeeded", // Response sukses dengan status 200
        data: patients, // Mengirimkan data pasien dengan status positif
      });
    } catch (error) {
      console.error("Error fetching positive patients:", error); // Menampilkan error jika terjadi kesalahan
      res.status(500).json({ message: "Internal Server Error" }); // Mengirimkan response error 500
    }
  }

  // Mendapatkan pasien dengan status sembuh
  async recovered(req, res) {
    try {
      const patients = await Patient.findByStatus('recovered'); // Mencari pasien dengan status 'recovered'
      res.status(200).json({
        message: "The request succeeded", // Response sukses dengan status 200
        data: patients, // Mengirimkan data pasien dengan status sembuh
      });
    } catch (error) {
      console.error("Error fetching recovered patients:", error); // Menampilkan error jika terjadi kesalahan
      res.status(500).json({ message: "Internal Server Error" }); // Mengirimkan response error 500
    }
  }

  // Mendapatkan pasien dengan status meninggal
  async dead(req, res) {
    try {
      const patients = await Patient.findByStatus('dead'); // Mencari pasien dengan status 'dead'
      res.status(200).json({
        message: "The request succeeded", // Response sukses dengan status 200
        data: patients, // Mengirimkan data pasien dengan status meninggal
      });
    } catch (error) {
      console.error("Error fetching dead patients:", error); // Menampilkan error jika terjadi kesalahan
      res.status(500).json({ message: "Internal Server Error" }); // Mengirimkan response error 500
    }
  }
}

module.exports = new PatientController(); // Mengekspor instance dari PatientController

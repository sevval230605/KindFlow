
// SQLite veritabanı bağlantısını içe aktarıyoruz.
const db = require("../database/database");

const Volunteer = {

    // Yeni gönüllü oluşturur.
    create: (volunteerData) => {
        const createdAt = new Date().toISOString();

        // Gönüllü bilgilerini veritabanına kaydetmek için sorgu hazırlarız.
        const query = db.prepare(`
            INSERT INTO volunteers (firstName, lastName, email, phone, createdAt)
            VALUES (?, ?, ?, ?, ?)
        `);

        // Gönüllü bilgilerini veritabanına ekleriz.
        const result = query.run(
            volunteerData.firstName,
            volunteerData.lastName,
            volunteerData.email,
            volunteerData.phone || "",
            createdAt
        );

        // Yeni eklenen gönüllüyü ID numarasıyla getiririz.
        return Volunteer.findById(result.lastInsertRowid);
    },

    // Sistemdeki bütün gönüllüleri listeler.
    findAll: () => {
        return db.prepare("SELECT * FROM volunteers").all();
    },

    // ID numarasına göre gönüllü bulur.
    findById: (id) => {
        return db.prepare(
            "SELECT * FROM volunteers WHERE id = ?"
        ).get(Number(id)) || null;
    },

    // Gönüllü bilgilerini günceller.
    update: (id, updatedData) => {
        const existingVolunteer = Volunteer.findById(id);

        if (!existingVolunteer) {
            return null;
        }

        // Kullanıcının değiştirebileceği alanları belirliyoruz.
        const allowedFields = [
            "firstName",
            "lastName",
            "email",
            "phone"
        ];

        // Sadece izin verilen alanları güncelliyoruz.
        const fieldsToUpdate = Object.keys(updatedData)
            .filter(field => allowedFields.includes(field));

        if (fieldsToUpdate.length === 0) {
            return existingVolunteer;
        }

        // Güncellenecek alanlara göre SQL sorgusu oluşturuyoruz.
        const setClause = fieldsToUpdate
            .map(field => `${field} = ?`)
            .join(", ");

        const values = fieldsToUpdate.map(field => updatedData[field]);

        db.prepare(`
            UPDATE volunteers
            SET ${setClause}
            WHERE id = ?
        `).run(...values, Number(id));

        return Volunteer.findById(id);
    },

    // Gönüllüyü veritabanından siler.
    delete: (id) => {
        const volunteer = Volunteer.findById(id);

        if (!volunteer) {
            return null;
        }

        db.prepare(
            "DELETE FROM volunteers WHERE id = ?"
        ).run(Number(id));

        return volunteer;
    }
};

// Gönüllü modelini diğer dosyalarda kullanıma açıyoruz.
module.exports = Volunteer;

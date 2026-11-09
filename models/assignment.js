
// SQLite veritabanı bağlantısını içe aktarıyoruz.
const db = require("../database/database");

const Assignment = {

    // Bir görevi gönüllüye atar.
    create: (assignmentData) => {
        const assignedAt = new Date().toISOString();

        // Yeni atamayı veritabanına eklemek için SQL sorgusu hazırlarız.
        const query = db.prepare(`
            INSERT INTO assignments (taskId, volunteerId, assignedAt, status)
            VALUES (?, ?, ?, ?)
        `);

        // Görev ve gönüllü ID'lerini, atama tarihi ve durumuyla kaydederiz.
        const result = query.run(
            Number(assignmentData.taskId),
            Number(assignmentData.volunteerId),
            assignedAt,
            "Atandı"
        );

        // Oluşturulan atamayı ID numarasıyla veritabanından getiririz.
        return Assignment.findById(result.lastInsertRowid);
    },

    // Sistemdeki bütün atamaları listeler.
    findAll: () => {
        return db.prepare("SELECT * FROM assignments").all();
    },

    // ID numarasına göre atama bulur.
    findById: (id) => {
        return db.prepare(
            "SELECT * FROM assignments WHERE id = ?"
        ).get(Number(id)) || null;
    },

    // Atama durumunu günceller.
    update: (id, updatedData) => {
        const existingAssignment = Assignment.findById(id);

        if (!existingAssignment) {
            return null;
        }

        // Atama için yalnızca durum alanının güncellenmesine izin veriyoruz.
        if (updatedData.status === undefined) {
            return existingAssignment;
        }

        db.prepare(`
            UPDATE assignments
            SET status = ?
            WHERE id = ?
        `).run(updatedData.status, Number(id));

        return Assignment.findById(id);
    },

    // Atamayı veritabanından siler.
    delete: (id) => {
        const assignment = Assignment.findById(id);

        if (!assignment) {
            return null;
        }

        db.prepare(
            "DELETE FROM assignments WHERE id = ?"
        ).run(Number(id));

        return assignment;
    }
};

// Atama modelini diğer dosyalarda kullanıma açıyoruz.
module.exports = Assignment;

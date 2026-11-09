// SQLite veritabanı bağlantısını içe aktarıyoruz.
const db = require("../database/database");

const Task = {

    // Yeni görev oluşturur.
    create: (taskData) => {
        const createdAt = new Date().toISOString();

        // Görevi veritabanına kaydetmek için SQL sorgusu hazırlarız.
        const query = db.prepare(`
            INSERT INTO tasks (title, description, category, priority, status, createdAt)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        // Soru işaretleri, aşağıda verdiğimiz değerlerle sırayla eşleşir.
        const result = query.run(
            taskData.title,
            taskData.description || "",
            taskData.category || "Genel",
            taskData.priority || "Orta",
            taskData.status || "Bekliyor",
            createdAt
        );

        // Eklenen görevi ID numarasıyla veritabanından tekrar getiririz.
        return Task.findById(result.lastInsertRowid);
    },

    // Bütün görevleri veritabanından getirir.
    findAll: () => {
        return db.prepare("SELECT * FROM tasks").all();
    },

    // ID ile görev bulur.
    findById: (id) => {
        return db.prepare(
            "SELECT * FROM tasks WHERE id = ?"
        ).get(Number(id)) || null;
    },

    // Görevi günceller.
    update: (id, updatedData) => {
        const existingTask = Task.findById(id);

        if (!existingTask) return null;

        // Kullanıcının yalnızca izin verilen alanları güncellemesini sağlarız.
        const allowedFields = [
            "title",
            "description",
            "category",
            "priority",
            "status"
        ];

        const fieldsToUpdate = Object.keys(updatedData)
            .filter(field => allowedFields.includes(field));

        // Güncellenecek alan yoksa mevcut görevi döndürürüz.
        if (fieldsToUpdate.length === 0) {
            return existingTask;
        }

        // Güncellenecek alanlar için SQL sorgusunu hazırlarız.
        const setClause = fieldsToUpdate
            .map(field => `${field} = ?`)
            .join(", ");

        const values = fieldsToUpdate.map(field => updatedData[field]);

        db.prepare(`
            UPDATE tasks
            SET ${setClause}
            WHERE id = ?
        `).run(...values, Number(id));

        return Task.findById(id);
    },

    // Görevi veritabanından siler.
    delete: (id) => {
        const task = Task.findById(id);

        if (!task) return null;

        db.prepare(
            "DELETE FROM tasks WHERE id = ?"
        ).run(Number(id));

        return task;
    }
};

// Task modelini diğer dosyalarda kullanıma açıyoruz.
module.exports = Task;

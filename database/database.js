
// SQLite veritabanı paketini projeye dahil ediyoruz.
const Database = require("better-sqlite3");

// Veritabanı dosyasının tam konumunu belirliyoruz.
const path = require("path");
const dbPath = path.join(__dirname, "kindflow.db");

// Veritabanı bağlantısını oluşturuyoruz.
// Dosya mevcut değilse otomatik oluşturulur.
const db = new Database(dbPath);

// Tablolar arasındaki ilişkileri etkinleştiriyoruz.
db.pragma("foreign_keys = ON");

// Görevler tablosunu oluşturuyoruz.
db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        priority TEXT DEFAULT 'Orta',
        status TEXT DEFAULT 'Bekliyor',
        createdAt TEXT NOT NULL
    );
`);

// Gönüllüler tablosunu oluşturuyoruz.
db.exec(`
    CREATE TABLE IF NOT EXISTS volunteers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        createdAt TEXT NOT NULL
    );
`);

// Görev-gönüllü atamaları tablosunu oluşturuyoruz.
db.exec(`
    CREATE TABLE IF NOT EXISTS assignments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        taskId INTEGER NOT NULL,
        volunteerId INTEGER NOT NULL,
        assignedAt TEXT NOT NULL,
        status TEXT DEFAULT 'Atandı',
        FOREIGN KEY (taskId) REFERENCES tasks(id),
        FOREIGN KEY (volunteerId) REFERENCES volunteers(id)
    );
`);

// Veritabanı bağlantısını diğer dosyalarda kullanıma açıyoruz.
module.exports = db;

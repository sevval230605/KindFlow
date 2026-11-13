
// Express.js kütüphanesini projeye dahil ediyoruz.
const express = require("express");

// Veritabanı bağlantısını uygulama başlarken yükler.
const db = require("./database/database");

// Görev rotalarını içe aktarıyoruz.
const taskRoutes = require("./routes/taskRoutes");

// Gönüllü rotalarını içe aktarıyoruz.
const volunteerRoutes = require("./routes/volunteerRoutes");

// Görev-gönüllü atama rotalarını içe aktarıyoruz.
const assignmentRoutes = require("./routes/assignmentRoutes");

// Logger Middleware dosyamızı içe aktarıyoruz.
const logger = require("./middleware/logger");

// Express uygulamasını oluşturuyoruz.
const app = express();

// KindFlow API sunucusunun çalışacağı port numarası.
const PORT = 3000;

// JSON formatındaki istek verilerini okuyabilmemizi sağlar.
app.use(express.json());

// TÜM istekleri rotalara ulaşmadan önce Logger üzerinden geçiriyoruz.
app.use(logger);

// Ana adres kontrolü.
app.get("/", (req, res) => {
    res.json({
        message: "KindFlow API çalışıyor!",
        project: "KindFlow - İyilik Görevleri Yönetimi"
    });
});

// Görev işlemlerini /api/tasks adresine bağlıyoruz.
app.use("/api/tasks", taskRoutes);

// Gönüllü işlemlerini /api/volunteers adresine bağlıyoruz.
app.use("/api/volunteers", volunteerRoutes);

// Atama işlemlerini /api/assignments adresine bağlıyoruz.
app.use("/api/assignments", assignmentRoutes);

// Sunucuyu başlatıyoruz.
app.listen(PORT, () => {
    console.log(`KindFlow API http://localhost:${PORT} adresinde çalışıyor.`);
});

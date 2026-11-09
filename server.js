
// Express.js kütüphanesini projeye dahil ediyoruz.
const express = require("express");
// Veritabanı bağlantısını uygulama başlarken yükler.
const db = require("./database/database");
// Görev-gönüllü atama rotalarını içe aktarıyoruz.
const assignmentRoutes = require("./routes/assignmentRoutes");

// Gönüllü rotalarını içe aktarıyoruz.
const volunteerRoutes = require("./routes/volunteerRoutes");

// Logger Middleware dosyamızı içe aktarıyoruz.
// Gelen API isteklerini terminale kaydeder.
const logger = require("./middleware/logger");

// Görev rotalarını içe aktarıyoruz.
// Görev oluşturma, listeleme, güncelleme ve silme adreslerini içerir.
const taskRoutes = require("./routes/taskRoutes");

// Express uygulamasını oluşturuyoruz.
const app = express();

// KindFlow API sunucusunun çalışacağı port numarası.
const PORT = 3000;

// İsteklerin JSON formatındaki verilerini okuyabilmemizi sağlar.
app.use(express.json());

// Atama işlemlerini /api/assignments adresine bağlıyoruz.
app.use("/api/assignments", assignmentRoutes);

// Gönüllü işlemlerini /api/volunteers adresine bağlıyoruz.
app.use("/api/volunteers", volunteerRoutes);

// Gelen bütün istekleri Logger Middleware üzerinden geçirir.
app.use(logger);

// Ana adres kontrolü.
app.get("/", (req, res) => {
    res.json({
        message: "KindFlow API çalışıyor!",
        project: "KindFlow - İyilik Görevleri Yönetimi"
    });
});

// Görev rotalarını /api/tasks adresine bağlıyoruz.
// Örneğin GET /api/tasks tüm görevleri listeler.
app.use("/api/tasks", taskRoutes);

// Sunucuyu başlatıyoruz.
app.listen(PORT, () => {
    console.log(`KindFlow API http://localhost:${PORT} adresinde çalışıyor.`);
});

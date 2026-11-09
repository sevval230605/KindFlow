
// Express'in Router özelliğini kullanarak görev adreslerini oluşturuyoruz.
const express = require("express");
const router = express.Router();

// Görev işlemlerini yöneten controller fonksiyonlarını içe aktarıyoruz.
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// POST: Yeni görev oluşturur.
router.post("/", createTask);

// GET: Bütün görevleri listeler.
router.get("/", getAllTasks);

// GET: Belirli bir görevin detayını getirir.
// :id, URL üzerinden gönderilecek görev numarasını temsil eder.
router.get("/:id", getTaskById);

// PUT: Belirli bir görevin bilgilerini günceller.
router.put("/:id", updateTask);

// DELETE: Belirli bir görevi siler.
router.delete("/:id", deleteTask);

// Bu rotaları server.js dosyasında kullanabilmemizi sağlar.
module.exports = router;


// Express'in Router özelliğini kullanarak gönüllü adreslerini oluşturuyoruz.
const express = require("express");
const router = express.Router();

// Gönüllü işlemlerini yöneten Controller fonksiyonlarını içe aktarıyoruz.
const {
    createVolunteer,
    getAllVolunteers,
    getVolunteerById,
    updateVolunteer,
    deleteVolunteer
} = require("../controllers/volunteerController");

// POST: Yeni gönüllü ekler.
router.post("/", createVolunteer);

// GET: Bütün gönüllüleri listeler.
router.get("/", getAllVolunteers);

// GET: ID numarasına göre gönüllü detayını getirir.
router.get("/:id", getVolunteerById);

// PUT: Gönüllü bilgilerini günceller.
router.put("/:id", updateVolunteer);

// DELETE: Gönüllüyü siler.
router.delete("/:id", deleteVolunteer);

module.exports = router;

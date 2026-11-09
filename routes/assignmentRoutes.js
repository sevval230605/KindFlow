
// Express'in Router özelliğini kullanarak atama adreslerini oluşturuyoruz.
const express = require("express");
const router = express.Router();

// Atama işlemlerini yöneten Controller fonksiyonlarını içe aktarıyoruz.
const {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
} = require("../controllers/assignmentController");

// POST: Bir görevi gönüllüye atar.
router.post("/", createAssignment);

// GET: Bütün görev-gönüllü atamalarını listeler.
router.get("/", getAllAssignments);

// GET: ID numarasına göre atama detayını getirir.
router.get("/:id", getAssignmentById);

// PUT: Atamanın durumunu günceller.
router.put("/:id", updateAssignment);

// DELETE: Atamayı siler.
router.delete("/:id", deleteAssignment);

module.exports = router;

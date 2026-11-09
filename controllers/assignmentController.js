
// Atama modelini içe aktarıyoruz.
const Assignment = require("../models/assignment");

// Görev modelini içe aktarıyoruz.
// Atama yapılacak görevin gerçekten var olup olmadığını kontrol eder.
const Task = require("../models/task");

// Gönüllü modelini içe aktarıyoruz.
// Atama yapılacak gönüllünün sistemde kayıtlı olup olmadığını kontrol eder.
const Volunteer = require("../models/volunteer");

// Atama için kullanılabilecek durumlar.
const allowedStatuses = [
    "Atandı",
    "Devam Ediyor",
    "Tamamlandı",
    "İptal Edildi"
];

// 1. GÖREVİ GÖNÜLLÜYE ATAMA
const createAssignment = (req, res) => {
    const { taskId, volunteerId } = req.body;

    // Görev ve gönüllü ID alanlarının gönderilmesini zorunlu tutuyoruz.
    if (taskId === undefined || volunteerId === undefined) {
        return res.status(400).json({
            message: "Görev ID ve gönüllü ID zorunludur."
        });
    }

    // Girilen görev ID'sinin geçerli bir sayı olup olmadığını kontrol ediyoruz.
    if (!Number.isInteger(Number(taskId)) || Number(taskId) <= 0) {
        return res.status(400).json({
            message: "Geçerli bir görev ID giriniz."
        });
    }

    // Girilen gönüllü ID'sinin geçerli bir sayı olup olmadığını kontrol ediyoruz.
    if (!Number.isInteger(Number(volunteerId)) || Number(volunteerId) <= 0) {
        return res.status(400).json({
            message: "Geçerli bir gönüllü ID giriniz."
        });
    }

    // Atanacak görevin sistemde bulunup bulunmadığını kontrol ediyoruz.
    const task = Task.findById(taskId);

    if (!task) {
        return res.status(404).json({
            message: "Atanacak görev bulunamadı."
        });
    }

    // Atanacak gönüllünün sistemde bulunup bulunmadığını kontrol ediyoruz.
    const volunteer = Volunteer.findById(volunteerId);

    if (!volunteer) {
        return res.status(404).json({
            message: "Atanacak gönüllü bulunamadı."
        });
    }

    // Görev ve gönüllü mevcutsa atamayı oluşturuyoruz.
   // ID değerlerini sayıya dönüştürerek veritabanına gönderiyoruz.
const newAssignment = Assignment.create({
    taskId: Number(taskId),
    volunteerId: Number(volunteerId)
});
    res.status(201).json({
        message: "Görev gönüllüye başarıyla atandı.",
        assignment: newAssignment
    });
};

// 2. TÜM ATAMALARI LİSTELEME
const getAllAssignments = (req, res) => {
    const assignments = Assignment.findAll();

    res.status(200).json(assignments);
};

// 3. ID İLE ATAMA DETAYI GÖRÜNTÜLEME
const getAssignmentById = (req, res) => {
    const { id } = req.params;

    const assignment = Assignment.findById(id);

    if (!assignment) {
        return res.status(404).json({
            message: "Atama bulunamadı."
        });
    }

    res.status(200).json(assignment);
};

// 4. ATAMA DURUMUNU GÜNCELLEME
const updateAssignment = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Atama durumunun geçerli değerlerden biri olmasını sağlıyoruz.
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            message: "Geçersiz durum. Kullanılabilir durumlar: Atandı, Devam Ediyor, Tamamlandı, İptal Edildi."
        });
    }

    const updatedAssignment = Assignment.update(id, { status });

    if (!updatedAssignment) {
        return res.status(404).json({
            message: "Güncellenecek atama bulunamadı."
        });
    }

    res.status(200).json({
        message: "Atama durumu başarıyla güncellendi.",
        assignment: updatedAssignment
    });
};

// 5. ATAMAYI SİLME
const deleteAssignment = (req, res) => {
    const { id } = req.params;

    const deletedAssignment = Assignment.delete(id);

    if (!deletedAssignment) {
        return res.status(404).json({
            message: "Silinecek atama bulunamadı."
        });
    }

    res.status(200).json({
        message: "Atama başarıyla silindi.",
        assignment: deletedAssignment
    });
};

// Controller fonksiyonlarını route dosyasında kullanıma açıyoruz.
module.exports = {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
};

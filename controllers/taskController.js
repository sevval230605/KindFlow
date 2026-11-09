
// Görev modelini içe aktarıyoruz.
const Task = require("../models/task");

// Atama modelini içe aktarıyoruz.
// Görevin bir gönüllüye atanıp atanmadığını kontrol eder.
const Assignment = require("../models/assignment");

// Arama ve filtreleme sırasında metinleri karşılaştırır.
const normalizeText = (value) => {
    return String(value ?? "").trim().toLocaleLowerCase("tr-TR");
};


// 1. YENİ GÖREV OLUŞTURMA
const createTask = (req, res) => {

    const { title, description, category, priority } = req.body;

    // Görev başlığı zorunludur.
    if (!title || !String(title).trim()) {
        return res.status(400).json({
            message: "Görev başlığı zorunludur."
        });
    }

    // Yeni görevi veritabanına kaydediyoruz.
    const newTask = Task.create({
        title: String(title).trim(),
        description,
        category,
        priority
    });

    res.status(201).json({
        message: "Görev başarıyla oluşturuldu.",
        task: newTask
    });
};


// 2. TÜM GÖREVLERİ LİSTELEME VE FİLTRELEME
const getAllTasks = (req, res) => {

    const { search, category, priority, status } = req.query;

    const tasks = Task.findAll();

    const filteredTasks = tasks.filter((task) => {

        const matchesSearch =
            !search ||
            normalizeText(task.title).includes(normalizeText(search)) ||
            normalizeText(task.description).includes(normalizeText(search));

        const matchesCategory =
            !category ||
            normalizeText(task.category) === normalizeText(category);

        const matchesPriority =
            !priority ||
            normalizeText(task.priority) === normalizeText(priority);

        const matchesStatus =
            !status ||
            normalizeText(task.status) === normalizeText(status);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesPriority &&
            matchesStatus
        );
    });

    res.status(200).json(filteredTasks);
};


// 3. ID İLE GÖREV DETAYI GÖRÜNTÜLEME
const getTaskById = (req, res) => {

    const { id } = req.params;

    const task = Task.findById(id);

    if (!task) {
        return res.status(404).json({
            message: "Görev bulunamadı."
        });
    }

    res.status(200).json(task);
};


// 4. GÖREV GÜNCELLEME
const updateTask = (req, res) => {

    const { id } = req.params;
    const updatedData = req.body;

    const updatedTask = Task.update(id, updatedData);

    if (!updatedTask) {
        return res.status(404).json({
            message: "Güncellenecek görev bulunamadı."
        });
    }

    res.status(200).json({
        message: "Görev başarıyla güncellendi.",
        task: updatedTask
    });
};


// 5. GÖREV SİLME
const deleteTask = (req, res) => {

    const { id } = req.params;

    // Önce silinecek görevin varlığını kontrol ediyoruz.
    const task = Task.findById(id);

    if (!task) {
        return res.status(404).json({
            message: "Silinecek görev bulunamadı."
        });
    }

    // Göreve bağlı atamaları kontrol ediyoruz.
    const assignments = Assignment.findAll();

    const hasAssignment = assignments.some(
        (assignment) => Number(assignment.taskId) === Number(id)
    );

    // Görev atanmışsa silme işlemine izin vermiyoruz.
    if (hasAssignment) {
        return res.status(409).json({
            message: "Bu görev bir gönüllüye atanmış. Önce görev atamasını silmelisiniz."
        });
    }

    // Atama yoksa görevi veritabanından siliyoruz.
    const deletedTask = Task.delete(id);

    res.status(200).json({
        message: "Görev başarıyla silindi.",
        task: deletedTask
    });
};


// Controller fonksiyonlarını dışarıya açıyoruz.
module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};

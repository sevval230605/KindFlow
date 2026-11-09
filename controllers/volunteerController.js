
// Gönüllü modelini içe aktarıyoruz.
const Volunteer = require("../models/volunteer");

// Atama modelini içe aktarıyoruz.
// Gönüllünün herhangi bir göreve atanıp atanmadığını kontrol eder.
const Assignment = require("../models/assignment");

// E-posta adresinin geçerli formatta olup olmadığını kontrol eder.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// 1. YENİ GÖNÜLLÜ EKLEME
const createVolunteer = (req, res) => {

    const { firstName, lastName, email, phone } = req.body;

    // Zorunlu alanları kontrol ediyoruz.
    if (
        !firstName || !String(firstName).trim() ||
        !lastName || !String(lastName).trim() ||
        !email || !String(email).trim()
    ) {
        return res.status(400).json({
            message: "Ad, soyad ve e-posta alanları zorunludur."
        });
    }

    // E-posta formatını kontrol ediyoruz.
    if (!emailPattern.test(String(email).trim())) {
        return res.status(400).json({
            message: "Geçerli bir e-posta adresi giriniz."
        });
    }

    // Gönüllüyü SQLite veritabanına kaydediyoruz.
    const newVolunteer = Volunteer.create({
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        email: String(email).trim(),
        phone
    });

    res.status(201).json({
        message: "Gönüllü başarıyla eklendi.",
        volunteer: newVolunteer
    });
};


// 2. TÜM GÖNÜLLÜLERİ LİSTELEME
const getAllVolunteers = (req, res) => {

    const volunteers = Volunteer.findAll();

    res.status(200).json(volunteers);
};


// 3. ID İLE GÖNÜLLÜ DETAYI GÖRÜNTÜLEME
const getVolunteerById = (req, res) => {

    const { id } = req.params;

    const volunteer = Volunteer.findById(id);

    if (!volunteer) {
        return res.status(404).json({
            message: "Gönüllü bulunamadı."
        });
    }

    res.status(200).json(volunteer);
};


// 4. GÖNÜLLÜ BİLGİLERİNİ GÜNCELLEME
const updateVolunteer = (req, res) => {

    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;

    const updatedData = {};

    // Ad alanını kontrol ediyoruz.
    if (firstName !== undefined) {
        if (!String(firstName).trim()) {
            return res.status(400).json({
                message: "Ad alanı boş bırakılamaz."
            });
        }

        updatedData.firstName = String(firstName).trim();
    }

    // Soyad alanını kontrol ediyoruz.
    if (lastName !== undefined) {
        if (!String(lastName).trim()) {
            return res.status(400).json({
                message: "Soyad alanı boş bırakılamaz."
            });
        }

        updatedData.lastName = String(lastName).trim();
    }

    // E-posta formatını kontrol ediyoruz.
    if (email !== undefined) {
        if (!emailPattern.test(String(email).trim())) {
            return res.status(400).json({
                message: "Geçerli bir e-posta adresi giriniz."
            });
        }

        updatedData.email = String(email).trim();
    }

    // Telefon alanı gönderilmişse güncelliyoruz.
    if (phone !== undefined) {
        updatedData.phone = phone;
    }

    const updatedVolunteer = Volunteer.update(id, updatedData);

    if (!updatedVolunteer) {
        return res.status(404).json({
            message: "Güncellenecek gönüllü bulunamadı."
        });
    }

    res.status(200).json({
        message: "Gönüllü bilgileri başarıyla güncellendi.",
        volunteer: updatedVolunteer
    });
};


// 5. GÖNÜLLÜ SİLME
const deleteVolunteer = (req, res) => {

    const { id } = req.params;

    // Önce silinecek gönüllünün varlığını kontrol ediyoruz.
    const volunteer = Volunteer.findById(id);

    if (!volunteer) {
        return res.status(404).json({
            message: "Silinecek gönüllü bulunamadı."
        });
    }

    // Gönüllüye bağlı atamaları kontrol ediyoruz.
    const assignments = Assignment.findAll();

    const hasAssignment = assignments.some(
        (assignment) => Number(assignment.volunteerId) === Number(id)
    );

    // Gönüllünün aktif bir atama kaydı varsa silinmesine izin vermiyoruz.
    if (hasAssignment) {
        return res.status(409).json({
            message: "Bu gönüllüye görev atanmış. Önce görev atamasını silmelisiniz."
        });
    }

    // Atama yoksa gönüllüyü veritabanından siliyoruz.
    const deletedVolunteer = Volunteer.delete(id);

    res.status(200).json({
        message: "Gönüllü başarıyla silindi.",
        volunteer: deletedVolunteer
    });
};


// Controller fonksiyonlarını dışarıya açıyoruz.
module.exports = {
    createVolunteer,
    getAllVolunteers,
    getVolunteerById,
    updateVolunteer,
    deleteVolunteer
};

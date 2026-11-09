// Gelen API isteklerini kaydeden Logger Middleware
const logger = (req, res, next) => {

    // İsteğin tarih ve saatini Türkiye formatında alır.
    const tarih = new Date().toLocaleString("tr-TR");

    // İsteğin tarihini, HTTP metodunu ve adresini terminale yazdırır.
    // req.method: GET, POST, PUT, DELETE gibi istek türüdür.
    // req.url: İsteğin gönderildiği API adresidir.
    console.log(`[${tarih}] ${req.method} ${req.url}`);

    // İsteği sonraki middleware veya endpoint'e aktarır.
    next();
};

// Bu dosyadaki logger fonksiyonunu diğer dosyalarda kullanabilmemizi sağlar.
module.exports = logger;
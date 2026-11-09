
# KindFlow – İyilik Görevleri Yönetimi API

KindFlow, sosyal sorumluluk ve gönüllülük faaliyetlerini
dijital ortamda yönetmek amacıyla geliştirilen bir
REST API projesidir.

## Projenin Amacı

KindFlow; yardım görevlerinin oluşturulmasını,
gönüllülerin sisteme kaydedilmesini ve görevlerin
gönüllülere atanmasını sağlar.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- JavaScript
- SQLite
- better-sqlite3
- Apidog (API testleri)

## Özellikler

- Görev oluşturma, listeleme, güncelleme ve silme
- Görevleri kategori, öncelik ve duruma göre filtreleme
- Görev başlığı ve açıklamasında arama
- Gönüllü oluşturma, listeleme, güncelleme ve silme
- Görevleri gönüllülere atama
- Atama durumlarını güncelleme
- Geçersiz isteklerde HTTP hata yanıtları
- Logger middleware ile API isteklerini kaydetme
- SQLite ile kalıcı veri saklama

## Proje Klasör Yapısı

```text
KindFlow/
├── controllers/
│   ├── taskController.js
│   ├── volunteerController.js
│   └── assignmentController.js
├── routes/
│   ├── taskRoutes.js
│   ├── volunteerRoutes.js
│   └── assignmentRoutes.js
├── models/
│   ├── task.js
│   ├── volunteer.js
│   └── assignment.js
├── database/
│   ├── database.js
│   └── kindflow.db
├── middleware/
│   └── logger.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Kurulum

Bilgisayarda Node.js kurulu olmalıdır.

1. Projeyi bilgisayarınıza indirin.
2. Terminalde proje klasörüne girin.
3. Bağımlılıkları yükleyin:

```bash
npm install
```

4. Sunucuyu başlatın:

```bash
node server.js
```

Sunucu adresi:

http://localhost:3000

SQLite veritabanı, uygulama ilk çalıştırıldığında
gerekli tablolarla birlikte hazırlanır.

## API Endpointleri

### Görevler

| Method | Endpoint | Açıklama |
|---|---|---|
| POST | /api/tasks | Yeni görev oluştur |
| GET | /api/tasks | Tüm görevleri listele |
| GET | /api/tasks/:id | Görev detayını getir |
| PUT | /api/tasks/:id | Görev güncelle |
| DELETE | /api/tasks/:id | Görev sil |

Görev arama ve filtreleme örnekleri:

```text
GET /api/tasks?search=Kitap
GET /api/tasks?category=Eğitim
GET /api/tasks?priority=Yüksek
GET /api/tasks?status=Bekliyor
GET /api/tasks?category=Eğitim&priority=Yüksek
```

### Gönüllüler

| Method | Endpoint | Açıklama |
|---|---|---|
| POST | /api/volunteers | Gönüllü oluştur |
| GET | /api/volunteers | Gönüllüleri listele |
| GET | /api/volunteers/:id | Gönüllü detayını getir |
| PUT | /api/volunteers/:id | Gönüllü güncelle |
| DELETE | /api/volunteers/:id | Gönüllü sil |

### Atamalar

| Method | Endpoint | Açıklama |
|---|---|---|
| POST | /api/assignments | Görev ata |
| GET | /api/assignments | Atamaları listele |
| GET | /api/assignments/:id | Atama detayını getir |
| PUT | /api/assignments/:id | Atama durumunu güncelle |
| DELETE | /api/assignments/:id | Atamayı sil |

## Örnek API İstekleri

### Görev Oluşturma

POST /api/tasks

```json
{
  "title": "Kitap Dağıtımı",
  "description": "İhtiyaç sahibi öğrencilere kitap dağıtılması",
  "category": "Eğitim",
  "priority": "Yüksek"
}
```

### Gönüllü Oluşturma

POST /api/volunteers

```json
{
  "firstName": "Ayşe",
  "lastName": "Yılmaz",
  "email": "ayse@example.com",
  "phone": "05551234567"
}
```

### Görev Atama

POST /api/assignments

```json
{
  "taskId": 1,
  "volunteerId": 1
}
```

Atama yapılabilmesi için belirtilen görev ve
gönüllünün sistemde kayıtlı olması gerekir.

## HTTP Durum Kodları

- 200: İşlem başarılı
- 201: Yeni kayıt oluşturuldu
- 400: Geçersiz istek
- 404: Kayıt bulunamadı
- 409: İlişkili kayıt bulunduğu için silme yapılamadı

## Veritabanı

Projede SQLite kullanılmaktadır.

Üç temel tablo bulunmaktadır:

- tasks: Görev bilgileri
- volunteers: Gönüllü bilgileri
- assignments: Görev ve gönüllü ilişkileri

Atamalar, görev ve gönüllü kayıtlarına yabancı
anahtarlar (foreign key) ile bağlanır.

Bir göreve veya gönüllüye bağlı atama varsa,
önce ilgili atamanın silinmesi gerekir.

## API Testleri

API endpointleri Apidog üzerinden test edilmiştir.

Testlerde POST, GET, PUT ve DELETE metotları,
arama, filtreleme ve hata yanıtları kontrol edilmiştir.

## Proje Mimarisi

Proje katmanlı bir yapıyla geliştirilmiştir.

- Routes: API adreslerini tanımlar.
- Controllers: Gelen istekleri ve iş kurallarını yönetir.
- Models: SQLite veritabanı işlemlerini gerçekleştirir.
- Middleware: Gelen HTTP isteklerini kaydeder.
- Database: Veritabanı bağlantısını ve tabloları yönetir.

## Geliştirici

Şevval Tekbaş

Yazılım Mühendisliği
```

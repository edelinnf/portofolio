# Portofolio Edelin Fortuna

Website portofolio pribadi dibangun dengan **React + Vite**, animasi **Framer Motion**, styling **Tailwind CSS**, dan gaya visual **glassmorphism**. Konten diambil dan disesuaikan dari CV Edelin Fortuna.

## Konsep Desain

- **Palet warna**: latar gelap navy (`#0A0F1F` → `#131B33`) dengan aksen teal (`#5EEAD4`) dan violet (`#A78BFA`) — merepresentasikan dunia data & clustering.
- **Tipografi**: `Space Grotesk` untuk judul, `Inter` untuk isi, `JetBrains Mono` untuk tanggal/statistik/label data.
- **Signature element**: animasi hero berupa titik-titik data yang menyebar lalu mengelompok ke dalam 3 klaster berwarna — merepresentasikan langsung publikasi ilmiah tentang **X-Means Clustering**.
- **Kartu glass**: setiap section (pengalaman, proyek, publikasi, organisasi, sertifikat) menggunakan efek kaca buram (`backdrop-blur`) dengan border tipis translucent.

## Update Terbaru (sinkron dengan CV terbaru)

- Bagian **Tentang** dan tagline hero diperbarui mengikuti ringkasan profil versi terbaru.
- Section **Proyek** kini menampilkan 5 proyek: Segmentasi Pelanggan Properti, Klasifikasi Penyakit Kulit (CNN), Analisis NYC Property Sales, Sistem Agen Cerdas AI, dan Segmentasi Memori OS.
- Section **Keahlian** dipecah menjadi 4 kategori: Bahasa & Basis Data, Machine Learning & Visualisasi, Kompetensi Analitis, dan Nonteknis.
- Tombol **GitHub** (`github.com/edelinnf`) dan **Portofolio** (`edelinfortunaporto.vercel.app`) ditambahkan di hero dan section kontak.

## Cara Menjalankan

Pastikan Node.js (v18+) sudah terpasang, lalu jalankan di terminal:

```bash
cd edelin-portfolio
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build untuk Produksi

```bash
npm run build
npm run preview
```

Hasil build ada di folder `dist/`, siap di-deploy ke Vercel, Netlify, atau hosting statis lainnya.

## Struktur Proyek

```
edelin-portfolio/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx      ← seluruh konten & section portofolio
    └── index.css    ← utility glassmorphism & base style
```

## Kustomisasi Cepat

- **Ganti data**: semua konten (pengalaman, organisasi, skill, sertifikat) ada di bagian atas `src/App.jsx` dalam bentuk array — tinggal edit teksnya.
- **Ganti warna**: ubah token warna di `tailwind.config.js` (`teal.accent`, `violet.accent`, `amber.accent`).
- **Ganti animasi hero**: komponen `ClusterVisual` di `src/App.jsx` mengatur animasi titik klaster; ubah jumlah node atau warna di array `CLUSTER_COLORS`.

## Cara Menambahkan Foto Dokumentasi Kegiatan Kampus

Section "Dokumentasi Kegiatan Kampus" ada di `src/App.jsx`, datanya di array `GALLERY` (cari komentar `GALLERY — dokumentasi kegiatan kampus`). Saat ini semua slot masih placeholder (kotak abu-abu bertuliskan "Foto belum ditambahkan") karena belum ada foto yang di-upload.

Langkah menambahkan foto asli:

1. Taruh file fotomu di folder `src/assets/gallery/` (buat foldernya kalau belum ada), misalnya `src/assets/gallery/pelantikan-hmsd.jpg`.
2. Di bagian paling atas `src/App.jsx`, tambahkan baris import seperti ini (mengikuti pola `import profilePhoto from './assets/profile.jpg'` yang sudah ada):
   ```js
   import pelantikanHmsd from './assets/gallery/pelantikan-hmsd.jpg'
   ```
3. Di array `GALLERY`, ganti `image: null` dengan nama variabel yang baru diimport, dan isi `caption` serta `detail`:
   ```js
   {
     id: 'gallery-1',
     image: pelantikanHmsd,
     caption: 'Pelantikan Pengurus HMSD',
     detail: 'Maret 2024',
   },
   ```
4. Ulangi untuk setiap foto. Boleh tambah atau kurangi jumlah objek di array sesuai jumlah foto yang kamu punya — kartu akan otomatis menyesuaikan di grid.

Klik salah satu foto di section ini akan membuka tampilan lebih besar (lightbox).

## Cara Menambahkan Proyek Baru

Semua proyek disimpan dalam satu array bernama `PROJECTS` di `src/App.jsx` (cari komentar `PROJECTS — add new projects here`). Untuk menambahkan proyek baru, cukup tambahkan satu objek baru ke dalam array tersebut:

```js
{
  id: 'nama-unik-proyek',              // wajib, harus unik
  title: 'Judul Proyek',
  period: '2026',                       // tahun atau rentang waktu
  role: 'Peranmu di proyek ini',
  description: 'Deskripsi singkat 2-3 kalimat tentang proyek.',
  tech: ['Python', 'SQL'],              // tag teknologi, tampil sebagai chip
  highlights: [                         // opsional, angka/statistik penting
    { label: 'Label statistik', value: 'Nilainya' },
  ],
  team: ['Nama Rekan 1', 'Nama Rekan 2'], // opsional, kosongkan [] jika solo
  link: 'https://github.com/...',       // opsional, isi null jika tidak ada
},
```

Tidak perlu mengubah bagian lain — komponen `ProjectCard` dan section Proyek akan otomatis menampilkan kartu baru sesuai urutan di array. Kartu akan tersusun dalam grid 2 kolom secara otomatis.


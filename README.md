# Portofolio Edelin Fortuna

Website portofolio pribadi dibangun dengan **React + Vite**, animasi **Framer Motion**, styling **Tailwind CSS**, dan gaya visual **glassmorphism**. Konten diambil dan disesuaikan dari CV Edelin Fortuna.

## Konsep Desain

- **Palet warna**: latar gelap navy (`#0A0F1F` → `#131B33`) dengan aksen teal (`#5EEAD4`) dan violet (`#A78BFA`) — merepresentasikan dunia data & clustering.
- **Tipografi**: `Space Grotesk` untuk judul, `Inter` untuk isi, `JetBrains Mono` untuk tanggal/statistik/label data.
- **Signature element**: animasi hero berupa titik-titik data yang menyebar lalu mengelompok ke dalam 3 klaster berwarna — merepresentasikan langsung publikasi ilmiah tentang **X-Means Clustering**.
- **Kartu glass**: setiap section (pengalaman, publikasi, organisasi, sertifikat) menggunakan efek kaca buram (`backdrop-blur`) dengan border tipis translucent.

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

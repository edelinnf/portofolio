import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import profilePhoto from './assets/profile.jpg'
import gallery1 from './assets/gallery/gallery-1.jpg'
import gallery2 from './assets/gallery/gallery-2.jpg'
import gallery3 from './assets/gallery/gallery-3.jpg'
import gallery4 from './assets/gallery/gallery-4.jpg'
import gallery5 from './assets/gallery/gallery-5.jpg'
import gallery6 from './assets/gallery/gallery-6.jpg'
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  GraduationCap,
  Briefcase,
  BookOpen,
  Users,
  Award,
  Wrench,
  ArrowUpRight,
  Menu,
  X,
  FolderKanban,
  ExternalLink,
  Github,
  Camera,
  ImageOff,
} from 'lucide-react'

/* -------------------------------------------------------------------- */
/*  Data pulled from Edelin Fortuna's CV                                 */
/* -------------------------------------------------------------------- */

const NAV_LINKS = [
  { id: 'about', label: 'Tentang' },
  { id: 'experience', label: 'Pengalaman' },
  { id: 'project', label: 'Proyek' },
  { id: 'publication', label: 'Publikasi' },
  { id: 'organization', label: 'Organisasi' },
  { id: 'gallery', label: 'Dokumentasi' },
  { id: 'skills', label: 'Keahlian' },
  { id: 'awards', label: 'Sertifikat' },
  { id: 'contact', label: 'Kontak' },
]

const EXPERIENCE = [
  {
    company: 'PT Cemerlang Statistika Indonesia (StatsMe!)',
    role: 'Surveyor — Dinas Kepemudaan, Olahraga & Pariwisata Kab. Sidoarjo',
    period: 'Jun — Jul 2026',
    location: 'Sidoarjo, Indonesia',
    points: [
      'Melakukan observasi dan pengumpulan data langsung di 48 titik lokasi destinasi wisata sebagai surveyor lapangan untuk memastikan data akurat, lengkap, dan sesuai kondisi aktual.',
      'Mengonversi hasil observasi lapangan dari data kualitatif menjadi data kuantitatif terstruktur menggunakan Microsoft Excel.',
      'Melakukan validasi harian dan data cleaning sebelum pelaporan guna memastikan tidak ada data duplikat maupun informasi responden yang tidak lengkap.',
      'Mengelola pelaporan data harian bersama koordinator lapangan serta mengirimkan rekapitulasi data setiap 3 hari untuk mendukung pengelolaan database tim statistika.',
    ],
  },
  {
    company: 'Badan Penanggulangan Bencana Daerah (BPBD)',
    role: 'Data Analyst Intern',
    period: 'Feb — Jun 2024',
    location: 'Surabaya, Indonesia',
    points: [
      'Merancang sistem klasifikasi digital untuk respons masyarakat pada layanan Call Center 112, meningkatkan akurasi dari 56% menjadi 92%.',
      'Mengimplementasikan analisis spasial untuk mengelompokkan tingkat kerawanan titik genangan banjir di Surabaya dengan akurasi 95,92%.',
      'Merancang struktur database relasional MySQL dan mengeksekusi migrasi data logistik untuk sistem manajemen BPBD Kota Surabaya.',
    ],
    stats: [
      { label: 'Akurasi klasifikasi', value: '56% → 92%' },
      { label: 'Akurasi analisis spasial', value: '95,92%' },
    ],
  },
  {
    company: 'RevoU Tech Academy — Kampus Merdeka',
    role: 'Data & Software Engineering Cohort (Studi Independen MSIB)',
    period: 'Agu — Des 2023',
    location: 'Online',
    points: [
      'Membangun aplikasi web menggunakan HTML, CSS, JavaScript, Git, dan integrasi database dengan menerapkan praktik pengembangan perangkat lunak secara kolaboratif.',
      'Mengerjakan proyek analitik data mencakup persiapan data, query SQL, visualisasi, hingga rekomendasi bisnis dalam tim berbasis agile.',
      'Menerapkan Python, SQL, dan Looker Studio untuk membersihkan, menganalisis, dan memvisualisasikan data pada studi kasus industri dan proyek capstone.',
    ],
  },
]

/* -------------------------------------------------------------------- */
/*  PROJECTS — add new projects here as new objects in this array.       */
/*  Each project can have: id, title, period, role, description,        */
/*  tech (array of tags), highlights (array of {label, value} stats),   */
/*  team (array of collaborator names, optional), link (URL, optional). */
/* -------------------------------------------------------------------- */

const PROJECTS = [
  {
    id: 'segmentasi-pelanggan-properti',
    title: 'Segmentasi Pola Pembayaran Pelanggan Properti — PT XYZ',
    period: '2026',
    role: 'Proyek Individu — Data Science',
    description:
      'Mengintegrasikan dan mengolah 9.615 data transaksi menjadi 386 profil pelanggan melalui data preprocessing, agregasi, dan feature engineering. Membangun model X-Means Clustering untuk mengidentifikasi 3 segmen pelanggan sebagai dasar strategi komunikasi dan penagihan, lalu memvisualisasikannya lewat aplikasi web Streamlit.',
    tech: ['Python', 'X-Means Clustering', 'Streamlit', 'Feature Engineering'],
    highlights: [
      { label: 'Data ditransformasi', value: '9.615 → 386 profil' },
      { label: 'Silhouette Score', value: '0,606' },
      { label: 'Davies-Bouldin Index', value: '0,538' },
    ],
    team: [],
    link: null,
  },
  {
    id: 'cnn-skin-disease',
    title: 'Klasifikasi Penyakit Kulit dengan CNN (MobileNetV2)',
    period: '2024',
    role: 'Anggota Tim — Proposal Penelitian Sains Data, UPN "Veteran" Jawa Timur',
    description:
      'Membandingkan 5 arsitektur Convolutional Neural Network — CNN Dasar, EfficientNet-B0, InceptionV3, MobileNetV2, dan ResNet50 — untuk mengklasifikasikan 9 kelas penyakit kulit dari 2.357 citra dermoskopi (dataset ISIC via Kaggle), lengkap dengan image preprocessing dan augmentasi data.',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Transfer Learning'],
    highlights: [
      { label: 'Kelas penyakit kulit', value: '9 kelas' },
      { label: 'Total citra dataset', value: '2.357' },
      { label: 'Model terpilih terbaik', value: 'MobileNetV2' },
    ],
    team: ['Adhisa Shilfadianis Iffadah', 'Gema Khusnul Ma\u2019rifah'],
    link: null,
  },
  {
    id: 'nyc-property-sales',
    title: 'Analisis Growth Revenue — NYC Property Sales',
    period: '2024',
    role: 'Proyek Individu — Data Analysis',
    description:
      'Melakukan prapemrosesan data mentah, penanganan missing value, dan eliminasi data anomali pada dataset NYC Property Sales. Eksplorasi data komprehensif untuk mengidentifikasi tren penjualan, fluktuasi harga pasar, serta faktor penentu nilai transaksi properti guna meningkatkan rata-rata pertumbuhan pendapatan.',
    tech: ['Python', 'EDA', 'Data Cleaning'],
    highlights: [],
    team: [],
    link: null,
  },
  {
    id: 'agen-cerdas-ai',
    title: 'Pengembangan Sistem Agen Cerdas Berbasis AI',
    period: '2024',
    role: 'Proyek Individu — Reinforcement Learning',
    description:
      'Merancang, menguji, dan memvalidasi program agen cerdas berbasis kecerdasan buatan menggunakan PyTorch. Skor performa sistem meningkat signifikan selama simulasi pelatihan.',
    tech: ['Python', 'PyTorch', 'Reinforcement Learning'],
    highlights: [
      { label: 'Skor awal pengujian', value: '1.310' },
      { label: 'Skor tertinggi saat pelatihan', value: '11.560' },
    ],
    team: [],
    link: null,
  },
  {
    id: 'segmentasi-os',
    title: 'Segmentasi Memori — Sistem Operasi',
    period: '2023',
    role: 'Tugas Mata Kuliah Sistem Operasi',
    description:
      'Simulasi skema segmentasi memori untuk mempelajari alokasi ruang alamat dan pemetaan memori pada sistem operasi.',
    tech: ['Python'],
    highlights: [],
    team: [],
    link: 'https://github.com/edelinnf/Mata-Kuliah-Sistem-Operasi',
  },
]

const ORGANIZATION = [
  {
    org: 'Himpunan Mahasiswa Sains Data',
    role: 'Anggota Komisi I — Badan Legislatif Jurusan',
    period: 'Mar 2024 — Jan 2025',
    points: [
      'Mengawasi program kerja dari 4 departemen aktif dan mengevaluasi akuntabilitas performa organisasi melalui KPI.',
      'Merumuskan ulang kebijakan internal untuk tata kelola himpunan yang lebih adaptif.',
    ],
  },
  {
    org: 'Himpunan Mahasiswa Sains Data',
    role: 'Ketua Departemen Advokasi dan Kesejahteraan Mahasiswa',
    period: 'Mar 2023 — Jan 2024',
    points: [
      'Berkoordinasi dengan 6 anggota departemen dalam eksekusi program kerja dan evaluasi bulanan kinerja tim.',
      'Menyelaraskan isu kesejahteraan mahasiswa lintas 4 jurusan bersama ketua dan wakil himpunan.',
    ],
  },
  {
    org: 'Himpunan Mahasiswa Sains Data',
    role: 'Anggota Departemen Advokasi dan Kesejahteraan Mahasiswa',
    period: 'Mar 2022 — Jan 2023',
    points: [
      'Dipercaya sebagai ketua pelaksana program kerja "Ngosa Kata".',
      'Menyalurkan aspirasi akademik mahasiswa Sains Data kepada pihak jurusan.',
    ],
  },
]

/* -------------------------------------------------------------------- */
/*  GALLERY — dokumentasi kegiatan kampus.                               */
/*  Cara pakai: taruh file foto di src/assets/gallery/, lalu di sini     */
/*  import fotonya di bagian atas file (lihat contoh import              */
/*  `profilePhoto` di atas), dan isi field `image` dengan nama variabel  */
/*  tersebut menggantikan `null`. Tambah/kurangi objek sesuai kebutuhan. */
/* -------------------------------------------------------------------- */

const GALLERY = [
  {
    id: 'gallery-1',
    image: gallery1,
    caption: 'Kunjungan ke International Office UPN "Veteran" Jawa Timur',
    detail: 'Delegasi mahasiswa berfoto bersama di depan International Office kampus.',
  },
  {
    id: 'gallery-2',
    image: gallery2,
    caption: 'Departemen Advokasi & Kesejahteraan Mahasiswa — HMSD',
    detail: 'Kebersamaan bersama tim advokasi Himpunan Mahasiswa Sains Data.',
  },
  {
    id: 'gallery-3',
    image: gallery3,
    caption: 'Wisuda — Fakultas Ilmu Komputer',
    detail: 'Momen kelulusan di depan gedung Fakultas Ilmu Komputer, UPN "Veteran" Jawa Timur.',
  },
  {
    id: 'gallery-4',
    image: gallery4,
    caption: 'Kegiatan di Lingkungan Kampus UPN "Veteran" Jawa Timur',
    detail: 'Dokumentasi keseharian sebagai mahasiswa Sains Data.',
  },
  {
    id: 'gallery-5',
    image: gallery5,
    caption: 'Kebersamaan bersama Rekan Organisasi',
    detail: 'Momen santai bersama teman-teman seperjuangan di luar jam kegiatan formal.',
  },
  {
    id: 'gallery-6',
    image: gallery6,
    caption: 'Kumpul Bersama HIMASADA',
    detail: 'Foto bersama pengurus dan anggota Himpunan Mahasiswa Sains Data (HIMASADA).',
  },
]

const SKILL_GROUPS = [
  {
    title: 'Bahasa & Basis Data',
    items: ['Python', 'SQL', 'MySQL', 'PostgreSQL', 'VSCode', 'Pentaho'],
  },
  {
    title: 'Machine Learning & Visualisasi',
    items: ['TensorFlow', 'Keras', 'Scikit-learn', 'Looker Studio', 'Power BI'],
  },
  {
    title: 'Kompetensi Analitis',
    items: ['Peramalan Deret Waktu', 'Klasifikasi', 'Klasterisasi', 'Pengolahan Data', 'Pengumpulan Data'],
  },
  {
    title: 'Nonteknis',
    items: ['Komunikasi', 'Kemampuan Beradaptasi', 'Kerja Sama Tim', 'Pemecahan Masalah'],
  },
]

const CERTIFICATES = [
  {
    title: 'Junior Web Programmer',
    org: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    year: '2025',
  },
  {
    title: 'Hak Cipta Program Komputer "PROPALYSIS"',
    org: 'Kementerian Hukum Republik Indonesia',
    year: '2025',
  },
  {
    title: 'Intensive Bootcamp (2 Minggu)',
    org: 'KarirNex',
    year: '2026',
  },
  {
    title: 'Bootcamp Data Analyst',
    org: 'SmartPath',
    year: '2024',
  },
  {
    title: 'Studi Independen Bersertifikat — Tech Academy',
    org: 'RevoU',
    year: '2023',
  },
]

const AWARDS = [
  {
    title: 'Project Capstone Kelompok Terbaik',
    org: 'RevoU Tech Academy — Data Analyst',
    year: '2023',
  },
  {
    title: 'Top Performer Mingguan',
    org: 'RevoU Tech Academy — Studi Independen',
    year: '2023',
  },
]

/* -------------------------------------------------------------------- */
/*  Cluster hero visual — signature element                              */
/*  Visualizes X-Means clustering: unlabeled points that converge into   */
/*  dynamically discovered clusters, echoing Edelin's own publication.   */
/* -------------------------------------------------------------------- */

const CLUSTER_COLORS = ['#5EEAD4', '#A78BFA', '#FBBF24']

function ClusterVisual() {
  const nodes = useMemo(() => {
    const centers = [
      { x: 90, y: 80 },
      { x: 230, y: 170 },
      { x: 120, y: 250 },
    ]
    return Array.from({ length: 27 }).map((_, i) => {
      const cluster = i % 3
      const center = centers[cluster]
      const angle = Math.random() * Math.PI * 2
      const radius = 18 + Math.random() * 34
      const scatterX = 40 + Math.random() * 260
      const scatterY = 30 + Math.random() * 300
      return {
        id: i,
        cluster,
        color: CLUSTER_COLORS[cluster],
        scatter: { x: scatterX, y: scatterY },
        settled: {
          x: center.x + Math.cos(angle) * radius,
          y: center.y + Math.sin(angle) * radius,
        },
        delay: 0.4 + Math.random() * 1.1,
        size: 3 + Math.random() * 3,
      }
    })
  }, [])

  return (
    <div className="relative h-[340px] w-full max-w-[340px] mx-auto lg:mx-0">
      <svg viewBox="0 0 320 340" className="h-full w-full overflow-visible">
        {nodes.map((n) => (
          <motion.circle
            key={n.id}
            cx={n.scatter.x}
            cy={n.scatter.y}
            r={n.size}
            fill={n.color}
            initial={{ opacity: 0, cx: n.scatter.x, cy: n.scatter.y }}
            animate={{
              opacity: 0.9,
              cx: [n.scatter.x, n.scatter.x, n.settled.x],
              cy: [n.scatter.y, n.scatter.y, n.settled.y],
            }}
            transition={{
              duration: 2.6,
              times: [0, 0.25, 1],
              delay: n.delay,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 3.4,
              repeatType: 'reverse',
            }}
            style={{ filter: `drop-shadow(0 0 6px ${n.color}aa)` }}
          />
        ))}
      </svg>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.75, 1] }}
        className="absolute bottom-1 right-2 font-mono text-[11px] text-muted tracking-wide"
      >
        k = 3 · X-Means
      </motion.span>
    </div>
  )
}

/* -------------------------------------------------------------------- */
/*  Reusable pieces                                                      */
/* -------------------------------------------------------------------- */

function SectionEyebrow({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-teal-accent">
      <Icon size={14} strokeWidth={2} />
      <span>{children}</span>
    </div>
  )
}

function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`glass rounded-2xl shadow-glass ${className}`}
    >
      {children}
    </motion.div>
  )
}

function TimelineItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className="relative pl-8 pb-10 last:pb-0 border-l border-white/10 last:border-transparent"
    >
      <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-ink-900 border-2 border-teal-accent" />
      <div className="glass rounded-xl p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <h3 className="font-display text-lg text-white">{item.company || item.org}</h3>
          <span className="font-mono text-xs text-muted">{item.period}</span>
        </div>
        <p className="text-sm text-teal-accent mb-3">{item.role}</p>
        {item.location && (
          <p className="flex items-center gap-1 text-xs text-muted mb-3">
            <MapPin size={12} /> {item.location}
          </p>
        )}
        <ul className="space-y-2">
          {item.points.map((p, i) => (
            <li key={i} className="text-sm leading-relaxed text-slate-300 flex gap-2">
              <span className="text-violet-accent mt-1.5">▸</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        {item.stats && (
          <div className="flex flex-wrap gap-3 mt-4">
            {item.stats.map((s, i) => (
              <div key={i} className="glass-strong rounded-lg px-3 py-2">
                <div className="font-mono text-sm text-white">{s.value}</div>
                <div className="text-[11px] text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className="glass rounded-2xl p-6 sm:p-7 flex flex-col h-full"
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
        <h3 className="font-display text-lg text-white max-w-md">{project.title}</h3>
        <span className="font-mono text-xs text-muted whitespace-nowrap">{project.period}</span>
      </div>
      <p className="text-sm text-teal-accent mb-3">{project.role}</p>
      <p className="text-sm text-slate-300 leading-relaxed mb-4">{project.description}</p>

      {project.highlights?.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {project.highlights.map((h, i) => (
            <div key={i} className="glass-strong rounded-lg px-3 py-2">
              <div className="font-mono text-sm text-white">{h.value}</div>
              <div className="text-[11px] text-muted">{h.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-xs rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>

      {project.team?.length > 0 && (
        <p className="text-xs text-muted mb-4">
          Bersama {project.team.join(', ')}
        </p>
      )}

      <div className="mt-auto pt-2">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-teal-accent hover:brightness-110 transition"
          >
            <Github size={14} /> Lihat repositori <ExternalLink size={12} />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
            Proposal penelitian — belum dipublikasikan secara publik
          </span>
        )}
      </div>
    </motion.div>
  )
}

function GalleryCard({ item, index, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl overflow-hidden text-left group cursor-pointer shrink-0 w-[78vw] sm:w-[320px] snap-start"
    >
      <div className="aspect-[4/3] w-full relative bg-white/5">
        {item.image ? (
          <img
            src={item.image}
            alt={item.caption}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted">
            <ImageOff size={28} strokeWidth={1.5} />
            <span className="font-mono text-[11px]">Foto belum ditambahkan</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <p className="text-sm text-white leading-snug">{item.caption}</p>
        <p className="text-xs text-muted mt-1">{item.detail}</p>
      </div>
    </motion.button>
  )
}

function GalleryLightbox({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-ink-950/85 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-2xl overflow-hidden max-w-lg w-full shadow-glass"
          >
            <div className="aspect-[4/3] w-full bg-white/5">
              {item.image ? (
                <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted">
                  <ImageOff size={32} strokeWidth={1.5} />
                  <span className="font-mono text-xs">Foto belum ditambahkan</span>
                </div>
              )}
            </div>
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white">{item.caption}</p>
                <p className="text-xs text-muted mt-1">{item.detail}</p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 rounded-full p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* -------------------------------------------------------------------- */
/*  App                                                                   */
/* -------------------------------------------------------------------- */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeGalleryItem, setActiveGalleryItem] = useState(null)
  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-ink-gradient text-slate-100 font-body selection:bg-teal-accent/30 relative overflow-x-hidden">
      {/* ambient gradient blobs */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute top-[-10%] left-[-10%] h-[420px] w-[420px] rounded-full bg-teal-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[460px] w-[460px] rounded-full bg-violet-accent/10 blur-[130px]" />
      </motion.div>

      {/* NAV */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <nav className="glass-strong w-full max-w-6xl rounded-full px-6 py-3 flex items-center justify-between gap-4 shadow-glass">
          <button
            onClick={() => scrollTo('top')}
            className="font-display font-semibold tracking-tight text-white shrink-0"
          >
            Edelin<span className="text-teal-accent">.</span>
          </button>
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-slate-300 hover:text-teal-accent transition-colors whitespace-nowrap"
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo('contact')}
            className="hidden lg:inline-flex items-center gap-1 rounded-full bg-teal-accent/15 border border-teal-accent/40 px-4 py-1.5 text-sm text-teal-accent hover:bg-teal-accent/25 transition-colors shrink-0 whitespace-nowrap"
          >
            Hubungi <ArrowUpRight size={14} />
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden text-slate-200"
            aria-label="Buka menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 inset-x-4 z-40 glass-strong rounded-2xl p-4 flex flex-col gap-1 lg:hidden"
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-left text-sm py-2 px-2 rounded-lg text-slate-200 hover:bg-white/5"
            >
              {l.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* HERO */}
      <section id="top" className="relative pt-40 pb-24 px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="font-mono text-sm text-teal-accent mb-4 tracking-wide">
              Data Analyst · Data Scientist
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-white">
              Mengubah data mentah
              <br /> menjadi{' '}
              <span className="text-gradient">keputusan yang tepat.</span>
            </h1>
            <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Lulusan Sains Data (IPK 3,73) dengan pengalaman mengumpulkan,
              mengolah, menganalisis, dan memvalidasi data melalui proyek
              akademik, penelitian, magang, dan survei lapangan. Terbiasa
              menggunakan Python, SQL, Looker Studio, dan Power BI, serta
              menerapkan{' '}
              <span className="text-teal-accent">X-Means Clustering</span>{' '}
              dan metode <span className="text-violet-accent">machine learning</span>{' '}
              lainnya untuk menghasilkan insight yang bisa ditindaklanjuti.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:edelinfortuna.work@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-teal-accent text-ink-950 font-medium px-5 py-2.5 text-sm hover:brightness-110 transition"
              >
                <Mail size={16} /> Hubungi Saya
              </a>
              <a
                href="https://www.linkedin.com/in/edelinfrtn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-slate-200 hover:border-teal-accent/50 transition"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/edelinnf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-slate-200 hover:border-teal-accent/50 transition"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col items-center lg:items-end gap-6"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal-accent/20 to-violet-accent/20 blur-xl" />
              <div className="glass-strong relative rounded-[1.75rem] p-2.5 shadow-glass">
                <img
                  src={profilePhoto}
                  alt="Foto Edelin Fortuna"
                  className="w-[220px] sm:w-[260px] aspect-[2/3] object-cover rounded-2xl"
                />
              </div>
            </div>
            <ClusterVisual />
          </motion.div>
        </div>
      </section>

      {/* ABOUT + EDUCATION */}
      <section id="about" className="px-6 sm:px-10 max-w-6xl mx-auto py-16">
        <SectionEyebrow icon={GraduationCap}>Tentang &amp; Pendidikan</SectionEyebrow>
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6">
          <GlassCard className="p-6 sm:p-8">
            <h2 className="font-display text-2xl text-white mb-3">
              Profil Singkat
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Terbiasa menggunakan Microsoft Excel, Python, SQL, Looker
              Studio, dan Power BI untuk mengolah data, menyusun dashboard,
              serta menyajikan informasi secara jelas dan terstruktur.
              Berpengalaman mengelola data lapangan hingga data kebencanaan,
              dari pembersihan dan validasi hingga pemodelan machine learning
              yang mendukung pengambilan keputusan. Memiliki kemampuan
              analitis, teliti dalam bekerja, mudah beradaptasi, serta mampu
              berkomunikasi dan bekerja sama dengan baik dalam tim maupun
              dengan berbagai pihak.
            </p>
          </GlassCard>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="font-display text-lg text-white mb-1">
              Universitas Pembangunan Nasional
              <br />
              "Veteran" Jawa Timur
            </h2>
            <p className="text-sm text-teal-accent mb-3">
              Sarjana Sains Data — Fakultas Ilmu Komputer
            </p>
            <p className="font-mono text-xs text-muted mb-4">
              Sep 2021 — Sep 2025 · Surabaya, Indonesia
            </p>
            <div className="glass-strong rounded-lg px-4 py-3 inline-block">
              <span className="font-mono text-2xl text-white">3,73</span>
              <span className="text-xs text-muted"> / 4,00 IPK</span>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="px-6 sm:px-10 max-w-4xl mx-auto py-16">
        <SectionEyebrow icon={Briefcase}>Pengalaman Kerja</SectionEyebrow>
        <div>
          {EXPERIENCE.map((item, i) => (
            <TimelineItem key={item.company} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* PROJECT */}
      <section id="project" className="px-6 sm:px-10 max-w-6xl mx-auto py-16">
        <SectionEyebrow icon={FolderKanban}>Proyek</SectionEyebrow>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* PUBLICATION */}
      <section id="publication" className="px-6 sm:px-10 max-w-6xl mx-auto py-16">
        <SectionEyebrow icon={BookOpen}>Publikasi Ilmiah</SectionEyebrow>
        <GlassCard className="p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet-accent/10 blur-3xl" />
          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <h3 className="font-display text-xl sm:text-2xl text-white max-w-2xl">
                X-Means Clustering Algorithm in Property Customer Payment
                Pattern
              </h3>
              <span className="font-mono text-xs text-muted whitespace-nowrap">
                Jan 2026
              </span>
            </div>
            <p className="text-sm text-teal-accent mb-4">
              Journal of Information Systems and Technology Research (JISTR)
            </p>
            <ul className="space-y-2 mb-6 max-w-3xl">
              <li className="text-sm text-slate-300 flex gap-2">
                <span className="text-violet-accent mt-1.5">▸</span>
                Segmentasi risiko dan pola perilaku pembayaran pelanggan
                properti melalui artikel hasil penelaahan sejawat.
              </li>
              <li className="text-sm text-slate-300 flex gap-2">
                <span className="text-violet-accent mt-1.5">▸</span>
                Model data tidak berlabel dengan X-Means Clustering untuk
                mengelompokkan karakteristik transaksi secara dinamis, tanpa
                menentukan nilai k awal.
              </li>
            </ul>
            <div className="glass-strong inline-flex items-center gap-3 rounded-xl px-5 py-3">
              <span className="font-mono text-2xl text-teal-accent">
                0,0243s
              </span>
              <span className="text-xs text-muted max-w-[160px] leading-snug">
                waktu komputasi model, jauh lebih efisien dari metode
                konvensional
              </span>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* ORGANIZATION */}
      <section id="organization" className="px-6 sm:px-10 max-w-4xl mx-auto py-16">
        <SectionEyebrow icon={Users}>Pengalaman Organisasi</SectionEyebrow>
        <div>
          {ORGANIZATION.map((item, i) => (
            <TimelineItem key={item.role} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="px-6 sm:px-10 max-w-6xl mx-auto py-16">
        <SectionEyebrow icon={Camera}>Dokumentasi Kegiatan Kampus</SectionEyebrow>
        <p className="text-sm text-slate-400 max-w-2xl mb-6 -mt-2">
          Momen dari organisasi, proyek kelompok, dan kegiatan kemahasiswaan selama masa kuliah.
        </p>
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 sm:-mx-10 sm:px-10 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(94,234,212,0.4)_transparent]">
          {GALLERY.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} onOpen={setActiveGalleryItem} />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted font-mono">
          ← geser untuk lihat foto lainnya →
        </p>
      </section>
      <GalleryLightbox item={activeGalleryItem} onClose={() => setActiveGalleryItem(null)} />

      {/* SKILLS */}
      <section id="skills" className="px-6 sm:px-10 max-w-6xl mx-auto py-16">
        <SectionEyebrow icon={Wrench}>Keahlian Teknis</SectionEyebrow>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-display text-base text-white mb-4">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CERTIFICATES + AWARDS */}
      <section id="awards" className="px-6 sm:px-10 max-w-6xl mx-auto py-16">
        <SectionEyebrow icon={Award}>Sertifikat &amp; Penghargaan</SectionEyebrow>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-sm text-muted uppercase tracking-wide mb-4">
              Sertifikat &amp; Pelatihan
            </h3>
            <div className="space-y-3">
              {CERTIFICATES.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="glass rounded-xl px-5 py-4 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm text-white leading-snug">{c.title}</p>
                    <p className="text-xs text-muted mt-0.5">{c.org}</p>
                  </div>
                  <span className="font-mono text-xs text-teal-accent whitespace-nowrap">
                    {c.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-sm text-muted uppercase tracking-wide mb-4">
              Penghargaan &amp; Pencapaian
            </h3>
            <div className="space-y-3">
              {AWARDS.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="glass-strong rounded-xl px-5 py-4 flex items-center justify-between gap-3 border-l-2 border-amber-accent"
                >
                  <div>
                    <p className="text-sm text-white leading-snug">{a.title}</p>
                    <p className="text-xs text-muted mt-0.5">{a.org}</p>
                  </div>
                  <span className="font-mono text-xs text-amber-accent whitespace-nowrap">
                    {a.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 sm:px-10 max-w-4xl mx-auto py-20">
        <GlassCard className="p-8 sm:p-12 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
            Mari <span className="text-gradient">berkolaborasi.</span>
          </h2>
          <p className="text-slate-300 max-w-lg mx-auto mb-8">
            Terbuka untuk peluang sebagai Data Analyst maupun Data Scientist.
            Silakan hubungi lewat kanal di bawah ini.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:edelinfortuna.work@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-teal-accent text-ink-950 font-medium px-6 py-3 text-sm hover:brightness-110 transition"
            >
              <Mail size={16} /> edelinfortuna.work@gmail.com
            </a>
            <a
              href="tel:+6282328282977"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm text-slate-200 hover:border-teal-accent/50 transition"
            >
              <Phone size={16} /> +62 823-2828-2977
            </a>
            <a
              href="https://www.linkedin.com/in/edelinfrtn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm text-slate-200 hover:border-teal-accent/50 transition"
            >
              <Linkedin size={16} /> edelinfrtn
            </a>
            <a
              href="https://github.com/edelinnf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm text-slate-200 hover:border-teal-accent/50 transition"
            >
              <Github size={16} /> edelinnf
            </a>
          </div>
        </GlassCard>
        <p className="text-center text-xs text-muted mt-10 font-mono">
          © {new Date().getFullYear()} Edelin Fortuna. Dibuat dengan React &amp; Framer Motion.
        </p>
      </section>
    </div>
  )
}

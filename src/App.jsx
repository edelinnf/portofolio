import React, { useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
} from 'lucide-react'

/* -------------------------------------------------------------------- */
/*  Data pulled from Edelin Fortuna's CV                                 */
/* -------------------------------------------------------------------- */

const NAV_LINKS = [
  { id: 'about', label: 'Tentang' },
  { id: 'experience', label: 'Pengalaman' },
  { id: 'publication', label: 'Publikasi' },
  { id: 'organization', label: 'Organisasi' },
  { id: 'skills', label: 'Keahlian' },
  { id: 'awards', label: 'Sertifikat' },
  { id: 'contact', label: 'Kontak' },
]

const EXPERIENCE = [
  {
    company: 'PT Cemerlang Statistika Indonesia (StatsMe!)',
    role: 'Enumerator Proyek — Dinas Kepemudaan, Olahraga & Pariwisata Kab. Sidoarjo',
    period: 'Jun — Jul 2026',
    location: 'Sidoarjo, Indonesia',
    points: [
      'Mengonversi hasil observasi lapangan dari 48 titik kunjungan pariwisata menjadi data terstruktur di Excel.',
      'Melakukan validasi dan pembersihan data harian untuk memastikan tidak ada duplikasi atau data responden yang tidak lengkap.',
      'Mengelola siklus pelaporan data setiap 3 hari untuk menjaga kelancaran database tim statistika pusat.',
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

const SKILL_GROUPS = [
  {
    title: 'Bahasa & Basis Data',
    items: ['Python', 'SQL', 'MySQL', 'PostgreSQL', 'VSCode'],
  },
  {
    title: 'Visualisasi Data',
    items: ['Looker Studio', 'Power BI'],
  },
  {
    title: 'Produktivitas',
    items: ['Microsoft Office', 'Google Workspace'],
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
    org: 'Kementerian Hukum Republik Indonesia — No. 000989617',
    year: 'Okt 2025',
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

/* -------------------------------------------------------------------- */
/*  App                                                                   */
/* -------------------------------------------------------------------- */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
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
        <nav className="glass-strong w-full max-w-4xl rounded-full px-5 py-3 flex items-center justify-between shadow-glass">
          <button
            onClick={() => scrollTo('top')}
            className="font-display font-semibold tracking-tight text-white"
          >
            Edelin<span className="text-teal-accent">.</span>
          </button>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-slate-300 hover:text-teal-accent transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:inline-flex items-center gap-1 rounded-full bg-teal-accent/15 border border-teal-accent/40 px-4 py-1.5 text-sm text-teal-accent hover:bg-teal-accent/25 transition-colors"
          >
            Hubungi <ArrowUpRight size={14} />
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-slate-200"
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
          className="fixed top-20 inset-x-4 z-40 glass-strong rounded-2xl p-4 flex flex-col gap-1 md:hidden"
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
              Lulusan Sains Data (IPK 3,73) dengan pengalaman sebagai analis
              data di instansi pemerintah dan rekam jejak publikasi ilmiah.
              Terbiasa mengolah data dengan Python &amp; SQL, membangun
              visualisasi di Looker Studio, dan menerapkan{' '}
              <span className="text-teal-accent">X-Means Clustering</span>{' '}
              untuk menghasilkan insight yang bisa ditindaklanjuti.
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          >
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
              Aktif dalam kepemimpinan organisasi kemahasiswaan dan pernah
              meraih penghargaan Best Group Capstone Project pada program
              Data Analytic. Berpengalaman mengelola data lapangan hingga
              data kebencanaan, dari pembersihan dan validasi hingga
              pemodelan yang mendukung pengambilan keputusan. Siap
              berkontribusi mengubah data menjadi informasi bernilai bagi
              organisasi.
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

      {/* SKILLS */}
      <section id="skills" className="px-6 sm:px-10 max-w-6xl mx-auto py-16">
        <SectionEyebrow icon={Wrench}>Keahlian Teknis</SectionEyebrow>
        <div className="grid sm:grid-cols-3 gap-5">
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
          </div>
        </GlassCard>
        <p className="text-center text-xs text-muted mt-10 font-mono">
          © {new Date().getFullYear()} Edelin Fortuna. Dibuat dengan React &amp; Framer Motion.
        </p>
      </section>
    </div>
  )
}

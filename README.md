# Website Pondok Pesantren Abu Bakar Ashiddiq

Demo halaman depan website pondok pesantren, strukturnya mengacu ke
referensi dqm.sch.id (navigasi, hero, program, berita, fasilitas,
PSB, FAQ, donasi, tombol WhatsApp melayang). Dibuat sebagai bahan
diskusi dengan kepala pondok. Per 2026-11-05 konten sudah diisi dari brosur resmi pondok + foto Cloudinary yang tersedia; bagian yang datanya belum ada ditandai "menyusul" (lihat Status Konten di bawah).

## Cara menjalankan di VS Code

1. Ekstrak zip ini, lalu buka foldernya di VS Code (`File → Open Folder`).
2. Cara termudah: klik kanan `index.html` → **Open with Live Server**
   (install extension "Live Server" dulu kalau belum ada).
3. Atau tanpa VS Code: klik dua kali `index.html` — langsung terbuka
   di browser (semua fitur tetap jalan, kecuali tombol unduh brosur
   di beberapa browser butuh dijalankan lewat Live Server).

## Struktur folder (multipage)

```
index.html          Beranda
profil.html         Profil pondok, visi-misi, pengasuh, legalitas
program.html        Program pondok dari brosur resmi (tahfidz boarding, unggulan, pembiasaan, fasilitas)
psb.html            Alur PSB, syarat, biaya, formulir minat
berita.html         Daftar berita & events (klik = detail modal)
galeri.html         Galeri foto + filter kategori
donasi.html         Program donasi, rekening, konfirmasi donasi
kontak.html         Alamat, peta, jam layanan, FAQ
css/style.css       Semua tampilan (warna, layout, responsif)
js/script.js        Semua interaksi (menu, slider, modal, form, dll.)
brosur/e-brochure.pdf   E-brochure contoh yang diunduh tombol hero
```

Navigasi antar halaman memakai link file biasa (`href="psb.html"`),
jadi semua halaman bisa dibuka tanpa server. Link menu yang sedang
aktif ditandai otomatis oleh `js/script.js`.

## Fitur yang sudah berjalan (bisa dites langsung)

- Navbar sticky + dropdown (Program, Berita, Tentang Kami)
- Menu hamburger di HP
- Marquee berjalan (akreditasi & sebaran alumni)
- Kartu program & berita → membuka jendela detail (modal)
- Slider testimoni (otomatis + tombol ‹ › + titik)
- Angka statistik menghitung naik saat di-scroll
- Accordion FAQ
- Formulir PSB: validasi (nama, WA diawali 08, program, jenjang),
  pesan sukses, dan tombol "Lanjutkan ke WhatsApp Panitia" yang
  membawa isi formulir ke chat WA
- Tombol "Salin Nomor Rekening" di bagian donasi
- Tombol "Lihat Biaya Investasi Pendidikan" (tabel contoh)
- Tombol WhatsApp melayang (membuka chat WA)
- Tombol "Unduh E-Brochure" (mengunduh PDF contoh)

## Daftar yang HARUS diganti dengan data asli

| Yang diganti | Lokasi |
|---|---|
| Nama pondok, tagline, alamat, telepon, email | `index.html` (topbar, logo, footer) |
| Nomor WA panitia | `index.html` (tombol WA melayang) dan `js/script.js` (bagian formulir PSB, cari `6281234567890`) |
| Foto (saat ini kotak placeholder) | `index.html` — ganti `<div class="foto-frame">…</div>` dengan `<img src="img/nama-foto.jpg" alt="…">`, simpan foto di folder `img/` |
| Program, berita, biaya, rekening | `index.html` + `js/script.js` (blok `DATA_PROGRAM`, `DATA_BERITA`, tabel biaya) — semuanya ditandai komentar `GANTI` |
| E-brochure | `brosur/e-brochure.pdf` — ganti dengan PDF asli pondok |
| Nama pengasuh, angka statistik, mitra, testimoni | `index.html` |

## Sebelum go-live (naik ke domain asli)

1. Ganti semua data contoh di atas.
2. Formulir PSB saat ini hanya front-end (tidak menyimpan ke mana-mana
   selain meneruskan ke WhatsApp). Kalau mau data tersimpan otomatis,
   hubungkan ke Google Form, WhatsApp API, atau backend.
3. Beli domain + hosting, lalu upload seluruh isi folder ini.
4. Tambahkan halaman-halaman lain (Profil lengkap, Program per jenjang,
   Berita detail) — kerangka halamannya sudah disiapkan di chat.

## Status Konten (per 2026-11-05)

Sudah diisi dari brosur resmi pondok (poster PSB 2027/2028, brosur lipat PSB
2026/2027, flyer Sedekah Jumat, brosur infaq pembangunan masjid — transkripsi
di `Referensi-Informasi-Pondok-Abu-Bakar.md`):

- Biaya PSB asli (pendaftaran Rp200.000; syariah Rp350.000/bulan), syarat
  berkas, alur pendaftaran, kontak panitia PSB (WA 0882-0042-8498, Admin
  Khaerul Umam, Sekretaris Jajang M Ikhsan, IG @pptqabubakarashiddiq)
- Program tahfidz 2 riwayat (Hafsh & Syu'bah), program unggulan, pembiasaan,
  program tahunan, ekstrakurikuler, fasilitas pondok & olahraga
- Visi, misi, tujuan pendidikan (4 pilar), profil pengajar bersanad/CTrQ
- Rekening donasi asli (BSI 7244333286 PTQ; BSI 7236281428 YYS; BRI
  444301011102539) + konfirmasi 0813-2323-4720
- Galeri: 3 foto asli via Cloudinary (gedung asrama, kamar santri, halaqah
  tahfidz) — daftar URL di `galeri-cloudinary.md`

Masih "menyusul" (belum ada data resmi — ditandai jelas di halaman terkait):

- Alamat lengkap pondok (brosur memuat dua alamat berbeda: Sukaresik vs
  Singaparna — menunggu konfirmasi pondok mana yang utama)
- Sejarah berdiri, nama pengasuh, data legalitas/akreditasi, berita kegiatan
- Foto kategori fasilitas & kegiatan lain (baru 3 foto yang ter-upload)

Update 2026-11-05 (brief terisi diterima dari pondok): alamat utama
TERKONFIRMASI Kp. Sukasenang RT.01/RW.03, Margamulya, Sukaresik; pimpinan
Asep Juhana, S.Pd.I; berdiri 2020; 50 santri & 4 pengajar; email
atep.juhana@gmail.com; WA utama website 0852-2324-6565 (Ustadz Asep Juhana,
menggantikan nomor poster); pendaftaran via
https://bit.ly/ppdb-abubakaradshiddiq-tasikmalaya periode 17 Okt–25 Jun;
target tahfidz 30 juz terkonfirmasi dari brief. Instagram di website memakai
versi brief @pondokpesantrenabubakarashidiq — materi resmi memuat 3 ejaan
berbeda (@pptqabubakarashiddiq di poster, @pptqabubakarashidiq di pengumuman),
menunggu konfirmasi pondok mana yang benar.

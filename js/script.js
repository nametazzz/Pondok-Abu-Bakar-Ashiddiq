/* ============================================================
   Semua interaksi halaman — tanpa library, tanpa backend.
   Tiap blok dijaga (cek elemen dulu) supaya halaman tetap jalan
   meski satu section dihapus saat edit.
   ============================================================ */

// ---------- 1. Menu mobile ----------
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => navMenu.classList.toggle("tampil"));
  // Tutup menu setelah klik link (khusus tampilan mobile)
  navMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navMenu.classList.remove("tampil"))
  );
}

// ---------- 2. Dropdown bisa diklik (perangkat sentuh) ----------
document.querySelectorAll(".drop-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const parent = btn.closest(".dropdown");
    document.querySelectorAll(".dropdown").forEach((d) => {
      if (d !== parent) d.classList.remove("buka");
    });
    parent.classList.toggle("buka");
  });
});
document.addEventListener("click", () =>
  document.querySelectorAll(".dropdown").forEach((d) => d.classList.remove("buka"))
);

// ---------- 3. Modal (program, berita, biaya) ----------
const backdrop = document.getElementById("modalBackdrop");
const modalJudul = document.getElementById("modalJudul");
const modalIsi = document.getElementById("modalIsi");

function bukaModal(judul, isiHTML) {
  if (!backdrop) return;
  modalJudul.textContent = judul;
  modalIsi.innerHTML = isiHTML;
  backdrop.classList.add("tampil");
}
function tutupModal() {
  if (backdrop) backdrop.classList.remove("tampil");
}
const modalClose = document.getElementById("modalClose");
if (modalClose) modalClose.addEventListener("click", tutupModal);
if (backdrop) backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) tutupModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") tutupModal();
});

// Data program — GANTI isi sesuai program pondok yang sebenarnya
const DATA_PROGRAM = {
  boarding: {
    judul: "Pesantren Islam Terpadu (Boarding)",
    isi: `<p><b>Jenjang:</b> SMP &amp; SMA — santri mukim penuh.</p>
      <p><b>Program unggulan:</b> Tahfidz intensif (target 30 juz), diniyah &amp; kitab kuning, bahasa Arab &amp; Inggris harian, pembinaan karakter 24 jam.</p>
      <p><b>Kegiatan harian:</b> shalat berjamaah, setoran hafalan, murajaah, olahraga, dan belajar malam terbimbing.</p>
      <p><a href="#pendaftaran" onclick="tutupModal()">Daftar program ini →</a></p>`,
  },
  fullday: {
    judul: "Sekolah Islam Terpadu (Full Day)",
    isi: `<p><b>Jenjang:</b> PAUD/TK, SD &amp; SMP — pulang-pergi (07.00–16.00).</p>
      <p><b>Program unggulan:</b> Tahfidz bertahap, kurikulum Merdeka terpadu nilai Islam, tahsin &amp; tahfidz harian, ekstrakurikuler pilihan.</p>
      <p><b>Cocok untuk:</b> keluarga yang ingin pendidikan Islam terpadu tanpa asrama.</p>
      <p><a href="#pendaftaran" onclick="tutupModal()">Daftar program ini →</a></p>`,
  },
  international: {
    judul: "International Islamic Boarding School",
    isi: `<p><b>Jenjang:</b> SMP — boarding dengan pengantar bilingual (Indonesia–Inggris).</p>
      <p><b>Program unggulan:</b> Tahfidz, persiapan studi luar negeri, pertukaran pelajar, dan kurikulum internasional pendamping.</p>
      <p><b>Syarat tambahan:</b> tes bahasa Inggris dasar saat observasi.</p>
      <p><a href="#pendaftaran" onclick="tutupModal()">Daftar program ini →</a></p>`,
  },
};
document.querySelectorAll("[data-program]").forEach((el) => {
  el.addEventListener("click", () => {
    const d = DATA_PROGRAM[el.dataset.program];
    if (d) bukaModal(d.judul, d.isi);
  });
});

// Data berita — GANTI dengan berita asli pondok
const DATA_BERITA = {
  wisuda: {
    judul: "Wisuda Tahfidz Angkatan XII",
    isi: `<p>Sebanyak 60 santri diwisuda setelah menyelesaikan hafalan 30 juz dengan predikat mutqin. Acara dihadiri orang tua santri, pengasuh, dan tokoh masyarakat.</p>
      <p>Dalam sambutannya, pengasuh berpesan agar hafalan dijaga dengan murajaah rutin dan diamalkan dalam kehidupan sehari-hari.</p>`,
  },
  festival: {
    judul: "Festival Anak Sholeh 2026",
    isi: `<p>Ajang tahunan yang mempertemukan ratusan peserta dari TK dan SD se-Kabupaten. Lomba yang digelar antara lain hafalan surat pendek, adzan, mewarnai kaligrafi, dan cerdas cermat Islam.</p>
      <p>Festival ini menjadi ajang silaturahmi antar lembaga sekaligus mengenalkan pondok kepada masyarakat luas.</p>`,
  },
  malaysia: {
    judul: "Kunjungan Studi ke Malaysia",
    isi: `<p>Pimpinan pondok melakukan kunjungan studi banding ke sejumlah lembaga pendidikan Islam di Malaysia untuk bertukar praktik pengelolaan pesantren, kurikulum tahfidz, dan pembinaan santri.</p>
      <p>Hasil kunjungan akan diterapkan pada program pembinaan santri tahun ajaran berikutnya.</p>`,
  },
};
document.querySelectorAll("[data-berita]").forEach((el) => {
  el.addEventListener("click", () => {
    const d = DATA_BERITA[el.dataset.berita];
    if (d) bukaModal(d.judul, d.isi);
  });
});

// ---------- 4. Slider testimoni ----------
const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const dotsWrap = document.getElementById("slideDots");
let slideIdx = 0;
let slideTimer = null;

function tampilSlide(i) {
  if (!track || slides.length === 0) return;
  slideIdx = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${slideIdx * 100}%)`;
  if (dotsWrap) {
    dotsWrap.querySelectorAll(".dot").forEach((d, j) =>
      d.classList.toggle("aktif", j === slideIdx)
    );
  }
}
if (track && slides.length > 0) {
  slides.forEach((_, j) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (j === 0 ? " aktif" : "");
    dot.setAttribute("aria-label", "Testimoni " + (j + 1));
    dot.addEventListener("click", () => {
      tampilSlide(j);
      restartSlideTimer();
    });
    dotsWrap.appendChild(dot);
  });
  const prev = document.getElementById("slidePrev");
  const next = document.getElementById("slideNext");
  if (prev) prev.addEventListener("click", () => { tampilSlide(slideIdx - 1); restartSlideTimer(); });
  if (next) next.addEventListener("click", () => { tampilSlide(slideIdx + 1); restartSlideTimer(); });
  function restartSlideTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => tampilSlide(slideIdx + 1), 6000);
  }
  restartSlideTimer();
}

// ---------- 5. FAQ accordion ----------
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const sedangBuka = item.classList.contains("buka");
    document.querySelectorAll(".faq-item").forEach((i) => {
      i.classList.remove("buka");
      i.querySelector(".faq-q span").textContent = "+";
    });
    if (!sedangBuka) {
      item.classList.add("buka");
      btn.querySelector("span").textContent = "−";
    }
  });
});

// ---------- 6. Angka statistik menghitung naik ----------
const counters = document.querySelectorAll(".stat-angka");
if ("IntersectionObserver" in window && counters.length > 0) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseInt(el.dataset.target, 10) || 0;
      const durasi = 1400;
      const mulai = performance.now();
      (function hitung(now) {
        const p = Math.min((now - mulai) / durasi, 1);
        el.textContent = Math.floor(target * p).toLocaleString("id-ID");
        if (p < 1) requestAnimationFrame(hitung);
      })(mulai);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => obs.observe(c));
}

// ---------- 7. Formulir PSB (validasi + pesan sukses + lanjut WA) ----------
const formPSB = document.getElementById("formPSB");
if (formPSB) {
  formPSB.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("fNama").value.trim();
    const wa = document.getElementById("fWA").value.trim();
    const program = document.getElementById("fProgram").value;
    const jenjang = document.getElementById("fJenjang").value;
    const err = document.getElementById("formError");
    const ok = document.getElementById("formSukses");

    if (!nama || !wa || !program || !jenjang) {
      err.textContent = "Mohon lengkapi semua kolom formulir.";
      ok.classList.remove("tampil");
      return;
    }
    if (!/^08\d{8,13}$/.test(wa)) {
      err.textContent = "Nomor WhatsApp harus diawali 08 dan 10–15 digit.";
      ok.classList.remove("tampil");
      return;
    }
    err.textContent = "";
    ok.classList.add("tampil");
    // GANTI nomor di bawah dengan nomor WA panitia yang sebenarnya
    const pesan = encodeURIComponent(
      `Assalamu'alaikum, saya ${nama}. Saya berminat mendaftarkan santri pada program ${program} jenjang ${jenjang}. Mohon info PSB selanjutnya.`
    );
    let lanjut = document.getElementById("waLanjut");
    if (!lanjut) {
      lanjut = document.createElement("a");
      lanjut.id = "waLanjut";
      lanjut.className = "btn btn-navy";
      lanjut.target = "_blank";
      lanjut.rel = "noopener";
      lanjut.textContent = "Lanjutkan ke WhatsApp Panitia →";
      ok.after(lanjut);
    }
    lanjut.href = `https://wa.me/6281234567890?text=${pesan}`;
    lanjut.style.display = "inline-block";
    lanjut.style.marginTop = "10px";
    formPSB.reset();
  });
}

// ---------- 8. Salin nomor rekening ----------
const salinInfo = document.getElementById("salinInfo");
document.querySelectorAll("[data-salin]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const el = document.getElementById(btn.dataset.salin);
    if (!el) return;
    const nomor = el.textContent.trim();
    try {
      await navigator.clipboard.writeText(nomor);
    } catch (_) {
      // Fallback browser lama
      const tmp = document.createElement("textarea");
      tmp.value = nomor;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      tmp.remove();
    }
    if (salinInfo) salinInfo.textContent = `✅ Nomor rekening ${nomor} berhasil disalin.`;
    btn.textContent = "Tersalin ✓";
    setTimeout(() => { btn.textContent = "Salin Nomor Rekening"; }, 2500);
  });
});

/* ============================================================
   BLOK MULTIPAGE (ditambahkan saat situs jadi multipage)
   ============================================================ */

// ---------- 9. Tandai link navigasi halaman yang sedang dibuka ----------
(function tandaiNavAktif() {
  const saatIni = (window.location.pathname.split("/").pop() || "index.html").split("?")[0];
  document.querySelectorAll(".nav-menu a").forEach((a) => {
    const tujuan = (a.getAttribute("href") || "").split("#")[0].split("/").pop();
    if (tujuan && tujuan === saatIni) a.classList.add("aktif");
  });
})();

// ---------- 10. Berita tambahan + buka modal dari hash URL ----------
// Contoh: berita.html#wisuda langsung membuka detail berita tersebut.
DATA_BERITA["psb-gelombang"] = {
  judul: "PSB Gelombang 2 Dibuka",
  isi: `<p>Pendaftaran santri baru gelombang kedua resmi dibuka dengan kuota terbatas per jenjang.
    Gelombang ini diperuntukkan bagi pendaftar yang belum sempat mengikuti gelombang pertama.</p>
    <p>Silakan isi formulir minat di halaman <a href="psb.html">Pendaftaran</a> atau hubungi panitia lewat WhatsApp.</p>`,
};
DATA_BERITA["haul"] = {
  judul: "Haul & Pengajian Akbar Tahunan",
  isi: `<p>Ribuan jamaah hadir dalam pengajian akbar dan doa bersama di masjid pondok.
    Acara ini juga menjadi ajang silaturahmi antara alumni, wali santri, dan masyarakat sekitar.</p>`,
};
DATA_BERITA["prestasi"] = {
  judul: "Santri Raih Juara MTQ Provinsi",
  isi: `<p>Dua santri membawa pulang juara pada Musabaqah Tilawatil Qur'an tingkat provinsi,
    masing-masing pada cabang tilawah dan tahfidz. Prestasi ini melanjutkan tradisi juara pondok
    pada ajang serupa tahun-tahun sebelumnya.</p>`,
};
(function bukaBeritaDariHash() {
  const kunci = (window.location.hash || "").replace("#", "");
  if (kunci && DATA_BERITA[kunci]) {
    const d = DATA_BERITA[kunci];
    bukaModal(d.judul, d.isi);
  }
})();

// ---------- 11. Filter galeri ----------
const filterBtns = document.querySelectorAll(".filter-btn");
const galeriItems = document.querySelectorAll(".galeri-item");
if (filterBtns.length > 0 && galeriItems.length > 0) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("aktif"));
      btn.classList.add("aktif");
      const f = btn.dataset.filter;
      galeriItems.forEach((item) => {
        item.classList.toggle("sembunyi", f !== "semua" && item.dataset.kategori !== f);
      });
    });
  });
}

// ---------- 12. Formulir konfirmasi donasi ----------
const formDonasi = document.getElementById("formDonasi");
if (formDonasi) {
  formDonasi.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("dNama").value.trim();
    const nominal = document.getElementById("dNominal").value.trim();
    const program = document.getElementById("dProgram").value;
    const err = document.getElementById("donasiError");
    const ok = document.getElementById("donasiSukses");
    if (!nama || !nominal || !program) {
      err.textContent = "Mohon lengkapi semua kolom.";
      ok.classList.remove("tampil");
      return;
    }
    if (parseInt(nominal, 10) <= 0) {
      err.textContent = "Nominal donasi harus lebih dari 0.";
      ok.classList.remove("tampil");
      return;
    }
    err.textContent = "";
    ok.classList.add("tampil");
    formDonasi.reset();
  });
}

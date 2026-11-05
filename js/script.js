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

// Data program — diisi dari brosur PSB resmi pondok (2026-11-03)
const DATA_PROGRAM = {
  boarding: {
    judul: "Tahfidz Al-Qur'an (Boarding) — SMP & SMA",
    isi: `<p><b>Jenjang:</b> SMP &amp; SMA — santri mukim penuh, ikhwan &amp; akhwat.</p>
      <p><b>Program unggulan:</b> Tahfidz Al-Qur'an dengan 2 riwayat (Hafsh &amp; Syu'bah) dibimbing pengajar bersanad bersertifikat CTrQ, Bahasa Arab Dasar, hafalan hadits pilihan, praktik ibadah yang benar, dan khotam (qiro'ah) Al-Qur'an rutin.</p>
      <p><b>Pembiasaan harian:</b> shalat jamaah tepat waktu, shalat sunnah, doa &amp; dzikir harian, dan adab Islami.</p>
      <p><a href="psb.html">Daftar program ini →</a></p>`,
  },
};
document.querySelectorAll("[data-program]").forEach((el) => {
  el.addEventListener("click", () => {
    const d = DATA_PROGRAM[el.dataset.program];
    if (d) bukaModal(d.judul, d.isi);
  });
});

// Data berita/pengumuman — hanya dari materi resmi pondok (brosur & flyer, 2026-11-03)
const DATA_BERITA = {
  psb: {
    judul: "PSB Tahun Ajaran 2027/2028 Dibuka",
    isi: `<p>Penerimaan santri baru Pondok Pesantren Abu Bakar Ashiddiq telah dibuka untuk Tahun Ajaran 2027/2028 (juga 2026/2027), jenjang SMP &amp; SMA — ikhwan &amp; akhwat.</p>
      <p><b>Biaya:</b> pendaftaran Rp200.000; syariah bulanan Rp350.000. Keunggulan: menghafal dengan 2 riwayat (Hafsh &amp; Syu'bah) bersama pengajar bersanad.</p>
      <p>Info &amp; pendaftaran: WhatsApp PSB 0882-0042-8498, Admin 0851-9851-0721, atau halaman <a href="psb.html">Pendaftaran</a>.</p>`,
  },
  "sedekah-jumat": {
    judul: "Sedekah Jumat — Rp25.000 untuk Santri Penghafal Qur'an",
    isi: `<p>"Sedekah untuk santri bukan sekadar memberi, tapi menitipkan doa dalam setiap hafalan mereka."</p>
      <p>Kirimkan infak terbaik melalui <b>BSI 7244333286</b> a.n. PTQ Abu Bakar Ash-Shiddiq. Konfirmasi transfer: 0813-2323-4720.</p>
      <p>Detail rekening lain ada di halaman <a href="donasi.html">Donasi</a>.</p>`,
  },
  "infaq-masjid": {
    judul: "Infaq Pembangunan Masjid Jami' Abu Bakar Ashiddiq",
    isi: `<p>Pondok menerima &amp; menyalurkan infaq/shodaqoh untuk pembangunan masjid, pendidikan/dakwah, dan sosial.</p>
      <p><b>BSI 7236281428</b> a.n. YYS Pondok Pesantren Abu Bakar • <b>BRI 444301011102539</b> a.n. Abu Bakar As Siddiq.</p>
      <p>Detail ada di halaman <a href="donasi.html">Donasi</a>.</p>`,
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
    // Nomor WA PSB dari poster resmi pondok (0882-0042-8498).
    const pesan = encodeURIComponent(
      `Assalamu'alaikum, saya ${nama}. Saya berminat mendaftarkan santri pada kategori ${program} jenjang ${jenjang}. Mohon info PSB selanjutnya.`
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
    lanjut.href = `https://wa.me/6288200428498?text=${pesan}`;
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
// Pengumuman lain ditambahkan setelah ada materi resmi dari pondok.
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

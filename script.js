/* === JAVASCRIPT LOGIKA KELULUSAN === */

// Database Peserta 
const dataPeserta = [
    { id: "001", nama: "Najwan Dzimar", lulus: true, nra: "K-26-001", nilai: 92 },
    { id: "002", nama: "Eriz", lulus: false, nra: "-", nilai: 65 },
    { id: "003", nama: "Alya", lulus: true, nra: "K-26-003", nilai: 88 }
];

// Inisialisasi DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const openingScreen = document.getElementById('openingScreen');
const searchScreen = document.getElementById('searchScreen');

const btnMulai = document.getElementById('btnMulai');
const btnLanjut = document.getElementById('btnLanjut');
const btnCek = document.getElementById('btnCek');

const inputKodeAkses = document.getElementById('kodeAkses'); // Tambahan elemen kode akses
const inputPeserta = document.getElementById('noPeserta');
const resultContainer = document.getElementById('resultContainer');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const bgMusic = document.getElementById('bgMusic');

// Navigasi Slide 1 ke Slide 2
btnMulai.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    openingScreen.classList.remove('hidden');
    
    // --> MUSIK KOPMA MULAI BERPUTAR DI SLIDE 2 <--
    bgMusic.play().catch(e => console.log("Audio terblokir:", e));
});

// Navigasi Slide 2 ke Slide 3 (Dengan Verifikasi Kode)
btnLanjut.addEventListener('click', () => {
    // Ambil input kode, hapus spasi di awal/akhir, dan jadikan huruf besar semua 
    const inputKode = inputKodeAkses.value.trim().toUpperCase();
    const kodeRahasia = "K0PM4 J4Y4"; // <-- KODE TELAH DIGANTI DI SINI

    if (inputKode === kodeRahasia) {
        // Jika kode benar, pindah layar
        openingScreen.classList.add('hidden');
        searchScreen.classList.remove('hidden');
        
        // Auto fokus ke input setelah layar berganti
        setTimeout(() => inputPeserta.focus(), 100);
    } else {
        // Jika kode salah
        alert("Kode akses salah atau kosong! Silakan periksa kembali atau hubungi panitia.");
    }
});

// Fungsi memicu Confetti (Hiasan 🎉)
function tembakConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0f4c81', '#f9a826', '#10b981']
    });
}

// Fungsi utama cek kelulusan
function cekKelulusan() {
    // Ambil input user dan ubah ke huruf kecil
    const query = inputPeserta.value.trim().toLowerCase();

    if (query === "") {
        alert("Harap masukkan Nama atau NPM terlebih dahulu!");
        return;
    }

    resultContainer.className = "result-box hidden"; 

    // Cari data
    const peserta = dataPeserta.find(p => 
        p.id.toLowerCase() === query || 
        p.nama.toLowerCase() === query
    );

    resultContainer.classList.remove('hidden');

    if (peserta) {
        if (peserta.lulus) {
            // SKENARIO LULUS
            tembakConfetti(); 
            resultContainer.classList.add('success');
            resultTitle.innerHTML = "🎉 SELAMAT! ANDA LULUS 🎉";
            
            resultMessage.innerHTML = `
                <p>Selamat, perjuanganmu membuahkan hasil! Kamu resmi bergabung menjadi keluarga besar KOPMA.</p>
                <ul class="data-list">
                    <li>Nama <span>${peserta.nama}</span></li>
                    <li>NPM / ID <span>${peserta.id}</span></li>
                    <li>NRA <span>${peserta.nra}</span></li>
                    <li>Nilai Akhir <span>${peserta.nilai}</span></li>
                </ul>
                <p style="margin-top:15px; font-size:0.9rem;">Segera bergabung ke dalam grup komunikasi resmi anggota baru di bawah ini:</p>
                <a href="https://chat.whatsapp.com/GantiDenganLinkAsli" target="_blank" class="btn-wa">Gabung Grup WhatsApp</a>
            `;
        } else {
            // SKENARIO GAGAL / TIDAK LULUS (Musik tetap berlanjut)
            resultContainer.classList.add('failed');
            resultTitle.innerHTML = "MOHON MAAF";
            
            resultMessage.innerHTML = `
                <p>Halo <b>${peserta.nama}</b>,</p>
                <p style="margin-top:10px;">Mohon maaf, berdasarkan rekapitulasi penilaian, kamu belum berhasil lolos pada seleksi kali ini (Nilai: <b>${peserta.nilai}</b>).</p>
                <p style="margin-top:10px;">Terima kasih atas partisipasimu. Jangan patah semangat, teruslah berkembang di luar sana!</p>
            `;
        }
    } else {
        // DATA TIDAK DITEMUKAN (Musik dimatikan sesuai aturan awal)
        bgMusic.pause();

        resultContainer.classList.add('not-found');
        resultTitle.innerHTML = "DATA TIDAK DITEMUKAN 🔍";
        resultMessage.innerHTML = `
            <p>Nama atau NPM/ID <b>"${inputPeserta.value}"</b> tidak terdaftar di sistem kami.</p>
            <p style="margin-top:10px; font-size:0.9rem;">Pastikan penulisan nama atau angka sudah benar (contoh: Najwan atau 001). Jika merasa ini kesalahan, hubungi panitia.</p>
        `;
    }
}

// Event Listeners
btnCek.addEventListener('click', cekKelulusan);
inputPeserta.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        cekKelulusan();
    }
});
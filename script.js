/* === JAVASCRIPT / LOGIKA === */

// Database dummy dengan Nama dan Status Kelulusan
const dataPeserta = [
    { id: "001", nama: "Najwan Dzimar", lulus: true },
    { id: "002", nama: "Asep Sunandar", lulus: true },
    { id: "003", nama: "Siti Aminah", lulus: false } // Contoh tidak lulus
];

// Inisialisasi Elemen DOM
const btnCek = document.getElementById('btnCek');
const inputPeserta = document.getElementById('noPeserta');
const resultContainer = document.getElementById('resultContainer');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const bgMusic = document.getElementById('bgMusic');

// Fungsi untuk mengeksekusi pengecekan
function cekKelulusan() {
    const noPesertaValue = inputPeserta.value.trim();

    // Validasi input kosong
    if (noPesertaValue === "") {
        alert("Harap masukkan nomor pendaftaran terlebih dahulu!");
        return;
    }

    // Memutar musik SAAT TOMBOL DIKLIK (Syarat mutlak dari browser)
    bgMusic.currentTime = 0; 
    bgMusic.play().catch(error => {
        console.warn("Autoplay diblokir oleh browser:", error);
    });

    // Reset class container hasil agar animasi bisa diulang
    resultContainer.className = "result-box"; 
    resultContainer.style.display = "block";

    // Mencari data peserta berdasarkan ID yang diinput
    const peserta = dataPeserta.find(p => p.id === noPesertaValue);

    if (peserta) {
        // Jika ID ditemukan di database
        if (peserta.lulus) {
            // Skenario Lulus
            resultContainer.classList.add('success');
            resultTitle.innerHTML = "SELAMAT! ANDA DINYATAKAN LULUS";
            resultMessage.innerHTML = `Selamat, <b>${peserta.nama}</b> (Nomor: ${peserta.id}) telah lulus seleksi dan resmi menjadi anggota KOPMA. Silakan pantau grup WhatsApp untuk informasi selanjutnya.`;
        } else {
            // Skenario Tidak Lulus
            resultContainer.classList.add('failed');
            resultTitle.innerHTML = "MOHON MAAF, ANDA TIDAK LULUS";
            resultMessage.innerHTML = `Mohon maaf <b>${peserta.nama}</b> (Nomor: ${peserta.id}), kamu belum berhasil lolos pada seleksi kali ini. Jangan patah semangat dan coba lagi di kesempatan berikutnya!`;
        }
    } else {
        // Jika ID tidak ada di database sama sekali
        resultContainer.classList.add('failed');
        resultTitle.innerHTML = "DATA TIDAK DITEMUKAN";
        resultMessage.innerHTML = `Nomor pendaftaran <b>${noPesertaValue}</b> tidak terdaftar dalam sistem kami. Harap periksa kembali nomor yang Anda masukkan.`;
    }
}

// Event Listener saat tombol diklik
btnCek.addEventListener('click', cekKelulusan);

// Fitur tambahan: Tekan "Enter" pada keyboard untuk mencari
inputPeserta.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        cekKelulusan();
    }
});
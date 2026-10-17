import React, { useState } from 'react';
import './PalindromeChecker.css';

export default function PalindromeChecker() {
    const [totalHarga, setTotalHarga] = useState('');
    const [namaPelanggan, setNamaPelanggan] = useState('');
    const [hasil, setHasil] = useState(null);

    const handleCekDanHitung = (e) => {
        e.preventDefault();

        const harga = parseFloat(totalHarga) || 0;
        const namaAsli = namaPelanggan.trim();

        // 1. Bersihkan nama (abaikan spasi dan huruf besar/kecil)
        const namaClean = namaAsli.toLowerCase().replace(/\s+/g, '');

        // 2. Cek apakah Palindrom (minimal 3 karakter)
        const namaReversed = namaClean.split('').reverse().join('');
        const isPalindrom = namaClean.length >= 3 && namaClean === namaReversed;

        // 3. Hitung karakter unik (tanpa spasi)
        const karakterUnikSet = new Set(namaClean.split(''));
        const jumlahKarakterUnik = karakterUnikSet.size;

        // 4. Ketentuan Logika Diskon:
        // - Jika Palindrom & minimal 3 karakter -> Diskon Spesial 25%
        // - Jika Bukan Palindrom -> Diskon 1% per karakter unik
        let persentaseDiskon = 0;
        if (isPalindrom) {
            persentaseDiskon = 25;
        } else {
            persentaseDiskon = jumlahKarakterUnik * 1;
        }

        // 5. Perhitungan Potongan & Harga Akhir
        const totalPotongan = harga * (persentaseDiskon / 100);
        const hargaAkhir = harga - totalPotongan;

        setHasil({
            isPalindrom,
            jumlahKarakterUnik,
            persentaseDiskon,
            totalPotongan,
            hargaAkhir,
        });
    };

    return (
        <div className="calculator-container">
            <h2>Program Diskon Palindrom Nama</h2>

            <form onSubmit={handleCekDanHitung} className="calculator-form">
                <div className="form-group">
                    <label>Total Harga Pembelian (Rp):</label>
                    <input
                        type="number"
                        value={totalHarga}
                        onChange={(e) => setTotalHarga(e.target.value)}
                        placeholder="Contoh: 200000"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Nama Pelanggan:</label>
                    <input
                        type="text"
                        value={namaPelanggan}
                        onChange={(e) => setNamaPelanggan(e.target.value)}
                        placeholder="Contoh: Madam / Kasur Rusak / Budi"
                        required
                    />
                </div>

                <button type="submit" className="btn-hitung">
                    Cek & Hitung
                </button>
            </form>

            {hasil && (
                <div className={`result-section ${hasil.isPalindrom ? 'palindrom' : 'non-palindrom'}`}>
                    <h3>Hasil Perhitungan:</h3>
                    <ul>
                        <li>
                            <strong>Status Nama:</strong>{' '}
                            <span className={`badge ${hasil.isPalindrom ? 'badge-success' : 'badge-info'}`}>
                                {hasil.isPalindrom ? 'Palindrom' : 'Bukan Palindrom'}
                            </span>
                        </li>
                        <li>
                            <strong>Jumlah Karakter Unik:</strong> {hasil.jumlahKarakterUnik} karakter
                        </li>
                        <li>
                            <strong>Persentase Diskon:</strong> {hasil.persentaseDiskon}%
                        </li>
                        <li>
                            <strong>Total Potongan Harga:</strong> Rp {hasil.totalPotongan.toLocaleString('id-ID')}
                        </li>
                        <li>
                            <strong>Harga Pembelian Setelah Diskon:</strong> Rp {hasil.hargaAkhir.toLocaleString('id-ID')}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
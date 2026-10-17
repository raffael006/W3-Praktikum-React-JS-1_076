import React, { useState } from 'react';
import './DiscountCalculator.css';

export default function DiscountCalculator() {
    const [totalHarga, setTotalHarga] = useState('');
    const [namaPelanggan, setNamaPelanggan] = useState('');
    const [hasil, setHasil] = useState(null);

    const handleHitungDiskon = (e) => {
        e.preventDefault();

        const harga = parseFloat(totalHarga) || 0;
        const nama = namaPelanggan.trim();

        // 1. Menghitung Jumlah Huruf Konsonan (A, E, I, O, U dan spasi diabaikan)
        const hurufKonsonanList = nama.match(/[^aeiou\s]/gi) || [];
        const jumlahKonsonan = hurufKonsonanList.length;

        // 2. Menghitung Jumlah Kata
        const kataList = nama === '' ? [] : nama.split(/\s+/);
        const jumlahKata = kataList.length;

        // 3. Ketentuan Logika Diskon:
        // - 2% per huruf konsonan
        let persentaseDiskon = jumlahKonsonan * 2;

        // - Bonus 5% jika lebih dari 2 kata
        if (jumlahKata > 2) {
            persentaseDiskon += 5;
        }

        // - Maksimal diskon 20%
        if (persentaseDiskon > 20) {
            persentaseDiskon = 20;
        }

        // 4. Hitung nominal potongan dan harga akhir
        const totalPotongan = harga * (persentaseDiskon / 100);
        const hargaAkhir = harga - totalPotongan;

        setHasil({
            jumlahKonsonan,
            jumlahKata,
            persentaseDiskon,
            totalPotongan,
            hargaAkhir,
        });
    };

    return (
        <div className="calculator-container">
            <h2>Program Diskon Huruf Konsonan</h2>

            <form onSubmit={handleHitungDiskon} className="calculator-form">
                <div className="form-group">
                    <label>Total Harga Pembelian (Rp):</label>
                    <input
                        type="number"
                        value={totalHarga}
                        onChange={(e) => setTotalHarga(e.target.value)}
                        placeholder="Contoh: 150000"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Nama Pelanggan:</label>
                    <input
                        type="text"
                        value={namaPelanggan}
                        onChange={(e) => setNamaPelanggan(e.target.value)}
                        placeholder="Contoh: Budi Santoso Pratama"
                        required
                    />
                </div>

                <button type="submit" className="btn-hitung">
                    Hitung Diskon
                </button>
            </form>

            {hasil && (
                <div className="result-section">
                    <h3>Hasil Perhitungan:</h3>
                    <ul>
                        <li><strong>Jumlah Huruf Konsonan:</strong> {hasil.jumlahKonsonan} karakter</li>
                        <li><strong>Jumlah Kata:</strong> {hasil.jumlahKata} kata</li>
                        <li><strong>Persentase Diskon:</strong> {hasil.persentaseDiskon}%</li>
                        <li><strong>Total Potongan Harga:</strong> Rp {hasil.totalPotongan.toLocaleString('id-ID')}</li>
                        <li><strong>Harga Pembelian Setelah Diskon:</strong> Rp {hasil.hargaAkhir.toLocaleString('id-ID')}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
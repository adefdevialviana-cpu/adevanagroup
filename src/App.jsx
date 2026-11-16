import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('bengkel');
  const [transactions, setTransactions] = useState({
    bengkel: [],
    kos: [],
    kebun: []
  });

  const [form, setForm] = useState({ keterangan: '', jumlah: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.keterangan || !form.jumlah) return;

    setTransactions({
      ...transactions,
      [activeTab]: [...transactions[activeTab], { ...form, id: Date.now() }]
    });

    setForm({ keterangan: '', jumlah: '' });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Adevana Group Financial App</h1>
      <p>Sistem Pencatatan Keuangan Terpadu</p>

      {/* Navigasi Tab */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('bengkel')}
          style={{ padding: '10px 15px', background: activeTab === 'bengkel' ? '#0070f3' : '#eee', color: activeTab === 'bengkel' ? '#fff' : '#000', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
        >
          Bengkel
        </button>
        <button 
          onClick={() => setActiveTab('kos')}
          style={{ padding: '10px 15px', background: activeTab === 'kos' ? '#0070f3' : '#eee', color: activeTab === 'kos' ? '#fff' : '#000', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
        >
          Kos
        </button>
        <button 
          onClick={() => setActiveTab('kebun')}
          style={{ padding: '10px 15px', background: activeTab === 'kebun' ? '#0070f3' : '#eee', color: activeTab === 'kebun' ? '#fff' : '#000', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
        >
          Kebun
        </button>
      </div>

      {/* Form Tambah Transaksi */}
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Tambah Transaksi - {activeTab.toUpperCase()}</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Keterangan (contoh: Ganti Oli / Bayar Sewa)" 
            value={form.keterangan}
            onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
            style={{ padding: '8px' }}
          />
          <input 
            type="number" 
            placeholder="Jumlah (Rp)" 
            value={form.jumlah}
            onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', background: '#28a745', color: '#white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
            Simpan Transaksi
          </button>
        </form>
      </div>

      {/* Daftar Transaksi */}
      <div>
        <h3>Riwayat Transaksi {activeTab.toUpperCase()}</h3>
        {transactions[activeTab].length === 0 ? (
          <p style={{ color: '#666' }}>Belum ada data transaksi.</p>
        ) : (
          <ul style={{ paddingLeft: '20px' }}>
            {transactions[activeTab].map((item) => (
              <li key={item.id} style={{ marginBottom: '8px' }}>
                {item.keterangan} - <strong>Rp {Number(item.jumlah).toLocaleString()}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

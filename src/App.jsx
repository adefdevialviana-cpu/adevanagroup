import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi koneksi Supabase (Gunakan URL & Anon Key dari project Supabase Anda)
const supabaseUrl = 'https://besxzqthfnmuhddujfmh.supabase.co';
const supabaseKey = 'sb_publishable_vMLB_JpfA22YN3s2l_fbSg_7VjxiMGA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Cek sesi login saat aplikasi pertama kali dibuka
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Mendengarkan perubahan status login (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fungsi untuk Login Admin/Owner
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
    setLoading(false);
  };

  // Fungsi Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // 1. JIKA BELUM LOGIN: Tampilkan Halaman Login
  if (!session) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', background: '#f4f6f9' }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#1e293b' }}>Login PantauUsaha</h2>
          <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', marginBottom: '20px' }}>Masukkan email dan sandi admin/owner yang terdaftar.</p>
          
          {errorMsg && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px' }}>{errorMsg}</div>}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#475569' }}>Email</label>
            <input 
              type="email" 
              placeholder="admin@adevanagroup.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#475569' }}>Sandi (Password)</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '10px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Memproses...' : 'Masuk (Login)'}
          </button>
        </form>
      </div>
    );
  }

  // 2. JIKA SUDAH LOGIN: Tampilkan Aplikasi Keuangan (Bengkel, Kos, Kebun)
  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '20px' }}>
        <div>
          <h1>Adevana Group Financial App</h1>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Login sebagai: <strong>{session.user.email}</strong></p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ padding: '8px 15px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
        >
          Keluar (Logout)
        </button>
      </div>

      {/* Konten Menu Utama & Pencatatan Transaksi Anda di sini */}
      <div>
        <p>Aplikasi siap mencatat transaksi Bengkel, Kos, dan Kebun atas nama akun yang sedang aktif.</p>
      </div>
    </div>
  );
}

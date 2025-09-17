'use client';
import React, { useState } from 'react';
import BackgroundAnimated from '@/components/BackgroundAnimated';
// Using Remix Icon classes instead of lucide-react
// Make sure to include Remix Icon CSS: https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css

// TypeScript interfaces
interface MutasiData {
  id: string;
  no: number;
  jenisMutasi: 'Promosi' | 'Rotasi' | 'Mutasi' | 'Demosi';
  status: 'Aktif' | 'Proses' | 'Selesai' | 'Pending';
  nama: string;
  nip: string;
  golongan: string;
  pendidikan: string;
  jabatanLama: string;
  unitKerjaLama: string;
  jabatanBaru: string;
  unitKerjaBaru: string;
  catatan: string;
  tanggalMutasi?: string;
}

interface TableProps {
  data: MutasiData[];
}

// Sample data
const sampleData: MutasiData[] = [
  {
    id: '1',
    no: 1,
    jenisMutasi: 'Promosi',
    status: 'Selesai',
    nama: 'Dr. Ahmad Wijaya, M.Si',
    nip: '196801051990031002',
    golongan: 'IV/b',
    pendidikan: 'S3 Administrasi Publik',
    jabatanLama: 'Kepala Bidang Perencanaan',
    unitKerjaLama: 'Dinas Pendidikan',
    jabatanBaru: 'Sekretaris Daerah',
    unitKerjaBaru: 'Pemerintah Kota',
    catatan: 'Berlaku mulai 1 Januari 2025',
    tanggalMutasi: '2025-01-01'
  },
  {
    id: '2',
    no: 2,
    jenisMutasi: 'Rotasi',
    status: 'Proses',
    nama: 'Siti Nurhaliza, S.Kom',
    nip: '198505152010032005',
    golongan: 'III/c',
    pendidikan: 'S1 Teknik Informatika',
    jabatanLama: 'Staff IT',
    unitKerjaLama: 'Dinas Komunikasi',
    jabatanBaru: 'Kepala Seksi Data',
    unitKerjaBaru: 'Dinas Kependudukan',
    catatan: 'Menunggu persetujuan BKPSDM',
    tanggalMutasi: '2025-02-15'
  },
  {
    id: '3',
    no: 3,
    jenisMutasi: 'Mutasi',
    status: 'Aktif',
    nama: 'Budi Santoso, S.H',
    nip: '197203101995121001',
    golongan: 'III/d',
    pendidikan: 'S1 Hukum',
    jabatanLama: 'Kepala Bagian Hukum',
    unitKerjaLama: 'Sekretariat Daerah',
    jabatanBaru: 'Kepala Sub Bagian Legal',
    unitKerjaBaru: 'Dinas Perhubungan',
    catatan: 'Efektif per 15 Februari 2025',
    tanggalMutasi: '2025-02-15'
  },
  {
    id: '4',
    no: 4,
    jenisMutasi: 'Promosi',
    status: 'Proses',
    nama: 'Maria Cristina, S.E',
    nip: '198912252012032008',
    golongan: 'III/a',
    pendidikan: 'S1 Ekonomi',
    jabatanLama: 'Staff Keuangan',
    unitKerjaLama: 'Dinas Sosial',
    jabatanBaru: 'Kepala Sub Bagian Keuangan',
    unitKerjaBaru: 'Dinas Kesehatan',
    catatan: 'Dalam tahap verifikasi dokumen',
    tanggalMutasi: '2025-03-01'
  },
  {
    id: '5',
    no: 5,
    jenisMutasi: 'Rotasi',
    status: 'Selesai',
    nama: 'Eko Prasetyo, S.T',
    nip: '198007081999031003',
    golongan: 'III/b',
    pendidikan: 'S1 Teknik Sipil',
    jabatanLama: 'Staff Teknik',
    unitKerjaLama: 'Dinas PU & Tata Ruang',
    jabatanBaru: 'Kepala Seksi Infrastruktur',
    unitKerjaBaru: 'Dinas Perumahan',
    catatan: 'Selesai per 10 Januari 2025',
    tanggalMutasi: '2025-01-10'
  }
];

// Status badge component
const StatusBadge: React.FC<{ status: MutasiData['status'] }> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Aktif':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
      case 'Proses':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'Selesai':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
      case 'Pending':
        return 'bg-gradient-to-r from-gray-500 to-slate-600 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
};

// Jenis Mutasi badge component
const JenisMutasiBadge: React.FC<{ jenis: MutasiData['jenisMutasi'] }> = ({ jenis }) => {
  const getJenisStyles = (jenis: string) => {
    switch (jenis) {
      case 'Promosi':
        return 'bg-gradient-to-r from-purple-500 to-pink-600 text-white';
      case 'Rotasi':
        return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white';
      case 'Mutasi':
        return 'bg-gradient-to-r from-red-500 to-rose-600 text-white';
      case 'Demosi':
        return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${getJenisStyles(jenis)}`}>
      {jenis}
    </span>
  );
};

// Golongan badge component
const GolonganBadge: React.FC<{ golongan: string }> = ({ golongan }) => {
  return (
    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
      {golongan}
    </span>
  );
};

// Main table component
const MutasiTable: React.FC<TableProps> = ({ data }) => {
  const [archivedItems, setArchivedItems] = useState<Set<string>>(new Set());

  const handleArchive = (id: string, nama: string) => {
    if (window.confirm(`Apakah Anda yakin ingin mengarsipkan data ${nama}?`)) {
      setArchivedItems(prev => new Set(prev).add(id));
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        {/* Footer Stats */}
        <div className="mt-6 mb-4 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl p-4 text-white border border-white/30">
              <div className="text-2xl font-bold drop-shadow-lg">{data.length}</div>
              <div className="text-sm text-white/80">Total Mutasi</div>
            </div>
            <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/20 backdrop-blur-sm rounded-xl p-4 text-white border border-green-400/30">
              <div className="text-2xl font-bold drop-shadow-lg">{data.filter(d => d.status === 'Selesai').length}</div>
              <div className="text-sm text-white/80">Selesai</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/20 backdrop-blur-sm rounded-xl p-4 text-white border border-yellow-400/30">
              <div className="text-2xl font-bold drop-shadow-lg">{data.filter(d => d.status === 'Proses').length}</div>
              <div className="text-sm text-white/80">Dalam Proses</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 text-white border border-purple-400/30">
              <div className="text-2xl font-bold drop-shadow-lg">{archivedItems.size}</div>
              <div className="text-sm text-white/80">Diarsipkan</div>
            </div>
          </div>
        </div>
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-xl rounded-t-2xl shadow-2xl border border-white/20">
            <div className="bg-gradient-to-r from-black/20 via-black/15 to-black/10 backdrop-blur-lg rounded-t-2xl px-8 py-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                    <i className="ri-file-text-line text-3xl text-white drop-shadow-lg"></i>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">Data Mutasi Pegawai</h1>
                    <p className="text-white/80 mt-1 drop-shadow">Sistem Informasi Kepegawaian - Dashboard Mutasi</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <i className="ri-calendar-line text-lg"></i>
                  <span className="text-sm font-medium">September 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/10 backdrop-blur-xl rounded-b-2xl shadow-2xl overflow-hidden border border-white/20 border-t-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead className="bg-gradient-to-r from-white/20 via-white/15 to-white/10 backdrop-blur-lg border-b border-white/20">
                  <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider border-r border-white/10">
                    No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider border-r border-white/10">
                    Jenis Mutasi
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider border-r border-white/10">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider border-r border-white/10">
                    Nama
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider border-r border-white/10">
                    NIP
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider border-r border-white/10">
                    Gol
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider border-r border-white/10">
                    Pendidikan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider border-r border-white/10">
                    Jabatan Lama / Unit Kerja Lama
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider border-r border-white/10">
                    Jabatan Baru / Unit Kerja Baru
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider border-r border-white/10">
                    Catatan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider">
                    Arsip
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-white/10">
                {data.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-white/20 backdrop-blur-sm transition-all duration-300 ${
                      index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'
                    } ${archivedItems.has(item.id) ? 'opacity-60 bg-white/5' : ''} border-b border-white/5`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap border-r border-white/10">
                      <div className="flex items-center justify-center">
                        <span className="text-2xl font-bold text-white drop-shadow-lg">
                          {item.no.toString().padStart(3, '0')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-white/10">
                      <JenisMutasiBadge jenis={item.jenisMutasi} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-white/10">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 border-r border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                            <i className="ri-user-line text-lg text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white drop-shadow">{item.nama}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-white/10">
                      <span className="font-mono text-sm text-white/80 bg-white/10 backdrop-blur-sm px-2 py-1 rounded border border-white/20">
                        {item.nip}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-white/10">
                      <GolonganBadge golongan={item.golongan} />
                    </td>
                    <td className="px-6 py-4 border-r border-white/10">
                      <div className="flex items-center space-x-2">
                        <i className="ri-graduation-cap-line text-lg text-white/70"></i>
                        <span className="text-sm text-white/90">{item.pendidikan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r border-white/10">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-white/90">{item.jabatanLama}</div>
                        <div className="flex items-center space-x-1">
                          <i className="ri-building-line text-xs text-white/60"></i>
                          <span className="text-xs text-white/70">{item.unitKerjaLama}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r border-white/10">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-white/90">{item.jabatanBaru}</div>
                        <div className="flex items-center space-x-1">
                          <i className="ri-building-line text-xs text-white/60"></i>
                          <span className="text-xs text-white/70">{item.unitKerjaBaru}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r border-white/10">
                      <div className="text-sm text-white/80 italic max-w-xs">
                        {item.catatan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleArchive(item.id, item.nama)}
                        disabled={archivedItems.has(item.id)}
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm border ${
                          archivedItems.has(item.id)
                            ? 'bg-green-500/20 text-green-100 cursor-not-allowed border-green-400/30'
                            : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-lg transform hover:-translate-y-0.5 border-white/30'
                        }`}
                      >
                        <i className={`${archivedItems.has(item.id) ? 'ri-check-line' : 'ri-archive-line'} text-base`}></i>
                        <span>{archivedItems.has(item.id) ? 'Diarsipkan' : 'Arsip'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <div className="relative">
      <BackgroundAnimated />
      <div className="relative z-10">
        <MutasiTable data={sampleData} />
      </div>
    </div>
  );
};

export default App;
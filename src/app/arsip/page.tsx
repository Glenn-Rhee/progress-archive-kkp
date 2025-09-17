"use client"
import React, { useState } from 'react';
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
    nama: 'Dr. Faizh Adi Anugerah, S.Kom.M.Kom',
    nip: '196801051990031002',
    golongan: 'IV/E',
    pendidikan: 'S3 Teknologi Informasi',
    jabatanLama: 'Kepala Bidang Perencanaan',
    unitKerjaLama: 'Dinas Pendidikan',
    jabatanBaru: 'Dirjen',
    unitKerjaBaru: 'Kementerian Kelautan Dan Perikanan',
    catatan: 'Berlaku mulai 1 Januari 2025',
    tanggalMutasi: '2025-01-01'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-xl border-b-4 border-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 rounded-t-2xl px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <i className="ri-file-text-line text-3xl text-white"></i>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Data Mutasi Pegawai</h1>
                  <p className="text-slate-300 mt-1">Arsip Informasi Kepegawaian - Dashboard Mutasi</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <i className="ri-calendar-line text-lg"></i>
                <span className="text-sm">September 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-white border-opacity-20">
                    No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-white border-opacity-20">
                    Jenis Mutasi
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-white border-opacity-20">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-white border-opacity-20">
                    Nama
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-white border-opacity-20">
                    NIP
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-white border-opacity-20">
                    Gol
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-white border-opacity-20">
                    Pendidikan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-white border-opacity-20">
                    Jabatan Lama / Unit Kerja Lama
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-white border-opacity-20">
                    Jabatan Baru / Unit Kerja Baru
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-white border-opacity-20">
                    Catatan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Arsip
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } ${archivedItems.has(item.id) ? 'opacity-60 bg-gray-100' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                      <div className="flex items-center justify-center">
                        <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                          {item.no.toString().padStart(3, '0')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                      <JenisMutasiBadge jenis={item.jenisMutasi} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <i className="ri-user-line text-lg text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{item.nama}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                      <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {item.nip}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                      <GolonganBadge golongan={item.golongan} />
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      <div className="flex items-center space-x-2">
                        <i className="ri-graduation-cap-line text-lg text-indigo-500"></i>
                        <span className="text-sm text-gray-700">{item.pendidikan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">{item.jabatanLama}</div>
                        <div className="flex items-center space-x-1">
                          <i className="ri-building-line text-xs text-gray-400"></i>
                          <span className="text-xs text-gray-500">{item.unitKerjaLama}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">{item.jabatanBaru}</div>
                        <div className="flex items-center space-x-1">
                          <i className="ri-building-line text-xs text-gray-400"></i>
                          <span className="text-xs text-gray-500">{item.unitKerjaBaru}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      <div className="text-sm text-gray-600 italic max-w-xs">
                        {item.catatan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleArchive(item.id, item.nama)}
                        disabled={archivedItems.has(item.id)}
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          archivedItems.has(item.id)
                            ? 'bg-green-100 text-green-800 cursor-not-allowed'
                            : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 hover:shadow-lg transform hover:-translate-y-0.5'
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

        {/* Footer Stats */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="text-2xl font-bold">{data.length}</div>
              <div className="text-sm opacity-90">Total Mutasi</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
              <div className="text-2xl font-bold">{data.filter(d => d.status === 'Selesai').length}</div>
              <div className="text-sm opacity-90">Selesai</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
              <div className="text-2xl font-bold">{data.filter(d => d.status === 'Proses').length}</div>
              <div className="text-sm opacity-90">Dalam Proses</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 text-white">
              <div className="text-2xl font-bold">{archivedItems.size}</div>
              <div className="text-sm opacity-90">Diarsipkan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return <MutasiTable data={sampleData} />;
};

export default App;
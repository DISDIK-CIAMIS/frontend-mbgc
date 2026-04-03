"use client";
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

export default function KelompokB3Chart({ data }) {
  // Data Dummy 27 Kecamatan di Kabupaten Ciamis
  const dummyCiamisData = [
    { kecamatan: "Ciamis", balita: 450, bumil: 120, busui: 95 },
    { kecamatan: "Cijeungjing", balita: 320, bumil: 85, busui: 70 },
    { kecamatan: "Cikoneng", balita: 310, bumil: 90, busui: 75 },
    { kecamatan: "Sadananya", balita: 210, bumil: 55, busui: 40 },
    { kecamatan: "Sindangkasih", balita: 290, bumil: 75, busui: 60 },
    { kecamatan: "Baregbeg", balita: 250, bumil: 65, busui: 50 },
    { kecamatan: "Cisaga", balita: 280, bumil: 70, busui: 55 },
    { kecamatan: "Kawali", balita: 340, bumil: 95, busui: 80 },
    { kecamatan: "Panawangan", balita: 360, bumil: 100, busui: 85 },
    { kecamatan: "Cipaku", balita: 300, bumil: 80, busui: 65 },
    { kecamatan: "Jatinagara", balita: 180, bumil: 45, busui: 35 },
    { kecamatan: "Rajadesa", balita: 315, bumil: 88, busui: 72 },
    { kecamatan: "Sukadana", balita: 195, bumil: 50, busui: 40 },
    { kecamatan: "Rancah", balita: 330, bumil: 92, busui: 78 },
    { kecamatan: "Tambaksari", balita: 150, bumil: 35, busui: 28 },
    { kecamatan: "Lakbok", balita: 370, bumil: 105, busui: 90 },
    { kecamatan: "Purwadadi", balita: 240, bumil: 60, busui: 52 },
    { kecamatan: "Banjarsari", balita: 410, bumil: 115, busui: 98 },
    { kecamatan: "Banjaranyar", balita: 220, bumil: 58, busui: 45 },
    { kecamatan: "Pamarican", balita: 350, bumil: 98, busui: 82 },
    { kecamatan: "Cidolog", balita: 140, bumil: 32, busui: 25 },
    { kecamatan: "Cimaragas", balita: 130, bumil: 30, busui: 22 },
    { kecamatan: "Panumbangan", balita: 325, bumil: 89, busui: 74 },
    { kecamatan: "Panjalu", balita: 295, bumil: 82, busui: 68 },
    { kecamatan: "Sukamantri", balita: 170, bumil: 42, busui: 33 },
    { kecamatan: "Cihaurbeuti", balita: 310, bumil: 85, busui: 70 },
    { kecamatan: "Sindangherang", balita: 160, bumil: 40, busui: 30 },
  ];

  // Mapping data (Menggunakan data props jika ada, jika tidak pakai dummy)
  const chartData = (data && data.length > 0) ? data.map(item => ({
    name: item.kecamatan,
    balita: item.balita || 0,
    bumil: item.bumil || 0,
    busui: item.busui || 0,
  })) : dummyCiamisData;

  return (
    <div className="bgc-white p30 bdrs12 mt30 shadow-sm" style={{ width: '100%', height: '600px' }}>
      <h4 className="mb30">Distribusi Balita, Bumil, & Busui per Kecamatan</h4>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart 
          data={chartData} 
          margin={{ top: 20, right: 10, left: 0, bottom: 120 }} 
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis 
            dataKey={data ? "name" : "kecamatan"} 
            axisLine={false} 
            tickLine={false}
            interval={0}
            angle={-45}
            textAnchor="end"
            tick={{ fill: '#666', fontSize: 10 }} // Ukuran font diperkecil karena ada 27 item
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: '#f7f7f7' }}
            contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }}
            labelStyle={{ 
              fontWeight: 'bold', 
              color: '#333', 
              marginBottom: '5px' 
            }}  
          />
          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
          
          {/* Bar Balita */}
          <Bar 
            name="Balita"
            dataKey="balita" 
            fill="#007bff" 
            radius={[4, 4, 0, 0]} 
          />
          
          {/* Bar Ibu Hamil */}
          <Bar 
            name="Ibu Hamil"
            dataKey="bumil" 
            fill="#e83e8c" 
            radius={[4, 4, 0, 0]} 
          />

          {/* Bar Ibu Menyusui */}
          <Bar 
            name="Ibu Menyusui"
            dataKey="busui" 
            fill="#6f42c1" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
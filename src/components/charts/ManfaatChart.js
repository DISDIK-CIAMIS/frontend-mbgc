"use client";
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function ManfaatChart({ data }) {
  // Map the nested JSON to a flat format for Recharts
  const chartData = data.map(item => ({
    name: item.kecamatan,
    total: item.totalPesertaDidik
  }));

  return (
    <div className="bgc-white p30 bdrs12 mt30 shadow-sm" style={{ width: '100%', height: '500px' }}>
      <h4 className="mb30">Distribusi Peserta Didik per Kecamatan</h4>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart 
          data={chartData} 
          // Increased bottom margin to account for rotated text
          margin={{ top: 5, right: 30, left: 20, bottom: 100 }} 
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            // CRITICAL CHANGES BELOW:
            interval={0}        // Forces every label to show
            angle={-45}         // Rotates text so they don't overlap
            textAnchor="end"    // Aligns the end of the text to the tick
            tick={{ fill: '#666', fontSize: 11 }}
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
            // This changes the "total: [number]" text color
            itemStyle={{ 
                color: '#000000', 
                fontWeight: 'bold',
                textTransform: 'capitalize' 
            }}
          />
          {/* Simplified Bar: Removed Cell mapping and applied #FBB945 directly */}
          <Bar 
            dataKey="total" 
            fill="#FBB945" 
            radius={[6, 6, 0, 0]} 
            barSize={30} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
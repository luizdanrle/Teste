import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ThermalChartProps {
  conductivity: number;
}

export const ThermalChart: React.FC<ThermalChartProps> = ({ conductivity }) => {
  // Comparison data
  const data = [
    { name: 'Padrão (Cinza)', value: 1.5 },
    { name: 'Prata (Comum)', value: 5.0 },
    { name: 'Alta Perf. (ZF-12)', value: conductivity },
  ];

  return (
    <div className="h-[200px] w-full mt-4">
      <p className="text-xs font-bold text-slate-400 uppercase mb-2 text-center">Comparativo de Condutividade Térmica (W/mK)</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} interval={0} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            cursor={{fill: 'transparent'}}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
             {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.name.includes('ZF-12') ? '#0284c7' : '#cbd5e1'} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
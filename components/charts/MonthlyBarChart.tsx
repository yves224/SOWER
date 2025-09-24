
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// This is a placeholder for a future feature. 
// The data would need to be aggregated from all transactions across multiple months.

const data = [
  { name: 'Jan', Revenus: 4000, Dépenses: 2400, Épargne: 1000 },
  { name: 'Fév', Revenus: 3000, Dépenses: 1398, Épargne: 1200 },
  { name: 'Mar', Revenus: 2000, Dépenses: 3800, Épargne: 800 },
  { name: 'Avr', Revenus: 2780, Dépenses: 3908, Épargne: 950 },
  { name: 'Mai', Revenus: 1890, Dépenses: 4800, Épargne: 1100 },
];

const MonthlyBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#8892b0" />
        <YAxis stroke="#8892b0" />
        <Tooltip
          contentStyle={{ backgroundColor: '#112240', border: '1px solid #233554', color: '#ccd6f6' }}
          cursor={{ fill: '#233554' }}
        />
        <Legend wrapperStyle={{ color: '#a8b2d1' }} />
        <Bar dataKey="Revenus" fill="#64ffda" />
        <Bar dataKey="Dépenses" fill="#ff79c6" />
        <Bar dataKey="Épargne" fill="#8be9fd" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;

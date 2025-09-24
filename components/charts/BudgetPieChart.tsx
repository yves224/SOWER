import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BudgetCategory } from '../../types';

interface BudgetPieChartProps {
  budget: Record<BudgetCategory, number>;
  spending: Record<BudgetCategory, number>;
}

const COLORS = {
  [BudgetCategory.Tithe]: '#10b981', // emerald-500
  [BudgetCategory.Needs]: '#3b82f6', // blue-500
  [BudgetCategory.LongTermSavings]: '#60a5fa', // blue-400
  [BudgetCategory.EmergencyFund]: '#93c5fd', // blue-300
  [BudgetCategory.Wants]: '#64748b', // slate-500
  [BudgetCategory.Offerings]: '#a78bfa', // violet-400
};


const BudgetPieChart: React.FC<BudgetPieChartProps> = ({ budget }) => {
  const data = Object.entries(budget)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = <T extends { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, index: number }>({ cx, cy, midAngle, innerRadius, outerRadius, percent }: T) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          innerRadius={40}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name as BudgetCategory] || '#8884d8'} stroke={COLORS[entry.name as BudgetCategory]} />
          ))}
        </Pie>
        <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem', color: '#f1f5f9', padding: '8px 12px' }}
            formatter={(value: number) => [value.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }), 'Alloué']}
            cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}
        />
        <Legend
          iconType="circle"
          // FIX: Replaced custom color with standard gray for consistency
          wrapperStyle={{ fontSize: '12px', color: '#6b7280' }}
          formatter={(value) => <span style={{ color: '#6b7280' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetPieChart;

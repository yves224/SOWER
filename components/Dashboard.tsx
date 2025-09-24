import React from 'react';
import { BudgetCategory, Transaction, TransactionType } from '../types';
import BudgetPieChart from './charts/BudgetPieChart';
import Card from './ui/Card';
import Button from './ui/Button';

interface DashboardProps {
  monthlyIncome: number;
  transactions: Transaction[];
  budget: Record<BudgetCategory, number>;
  spending: Record<BudgetCategory, number>;
  onAddTransactionClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ monthlyIncome, transactions, budget, spending, onAddTransactionClick }) => {
  const totalExpenses = transactions
    .filter(t => t.type === TransactionType.Expense)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalIncome = transactions
    .filter(t => t.type === TransactionType.Income)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(amount);
  };
  
  return (
    // FIX: Replaced bg-background with standard tailwind color
    <main className="flex-1 p-6 md:p-8 bg-gray-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        {/* FIX: Replaced text-text-primary with standard tailwind color */}
        <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
        <Button onClick={onAddTransactionClick}>
          Ajouter Transaction
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          {/* FIX: Replaced text-text-secondary with standard tailwind color */}
          <h3 className="text-sm font-medium text-gray-500 mb-1">Revenu Total (Mois)</h3>
          <p className="text-3xl font-bold text-green-500">{formatCurrency(totalIncome)}</p>
        </Card>
        <Card>
          {/* FIX: Replaced text-text-secondary with standard tailwind color */}
          <h3 className="text-sm font-medium text-gray-500 mb-1">Dépenses Totales (Mois)</h3>
          <p className="text-3xl font-bold text-red-500">{formatCurrency(totalExpenses)}</p>
        </Card>
        <Card>
          {/* FIX: Replaced text-text-secondary with standard tailwind color */}
          <h3 className="text-sm font-medium text-gray-500 mb-1">Solde Restant</h3>
          {/* FIX: Replaced text-primary with standard tailwind color */}
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-500'}`}>{formatCurrency(balance)}</p>
        </Card>
      </div>

      {/* Charts and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" title="Répartition du Budget">
            <div style={{ height: 300 }}>
                <BudgetPieChart budget={budget} spending={spending} />
            </div>
        </Card>
        <Card className="lg:col-span-2" title="Transactions Récentes">
            <div className="space-y-4">
            {recentTransactions.length > 0 ? (
                recentTransactions.map(t => (
                <div key={t.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50">
                    <div>
                        {/* FIX: Replaced text-text-primary/secondary with standard tailwind colors */}
                        <p className="font-semibold text-gray-800">{t.description}</p>
                        <p className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} - {t.category}</p>
                    </div>
                    {/* FIX: Replaced text-text-primary with standard tailwind color */}
                    <p className={`font-bold ${t.type === TransactionType.Income ? 'text-green-500' : 'text-gray-800'}`}>
                    {t.type === TransactionType.Income ? '+' : '-'} {formatCurrency(t.amount)}
                    </p>
                </div>
                ))
            ) : (
                <p className="text-gray-500 text-center py-8">Aucune transaction ce mois-ci.</p>
            )}
            </div>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;

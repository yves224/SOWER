import React, { useState, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SetupModal from './components/modals/SetupModal';
import AddTransactionModal from './components/modals/AddTransactionModal';
import { Transaction, View, BudgetCategory, TransactionType } from './types';

function App() {
  const [currentView, setView] = useState<View>(View.Dashboard);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const [monthlyIncome, setMonthlyIncome] = useLocalStorage<number | null>('monthlyIncome', null);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);

  const [isAddTransactionModalOpen, setAddTransactionModalOpen] = useState(false);

  const handleSetupComplete = (income: number) => {
    setMonthlyIncome(income);
    // Add initial income transaction for the month
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    
    addTransaction({
      date: firstDayOfMonth,
      type: TransactionType.Income,
      description: 'Revenu Mensuel',
      amount: income,
      category: 'Revenu',
      subCategory: 'Revenu',
    });
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: new Date().toISOString() + Math.random(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  };
  
  const budget = useMemo(() => {
    if (!monthlyIncome) {
      return {} as Record<BudgetCategory, number>;
    }
    return {
      [BudgetCategory.Tithe]: monthlyIncome * 0.10,
      [BudgetCategory.Needs]: monthlyIncome * 0.50,
      [BudgetCategory.LongTermSavings]: monthlyIncome * 0.20,
      [BudgetCategory.EmergencyFund]: monthlyIncome * 0.10,
      [BudgetCategory.Wants]: monthlyIncome * 0.10,
      [BudgetCategory.Offerings]: 0, // Offerings are voluntary, not a fixed percentage
    };
  }, [monthlyIncome]);

  const spending = useMemo(() => {
    const spendingByCategory: Record<string, number> = {};
    Object.values(BudgetCategory).forEach(cat => {
      spendingByCategory[cat] = 0;
    });

    transactions
      .filter(t => t.type === TransactionType.Expense)
      .forEach(t => {
        if (t.category in spendingByCategory) {
          spendingByCategory[t.category] += t.amount;
        } else {
          // Could handle uncategorized expenses here
        }
      });
    return spendingByCategory as Record<BudgetCategory, number>;
  }, [transactions]);
  
  const isSetupComplete = monthlyIncome !== null;

  return (
    // Replaced bg-background and text-text-primary with standard tailwind colors
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      {!isSetupComplete && <SetupModal onSetupComplete={handleSetupComplete} />}

      {isSetupComplete && (
        <>
          <Sidebar currentView={currentView} setView={setView} isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
             {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 bg-white border-b">
                <button onClick={() => setSidebarOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <h1 className="text-lg font-bold">SOWER</h1>
                <div className="w-6"></div>
            </header>
            
            {currentView === View.Dashboard && (
              <Dashboard 
                monthlyIncome={monthlyIncome}
                transactions={transactions}
                budget={budget}
                spending={spending}
                onAddTransactionClick={() => setAddTransactionModalOpen(true)}
              />
            )}
            {/* Future views go here */}
          </div>
          <AddTransactionModal 
            isOpen={isAddTransactionModalOpen} 
            onClose={() => setAddTransactionModalOpen(false)}
            onAddTransaction={addTransaction}
          />
        </>
      )}
    </div>
  );
}

export default App;

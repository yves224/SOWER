import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType, BudgetCategory, ExpenseSubCategory } from '../../types';
import Button from '../ui/Button';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onAddTransaction }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.Expense);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<BudgetCategory | string>('');
  const [subCategory, setSubCategory] = useState<ExpenseSubCategory | string>('');

  useEffect(() => {
    // Reset category when type changes
    setCategory('');
    setSubCategory('');
  }, [type]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Omit<Transaction, 'id'> = {
      date,
      type,
      description,
      amount: parseFloat(amount),
      category,
      subCategory,
    };
    onAddTransaction(newTransaction);
    // Reset form
    setType(TransactionType.Expense);
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setAmount('');
    setCategory('');
    setSubCategory('');
    onClose();
  };
  
  const expenseCategories = Object.values(BudgetCategory).filter(cat => cat !== BudgetCategory.Tithe && cat !== BudgetCategory.Offerings);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter une Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as TransactionType)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-600 focus:border-blue-600">
                {Object.values(TransactionType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-600 focus:border-blue-600" required />
            </div>
            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-600 focus:border-blue-600" placeholder="Ex: Courses au supermarché" required />
            </div>
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Montant (XOF)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-600 focus:border-blue-600" placeholder="Ex: 15000" required min="0" />
            </div>
            {/* Category */}
            {type === TransactionType.Expense && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Catégorie Budgétaire</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-600 focus:border-blue-600" required>
                    <option value="" disabled>Sélectionner...</option>
                    {expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                {/* Sub-Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Sous-catégorie</label>
                    <select value={subCategory} onChange={(e) => setSubCategory(e.target.value as ExpenseSubCategory)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-600 focus:border-blue-600" required>
                        <option value="" disabled>Sélectionner...</option>
                        {Object.values(ExpenseSubCategory).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                </div>
              </>
            )}
             {type === TransactionType.Income && (
                 <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-gray-500 mb-2">Catégorie</label>
                     <input type="text" value="Revenu Principal" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100" readOnly />
                 </div>
             )}
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;

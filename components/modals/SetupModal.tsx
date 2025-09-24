import React, { useState } from 'react';
import Button from '../ui/Button';

interface SetupModalProps {
  onSetupComplete: (monthlyIncome: number) => void;
}

const SetupModal: React.FC<SetupModalProps> = ({ onSetupComplete }) => {
  const [income, setIncome] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const incomeValue = parseFloat(income);
    if (!isNaN(incomeValue) && incomeValue > 0) {
      onSetupComplete(incomeValue);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mx-4">
        {/* FIX: Replaced custom theme colors with standard Tailwind classes */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenue sur SOWER !</h2>
        <p className="text-gray-500 mb-6">Pour commencer, veuillez entrer votre revenu mensuel net. Cela nous aidera à configurer votre budget initial.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-500 mb-2">
            Revenu Mensuel Net (XOF)
          </label>
          <input
            type="number"
            id="monthlyIncome"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            // FIX: Replaced custom theme colors with standard Tailwind classes
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-600 focus:border-blue-600"
            placeholder="Ex: 350000"
            required
            min="1"
          />
          <div className="mt-8 flex justify-end">
            <Button type="submit">
              Configurer le Budget
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupModal;

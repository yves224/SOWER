
export enum TransactionType {
  Income = 'Revenu',
  Expense = 'Dépense',
}

export enum BudgetCategory {
  Tithe = 'Dîme (10%)',
  Needs = 'Besoins (50%)',
  LongTermSavings = 'Épargne Long Terme (20%)',
  EmergencyFund = 'Fonds d\'Urgence (10%)',
  Wants = 'Loisirs (10%)',
  Offerings = 'Offrandes',
}

export enum ExpenseSubCategory {
  // Needs
  Alimentation = 'Alimentation',
  Logement = 'Logement',
  Transport = 'Transport',
  Sante = 'Santé',
  // Wants
  Loisirs = 'Loisirs',
  Shopping = 'Shopping',
  Abonnements = 'Abonnements',
  // Spiritual
  Dime = 'Dîme',
  Offrandes = 'Offrandes',
  // Savings
  Epargne = 'Épargne',
  FondsUrgence = 'Fonds d\'Urgence',
  // Other
  Autre = 'Autre'
}

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  description: string;
  amount: number;
  category: BudgetCategory | string;
  subCategory: ExpenseSubCategory | string;
}

export enum View {
  Dashboard = 'Tableau de Bord',
  // Future views can be added here
  // History = 'Historique',
  // Settings = 'Paramètres',
}

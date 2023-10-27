export interface Transaction {
      id?: string;
      relatedTransactionId?: string;
      relatedTransaction?: string;
      originAccountId?: string;
      destinationAccountId?: string;
      account?: string;
      accountId: string;
      categoryId?: string;
      date: Date;
      amount: number;
      description: string;
      type?: number
}
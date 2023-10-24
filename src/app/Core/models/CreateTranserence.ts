export interface CreateTransference {
    originAccountId: string;
    destinationAccountId: string;
    date: Date,
    amount: number;
}
export interface ExpenseItem {
    id?: number;
    description: string;
    netValue: number;
    vatRate: string;
    grossValue?: number;
}
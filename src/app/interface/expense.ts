import { ExpenseItem } from "./expense-item";
import { Vendor } from "./vendor";

export interface Expense {
    id?: number;
    expenseDate: Date;
    vendor: Vendor;
    expenseItems: ExpenseItem[];
    totalNetValue?: number;
    totalGrossValue?: number;
    currency: string;
    paymentType: string;
}
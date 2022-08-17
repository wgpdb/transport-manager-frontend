import { Expense } from "./expense";

export interface Vendor {
    id?: number;
    taxId: number;
    name: string;
    expenses?: Expense[];
}
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Expense } from '../interface/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private backendUrl: string = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.backendUrl}/expenses`);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.backendUrl}/expenses`, expense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.backendUrl}/expenses`, expense);
  }

  deleteExpense(expenseId: number): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/expenses/${expenseId}`)
  }
}
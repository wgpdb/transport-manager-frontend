import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Expense } from '../interface/expense';
import { Page } from '../interface/page';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private backendUrl: string = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getExpenses(page: number = 0, size: number = 10): Observable<Page<Expense[]>> {
    return this.http.get<Page<Expense[]>>(`${this.backendUrl}/expenses/p?page=${page}&size=${size}`);
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
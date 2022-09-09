import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Expense } from 'src/app/interface/expense';
import { ExpenseItem } from 'src/app/interface/expense-item';
import { Page } from 'src/app/interface/page';
import { ExpenseService } from 'src/app/service/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  expenses: Expense[] = [];
  expensesPage?: Page<Expense[]>;
  expenseToPreview?: Expense;
  expenseToUpdate?: Expense;
  expenseToDelete?: Expense;

  expenseFormGroup!: FormGroup;

  constructor(private expenseService: ExpenseService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listExpenses();

    const vendor = this.formBuilder.group({
      id: [],
      taxId: [],
      name: []
    });

    this.expenseFormGroup = this.formBuilder.group({
      id: '',
      expenseDate: '',
      vendor: vendor,
      expenseItems: this.formBuilder.array([]),
      currency: '',
      paymentType: ''
    });
  }

  get expenseItemForms() {
    return this.expenseFormGroup.get("expenseItems") as FormArray
  }

  addExpenseItemField() {
    const expenseItem = this.formBuilder.group({
      id: [],
      description: [],
      netValue: [],
      vatRate: []
    });
    this.expenseItemForms.push(expenseItem);
  }

  removeExpenseItemField(i: number) {
    this.expenseItemForms.removeAt(i);
  }

  listExpenses() {
    this.expenseService.getExpenses().subscribe(
      data => {
        this.expensesPage = data;
      }
    );
  }

  goToPage(page: number, size?: number): void {
    this.expenseService.getExpenses(page, size).subscribe(
      data => {
        this.expensesPage = data;
      }
    );
  }

  addExpense(): void {
    document.getElementById('add-expense-form')?.click();
    this.expenseService.addExpense(this.expenseFormGroup.value).subscribe(
      (response: Expense) => {
        console.log(response);        
        this.listExpenses();
        this.expenseFormGroup.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.expenseFormGroup.reset();
      }
    );
  }

  updateExpense(expense: Expense):void {
    document.getElementById('update-expense-form')?.click();
    this.expenseService.updateExpense(this.expenseFormGroup.value).subscribe(
      (response: Expense) => {
        console.log(response);
        this.listExpenses();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteExpense(expenseId: number | undefined): void {
    this.expenseService.deleteExpense(expenseId!).subscribe(
      (response: void) => {
        console.log(response);
        this.listExpenses();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onOpenModal(mode: string, expense?: Expense): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addExpenseModal');
    }
    if (mode === 'preview') {
      this.expenseToPreview = expense;
    }
    if (mode === 'update') {
      this.expenseToUpdate = expense;
      button.setAttribute('data-target', '#updateExpenseModal')
    }
    if (mode === 'delete') {
       this.expenseToDelete = expense;
       button.setAttribute('data-target', '#deleteExpenseModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
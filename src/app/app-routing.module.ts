import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './component/expense-list/expense-list.component';
import { TripListComponent } from './component/trip-list/trip-list.component';

const routes: Routes = [
  { path: 'trips', component: TripListComponent},
  { path: 'expenses', component: ExpenseListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [TripListComponent, ExpenseListComponent]
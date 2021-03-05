import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ExpensesListComponent } from './expenses-list/expenses-list.component'
const routes: Routes = [
  { path: 'list', component: ExpensesListComponent, data: { title: 'Expenses' } },
  { path: '', redirectTo: 'list' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyExpensesRoutingModule { }

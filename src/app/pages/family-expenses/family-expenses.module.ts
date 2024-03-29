import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FamilyExpensesRoutingModule } from './family-expenses-routing.module'
import { ExpensesListComponent } from './expenses-list/expenses-list.component'
import { SharedModule } from 'src/app/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AddExpenseComponent } from './add-expense/add-expense.component'
import { ViewExpenseComponent } from './view-expense/view-expense.component'

@NgModule({
  declarations: [ExpensesListComponent, AddExpenseComponent, ViewExpenseComponent],
  imports: [
    CommonModule,
    FamilyExpensesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ExpensesListComponent],
})
export class FamilyExpensesModule {}

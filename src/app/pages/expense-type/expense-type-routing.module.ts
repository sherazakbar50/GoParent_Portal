import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ExpenseTypeComponent } from './expense-type/expense-type.component'

const routes: Routes = [
  { path: '', component: ExpenseTypeComponent, data: { title: 'Expense Type' } },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseTypeRoutingModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ExpenseTypeRoutingModule } from './expense-type-routing.module'
import { ExpenseTypeComponent } from './expense-type/expense-type.component'
import { SharedModule } from 'src/app/shared.module'

@NgModule({
  declarations: [ExpenseTypeComponent],
  imports: [CommonModule, SharedModule, ExpenseTypeRoutingModule],
})
export class ExpenseTypeModule {}

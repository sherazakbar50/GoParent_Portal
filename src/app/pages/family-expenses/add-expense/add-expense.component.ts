import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FamilyExpensesService } from 'src/app/services/famil_expenses/family_expenses.service'

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private expensesService: FamilyExpensesService,
    private notification: NzNotificationService,
  ) {}
  expenseForm: FormGroup
  IsSubmitted: boolean = false
  ExpenseTypesList: any[]
  @Output() expenseSavedEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() expenseData: any
  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      Id: [0],
      Title: ['', Validators.required],
      Cost: ['', [Validators.min(1), Validators.required]],
      SharePercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      ExpenseTypeId: ['', Validators.required],
      Notes: [''],
    })
    this.expensesService.GetExpenseTypes().then(types => {
      this.ExpenseTypesList = types
    })

    if (this.expenseData) {
      this.expenseData.ExpenseTypeId = this.expenseData.ExpenseTypeId.toString()
      this.expenseForm.patchValue(this.expenseData)
    }
  }

  get FormControls() {
    return this.expenseForm.controls
  }

  async submitHandler() {
    this.IsSubmitted = true
    if (this.expenseForm.valid) {
      let model = this.expenseForm.value
      model.ExpenseTypeId = Number(model.ExpenseTypeId)

      let response = await this.expensesService.AddUpdateExpense(model)
      if (response) {
        this.notification.success('', 'Expense has been added successfully!')
        this.expenseSavedEvent.emit(true)
      } else {
        this.notification.error('', 'There is some error please try again later!')
      }
    }
  }
}

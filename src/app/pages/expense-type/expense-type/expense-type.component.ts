import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { AlertService } from 'src/app/services/alert-service/alert-service'
import { FamilyExpensesService } from 'src/app/services/famil_expenses/family_expenses.service'
import { FormsService } from 'src/app/services/shared/forms.service'

@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.scss'],
})
export class ExpenseTypeComponent implements OnInit {
  isVisible: boolean = false
  dataList: any[] = []
  form: FormGroup

  constructor(
    private _forms: FormsService,
    private _expenses: FamilyExpensesService,
    private _notify: NzNotificationService,
    private _alert: AlertService,
  ) {
    this.form = new FormGroup({
      Id: new FormControl(0),
      Name: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this._expenses.GetExpenseTypeList()
    this._expenses.getExpenseObserver$().subscribe(r => {
      if (r) {
        this.dataList = r
      }
    })
  }

  async onSubmit() {
    this._forms.markAllFieldsAsDirty(this.form)
    if (this.form.valid) {
      this.form.value.Id = this.form.value.Id ? this.form.value.Id : 0
      let r = await this._expenses.AddUdpateExpenseType(this.form.value)
      if (r) {
        this._expenses.GetExpenseTypeList()
        this._notify.success('', 'Record submitted successfully!')
        this.form.reset()
        this.isVisible = false
      }
    }
  }

  showModal() {
    this.isVisible = true
  }

  edit(data: any) {
    this.form.patchValue(data)
    this.isVisible = true
  }

  async delete(id: number) {
    this._alert.Delete('Are you sure you want to Delete this!', async cb => {
      if (cb.isConfirmed) {
        let r = await this._expenses.DeleteExpenseType(id)
        if (r) {
          this._expenses.GetExpenseTypeList()
          this._notify.success('', 'Record deleted successfully!')
        }
      }
    })
  }
}

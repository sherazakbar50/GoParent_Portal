import { Component, Input, OnInit } from '@angular/core'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FamilyExpensesService } from 'src/app/services/famil_expenses/family_expenses.service'
import { jwtAuthService } from 'src/app/services/jwt'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
})
export class ExpensesListComponent implements OnInit {
  @Input() caseId?: number = 0
  userRole: string

  constructor(
    private expensesService: FamilyExpensesService,
    private notification: NzNotificationService,
    private authService: jwtAuthService,
  ) {
    authService.getUserModel().then(r => {
      this.userRole = r.UserRole
    })
  }
  expensesData: any[]
  expenseData: any
  isVisible: boolean = false
  ExpenseViewModelVisible: boolean = false
  modalTitle: string = 'Add Expense'

  ngOnInit(): void {
    this.getExpensesData(this.caseId)
  }
  getExpensesData(caseId) {
    this.expensesService.GetFamilyExpenses(caseId).then(expenses => {
      if (expenses) {
        expenses.forEach(element => {
          element.FormattedStatus = this.expensesService.FormatExpenseStatus(element.ExpenseStatus)
        })
        this.expensesData = expenses
      }
    })
  }

  AddExpense() {
    this.expenseData = undefined
    this.isVisible = true
  }
  EditExpense(rowData) {
    this.expenseData = rowData
    this.isVisible = true
  }
  ViewExpense(expense) {
    this.expenseData = expense
    this.ExpenseViewModelVisible = true
  }
  handleExpenseModalCancel() {
    this.isVisible = false
  }
  handleExpenseViewModalCancel() {
    this.ExpenseViewModelVisible = false
  }
  async DeleteExpense(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    } as any).then(async result => {
      if (result && result.isConfirmed) {
        let response = await this.expensesService.DeleteExpense(id)
        if (response) {
          this.notification.success('', 'Expense has been deleted successfully!')
          this.getExpensesData(this.caseId)
        } else {
          this.notification.error('', 'There is some error please try again later!')
        }
      }
    })
  }

  expenseSavedCallBack() {
    this.isVisible = false
    this.getExpensesData(this.caseId)
  }
}

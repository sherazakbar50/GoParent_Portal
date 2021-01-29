import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  expenseForm: FormGroup
  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      Title: [''],
      Cost: [''],
      Notes: [''],
    })
  }

  submitHandler() {}
}

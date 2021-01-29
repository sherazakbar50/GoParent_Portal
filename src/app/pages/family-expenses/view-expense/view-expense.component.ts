import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.scss'],
})
export class ViewExpenseComponent implements OnInit {
  constructor() {}
  @Input() ExpenseData: any
  ngOnInit(): void {}
}

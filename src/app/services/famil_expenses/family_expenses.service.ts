import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { ApiHandler } from '../ApiHandler'

@Injectable({
  providedIn: 'root',
})
export class FamilyExpensesService extends ApiHandler {
  expenseTypesSub$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined)

  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient)
  }

  getExpenseObserver$() {
    return this.expenseTypesSub$.asObservable()
  }

  // Expense Types
  AddUdpateExpenseType(data: any) {
    return this.Post(data.Id, API_URL + API_ENDPOINTS.AddUdpateExpenseType, data)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }

  GetExpenseTypeList() {
    this.GetAll(API_URL + API_ENDPOINTS.GetExpenseTypeList)
      .pipe(map(x => x.ResponseData))
      .subscribe(s => {
        this.expenseTypesSub$.next(s)
      })
  }

  DeleteExpenseType(id: number) {
    return this.Delete(API_URL + API_ENDPOINTS.DeleteExpenseType, id)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }

  // End Expense Type

  GetFamilyExpenses(caseId) {
    return this.Get(caseId, API_URL + API_ENDPOINTS.GetFamilyExpenses)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }

  GetFamilyExpense(id) {
    return this.Get(id, API_URL + API_ENDPOINTS.GetFamilyExpense)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
  GetExpenseTypes() {
    return this.GetAll(API_URL + API_ENDPOINTS.GetExpenseTypes)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }

  DeleteExpense(id) {
    return this.Post(id, API_URL + API_ENDPOINTS.DeleteExpense, undefined)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }

  AddUpdateExpense(model: any) {
    return this.Post(undefined, API_URL + API_ENDPOINTS.AddUpdateExpense, model)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }

  UpdateExpenseStatus(id, status) {
    return this.Post(id, `${API_URL + API_ENDPOINTS.UpdateExpenseStatus}`, undefined)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }

  FormatExpenseStatus(status) {
    return status == 1
      ? '<span class="badge badge-danger">Open</span>'
      : '<span class="badge badge-success">Paid</span>'
  }
}

import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Injectable({ providedIn: 'root' })
export class FormsService {
  constructor() {}

  markAllFieldsAsDirty(form: FormGroup) {
    for (const key in form.controls) {
      form.controls[key].markAsDirty()
      form.controls[key].updateValueAndValidity()
    }
  }
}

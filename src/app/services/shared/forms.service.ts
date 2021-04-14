import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Injectable({ providedIn: 'root' })
export class FormsService {
  constructor() { }

  markAllFieldsAsDirty(form: FormGroup) {
    for (const key in form.controls) {
      form.controls[key].markAsDirty()
      form.controls[key].updateValueAndValidity()
    }
  }

  disableControls(form: FormGroup) {
    for (const key in form.controls) {
      form.controls[key].disable()
    }
  }
  enableControls(form: FormGroup) {
    for (const key in form.controls) {
      form.controls[key].enable()
    }
  }

  localDate(date: string | any): Date {
    const utcDate = new Date(date);
    const myLocalDate = new Date(Date.UTC(
      utcDate.getFullYear(),
      utcDate.getMonth(),
      utcDate.getDate(),
      utcDate.getHours(),
      utcDate.getMinutes()
    ));

    return myLocalDate;
  }
}

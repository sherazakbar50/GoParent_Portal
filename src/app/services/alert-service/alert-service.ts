import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare var require
const Swal = require('sweetalert2')

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  topAlertMessageSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  Delete(title:string = "Are you sure you want to delete this?",callback:any,text:string="You won't be able to revert this!",type:string="warning",confirmBtnText:string="Yes, delete it!"){
    Swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmBtnText,
        }).then(callback);
      
  }
}

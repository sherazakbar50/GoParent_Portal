import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CustodyDto } from 'src/app/models/CustodyDto'
import { DATA_FORMATS } from 'src/app/models/Global'
import { jwtAuthService } from 'src/app/services/jwt'

@Component({
  selector: 'app-view-custody',
  templateUrl: './view-custody.component.html',
  styleUrls: ['./view-custody.component.scss'],
})
export class ViewCustodyComponent implements OnInit {
  @Input() custodySub: CustodyDto
  custody: any
  userRole: string = ''
  @Output() edit = new EventEmitter<boolean>()
  @Output() delete = new EventEmitter<boolean>()
  dateFormat: string = DATA_FORMATS.Date
  constructor(private _auth: jwtAuthService) {
    this._auth.getUserModel().then(r => {
      this.userRole = r?.UserRole
    })
  }

  ngOnInit(): void {

    if (this.custodySub) {
      // console.log('this.custodySub:', this.custodySub)
      this.custody = this.custodySub
      // this.custodySub.subscribe(res => {
      //   console.log(res);

      // if (res) this.custody = res
      // })
    }
  }


  editCustody() {
    this.edit.next(true)
  }

  deleteCustody() {
    this.delete.next(true)
  }
}

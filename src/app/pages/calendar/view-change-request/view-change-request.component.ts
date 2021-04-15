import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustodyRequestStatusEnum } from 'src/app/models/RequestDTO';
import { jwtAuthService } from 'src/app/services/jwt';

@Component({
  selector: 'app-view-change-request',
  templateUrl: './view-change-request.component.html',
  styleUrls: ['./view-change-request.component.scss']
})
export class ViewChangeRequestComponent implements OnInit {

  @Input() Data: any
  @Output() onBack: EventEmitter<boolean> = new EventEmitter<boolean>()
  statusEnum = CustodyRequestStatusEnum
  userRole: any;

  constructor(
    private _auth: jwtAuthService,
  ) {
    this._auth.getUserModel().then(r => {
      this.userRole = r?.UserRole
    })
  }

  ngOnInit(): void {

  }

  backToList() {
    this.onBack.emit(true)
  }
}

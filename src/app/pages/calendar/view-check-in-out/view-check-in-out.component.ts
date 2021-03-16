import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckInOutDTO } from 'src/app/models/CheckInOutDTO';
import { jwtAuthService } from 'src/app/services/jwt';

@Component({
  selector: 'app-view-check-in-out',
  templateUrl: './view-check-in-out.component.html',
  styleUrls: ['./view-check-in-out.component.scss']
})
export class ViewCheckInOutComponent implements OnInit {

  @Input() Data: CheckInOutDTO
  @Output() onBack: EventEmitter<boolean> = new EventEmitter<boolean>()
  userRole: string;
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

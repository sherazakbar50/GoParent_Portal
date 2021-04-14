import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as UserActions from 'src/app/store/user/actions'
import * as Reducers from 'src/app/store/reducers'
import { jwtAuthService } from 'src/app/services/jwt'
import { Router } from '@angular/router'
import { UserSessionModel } from 'src/app/models/UserSessionModel'

@Component({
  selector: 'cui-topbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class TopbarUserMenuComponent implements OnInit {
  badgeCount: number = 7
  name: string = ''
  role: string = ''
  email: string = ''
  phone: string = ''
  userData: UserSessionModel;
  ProfilePic: string;
  constructor(private authService: jwtAuthService, private router: Router) {
  }
  async ngOnInit() {
    this.authService.getProfilePic().subscribe(res => {
      this.ProfilePic = res;
    })
  }

  badgeCountIncrease() {
    this.badgeCount = this.badgeCount + 1
  }

  logout() {
    this.authService.logoutUnAuthorizedUser()
  }
}

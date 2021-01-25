import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as UserActions from 'src/app/store/user/actions'
import * as Reducers from 'src/app/store/reducers'
import { jwtAuthService } from 'src/app/services/jwt'
import { Router } from '@angular/router'

@Component({
  selector: 'cui-topbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class TopbarUserMenuComponent {
  badgeCount: number = 7
  name: string = ''
  role: string = ''
  email: string = ''
  phone: string = ''

  constructor(private authService: jwtAuthService, private router: Router) {}

  badgeCountIncrease() {
    this.badgeCount = this.badgeCount + 1
  }

  logout() {
    this.authService.logoutUnAuthorizedUser()
    this.router.navigate(['auth', 'login'])
  }
}

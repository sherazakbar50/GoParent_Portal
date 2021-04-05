import { ThrowStmt } from '@angular/compiler'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { ApplicationRolesEnum } from 'src/app/models/UserSessionModel'
import { jwtAuthService } from 'src/app/services/jwt'
import { getMenuData } from 'src/app/services/menu/config'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authorized: boolean
  role: string
  roleEnum = ApplicationRolesEnum
  menuData = getMenuData

  constructor(private authorize: jwtAuthService, public router: Router) {

  }

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.handleAuthorization(this.authorize.isAuthenticated(), state)
  }

  private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
    if (!isAuthenticated) {
      this.router.navigate(['/auth/login'], {
        queryParams: {
          ['returnUrl']: state.url,
        },
      })
    }
    return isAuthenticated;
  }
}

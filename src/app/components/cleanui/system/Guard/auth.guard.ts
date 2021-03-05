import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { jwtAuthService } from 'src/app/services/jwt'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authorized: boolean
  role: string

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
    return isAuthenticated
  }
}

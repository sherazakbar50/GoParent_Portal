import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import { jwtAuthService } from 'src/app/services/jwt'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authorized: boolean

  constructor(private authorize: jwtAuthService, public router: Router) {}

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

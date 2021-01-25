import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { jwtAuthService } from 'src/app/services/jwt/index'
import { catchError, finalize, mergeMap } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(private authorize: jwtAuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = this.authorize.getAccessToken()
    return this.processRequestWithToken(accessToken, req, next).pipe(
      finalize(() => {}),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = ''
        if (error.error instanceof ErrorEvent) {
          console.log('CLIENT Side Error')
          errorMsg = `Error: ${error.error.message}`
          // this.alert.error(errorMsg)
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`
          // this.alert.error(errorMsg)
          if (error.status === 401) {
            this.authorize.logoutUnAuthorizedUser()
            this.router.navigate(['/auth/login'])
          }
        }
        console.log(errorMsg)
        return throwError(errorMsg)
      }),
    )
  }

  // Checks if there is an access_token available in the authorize service
  // and adds it to the request in case it's targeted at the same origin as the
  // single page application.
  private processRequestWithToken(token: string, req: HttpRequest<any>, next: HttpHandler) {
    if (!!token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    }

    return next.handle(req)
  }
}

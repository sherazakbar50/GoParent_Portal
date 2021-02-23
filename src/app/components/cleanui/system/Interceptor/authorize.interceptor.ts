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
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import {AppInjector} from 'src/app/services/app-injector';

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
        
        let errorMsg = '', notifier = AppInjector.get(NzNotificationService);

        if (error.error instanceof ErrorEvent) {
             console.log('CLIENT Side Error')
             errorMsg = `Error: ${error.error.message}`
        } 
        else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}, Possible Reason: ${error.error && error.error["Error"] || "Unknown"}`
          if (error.status === 401) {
            this.authorize.logoutUnAuthorizedUser()
            this.router.navigate(['/auth/login'])
            notifier.warning('',"Your session has been expired. Please sign in again.")
          }
        }
        
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

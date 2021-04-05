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
export class PermissionGuard implements CanActivate {
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
        let isAuthenticated;
        return this.authorize.getUserModel().then(r => {
            this.role = r.UserRole
            this.menuData.forEach(e => {
                if (e.url && state.url == e.url) {
                    if (e.roles && e.roles.includes(this.role)) {
                        isAuthenticated = true
                    } else if (!e.roles) {
                        isAuthenticated = true
                    } else {
                        isAuthenticated = false
                    }
                } else {
                    if (e.children) {
                        e.children.forEach(element => {
                            if (element.roles && element.roles.includes(this.role) && state.url == element.url) {
                                isAuthenticated = true
                            }
                        });
                    }
                }

            })
            return isAuthenticated;
        })

    }



}

import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'

import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component'
import { LockscreenComponent } from './Auth/lockscreen/lockscreen.component'
import { LoginComponent } from './Auth/login/login.component'
import { RegisterComponent } from './Auth/register/register.component'
import { Error404Component } from './Errors/404/404.component'
import { Error500Component } from './Errors/500/500.component'
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component'

const COMPONENTS = [
  ForgotPasswordComponent,
  LockscreenComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
  Error404Component,
  Error500Component
]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class SystemModule {}

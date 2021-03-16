import { Component, OnInit } from '@angular/core';
import { jwtAuthService } from 'src/app/services/jwt/index';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NzNotificationService } from 'ng-zorro-antd/notification';
import {MustMatch } from 'src/app/directives/password-match';

@Component({
  selector: 'cui-system-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../style.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;
  token:string;
  email:string;
  constructor(
    public authorizeService: jwtAuthService,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private notifier: NzNotificationService,
  ) {
    this.form = fb.group({
      password: [, [Validators.required,Validators.minLength(4)]],
      confirmPassword:[,Validators.required]
    }, {
        validators: MustMatch('password', 'confirmPassword'),
        updateOn:"blur"
      });
  }
  
  ngOnInit() {
    this.token = this._activatedRoute.snapshot.queryParams['token'];
    this.email = this._activatedRoute.snapshot.queryParams['email'];

    if(!this.token || !this.email)
         this.router.navigate(['auth', 'login'])
  }


  get password(){return this.form.controls.password}
  get confirmPassword(){return this.form.controls.confirmPassword}

  get f() { return this.form.controls }

 async ResetPassword() {
   this.isSubmitted = true;
   this.password.markAsDirty();
   this.password.updateValueAndValidity();
   this.confirmPassword.markAsDirty();
   this.confirmPassword.updateValueAndValidity();

    if(this.form.invalid)
        return

    let res = await this.authorizeService.resetPassword(this.token,this.email,this.password.value);
    if(res){
        this.notifier.success('','Password has been reset successfully');
        this.router.navigate(["auth/login"]);
    }
  }
}

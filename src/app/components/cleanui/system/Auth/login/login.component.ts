import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { jwtAuthService } from 'src/app/services/jwt'
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'cui-system-login',
  templateUrl: './login.component.html',
  styleUrls: ['../style.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup
  logo: String
  loading: boolean = false
  invalidCredentails = false
  returnUrl: string = ''
  constructor(
    private fb: FormBuilder,
    private authService: jwtAuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService
  ) {
    this.logo = "GoParent";
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }, {updateOn: 'submit'})
  }
  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/'
  }

  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
  }

  submitForm(): void {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    if (this.email.invalid || this.password.invalid) {
      return
    }
    this.loading = true;
    this.authService.login(this.email.value, this.password.value).subscribe(
      data => {
        if(data.IsSuccessful && data.ResponseData){
           localStorage.setItem('accessToken', data.ResponseData.AccessToken)
           localStorage.setItem('refreshToken', data.ResponseData.RefreshToken)
           this.loading = false;
           this.invalidCredentails = false
           this.router.navigate([this.returnUrl])
        }
        else{
          this.HandleErrorResponse(data.Error || "Invalid email or password");
        }
      },
      error => {
        this.HandleErrorResponse(error.Error);
      }
    );
  }

  HandleErrorResponse(errorMsg:any){
        this.loading = false;
        this.invalidCredentails = true
        this.notification.error('Unsuccessful!', errorMsg || "Something went wrong" );
  }
}

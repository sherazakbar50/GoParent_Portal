import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtAuthService } from 'src/app/services/jwt';

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
  ) {
    this.logo = "GoParent";
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }, { updateOn: 'submit' })
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

  async submitForm() {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    if (this.email.invalid || this.password.invalid) {
      return
    }
    this.loading = true;
    let response = await this.authService.login(this.email.value, this.password.value);
    if (response) {
      localStorage.setItem('accessToken', response.AccessToken)
      localStorage.setItem('refreshToken', response.RefreshToken)
      this.loading = false;
      this.invalidCredentails = false
      this.authService.getUserModel().then(r => {
        let role = r.UserRole
        this.authService.setHomePath(role)
        if (role && (role == 'Parent' || role == 'Child')) {
          this.router.navigate(['/calendar'])
        } else if (role && (role == 'Lawyer')) {
          this.router.navigate(['/cases'])
        } else {
          this.router.navigate(['/dashboard'])
        }
      })
    }
    else {
      this.loading = false;
      this.invalidCredentails = true
    }
  }
}

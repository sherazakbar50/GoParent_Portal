import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { jwtAuthService } from 'src/app/services/jwt'

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
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
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
    this.authService.login(this.email.value, this.password.value).then(res => {
      if (res) {
        this.invalidCredentails = false
        this.router.navigate([this.returnUrl])
      } else {
        this.invalidCredentails = true
      }
    })
  }
}

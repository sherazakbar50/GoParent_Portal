import { Component } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Regex } from 'src/Regex/Regex'
import { ActivatedRoute, Router } from '@angular/router';
import { jwtAuthService } from 'src/app/services/jwt'
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'cui-system-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../style.component.scss'],
})
export class ForgotPasswordComponent {
  form: FormGroup
  isSubmitted = false
  constructor(private fb: FormBuilder, private authService: jwtAuthService, private notifier: NzNotificationService, private router: Router) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.pattern(Regex.Email)]]
    }, { updateOn: 'submit' })
  }

  public get email() {
    return this.form.controls.email;
  }

  async ForgotPassword() {
    this.isSubmitted = true;
    this.email.markAsDirty();
    this.email.updateValueAndValidity();

    if (this.email.invalid)
      return;

    let response = await this.authService.forgotPassword(this.email.value);
    if (response) {
      this.notifier.success('', 'The reset link has been sent, please check your email to reset your password.')
      this.router.navigate(["auth/login"]);
    }

    this.isSubmitted = false;
  }

}

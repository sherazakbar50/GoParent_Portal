import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { Observable } from 'rxjs'
import { LawyerService } from 'src/app/services/lawyers/lawyer.service'
import { FormsService } from 'src/app/services/shared/forms.service'

@Component({
  selector: 'app-lawyers',
  templateUrl: './lawyers.component.html',
  styleUrls: ['./lawyers.component.scss'],
})
export class LawyersComponent implements OnInit {
  form: FormGroup
  isLoading: boolean = false
  // isSubmitted: boolean = false
  lawyersList: Observable<any>
  constructor(
    private _formService: FormsService,
    private _lawyerService: LawyerService,
    private _notify: NzNotificationService,
  ) {}

  async ngOnInit() {
    this.form = new FormGroup(
      {
        lawyerEmail: new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          ),
        ]),
      },
      { updateOn: 'submit' },
    )

    this._lawyerService.getLawyersList()
    this.lawyersList = this._lawyerService.laywersListObservable$()
  }

  get control() {
    return this.form.get('lawyerEmail')
  }

  async createLawyerAccount() {
    this.isLoading = true
    this._formService.markAllFieldsAsDirty(this.form)
    if (this.form.invalid) {
      this.isLoading = false
      return
    }
    var res = await this._lawyerService.createAccount(this.control.value)
    this.isLoading = false
    this.form.reset()
    if (res) {
      this._notify.success('Success', "Laywer's Account is Created Succcessfully!")
      this._lawyerService.getLawyersList()
    }
  }
}

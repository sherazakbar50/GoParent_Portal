import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { Observable } from 'rxjs'
import { LawyerService } from 'src/app/services/lawyers/lawyer.service'
import { FormsService } from 'src/app/services/shared/forms.service'
import { Regex } from 'src/Regex/Regex'

@Component({
  selector: 'app-lawyers',
  templateUrl: './lawyers.component.html',
  styleUrls: ['./lawyers.component.scss'],
})
export class LawyersComponent implements OnInit {
  form: FormGroup
  listOfSelectedCases: any[] = []
  caseList: Observable<any[]>
  selectedLawyer: any
  isLoading: boolean = false
  isVisible: boolean = false
  lawyersList: Observable<any[]>
  assignLoading: boolean = false
  constructor(
    private _formService: FormsService,
    private _lawyerService: LawyerService,
    private _notify: NzNotificationService,
  ) { }

  async ngOnInit() {
    this.form = new FormGroup(
      {
        lawyerEmail: new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            Regex.Email
          ),
        ]),
      },
      { updateOn: 'blur' },
    )
    // Get Lawyers
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
      this._notify.success('', "Laywer's Account is Created Successfully!")
      this._lawyerService.getLawyersList()
    }
  }

  async assignCaseToLawyer() {
    this.assignLoading = true
    let data = {
      LawyerID: this.selectedLawyer.LawyerID,
      FamilyIDs: this.listOfSelectedCases,
    }

    let result = await this._lawyerService.assignCase(data)
    this.assignLoading = false
    if (result) {
      this.handleCancel()
      this._lawyerService.getLawyersList()
      this._notify.success('', `Case(s) updated successfully against: ${this.selectedLawyer.Email}`)
    }
  }

  showModal(data) {
    this.isVisible = true
    this.selectedLawyer = data
    this.listOfSelectedCases = data.Cases.map(x => x.Id)
    // Get Families/Cases
    this._lawyerService.getCasesFamilies(this.selectedLawyer.LawyerID)
    this.caseList = this._lawyerService.caseListObservable$()
  }

  handleCancel() {
    this.isVisible = false
  }
}

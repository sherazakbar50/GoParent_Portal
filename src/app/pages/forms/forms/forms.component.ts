import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserSessionModel } from 'src/app/models/UserSessionModel';
import { AlertService } from 'src/app/services/alert-service/alert-service';
import { LawyerFormService } from 'src/app/services/APIServices/lawyer-forms.service';
import { jwtAuthService } from 'src/app/services/jwt';
import { LawyerService } from 'src/app/services/lawyers/lawyer.service';
import { FormsService } from 'src/app/services/shared/forms.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  userRole: string
  isVisible: boolean;
  form: FormGroup
  dataList: any[] = []
  tableLoading: boolean;
  familyList: any[] = []
  selectionList: any[] = []
  selectedFormId: number;
  userData: UserSessionModel;
  isShareVisible: boolean = false
  constructor(
    private authService: jwtAuthService,
    private alertService: AlertService,
    private notificationService: NzNotificationService,
    private formService: FormsService,
    private lawyerFormService: LawyerFormService,
    private lawyerService: LawyerService,
  ) {
    this.authService.getUserModel().then(res => {
      if (res) {
        this.userRole = res.UserRole
        this.userData = res
      }
    })
  }

  ngOnInit(): void {
    this.tableLoading = true
    this.form = new FormGroup({
      Id: new FormControl(null),
      Title: new FormControl(null, [Validators.required]),
      Content: new FormControl(null, [Validators.required])
    })

    this.lawyerFormService.getForms()
    this.lawyerFormService.formObservable().subscribe(res => {
      if (res) {
        this.tableLoading = false
        this.dataList = res
      }
    })

    this.lawyerService.getCasesFamilies(this.userData.UserId)
    this.lawyerService.caseListObservable$().subscribe(r => {
      if (r) {
        this.familyList = r
      }
    })
  }


  openPreview(data) {
    if (data.Content) {
      let myWin = window.open()
      myWin.document.write(data.Content)
    }
  }

  showModal(data?) {
    this.isVisible = true
    if (data) this.form.patchValue(data)
    else this.form.reset()
  }

  onModalCancel() {
    this.isVisible = false;
    this.form.reset()
  }


  async onSubmit() {
    this.formService.markAllFieldsAsDirty(this.form)
    if (this.form.invalid) return
    let data = this.form.value
    data.Id = data.Id ? data.Id : 0
    let res = await this.lawyerFormService.addUpdateForm(data)
    if (res) {
      this.lawyerFormService.getForms()
      this.form.reset()
      this.isVisible = false
      this.notificationService.success('', 'Form saved successfully!')
    }
  }

  deleteForm(id) {
    this.alertService.Delete('Are you sure, you want to delete this record?', async cb => {
      if (cb.isConfirmed) {
        let res = await this.lawyerFormService.deleteForm(id)
        if (res) {
          this.lawyerFormService.getForms()

          this.notificationService.success('', 'Form deleted successfully!')
        }
      }
    })
  }

  async onShare() {
    let data: any;
    data = {
      Id: 0,
      FormId: this.selectedFormId,
      FamilyIds: this.selectionList,
    }
    let res = await this.lawyerFormService.shareForm(data)

    if (res) {
      this.lawyerFormService.getForms()
      this.notificationService.success('', 'Form shared successfully!')
      this.isShareVisible = false
      this.selectionList = []
    }
  }

  showShareModal(data) {
    this.isShareVisible = true
    this.selectedFormId = data.Id
    this.selectionList = []
    if (data.Families && data.Families) {
      this.selectionList = data.Families.map(x => x.FamilyId)
    }
  }

  handleShareCancel() {
    this.isShareVisible = false
    this.selectionList = []
  }
}

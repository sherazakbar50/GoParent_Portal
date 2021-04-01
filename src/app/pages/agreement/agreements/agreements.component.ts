import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { NzUploadFile } from 'ng-zorro-antd/upload'
import { AgreementFeedbackEnum } from 'src/app/models/AgreementDTO'
import { AlertService } from 'src/app/services/alert-service/alert-service'
import { AgreementService } from 'src/app/services/APIServices/agreement.service'
import { jwtAuthService } from 'src/app/services/jwt'

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss'],
})
export class AgreementsComponent implements OnInit {
  @Input() caseId = 0
  dataList: any[] = []
  userRole: string
  userId: string
  formModalVisible: boolean = false
  form: FormGroup
  fileList: NzUploadFile[] = []
  file: NzUploadFile
  feedbackEnum = AgreementFeedbackEnum

  constructor(
    private authService: jwtAuthService,
    private agreementService: AgreementService,
    private alertService: AlertService,
    private notificationService: NzNotificationService,
  ) {
    authService.getUserModel().then(r => {
      this.userRole = r.UserRole
      this.userId = r.UserId
    })

    this.form = new FormGroup({
      Id: new FormControl(0),
      Content: new FormControl(null),
      ContentFileURL: new FormControl(null),
      ContentFileBlobName: new FormControl(null),
      ContentFileName: new FormControl(null),
      Feedback: new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.agreementService.getAgreementList(this.caseId)
    this.agreementService.agreementListObservable().subscribe(res => {
      if (res) {
        this.dataList = res
      }
    })
  }

  openFormModal() {
    this.formModalVisible = true
  }

  onFormModalCancel() {
    this.formModalVisible = false
    this.form.reset({ Id: 0 })
    this.fileList = []
  }

  async onSubmit() {
    const formData: FormData = new FormData()
    if (this.fileList.length > 0 && this.file) {
      this.fileList.forEach((file: any) => {
        formData.append('files', file)
        // formData.append('type', file.type.toString())
        // formData.append('size', file.size.toString())
        formData.append('Id', this.form.value.Id.toString())
        formData.append(
          'Content',
          this.form.value.Content ? this.form.value.Content.toString() : '',
        )
      })
    } else {
      formData.append('Id', this.form.value.Id.toString())
      formData.append('Content', this.form.value.Content ? this.form.value.Content.toString() : '')
      formData.append(
        'ContentFileURL',
        this.form.value.ContentFileURL ? this.form.value.ContentFileURL.toString() : '',
      )
      formData.append(
        'ContentFileBlobName',
        this.form.value.ContentFileBlobName ? this.form.value.ContentFileBlobName.toString() : '',
      )
      formData.append(
        'ContentFileName',
        this.form.value.ContentFileName ? this.form.value.ContentFileName.toString() : '',
      )
    }

    let response = await this.agreementService.addUpdate(formData)
    if (response) {
      this.agreementService.getAgreementList(this.caseId)
      this.notificationService.success('', 'Record saved successfully!')
      this.formModalVisible = false
      this.form.reset({ Id: 0 })
      this.fileList = []
    }
  }

  edit(data) {
    console.log('data:', data)
    this.form.patchValue(data)
    this.formModalVisible = true
    if (data.ContentFileName) {
      // this.form.controls['ContentURL'].setValue(data.ContentFileUrl)
      let file = {
        name: data.ContentFileName,
        uid: data.ContentFileBlobName,
        url: data.ContentFileUrl,
      }
      this.fileList = [file]
      this.file = null
    }
  }

  async delete(id: number) {
    this.alertService.Delete('Are you sure, you want to delete this record!', async cb => {
      if (cb.isConfirmed) {
        let response = await this.agreementService.delete(id)
        if (response) {
          this.agreementService.getAgreementList(this.caseId)
          this.notificationService.success('', 'Record deleted successfully!')
        }
      }
    })
  }

  async onFeedbackChange(feedback: number, id: number) {
    // this.alertService.Delete('Proceed to give feedback!', async cb => {
    //   if(cb.isConfirmed){
    let response = await this.agreementService.addFeedback(id, feedback)
    if (response) {
      this.agreementService.getAgreementList(this.caseId)
      this.notificationService.success('', 'Feedback has been given!')
    }
    //   }
    // })
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    this.file = file
    const fsize = file.size
    const sizeMb = Math.round(fsize / 1024)
    if (sizeMb >= 49096) {
      this.notificationService.error('', `${file.name} size is exceeded than 50mb`)
    } else {
      this.fileList = [file]
    }

    return false
  }
}

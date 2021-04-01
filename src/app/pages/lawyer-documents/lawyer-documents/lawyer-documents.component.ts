import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { documentToShareDTO, LawyerDocDTO } from 'src/app/models/document-dto';
import { UserSessionModel } from 'src/app/models/UserSessionModel';
import { AlertService } from 'src/app/services/alert-service/alert-service';
import { LawyerDocumentService } from 'src/app/services/APIServices/lawyer-doc.service';
import { FamilyDocumentsService } from 'src/app/services/family_documents/family-documents.service';
import { jwtAuthService } from 'src/app/services/jwt';
import { LawyerService } from 'src/app/services/lawyers/lawyer.service';

@Component({
  selector: 'app-lawyer-documents',
  templateUrl: './lawyer-documents.component.html',
  styleUrls: ['./lawyer-documents.component.scss']
})
export class LawyerDocumentsComponent implements OnInit {

  dataList: LawyerDocDTO[] = []
  isVisible: boolean = false
  fileList: any[] = []
  btnLoading: boolean = false
  familyList: any[] = []
  selectionList: any[] = []
  userData: UserSessionModel;
  selectedDocumentId: number;

  constructor(
    private notificationService: NzNotificationService,
    private alertService: AlertService,
    private lawyerDocService: LawyerDocumentService,
    private familyDocService: FamilyDocumentsService,
    private lawyerService: LawyerService,
    private authService: jwtAuthService,

  ) {
    authService.getUserModel().then(res => {
      if (res) {
        this.userData = res
      }
    })
  }

  ngOnInit(): void {
    this.lawyerDocService.getDocs()
    this.lawyerDocService.getDocListObservable().subscribe(r => {
      if (r) {
        this.dataList = r
      }
    })

    this.lawyerService.getCasesFamilies(this.userData.UserId)
    this.lawyerService.caseListObservable$().subscribe(r => {
      if (r) {
        this.familyList = r
      }
    })
  }

  showModal(data: LawyerDocDTO) {
    this.isVisible = true
    this.selectedDocumentId = data.DocumentId
    if (data.Families) {
      this.selectionList = data.Families.map(x => x.FamilyId)
    }

  }

  handleCancel() {
    this.isVisible = false
    this.selectionList = []
  }

  async onUpload() {
    const formData: FormData = new FormData()
    if (this.fileList.length > 0) {
      this.btnLoading = true
      this.fileList.forEach((file: any) => {
        formData.append('files', file)
        formData.append('type', file.type.toString())
        formData.append('size', file.size.toString())
        // formData.append('Id', "0")
      })

      let res = await this.lawyerDocService.addDocs(formData);
      if (res) {
        this.fileList = []
        this.lawyerDocService.getDocs()
        this.notificationService.success('', 'Documents uploaded successfully!')
      }
      this.btnLoading = false
    }
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    // this.file = file
    const fsize = file.size
    const sizeMb = Math.round(fsize / 1024)
    if (sizeMb >= 49096) {
      this.notificationService.error('', `${file.name} size is exceeded than 50mb`)
    } else {
      this.fileList = this.fileList.concat(file)
    }
    return false
  }

  async deletDoc(id: number) {
    this.alertService.Delete('Are you sure, you want to delete this?', async cb => {
      if (cb.isConfirmed) {
        let res = await this.familyDocService.DeleteDocument(id)
        if (res) {
          this.notificationService.success('', 'Document deleted successfully!')
          this.lawyerDocService.getDocs()
        }

      }
    })
  }

  async onShare() {
    let data = new documentToShareDTO()
    if (this.selectionList.length > 0) {

      data = {
        DocumentId: this.selectedDocumentId,
        LawyerId: this.userData.UserId,
        FamilyIds: this.selectionList,
      }
      let res = await this.lawyerDocService.shareDoc(data)

      if (res) {
        this.lawyerDocService.getDocs()
        this.notificationService.success('', 'Document shared successfully!')
        this.isVisible = false
        this.selectionList = []
      }
    } else {
      this.notificationService.warning('Invalid', 'Please select atleast one family!')
    }
  }

}

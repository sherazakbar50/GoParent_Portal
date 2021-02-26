import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { takeUntil } from 'rxjs/operators'
import { FamilyDocumentsDto } from 'src/app/models/document-dto'
import { AlertService } from 'src/app/services/alert-service/alert-service'
import { FamilyDocumentsService } from 'src/app/services/family_documents/family-documents.service'
import { jwtAuthService } from 'src/app/services/jwt'

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.scss'],
})
export class ViewDocumentsComponent implements OnInit {
  folderId: number = 0
  listData: FamilyDocumentsDto[] = []
  listDocumentsData: FamilyDocumentsDto[] = []
  createdBy: string = ''
  userRole: string = ''
  constructor(
    private _route: ActivatedRoute,
    private documentsService: FamilyDocumentsService,
    private notification: NzNotificationService,
    private _auth: jwtAuthService,
    private _alert: AlertService,
  ) {
    this._auth.getUserModel().then(r => {
      this.userRole = r?.UserRole
    })
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.folderId = +params['folderId'] || 0
    })

    this.documentsService.documentsObserver$.subscribe(res => {
      if (res) {
        this.listData = res
      }
    })
    this.documentsService.getFamilyDocuments(this.folderId)
  }

  async DeleteDocument(id: any) {
    this._alert.Delete('Are you sure you want to delete the document?', async result => {
      if (result && result.isConfirmed) {
        let response = await this.documentsService.DeleteDocument(id)
        if (response) {
          this.notification.success('', 'File has been deleted successfully!')
          this.documentsService.getFamilyDocuments(this.folderId)
        } else {
          this.notification.error('', 'There is some error please try again later!')
        }
      }
    })
  }

  AddDocumentSuccess($event) {
    this.documentsService.getFamilyDocuments(this.folderId)
  }

  DownloadDocument(blobUrl: string) {
    window.open(blobUrl, '_blank')
  }
}

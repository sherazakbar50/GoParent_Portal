import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { BehaviorSubject } from 'rxjs'
import { FamilyDocumentsDto } from 'src/app/models/document-dto'
import { FolderElementdto } from 'src/app/models/folder-elementdto'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { AlertService } from 'src/app/services/alert-service/alert-service'
import { FamilyDocumentsService } from 'src/app/services/family_documents/family-documents.service'
import { FamilyFoldersService } from 'src/app/services/family_folders/family-folders.service'
import { jwtAuthService } from 'src/app/services/jwt'
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-view-folder',
  templateUrl: './view-folder.component.html',
  styleUrls: ['./view-folder.component.scss'],
})
export class ViewFolderComponent implements OnInit {
  isVisible: boolean = false
  @Input() caseId: number = 0
  userRole: string = ''
  FoldermodalTitle: string = 'Add Folder'
  listData: FolderElementdto[] = []
  folderObserverSubject: BehaviorSubject<FolderElementdto> = new BehaviorSubject(null)
  sharedDocs: FamilyDocumentsDto[] = []
  sharedDocTitle: string
  constructor(
    public folderService: FamilyFoldersService,
    private _router: Router,
    private notification: NzNotificationService,
    private _route: ActivatedRoute,
    private _auth: jwtAuthService,
    private _alert: AlertService,
    private familyDocumentsService: FamilyDocumentsService,
  ) {
    this._auth.getUserModel().then(r => {
      if (r) {
        this.userRole = r.UserRole
        this.sharedDocTitle = this.userRole == "Parent" ? "Shared with me" : "Shared Documents"
        this.familyDocumentsService.getSharedWithFamily(this.caseId).then((res: FamilyDocumentsDto[]) => {
          this.sharedDocs = res.filter(x => x.FamilyId === null)
        })
      }
    })

  }

  loadFolder() {
    this.folderService.folderObserver$.subscribe(res => {
      if (res) {
        this.listData = res
      }
      this.isVisible = false
    })

    this.folderService.getFolders(this.caseId)
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.caseId = +params['caseId'] || 0
    })
    this.loadFolder()
  }

  AddFolder() {
    this.isVisible = true
    this.folderObserverSubject.next(null)
  }

  SavedCallBack() {
    this.isVisible = false
  }

  ModalCancel() {
    this.isVisible = false
  }

  EditFolder(data: FolderElementdto) {
    this.FoldermodalTitle = 'Edit Folder'
    this.isVisible = true
    this.folderObserverSubject.next(data)
  }

  NavigateToDocuments(folderId: number) {
    if (folderId) {
      this._router.navigate(['/documents/view-documents'], {
        queryParams: { folderId: folderId, caseId: this.caseId },
      })
    }
  }

  async DeleteFolder(id: any) {
    this._alert.Delete('Are you sure you want to delete the Folder?', async result => {
      if (result && result.isConfirmed) {
        let response = await this.folderService.DeleteFolder(id)
        if (response) {
          this.notification.success('', 'Folder has been deleted successfully!')
          await this.loadFolder()
        } else {
          this.notification.error('', 'There is some error please try again later!')
        }
      }
    })
  }

  async AddFolderSuccess($event) {
    this.isVisible = false
    await this.loadFolder()
  }

  getRole() { }
}

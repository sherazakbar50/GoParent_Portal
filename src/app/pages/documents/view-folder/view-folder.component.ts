import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { BehaviorSubject } from 'rxjs'
import { FolderElementdto } from 'src/app/models/folder-elementdto'
import { AlertService } from 'src/app/services/alert-service/alert-service'
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
  constructor(
    public folderService: FamilyFoldersService,
    private _router: Router,
    private notification: NzNotificationService,
    private _auth: jwtAuthService,
    private _alert: AlertService,
  ) {
    this._auth.getUserModel().then(r => {
      this.userRole = r?.UserRole
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
      this._router.navigate(['/documents/view-documents'], { queryParams: { folderId: folderId } })
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

  getRole() {}
}

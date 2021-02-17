import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';
import { FolderElementdto } from 'src/app/models/folder-elementdto';
import { FamilyFoldersService } from 'src/app/services/family_folders/family-folders.service';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-view-folder',
  templateUrl: './view-folder.component.html',
  styleUrls: ['./view-folder.component.scss']
})
export class ViewFolderComponent implements OnInit {
  isVisible: boolean = false

  FoldermodalTitle: string = 'Add Folder'
  listData: FolderElementdto[] = [];
  folderObserverSubject: BehaviorSubject<FolderElementdto> = new BehaviorSubject(null);
  constructor(public folderService: FamilyFoldersService, private _router: Router,
    private notification: NzNotificationService) { }


  loadFolder() {
    this.folderService.folderObserver$.subscribe(res => {
      if (res) {
        this.listData = res;
      }
      this.isVisible = false;
    });
    this.folderService.getFolders();
  }

  ngOnInit(): void {
    this.loadFolder()
  }

  AddFolder() {
    this.isVisible = true
    this.folderObserverSubject.next(null);
  }

  SavedCallBack() {
    this.isVisible = false
  }

  ModalCancel() {
    this.isVisible = false
  }


  EditFolder(data: FolderElementdto) {
    this.FoldermodalTitle = "Edit Folder";
    this.isVisible = true;
    this.folderObserverSubject.next(data);
  }

  NavigateToDocuments(folderId: number) {
    if (folderId) {
      this._router.navigate(['/documents/view-documents'], { queryParams: { folderId: folderId } })
    }
  }

  async DeleteFolder(id: any) {
    Swal.fire({
      title: 'Are you sure you want to delete this folder?',
      text: "This folder may contain important docs!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it Anyway!',
    }).then(async result => {
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

}

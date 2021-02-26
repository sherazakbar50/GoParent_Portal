import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { BehaviorSubject } from 'rxjs'
import { FolderElementdto } from 'src/app/models/folder-elementdto'
import { FamilyFoldersService } from 'src/app/services/family_folders/family-folders.service'
import { SharedService } from 'src/app/services/shared.service'
import { FormsService } from 'src/app/services/shared/forms.service'

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss'],
})
export class AddFolderComponent implements OnInit {
  folderName: string
  form: FormGroup
  IsSubmitted = false
  currentRoot: FolderElementdto
  currentPath: string
  folderId = 0
  caseId: number = 0
  canNavigateUp = false
  @Output() folderCreated: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() folderDataSub?: BehaviorSubject<FolderElementdto>

  constructor(
    private fb: FormBuilder,
    private _sharedService: SharedService,
    public fileService: FamilyFoldersService,
    private notification: NzNotificationService,
    private router: Router,
    private _form: FormsService,
  ) {
    this.form = fb.group({
      id: [0],
      Name: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.folderDataSub) {
      this.folderDataSub.subscribe(res => {
        if (res) {
          this.folderId = res.FolderId
          this.form.patchValue(res)
        } else {
          this.form.reset()
        }
      })
    }
  }

  get Name() {
    return this.form.controls.Name
  }
  get f() {
    return this.form.controls
  }

  async handleSubmit() {
    this._form.markAllFieldsAsDirty(this.form)
    this.IsSubmitted = true
    if (this.form.invalid) return
    let data = this.form.value as FolderElementdto
    data.IsFolder = true
    data.FolderId = this.folderId

    if (data.FolderId == 0) {
      data.Parent = this.currentRoot ? this.currentRoot.id : 'root'
      let response = await this.fileService.add(data)
      if (response) {
        this.notification.success('', 'Folder has been created successfully!')
        await this.fileService.getFolders(this.caseId)
        this.folderCreated.emit(true)
        //this.fileService.getFolders();
        // this.router.navigate(['documents/view-folder'],)
      } else {
        this.notification.error('', 'There is some error please try again later!')
      }
    } else {
      data.Parent = this.currentRoot ? this.currentRoot.id : 'root'
      let response = this.fileService.update(data)
      if (response) {
        this.notification.success('', 'Folder has been Updated  successfully!')
        await this.fileService.getFolders(this.caseId)
        this.folderCreated.emit(true)

        // this.router.navigate(['documents/view-folder'],)
      } else {
        this.notification.error('', 'There is some error please try again later!')
      }
    }
  }
}

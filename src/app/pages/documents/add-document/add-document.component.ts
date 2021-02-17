import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { FamilyDocumentsService } from 'src/app/services/family_documents/family-documents.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {
  file: any;
  imageList: any[] = [];
  isFileAdded: boolean = false;
  uploadedFiles: any[] = [];
  totalFileCount: number = 0;
  uploadedFileCount: number = 0;
  @Input() fId: number;
  @Output() documentCreated: EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor(private documentService: FamilyDocumentsService,
    private notification: NzNotificationService,) { }

  ngOnInit(): void {
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    this.file = file;
    this.uploadedFiles = this.uploadedFiles.concat(file);
    return false;
  };

  RemoveFile(index: number) {
    this.imageList.splice(index, 1);
  }

  async submitForm() {
    if (!this.uploadedFiles.length) {
      return
    } else {
      const formData: FormData = new FormData();
      this.uploadedFiles.forEach((file: any) => {
        formData.append("files", file);
        formData.append("type", file.type.toString());
        formData.append("size", file.size.toString());
        formData.append("folderId", this.fId.toString());
      })

      let response = await this.documentService.add(formData);
      if (response) {
        this.uploadedFiles = []
        this.totalFileCount = response.length
        this.uploadedFileCount = response.filter(x => !x.HasError).length
       
        this.notification.success('', this.uploadedFileCount + ' out of ' + this.totalFileCount + ' Document has been uploaded successfully!')
        // response.forEach(element => {
        // if (!element.HasError) {
        //   this.uploadedFiles = []
        //   this.notification.success('', 'Document' + element.OriginalFileName + ' has been uploaded successfully!')
        // } else {
        //   this.uploadedFiles = []
        //   this.notification.error('', 'Document' + element.OriginalFileName + 'failed to upload!')
        // }
        // });
        await this.documentService.getFamilyDocuments()
        this.documentCreated.next(true)
      }
    }

  }
}

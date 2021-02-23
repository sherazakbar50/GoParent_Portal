import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { NzUploadFile } from 'ng-zorro-antd/upload'
import { FamilyDocumentsService } from 'src/app/services/family_documents/family-documents.service'

@Component({
  selector: 'app-chat-attachment',
  templateUrl: './chat-attachment.component.html',
  styleUrls: ['./chat-attachment.component.scss'],
})
export class ChatAttachmentComponent implements OnInit {
  constructor(private documentService: FamilyDocumentsService) {}
  file: any

  uploadedFiles: any[] = []

  @Output() documentCreated: EventEmitter<boolean> = new EventEmitter<boolean>()
  ngOnInit(): void {}
  beforeUpload = (file: NzUploadFile): boolean => {
    this.file = file
    this.uploadedFiles = []
    this.uploadedFiles = this.uploadedFiles.concat(file)
    return false
  }

  async submitForm() {
    if (!this.uploadedFiles.length) {
      return
    } else {
      const formData: FormData = new FormData()
      this.uploadedFiles.forEach((file: any) => {
        formData.append('files', file)
        formData.append('type', file.type.toString())
        formData.append('size', file.size.toString())
      })
      let response = await this.documentService.addChatAttachment(formData)
      if (response) {
        this.uploadedFiles = []
        this.documentCreated.next(response)
      }
    }
  }
}

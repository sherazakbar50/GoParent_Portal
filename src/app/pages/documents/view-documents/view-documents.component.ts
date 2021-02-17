import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { takeUntil } from 'rxjs/operators';
import { FamilyDocumentsDto } from 'src/app/models/document-dto';
import { FamilyDocumentsService } from 'src/app/services/family_documents/family-documents.service';
import { saveAs } from 'file-saver';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.scss']
})
export class ViewDocumentsComponent implements OnInit {
  folderId: number;
  listData: FamilyDocumentsDto[] = [];
  listDocumentsData: FamilyDocumentsDto[] = [];
  //  folderObserverSubject: BehaviorSubject<FolderElementdto> = new BehaviorSubject(null);
  constructor(private _route: ActivatedRoute,
    private documentsService: FamilyDocumentsService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.folderId = +params['folderId'] || 0;
    });

    this.documentsService.documentsObserver$.subscribe(res => {
      if (res) {
        this.listDocumentsData = [];
        this.listData = res;
        this.listData.forEach(x => {
          if (x.FolderId == this.folderId) {
            this.listDocumentsData.push(x);
          }
        })
      }
    });
    this.documentsService.getFamilyDocuments();
  }




  async DeleteDocument(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result && result.isConfirmed) {
        let response = await this.documentsService.DeleteDocument(id)
        if (response) {
          this.notification.success('', 'File has been deleted successfully!')
          this.documentsService.getFamilyDocuments();

        } else {
          this.notification.error('', 'There is some error please try again later!')
        }
      }
    })
  }

  AddDocumentSuccess($event) {
    this.documentsService.getFamilyDocuments();
  }


  DownloadDocument(blobUrl : string) {
      window.open(blobUrl, '_blank');
    // this.documentsService.DownloadDocument(id).subscribe(result => {
    //   var blob = new Blob([result], { type: type });
    //   let file = id;
    //   saveAs(blob, file);
    // });
  }
}

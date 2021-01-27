import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTableData } from 'ng-zorro-antd/table';
import { Subject, Subscription,BehaviorSubject } from 'rxjs';
import { ContactDTO } from 'src/app/models/ContactsDTO';
import { ContactsService } from 'src/app/services/APIServices/contacts.service';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.scss']
})

export class ViewContactsComponent implements OnInit {
  listData: ContactDTO[] = [];
  contact: ContactDTO = new ContactDTO();
  pageSize: number = 10;
  isVisible: boolean = false;
  modalTitle: string = "Add New Contact"
  contactSubject: Subscription;
  contactObserverSubject: BehaviorSubject<ContactDTO> = new BehaviorSubject(null);
  listOfColumns: any[] = [];
  @ViewChild('filterTable') filterTable: NzTableData

  constructor( private _contactService: ContactsService, private _notifiy:NzNotificationService) { }

  ngOnInit(): void {
    this.listOfColumns = this.createTableColumnHeaders();
    this.contactSubject = this._contactService.contactObserver$.subscribe(res => {
      if (res) {
        this.listData = res;
        let index = 0;
        this.listData.forEach(element => {
          element.index = index + 1
          index++;
        });
      }
      this.isVisible = false;
    });
    this._contactService.getContacts();
  }

  private createTableColumnHeaders() {
    return [
      {
        name: '#',
        sortOrder: null,
        sortFn: (a: ContactDTO, b: ContactDTO) => a.index - b.index,
        sortDirections: ['ascend', 'descend', null]
      },
      {
        name: 'Full Name',
        sortOrder: null,
        sortFn: (a: ContactDTO, b: ContactDTO) => a.Name.localeCompare(b.Name),
        sortDirections: ['ascend', 'descend', null]
      },
      {
        name: 'Email',
        sortOrder: null,
        sortFn: (a: ContactDTO, b: ContactDTO) => a.Email.localeCompare(b.Email),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Actions'
      }
    ];
  }

  ngOnDestroy() {
    this.contactSubject.unsubscribe();
  }

  AddContact(): void {
    this.isVisible = true;
    this.modalTitle = "Add New Contact";
    this.contactObserverSubject.next(null);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  EditContacts(data: ContactDTO) {
    this.modalTitle = "Edit Contact";
    this.isVisible = true;
    this.contactObserverSubject.next(data);
  }

  DeleteContacts(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the contact?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      }).then(result => {
      if (result && result.isConfirmed) {
          this._contactService.deleteContact(id).subscribe(res =>{
          this._notifiy.success('','Contact deleted successfully')
          this._contactService.getContacts();
         },error => {
           this._notifiy.error('','Something went wrong while deleting the contact')
         })
       }
    })
  }

}
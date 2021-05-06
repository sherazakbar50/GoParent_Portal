import { Component, OnInit, ViewChild } from '@angular/core'
import { NzTableData } from 'ng-zorro-antd/table'
import { Subject, Subscription, BehaviorSubject } from 'rxjs'
import { ContactDTO } from 'src/app/models/ContactsDTO'
import { ContactsService } from 'src/app/services/APIServices/contacts.service'
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification'
import { TranslateService } from '@ngx-translate/core'
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.scss'],
})
export class ViewContactsComponent implements OnInit {
  listData: ContactDTO[] = []
  contact: ContactDTO = new ContactDTO()
  pageSize: number = 10
  isVisible: boolean = false
  modalTitle: string = 'Add New Contact'
  contactSubject: Subscription
  contactObserverSubject: BehaviorSubject<ContactDTO> = new BehaviorSubject(null)
  listOfColumns: any[] = []
  @ViewChild('filterTable') filterTable: NzTableData
  name: any
  surname: any
  status: any
  email: any
  phoneNo: any
  address: any
  action: any

  constructor(
    private _contactService: ContactsService,
    private _notifiy: NzNotificationService,
    private translate: TranslateService,
  ) {
    this.translate.get(['name', 'surname', 'status', 'email', 'phoneNo', 'address', 'action'])
      .subscribe(translations => {
        this.name = translations['name'];
        this.surname = translations['surname'];
        this.status = translations['status'];
        this.email = translations['email'];
        this.phoneNo = translations['phoneNo'];
        this.address = translations['address'];
        this.action = translations['action']
      });
  }

  ngOnInit(): void {
    this.listOfColumns = this.createTableColumnHeaders()
    this.contactSubject = this._contactService.contactObserver$.subscribe(res => {
      if (res) {
        this.listData = res
        let index = 0
        this.listData.forEach(element => {
          element.index = index + 1
          index++
        })
      }
      this.isVisible = false
    })
    this._contactService.getContacts()
  }

  private createTableColumnHeaders() {
    return [
      {
        name: '#',
        sortOrder: null,
        sortFn: (a: ContactDTO, b: ContactDTO) => a.index - b.index,
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: this.name,
        sortOrder: null,
        sortFn: (a: ContactDTO, b: ContactDTO) => a.Name.localeCompare(b.Name),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: this.surname,
        sortOrder: null,
        sortFn: (a: ContactDTO, b: ContactDTO) => a.Surname.localeCompare(b.Surname),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: this.status,
        sortOrder: null,
        sortFn: (a: ContactDTO, b: ContactDTO) => a.Status.localeCompare(b.Status),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: this.email,
        sortOrder: null,
        sortFn: (a: ContactDTO, b: ContactDTO) => a.Email.localeCompare(b.Email),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: this.phoneNo,
        sortOrder: null,
        sortFn: (a: ContactDTO, b: ContactDTO) => a.PhoneNo.localeCompare(b.PhoneNo),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: this.address,
        sortOrder: null,
        sortFn: (a: ContactDTO, b: ContactDTO) => a.Address.localeCompare(b.Address),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: this.action,
      },
    ]
  }

  ngOnDestroy() {
    this.contactSubject.unsubscribe()
  }

  AddContact(): void {
    this.isVisible = true
    this.modalTitle = 'Add New Contact'
    this.contactObserverSubject.next(null)
  }

  handleCancel(): void {
    this.isVisible = false
  }

  EditContacts(data: ContactDTO) {
    this.modalTitle = 'Edit Contact'
    this.isVisible = true
    this.contactObserverSubject.next(data)
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
    }).then(async result => {
      if (result && result.isConfirmed) {
        let response = await this._contactService.deleteContact(id)
        if (response) {
          this._notifiy.success('', 'Contact deleted successfully')
          this._contactService.getContacts()
        }
      }
    })
  }
}

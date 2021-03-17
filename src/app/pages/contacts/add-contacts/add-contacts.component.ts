import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'
import { ContactDTO } from 'src/app/models/ContactsDTO'
import { ContactsService } from 'src/app/services/APIServices/contacts.service'
import { Regex } from 'src/Regex/Regex'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FormsService } from 'src/app/services/shared/forms.service'

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.scss'],
})
export class AddContactsComponent implements OnInit {
  form: FormGroup
  loading = false
  IsSubmitted = false
  contactId = 0
  @Input() contactDataSub?: BehaviorSubject<ContactDTO>

  constructor(
    private fb: FormBuilder,
    private _contactService: ContactsService,
    private notify: NzNotificationService,
    private _form: FormsService,
  ) {
    this.form = fb.group(
      {
        Name: [''],
        Email: ['', { validators: [Validators.required, Validators.pattern(Regex.Email)] }],
      },
      { updateOn: 'change' },
    )
  }

  ngOnInit() {
    if (this.contactDataSub) {
      this.contactDataSub.subscribe(res => {
        if (res) {
          this.contactId = res.Id
          this.form.patchValue(res)
        } else {
          this.form.reset()
        }
      })
    }
  }

  //Parent Fields
  get Email() {
    return this.form.controls.Email
  }
  get Name() {
    return this.form.controls.Name
  }
  get f() {
    return this.form.controls
  }

  handleSubmit() {
    this._form.markAllFieldsAsDirty(this.form)
    this.IsSubmitted = true
    this.Email.markAsDirty()
    this.Email.updateValueAndValidity()

    if (this.form.invalid) return

    this.loading = true
    this.saveContacts(this.form.value)
  }

  async saveContacts(data: ContactDTO) {
    data.Id = this.contactId
    let response = await this._contactService.saveContacts(data)
    if (response) {
      this._contactService.getContacts()
      this.notify.success('', `Contact ${this.contactId > 0 ? 'Updated' : 'Added'} Successfully!`)
    } else {
      this.loading = false
      this.IsSubmitted = false
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AlertService } from 'src/app/services/alert-service/alert-service';
import { UsersService } from 'src/app/services/APIServices/users.service';
import { jwtAuthService } from 'src/app/services/jwt';
import { FormsService } from 'src/app/services/shared/forms.service';
import { Regex } from 'src/Regex/Regex';

@Component({
  selector: 'app-other-users',
  templateUrl: './other-users.component.html',
  styleUrls: ['./other-users.component.scss']
})
export class OtherUsersComponent implements OnInit {

  isVisible: boolean
  listData: any[] = []
  form: FormGroup

  constructor(
    private notification: NzNotificationService,
    private alertService: AlertService,
    private userService: UsersService,
    private authService: jwtAuthService,
    private formsService: FormsService,
  ) {
    this.form = new FormGroup({
      Id: new FormControl(0),
      FirstName: new FormControl(null, [Validators.required]),
      LastName: new FormControl(null),
      Status: new FormControl(null),
      Email: new FormControl(null, [Validators.required, Validators.pattern(Regex.Email)]),
      PhoneNo: new FormControl(null),
      Address: new FormControl(null),
    })
  }

  get Email() { return this.form.controls["Email"] }

  ngOnInit(): void {
    this.userService.GetUsers()
    this.userService.userObservable().subscribe(res => {
      if (res) {
        this.listData = res
      }
    });

  }

  async handleSubmit() {
    this.formsService.markAllFieldsAsDirty(this.form)

    if (this.form.invalid) return;

    let data = this.form.value
    data.Id = data.Id ? data.Id : 0

    if (data.Id > 0) {
      let res = await this.userService.updateUser(data)
      if (res) {
        this.form.reset()
        this.isVisible = false
        this.userService.GetUsers()
        this.notification.success('', 'User updates successfully!')
      }
    } else {
      let res = await this.userService.addUser(data)
      if (res) {
        this.userService.GetUsers()
        this.form.reset()
        this.notification.success('', 'User added successfully!')
        this.isVisible = false
      }
    }

  }

  handleCancel() {
    this.isVisible = false
    this.form.reset()

  }

  openModal() {
    this.isVisible = true
    this.form.reset()
  }

  edit(data) {
    this.isVisible = true
    this.form.patchValue(data)
    if (data.PortalAccessCreated) this.form.controls['Email'].disable()
    else this.form.controls['Email'].enable()
  }

  delete(id) {
    if (id) {
      this.alertService.Delete('Are you sure, you want to delete this user?', async cb => {
        if (cb.isConfirmed) {
          let res = await this.userService.deleteUser(id)
          if (res) {
            this.userService.GetUsers()
            this.notification.success('', 'User deleted successfully!')
          }
        }
      })
    }
  }

  sendAccess(id, email) {
    this.alertService.Delete('Do you want to Create Portal Access for this user?', async cb => {
      if (cb.isConfirmed) {
        let data = {
          Email: email,
          FamilyMemberId: id,
        }
        let res = await this.userService.createPortalAccess(data)
        if (res) {
          this.userService.GetUsers()
          this.notification.success('', 'User portal access created successfully!')
        }
      }
    })
  }

}

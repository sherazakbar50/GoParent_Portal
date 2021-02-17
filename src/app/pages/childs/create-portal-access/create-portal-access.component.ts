import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { ApplicationRolesEnum } from 'src/app/models/UserSessionModel'
import { ConnectionService } from 'src/app/services/connection/connection.service'
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service'

@Component({
  selector: 'app-create-portal-access',
  templateUrl: './create-portal-access.component.html',
  styleUrls: ['./create-portal-access.component.scss'],
})
export class CreatePortalAccessComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private connService: ConnectionService,
    private notifier: NzNotificationService,
  ) {}
  @Input() FamilyMemberId: number
  @Output() PortalAccessSent: EventEmitter<boolean> = new EventEmitter<boolean>()
  portalAccessForm: FormGroup
  IsFormSubmitted: boolean = false
  ngOnInit(): void {
    this.portalAccessForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
    })
  }

  async handleSubmit() {
    this.IsFormSubmitted = true
    if (this.portalAccessForm.valid) {
      let _email = this.portalAccessForm.value.Email

      let res = await this.connService.CreatePortalAccess(
        _email,
        this.FamilyMemberId,
        ApplicationRolesEnum.Child,
      )

      if (res) {
        this.PortalAccessSent.emit(true)
        this.notifier.success('', 'Portal Access invitation has been sent successfully')
      }
    }
  }
}

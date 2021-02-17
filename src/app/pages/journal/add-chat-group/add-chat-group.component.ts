import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service'
import { JournalService } from 'src/app/services/journal/journal.service'

@Component({
  selector: 'app-add-chat-group',
  templateUrl: './add-chat-group.component.html',
  styleUrls: ['./add-chat-group.component.scss'],
})
export class AddChatGroupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _chatService: JournalService,
    private notification: NzNotificationService,
    private _FamilyMemberService: FamilyMemberService,
  ) {}
  addGroupForm: FormGroup
  IsSubmitted: boolean = false
  MembersList: any[] = []
  @Output() GroupCreated: EventEmitter<boolean> = new EventEmitter<boolean>()
  ngOnInit(): void {
    this.addGroupForm = this.fb.group({
      Name: ['', [Validators.required]],
      Members: this.fb.array([]),
    })
    this.SetMembersList()
  }
  get FamilyMembersArray(): FormArray {
    return this.addGroupForm.controls.Members as FormArray
  }
  SetMembersList() {
    this._FamilyMemberService.GetAllFamilyMembers().then(_members => {
      if (_members && _members.length) {
        this.MembersList = _members
        this.MembersList.forEach(_member => {
          this.FamilyMembersArray.push(new FormControl(false))
        })
      }
    })
  }

  get FormControls() {
    return this.addGroupForm.controls
  }

  async submitHandler() {
    this.IsSubmitted = true
    if (this.addGroupForm.valid) {
      debugger
      let formData = this.addGroupForm.value
      const selectedMemberIds = formData.Members.map((checked, i) =>
        checked ? this.MembersList[i].Id : null,
      ).filter(v => v !== null)

      let response = await this._chatService.AddUpdateChatGroup(0, formData.Name, selectedMemberIds)
      if (response) {
        this.notification.success('', 'Group has been created successfully!')
        this.GroupCreated.emit(true)
      }
    }
  }
}

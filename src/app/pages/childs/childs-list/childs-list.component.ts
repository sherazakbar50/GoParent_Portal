import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FamilyMemberDto } from 'src/app/models/Family/FamilyMemberDto'
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service'
import { jwtAuthService } from 'src/app/services/jwt'
import { AddChildComponent } from '../add-child/add-child.component'
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-childs-list',
  templateUrl: './childs-list.component.html',
  styleUrls: ['./childs-list.component.scss'],
})
export class ChildsListComponent implements OnInit {
  constructor(
    private _FamilyMemberService: FamilyMemberService,
    private authService: jwtAuthService,
    private router: Router,
    private notification: NzNotificationService,
  ) {}

  childsList: FamilyMemberDto[]
  isVisible: boolean = false
  modalTitle: string = 'Add Child'
  PortalAccessModalVisible: boolean = false
  ChildId: number = 0
  ngOnInit(): void {
    this.getFamilyChilds()
  }

  async getFamilyChilds() {
    let familyId = (await this.authService.getUserModel())?.FamilyId
    this.childsList = await this._FamilyMemberService.GetFamilyChildsList(familyId)
  }

  async DeleteChild(id: any) {
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
        let response = await this._FamilyMemberService.DeleteFamilyMember(id)
        if (response) {
          this.notification.success('', 'Child has been deleted successfully!')
          await this.getFamilyChilds()
        } else {
          this.notification.error('', 'There is some error please try again later!')
        }
      }
    })
  }

  async EditChildProfile(id) {
    this.router.navigate(['childs', 'childprofile'], { queryParams: { id: id } })
  }

  handleChildModalCancel() {
    this.isVisible = false
  }

  handlePortalAccessModalCancel() {
    this.PortalAccessModalVisible = false
  }

  SendPortalAccess(id) {
    this.ChildId = id
    this.PortalAccessModalVisible = true
  }
  async PortalAccessSentCallback() {
    this.ChildId = 0
    this.PortalAccessModalVisible = false
    await this.getFamilyChilds()
  }

  AddChild() {
    this.isVisible = true
  }
  async AddChildSuccess($event) {
    this.isVisible = false
    await this.getFamilyChilds()
  }
}

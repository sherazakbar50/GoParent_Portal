import { Component, Input, OnInit } from '@angular/core'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { VaccineDto } from 'src/app/models/Family/FamilyMemberDto'
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service'
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-child-vaccines',
  templateUrl: './child-vaccines.component.html',
  styleUrls: ['./child-vaccines.component.scss'],
})
export class ChildVaccinesComponent implements OnInit {
  constructor(
    private _FamilyMemberService: FamilyMemberService,
    private notification: NzNotificationService,
  ) {}

  @Input() familyMemberId: number
  VaccinesData: VaccineDto[]
  isVisible: boolean = false
  VaccineId: number = 0
  modalTitle: string = 'Add Vaccine'

  ngOnInit(): void {
    this.GetVaccines()
  }

  async GetVaccines() {
    this.VaccinesData = await this._FamilyMemberService.GetMemberVaccines(this.familyMemberId)
  }

  async DeleteVaccine(id: number) {
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
        let response = await this._FamilyMemberService.DeleteVaccine(id)
        if (response) {
          this.notification.success('', 'Vaccine has been deleted successfully!')
          await this.GetVaccines()
        } else {
          this.notification.error('', 'There is some error please try again later!')
        }
      }
    })
  }
  EditVaccine(id: number) {
    this.VaccineId = id
    this.isVisible = true
  }

  AddVaccine() {
    this.VaccineId = 0
    this.isVisible = true
  }

  handleModalCancel() {
    this.isVisible = false
  }

  async AddVaccineSuccess() {
    this.isVisible = false
    await this.GetVaccines()
  }
}

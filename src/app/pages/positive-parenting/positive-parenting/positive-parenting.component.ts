import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { AlertService } from 'src/app/services/alert-service/alert-service'
import { PositiveParentingService } from 'src/app/services/APIServices/positive-parenting.service'
import { jwtAuthService } from 'src/app/services/jwt'

@Component({
  selector: 'app-positive-parenting',
  templateUrl: './positive-parenting.component.html',
  styleUrls: ['./positive-parenting.component.scss'],
})
export class PositiveParentingComponent implements OnInit {
  isVisible: boolean = false
  Content: any
  Id: number
  showError: boolean = false
  dataList: any[] = []
  userRole: string
  viewVisible: boolean = false
  loading: boolean = true

  constructor(
    private parentingService: PositiveParentingService,
    private notificationService: NzNotificationService,
    private authService: jwtAuthService,
    private alertService: AlertService,
  ) {
    this.authService.getUserModel().then(r => {
      if (r) {
        this.userRole = r.UserRole
      }
    })
  }

  ngOnInit(): void {
    this.parentingService.listObserver().subscribe(r => {
      if (r) {
        this.dataList = r
        this.loading = false
      }
    })
    this.parentingService.getList()
  }

  async submitForm() {
    if (!this.Content || typeof this.Content == undefined || this.Content == '') {
      this.showError = true
      return
    }
    this.Id = this.Id ? this.Id : 0
    this.loading = true
    let res = await this.parentingService.addUpdate({
      Id: this.Id,
      Content: this.Content,
    })

    if (res) {
      this.parentingService.getList()
      this.isVisible = false
      this.notificationService.success('', 'Record submitted successfully!')
      this.Id = 0
      this.Content = null
    }
  }

  async edit(data) {
    this.isVisible = true
    this.Content = data.Content
    this.Id = data.Id
  }

  async delete(id: number) {
    if (id && id > 0) {
      this.alertService.Delete('Are you sure, you want to delete this record', async r => {
        if (r.isConfirmed) {
          let res = await this.parentingService.deletePost(id)
          if (res) {
            this.parentingService.getList()
            this.notificationService.success('', 'Record deleted successfully!')
          }
        }
      })
    }
  }
}

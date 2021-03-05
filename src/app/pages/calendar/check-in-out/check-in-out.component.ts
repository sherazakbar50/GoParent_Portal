import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { CheckInOutDTO } from 'src/app/models/CheckInOutDTO';
import { CheckInOutService } from 'src/app/services/calendar-services/check-in-out.service';
import { FormsService } from 'src/app/services/shared/forms.service';

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.scss']
})
export class CheckInOutComponent implements OnInit {

  form: FormGroup
  @Input() data;
  @Output() close = new EventEmitter<boolean>()
  dataList: CheckInOutDTO[] = []
  isAddUpdate: boolean = false
  subscription: Subscription;

  constructor(
    private _checkInOut: CheckInOutService,
    private _forms: FormsService,
    private _notify: NzNotificationService,
  ) { }

  ngOnChanges(change: SimpleChanges) {
    this.isAddUpdate = false
    if (this.data) {
    } else {
      // this.form.reset()
    }
  }

  ngOnInit(): void {
    this._checkInOut.getList()
    this.subscription = this._checkInOut.getCheckListObserver$().subscribe((r: any) => {
      console.log('r:', r)
      if (r)
        this.dataList = r
    })

    this.form = new FormGroup({
      Id: new FormControl(0),
      IsCheckIn: new FormControl(true),
      DateTime: new FormControl(null, [Validators.required]),
      Location: new FormControl(null),
      Notes: new FormControl(null),
    })
  }


  async submitForm() {
    this._forms.markAllFieldsAsDirty(this.form)
    if(this.form.invalid)
      return;
    
    let data = this.form.value as CheckInOutDTO
    if (!data.Id) {
      data.Id = 0
    }
    let res = await this._checkInOut.addUpdate(data)
    if (res) {
      this._checkInOut.getList()
      this.isAddUpdate = false
      this._notify.success('', 'Record submitted successfully!')
      this.form.reset({ IsCheckIn: true })
    }
  }

  edit(data: CheckInOutDTO) {
    if (data) {
      this.isAddUpdate = true
      this.form.patchValue(data)
    }
  }

  delete(id: number) {
    if (id) {
      this.isAddUpdate = true

    }
  }


  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
}

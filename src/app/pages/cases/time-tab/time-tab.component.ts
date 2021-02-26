import { Component, Input, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { CaseTimeDto } from 'src/app/models/CaseTime/case-time-dto'
import { CaseTimeService } from 'src/app/services/cases/CaseTime/case-time.service'

@Component({
  selector: 'app-time-tab',
  templateUrl: './time-tab.component.html',
  styleUrls: ['./time-tab.component.scss'],
})
export class TimeTabComponent implements OnInit {
  isVisible: boolean = false
  TimemodalTitle: string = 'Add case time'
  case = new CaseTimeDto()
  casesTotalTimeInMinutes: number = 0
  listData: CaseTimeDto[] = []
  @Input() caseId: number
  caseTimeObserverSubject: BehaviorSubject<CaseTimeDto> = new BehaviorSubject(null)
  constructor(private caseTimeServices: CaseTimeService) {}

  ngOnInit(): void {
    this.loadCaseTime()
  }

  async loadCaseTime() {
    this.caseTimeServices.caseTimeObserver$.subscribe(res => {
      if (res) {
        this.casesTotalTimeInMinutes = 0
        this.listData = res
        this.listData.forEach(x => {
          this.casesTotalTimeInMinutes = this.casesTotalTimeInMinutes + x.TotalTime
        })
      }
    })

    await this.caseTimeServices.getCasesTime(this.caseId)
  }

  AddTime() {
    this.isVisible = true
    this, this.caseTimeObserverSubject.next(null)
  }

  EditCaseTime(data: CaseTimeDto) {
    this.TimemodalTitle = 'Edit case time'
    this.isVisible = true
    this.caseTimeObserverSubject.next(data)
  }

  SavedCallBack() {
    this.isVisible = false
  }

  ModalCancel() {
    this.isVisible = false
  }
  async AddTimeSuccess($event) {
    this.isVisible = false
  }
}

import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CalendarService } from 'src/app/services/calendar-services/calendar-service'
import { ViewDocumentsComponent } from '../../documents/view-documents/view-documents.component'
import { ViewFolderComponent } from '../../documents/view-folder/view-folder.component'

@Component({
  selector: 'app-cases-tab',
  templateUrl: './cases-tab.component.html',
  styleUrls: ['./cases-tab.component.scss'],
})
export class CasesTabComponent implements OnInit {
  caseId: number = 0
  @Input() folderCompoennt: ViewFolderComponent
  @Input() documentComponent: ViewDocumentsComponent
  constructor(private route: ActivatedRoute, private _calendarService: CalendarService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.caseId = +params['caseId'] || 0
    })
  }
}

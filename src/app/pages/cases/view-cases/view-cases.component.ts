import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CaseDto } from 'src/app/models/Cases/case-dto';
import { CasesService } from 'src/app/services/cases/cases.service';

@Component({
  selector: 'app-view-cases',
  templateUrl: './view-cases.component.html',
  styleUrls: ['./view-cases.component.scss']
})
export class ViewCasesComponent implements OnInit {
  case = new CaseDto;
  listData: CaseDto[] = [];
  caseObserverSubject: BehaviorSubject<CaseDto> = new BehaviorSubject(null);
  constructor(private router: Router, private casesService: CasesService) {
  }

  ngOnInit(): void {
    this.loadCases()
  }
  loadCases() {
    this.casesService.caseObserver$.subscribe(res => {
      if (res) {
        this.listData = res;
      }
    });
    this.casesService.getCases()
  }


  NavigateToCasesTab(caseId: number) {
    if (caseId) {
      this.router.navigate(['/cases/cases-tab'], { queryParams: { caseId: caseId } })
    }
  }
}

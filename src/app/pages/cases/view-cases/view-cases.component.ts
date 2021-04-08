import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CaseDto } from 'src/app/models/Cases/case-dto';
import { ApplicationRolesEnum, UserSessionModel } from 'src/app/models/UserSessionModel';
import { CasesService } from 'src/app/services/cases/cases.service';
import { jwtAuthService } from 'src/app/services/jwt';

@Component({
  selector: 'app-view-cases',
  templateUrl: './view-cases.component.html',
  styleUrls: ['./view-cases.component.scss']
})
export class ViewCasesComponent implements OnInit {
  case = new CaseDto;
  listData: CaseDto[] = [];

  caseObserverSubject: BehaviorSubject<CaseDto> = new BehaviorSubject(null);
  user: UserSessionModel;
  constructor(
    private router: Router,
    private casesService: CasesService,
    private authService: jwtAuthService,
  ) {
    authService.getUserModel().then(res => {
      this.user = res
    })
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
    if (this.user.UserRole == ApplicationRolesEnum[3]) {
      this.casesService.getCases()
    } else {
      this.casesService.getAllCases()
    }
  }


  NavigateToCasesTab(caseId: number) {
    if (caseId) {
      this.router.navigate(['/cases/cases-tab'], { queryParams: { caseId: caseId } })
    }
  }
}

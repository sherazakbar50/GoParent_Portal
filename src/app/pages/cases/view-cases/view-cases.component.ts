import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseDto } from 'src/app/models/Cases/case-dto';

@Component({
  selector: 'app-view-cases',
  templateUrl: './view-cases.component.html',
  styleUrls: ['./view-cases.component.scss']
})
export class ViewCasesComponent implements OnInit {
  cardList: CaseDto[] = [];
 case = new CaseDto;
  constructor(private router: Router) { 
this.case.caseName = "Case Name 1",
this.case.caseFor = "Xyz"

this.cardList.push(this.case);
this.cardList.push(this.case);
this.cardList.push(this.case);
this.cardList.push(this.case);
this.cardList.push(this.case);

  }

  ngOnInit(): void {

}


NavigateToCasesTab(caseId: number){
if(caseId){
  this.router.navigate(['/cases/cases-tab'], { queryParams: { caseId: caseId } })
}
}
}
